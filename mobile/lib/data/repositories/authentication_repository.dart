import 'dart:async';
import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

enum AuthenticationStatus { unknown, authenticated, unauthenticated }

class LogInFailure implements Exception {
  final String message;
  const LogInFailure([this.message = 'An unknown exception occurred.']);
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
        // TODO: verify if the JWT is valid once verification endpoint is created
        yield AuthenticationStatus.authenticated;
      }
    } catch (e) {
      print(e);
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

      if (token == null) {
        throw const LogInFailure('Server response did not contain a token.');
      }

      await _secureStorage.write(key: 'auth_token', value: token);
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

  void dispose() => _controller.close();
}
