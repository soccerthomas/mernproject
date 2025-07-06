import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:meta/meta.dart';
import 'tier.dart';
import 'tag.dart';
import 'staging_area.dart';
import 'json_map.dart';

part 'tier_list.g.dart';

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