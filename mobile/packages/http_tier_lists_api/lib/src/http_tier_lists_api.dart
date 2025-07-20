import 'dart:convert';
import 'package:tier_lists_api/tier_lists_api.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class HttpTierListsApi implements RemoteTierListsApi {
  static final _baseUrl = dotenv.env['BASE_URL'];
  final _secureStorage = const FlutterSecureStorage();

  @override
  Future<List<TierList>> searchTierLists({String query = ''}) async {
    final token = await _secureStorage.read(key: 'auth_token');
    if (token == null) throw Exception('User not authenticated');

    final response = await http.get(
      Uri.parse('$_baseUrl/api/tierlist/search?title=$query'),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    );

    if (response.statusCode < 400) {
      final body = jsonDecode(response.body) as List;
      return body.map((json) => TierList.fromJson(json)).toList();
    } else {
      String responseMessage;
      try {
        final Map<String, dynamic> responseJson = jsonDecode(response.body);
        responseMessage = responseJson['message'];
      } catch (_) {
        throw Exception('Search failed');
      }
      throw Exception(responseMessage);
    }
  }

  @override
  Future<TierList> saveTierList(Map<String, dynamic> tierListJson) async {
    final token = await _secureStorage.read(key: 'auth_token');
    if (token == null) throw Exception('User not authenticated');

    final response = await http.post(
      Uri.parse('$_baseUrl/api/tierlist/'),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: jsonEncode(tierListJson)
    );

    if (response.statusCode >= 400) {
      print(response.body);
      throw Exception('Failed to save tier list');
    }

    final newTierListJson = jsonDecode(response.body);
    return TierList.fromJson(newTierListJson);
  }

  @override
  Future<void> updateTierList(Map<String, dynamic> tierListJson) async {
    final token = await _secureStorage.read(key: 'auth_token');
    if (token == null) throw Exception('User not authenticated');

    final response = await http.put(
      Uri.parse('$_baseUrl/api/tierlist/${tierListJson['_id']}'),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: jsonEncode(tierListJson)
    );

    if (response.statusCode >= 400) {
      print(response.body);
      throw Exception('Failed to update tier list');
    }
  }

  @override
  Future<void> deleteTierList(String id) async {
    final token = await _secureStorage.read(key: 'auth_token');
    if (token == null) throw Exception('User not authenticated');

    final response = await http.delete(
      Uri.parse('$_baseUrl/api/tierlist/$id'),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    );

    if (response.statusCode >= 400) {
      print(response.body);
      throw Exception('Failed to delete tier list');
    }
  }
}