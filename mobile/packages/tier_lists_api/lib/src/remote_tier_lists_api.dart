import 'models/tier_list.dart';

abstract class RemoteTierListsApi {
  Future<List<TierList>> fetchAllTierLists();

  Future<void> saveTierList(TierList tierList);

  Future<void> deleteTierList(String id);
}