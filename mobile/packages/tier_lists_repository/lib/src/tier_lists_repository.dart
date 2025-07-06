import 'package:tier_lists_api/tier_lists_api.dart';

class TierListsRepository {
  final LocalTierListsApi _localTierListsApi;

  const TierListsRepository({
    required LocalTierListsApi localTierListsApi,
  }) : _localTierListsApi = localTierListsApi;

  Stream<List<TierList>> getTierLists() => _localTierListsApi.getTierLists();

  Future<void> saveTierList(TierList tierList) => _localTierListsApi.saveTierList(tierList);

  Future<void> deleteTierList(String id) => _localTierListsApi.deleteTierList(id);

  void dispose() => _localTierListsApi.close();
}