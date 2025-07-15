import 'models/tier_list.dart';

abstract class RemoteTierListsApi {
  Future<List<TierList>> searchTierLists({String query});

  Future<void> saveTierList(TierList tierList);

  Future<void> deleteTierList(String id);
}