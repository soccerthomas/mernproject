import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';
import 'tier.dart';
import 'tag.dart';
import 'staging_area.dart';
import 'json_map.dart';
import 'package:flutter/material.dart';

part 'tier_list.g.dart';

const List<Tier> defaultTiers = [
  Tier(
    id: 's',
    name: 'S',
    color: Color(0xFFEF4444),
    items: []
  ),
  Tier(
    id: 'a',
    name: 'A',
    color: Color(0xFFF97316),
    items: []
  ),
  Tier(
    id: 'b',
    name: 'B',
    color: Color(0xFFEAB308),
    items: []
  ),
  Tier(
    id: 'c',
    name: 'C',
    color: Color(0xFF22C55E),
    items: []
  ),
  Tier(
    id: 'd',
    name: 'D',
    color: Color(0xFF3B82F6),
    items: []
  ),
];

@immutable
@JsonSerializable()
class TierList extends Equatable {
  final String id;
  final String title;
  final String description;
  final List<Tier> tiers;
  final List<Tag> tags;
  final StagingArea stagingArea;

  const TierList({
    required this.id,
    required this.title,
    this.description = '',
    required this.tiers,
    required this.tags,
    required this.stagingArea
  });

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
      tags: tags ?? List.from(this.tags), 
      stagingArea: stagingArea ?? this.stagingArea
    );
  }

  static TierList fromJson(JsonMap json) => _$TierListFromJson(json);

  JsonMap toJson() => _$TierListToJson(this);

  @override
  List<Object> get props => [id, title, description, tiers, tags, stagingArea];
}