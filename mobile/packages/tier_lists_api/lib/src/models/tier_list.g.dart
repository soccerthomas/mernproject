// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'tier_list.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

TierList _$TierListFromJson(Map<String, dynamic> json) => TierList(
  id: json['id'] as String,
  title: json['title'] as String,
  description: json['description'] as String? ?? '',
  tiers: (json['tiers'] as List<dynamic>)
      .map((e) => Tier.fromJson(e as Map<String, dynamic>))
      .toList(),
  tags: (json['tags'] as List<dynamic>)
      .map((e) => Tag.fromJson(e as Map<String, dynamic>))
      .toList(),
  stagingArea: StagingArea.fromJson(
    json['stagingArea'] as Map<String, dynamic>,
  ),
);

Map<String, dynamic> _$TierListToJson(TierList instance) => <String, dynamic>{
  'id': instance.id,
  'title': instance.title,
  'description': instance.description,
  'tiers': instance.tiers,
  'tags': instance.tags,
  'stagingArea': instance.stagingArea,
};
