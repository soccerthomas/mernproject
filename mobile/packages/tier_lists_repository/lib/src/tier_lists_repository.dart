import 'dart:convert';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:tier_lists_api/tier_lists_api.dart';

class TierListsRepository {
  final LocalTierListsApi _localTierListsApi;
  final RemoteTierListsApi _remoteTierListsApi;
  final _secureStorage = const FlutterSecureStorage();

  const TierListsRepository({
    required LocalTierListsApi localTierListsApi,
    required RemoteTierListsApi remoteTierListsApi,
  }) : _localTierListsApi = localTierListsApi,
       _remoteTierListsApi = remoteTierListsApi;

  Stream<List<TierList>> getTierLists() => _localTierListsApi.getTierLists();

  Future<void> refreshTierLists() async {
    final remoteTierLists = await _remoteTierListsApi.searchTierLists();

    await _localTierListsApi.replaceAllTierLists(remoteTierLists);
  }

  Stream<TierList> getTierList(String id) => _localTierListsApi.getTierList(id);

  Future<void> saveTierList(TierList tierList) async {
    final tierListJson = tierList.toJson();

    final userString = await _secureStorage.read(key: 'user');
    if (userString == null) {
      throw Exception('Could not find user data to save tier list.');
    }

    final userJson = jsonDecode(userString);
    tierListJson['user'] = userJson;

    final newTierList = await _remoteTierListsApi.saveTierList(tierListJson);
    await _localTierListsApi.saveTierList(newTierList);
  }

  Future<void> updateTierList(TierList tierList) async {
    final tierListJson = tierList.toJson();

    final userString = await _secureStorage.read(key: 'user');
    if (userString == null) {
      throw Exception('Could not find user data to update tier list.');
    }

    final userJson = jsonDecode(userString);
    tierListJson['user'] = userJson;

    await _remoteTierListsApi.updateTierList(tierListJson);
    await _localTierListsApi.saveTierList(tierList);
  }

  Future<void> deleteTierList(String id) async {
    await _localTierListsApi.deleteTierList(id);
    await _remoteTierListsApi.deleteTierList(id);
  }

  Future<List<TierList>> searchTierLists(String query) async {
    return await _remoteTierListsApi.searchTierLists(query: query);
  }

  void dispose() => _localTierListsApi.close();
}