import 'models/tier_list.dart';

abstract class LocalTierListsApi {
  Stream<List<TierList>> getTierLists();

  Stream<TierList> getTierList(String id);

  Future<void> saveTierList(TierList tierList);

  Future<void> deleteTierList(String id);

  Future<void> close();
}

class TierListNotFoundException implements Exception {}