import 'models/tier_list.dart';

abstract class RemoteTierListsApi {
  Future<List<TierList>> searchTierLists({String query});

  Future<TierList> saveTierList(Map<String, dynamic> tierListJson);

  Future<void> updateTierList(Map<String, dynamic> tierListJson);

  Future<void> deleteTierList(String id);
}