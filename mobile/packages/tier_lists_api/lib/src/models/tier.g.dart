// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'tier.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Tier _$TierFromJson(Map<String, dynamic> json) => Tier(
  id: json['id'] as String,
  name: json['name'] as String,
  color: const ColorConverter().fromJson((json['color'] as num).toInt()),
  items: (json['items'] as List<dynamic>)
      .map((e) => TierItem.fromJson(e as Map<String, dynamic>))
      .toList(),
);

Map<String, dynamic> _$TierToJson(Tier instance) => <String, dynamic>{
  'id': instance.id,
  'name': instance.name,
  'color': const ColorConverter().toJson(instance.color),
  'items': instance.items,
};
