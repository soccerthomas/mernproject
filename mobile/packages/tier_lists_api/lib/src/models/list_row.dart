import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:tier_lists_api/src/helpers/color_converter.dart';
import 'tier_item.dart';
import 'json_map.dart';
import 'tier.dart';
import 'staging_area.dart';

@JsonSerializable()
abstract class ListRow extends Equatable {
  final String id;
  final String name;

  @ColorConverter()
  final Color color;

  final List<TierItem> items;

  const ListRow({
    required this.id,
    required this.name,
    required this.color,
    required this.items
  });

  factory ListRow.fromJson(JsonMap json) {
    switch (json['type'] as String) {
      case 'tier':
        return Tier.fromJson(json);
      case 'staging_area':
        return StagingArea.fromJson(json);
      default:
        throw UnimplementedError('Unknown ListRow type: ${json['type']}');
    }
  }

  JsonMap toJson();

  @override
  List<Object> get props => [id, name, color, items];
}