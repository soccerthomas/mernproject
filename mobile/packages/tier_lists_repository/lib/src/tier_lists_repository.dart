import 'package:tier_lists_api/tier_lists_api.dart';

class TierListsRepository {
  final LocalTierListsApi _localTierListsApi;
  final RemoteTierListsApi _remoteTierListsApi;

  const TierListsRepository({
    required LocalTierListsApi localTierListsApi,
    required RemoteTierListsApi remoteTierListsApi,
  }) : _localTierListsApi = localTierListsApi,
       _remoteTierListsApi = remoteTierListsApi;

  Stream<List<TierList>> getTierLists() => _localTierListsApi.getTierLists();

  Future<void> refreshTierLists() async {
    final remoteTierLists = await _remoteTierListsApi.searchTierLists();

    for (final tierList in remoteTierLists) {
      await _localTierListsApi.saveTierList(tierList);
    }
  }

  Stream<TierList> getTierList(String id) => _localTierListsApi.getTierList(id);

  Future<void> saveTierList(TierList tierList) async {
    await _remoteTierListsApi.saveTierList(tierList);
    await _localTierListsApi.saveTierList(tierList);
  }

  Future<void> deleteTierList(String id) async {
    await _remoteTierListsApi.deleteTierList(id);
    await _localTierListsApi.deleteTierList(id);
  }

  Future<List<TierList>> searchTierLists(String query) async {
    final searchResults = await _remoteTierListsApi.searchTierLists(query: query);

    for (final tierList in searchResults) {
      await _localTierListsApi.saveTierList(tierList);
    }

    return searchResults;
  }

  void dispose() => _localTierListsApi.close();
}
