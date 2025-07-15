import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:uuid/uuid.dart';
import 'tier.dart';
import 'tag.dart';
import 'tier_item.dart';
import 'staging_area.dart';
import 'json_map.dart';
import 'package:flutter/material.dart';

part 'tier_list.g.dart';

List<Tier> defaultTiers = [
  Tier(id: 's', name: 'S', color: const Color(0xFFEF4444), items: []),
  Tier(id: 'a', name: 'A', color: const Color(0xFFF97316), items: []),
  Tier(id: 'b', name: 'B', color: const Color(0xFFEAB308), items: []),
  Tier(id: 'c', name: 'C', color: const Color(0xFF22C55E), items: []),
  Tier(id: 'd', name: 'D', color: const Color(0xFF3B82F6), items: []),
];

@immutable
@JsonSerializable()
class TierList extends Equatable {
  @JsonKey(includeToJson: false)
  final String id;

  final String title;
  final String description;

  @JsonKey(name: 'categories')
  final List<Tier> tiers;

  @JsonKey(
    name: 'unassignedItems',
    fromJson: _stagingAreaFromUnassignedItems,
    toJson: _unassignedItemsFromStagingArea,
  )
  final StagingArea stagingArea;

  TierList({
    String? id,
    required this.title,
    this.description = '',
    required this.tiers,
    required this.stagingArea,
  }) : id = id ?? const Uuid().v4();

  TierList copyWith({
    String? id,
    String? title,
    String? description,
    List<Tier>? tiers,
    List<Tag>? tags,
    StagingArea? stagingArea,
  }) {
    return TierList(
      id: id ?? this.id,
      title: title ?? this.title,
      description: description ?? this.description,
      tiers: tiers ?? List.from(this.tiers),
      stagingArea: stagingArea ?? this.stagingArea,
    );
  }

  static TierList fromJson(JsonMap json) => _$TierListFromJson(json);

  JsonMap toJson() => _$TierListToJson(this);

  @override
  List<Object> get props => [id, title, description, tiers, stagingArea];
}

StagingArea _stagingAreaFromUnassignedItems(List<dynamic> itemsJson) {
  final items = itemsJson
      .map((itemJson) => TierItem.fromJson(itemJson as Map<String, dynamic>))
      .toList();
  return StagingArea(items: items);
}

List<Map<String, dynamic>> _unassignedItemsFromStagingArea(
  StagingArea stagingArea,
) {
  return stagingArea.items.map((item) => item.toJson()).toList();
}
