// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'staging_area.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

StagingArea _$StagingAreaFromJson(Map<String, dynamic> json) => StagingArea(
  items: (json['items'] as List<dynamic>)
      .map((e) => TierItem.fromJson(e as Map<String, dynamic>))
      .toList(),
);

Map<String, dynamic> _$StagingAreaToJson(StagingArea instance) =>
    <String, dynamic>{'items': instance.items};
