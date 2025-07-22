import 'dart:async';
import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart' show User;

enum AuthenticationStatus { unknown, authenticated, unauthenticated }

class LogInFailure implements Exception {
  final String message;
  const LogInFailure([this.message = 'An unknown exception occurred.']);
}

class RegisterFailure implements Exception {
  final String message;
  const RegisterFailure([this.message = 'An unknown exception occured.']);
}

class AuthenticationRepository {
  final _controller = StreamController<AuthenticationStatus>();
  final _secureStorage = const FlutterSecureStorage();
  static final _baseUrl = dotenv.env['BASE_URL'];

  Stream<AuthenticationStatus> get status async* {
    try {
      final String? userToken = await _secureStorage.read(key: 'auth_token');
      if (userToken == null) {
        yield AuthenticationStatus.unauthenticated;
      } else {
        final response = await http.post(
          Uri.parse('$_baseUrl/api/auth/tokenVerify'),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode({'token': userToken}),
        );

        if (response.statusCode == 200) {
          final body = jsonDecode(response.body);
          final isValid = body['isValid'] as bool;
          yield isValid
              ? AuthenticationStatus.authenticated
              : AuthenticationStatus.unauthenticated;
        } else {
          print('tokenVerify endpoint status code is not 200');
          yield AuthenticationStatus.unauthenticated;
        }
      }
    } catch (e) {
      yield AuthenticationStatus.unauthenticated;
    }
    yield* _controller.stream;
  }

  Future<void> logIn({
    required String username,
    required String password,
  }) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/api/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'username': username, 'password': password}),
    );

    if (response.statusCode == 200) {
      final body = jsonDecode(response.body);
      final token = body['token'] as String?;
      final userJson = body['user'] as Map<String, dynamic>?;

      if (token == null) {
        throw const LogInFailure('Server response did not contain a token.');
      }
      if (userJson == null) {
        throw const LogInFailure('Server response did not contain a user.');
      }

      await _secureStorage.write(key: 'auth_token', value: token);

      final user = User.fromJson(userJson);
      await _secureStorage.write(key: 'user', value: jsonEncode(user.toJson()));

      _controller.add(AuthenticationStatus.authenticated);
    } else if (response.statusCode == 401) {
      throw const LogInFailure('Invalid username or password.');
    } else {
      throw const LogInFailure();
    }
  }

  void logOut() async {
    await _secureStorage.delete(key: 'auth_token');
    _controller.add(AuthenticationStatus.unauthenticated);
  }

  Future<void> register({
    required String username,
    required String email,
    required String password,
  }) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/api/auth/register'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'username': username,
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode >= 400) {
      String responseMessage;
      try {
        final Map<String, dynamic> responseJson = jsonDecode(response.body);
        responseMessage = responseJson['message'];
      } catch (_) {
        throw const RegisterFailure('Failed to register');
      }
      throw RegisterFailure(responseMessage);
    }
  }

  Future<void> resendVerificationEmail(String email) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/api/auth/sendCode'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email}),
    );

    if (response.statusCode == 500) {
      String responseMessage;
      try {
        final Map<String, dynamic> responseJson = jsonDecode(response.body);
        responseMessage = responseJson['message'];
      } catch (_) {
        throw Exception('Failed to resend verification email');
      }
      throw Exception(responseMessage);
    } else if (response.statusCode >= 400) {
      throw Exception('Failed to resend verification email');
    }
  }

  Future<void> verifyCode({required String email, required String code}) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/api/auth/verifyCode'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'code': code}),
    );

    if (response.statusCode == 400) {
      String responseMessage;
      try {
        final Map<String, dynamic> responseJson = jsonDecode(response.body);
        responseMessage = responseJson['message'];
      } catch (_) {
        throw Exception('Failed to verify code');
      }
      throw Exception(responseMessage);
    } else if (response.statusCode > 400) {
      throw Exception('Failed to verify code');
    }
  }

  Future<void> sendPasswordResetCode(String email) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/api/auth/sendPasswordResetCode'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email}),
    );

    if (response.statusCode >= 400) {
      String responseMessage;
      try {
        final Map<String, dynamic> responseJson = jsonDecode(response.body);
        responseMessage = responseJson['message'];
      } catch (_) {
        throw Exception('Error sending password reset code');
      }
      throw Exception(responseMessage);
    }
  }

  Future<void> verifyPasswordResetCode({
    required String email,
    required String code,
  }) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/api/auth/verifyPasswordResetCode'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'code': code}),
    );

    if (response.statusCode >= 400) {
      String responseMessage;
      try {
        final Map<String, dynamic> responseJson = jsonDecode(response.body);
        responseMessage = responseJson['message'];
      } catch (_) {
        throw Exception('Error verifying password reset code');
      }
      throw Exception(responseMessage);
    }
  }

  Future<void> resetPassword({
    required String email,
    required String newPassword,
  }) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/api/auth/resetPassword'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'newPassword': newPassword}),
    );

    if (response.statusCode >= 400) {
      String responseMessage;
      try {
        final Map<String, dynamic> responseJson = jsonDecode(response.body);
        responseMessage = responseJson['message'];
      } catch (_) {
        throw Exception('Error resetting password');
      }
      throw Exception(responseMessage);
    }
  }

  void dispose() => _controller.close();
}
