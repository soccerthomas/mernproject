import 'dart:async';
import 'dart:convert';
import 'package:tier_lists_api/tier_lists_api.dart';
import 'package:rxdart/subjects.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LocalStorageTierListsApi extends LocalTierListsApi {
  final SharedPreferences _plugin;
  static const kTierListsCollectionKey = '__tier_lists_collection_key__';
  late final _tierListStreamController = BehaviorSubject<List<TierList>>.seeded(
    const [],
  ); // BehaviorSubject is like a normal stream controller but it caches its latest item

  LocalStorageTierListsApi({required SharedPreferences plugin})
    : _plugin = plugin {
    _init();
  }

  String? _getValue(String key) => _plugin.getString(key);

  Future<void> _setValue(String key, String value) =>
      _plugin.setString(key, value);

  void _init() {
    final tierListsJson = _getValue(kTierListsCollectionKey);
    if (tierListsJson == null) {
      _tierListStreamController.add(const []);
      return;
    }

    final tierLists =
        List<Map<dynamic, dynamic>>.from(json.decode(tierListsJson))
            .map(
              (jsonMap) =>
                  TierList.fromJson(Map<String, dynamic>.from(jsonMap)),
            )
            .toList();
    _tierListStreamController.add(tierLists);
  }

  @override
  Future<void> deleteTierList(String id) {
    final tierLists = [..._tierListStreamController.value];
    final tierListIndex = tierLists.indexWhere((t) => t.id == id);
    if (tierListIndex == -1) {
      throw TierListNotFoundException();
    } else {
      tierLists.removeAt(tierListIndex);
      _tierListStreamController.add(tierLists);
      return _setValue(kTierListsCollectionKey, json.encode(tierLists));
    }
  }

  @override
  Stream<List<TierList>> getTierLists() =>
      _tierListStreamController.asBroadcastStream();

  @override
  Stream<TierList> getTierList(String id) {
    return _tierListStreamController.stream.map((tierLists) {
      try {
        return tierLists.firstWhere((tierList) => tierList.id == id);
      } catch (e) {
        throw TierListNotFoundException();
      }
    });
  }

  @override
  Future<void> saveTierList(TierList tierList) {
    final tierLists = [..._tierListStreamController.value];
    final tierListIndex = tierLists.indexWhere((t) => t.id == tierList.id);
    if (tierListIndex >= 0) {
      tierLists[tierListIndex] = tierList;
    } else {
      tierLists.add(tierList);
    }

    _tierListStreamController.add(tierLists);
    return _setValue(kTierListsCollectionKey, json.encode(tierLists));
  }

  @override
  Future<void> close() {
    return _tierListStreamController.close();
  }
}
