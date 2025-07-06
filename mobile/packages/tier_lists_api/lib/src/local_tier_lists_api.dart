import 'models/tier_list.dart';

abstract class LocalTierListsApi {
  Stream<List<TierList>> getTierLists();

  Future<void> saveTierList(TierList tierList);

  Future<void> deleteTierList(String id);

  Future<void> close();
}

class TierListNotFoundException implements Exception {}