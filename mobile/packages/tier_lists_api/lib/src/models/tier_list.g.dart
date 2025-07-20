// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'tier_list.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

TierList _$TierListFromJson(Map<String, dynamic> json) => TierList(
  id: json['_id'] as String?,
  title: json['title'] as String,
  description: json['description'] as String? ?? '',
  tiers: (json['categories'] as List<dynamic>)
      .map((e) => Tier.fromJson(e as Map<String, dynamic>))
      .toList(),
  stagingArea: _stagingAreaFromUnassignedItems(json['unassignedItems'] as List),
  pinned: json['pinned'] as bool? ?? false,
);

Map<String, dynamic> _$TierListToJson(TierList instance) => <String, dynamic>{
  '_id': instance.id,
  'title': instance.title,
  'description': instance.description,
  'categories': instance.tiers,
  'unassignedItems': _unassignedItemsFromStagingArea(instance.stagingArea),
  'pinned': instance.pinned,
};
