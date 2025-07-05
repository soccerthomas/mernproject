import 'package:flutter/material.dart';
import 'package:json_annotation/json_annotation.dart';
import 'json_map.dart';
import 'tier_item.dart';
import 'list_row.dart';

part 'staging_area.g.dart';

@immutable
@JsonSerializable()
class StagingArea extends ListRow {
  const StagingArea({required super.items})
    : super(id: 'staging', name: 'Staging Area', color: Colors.grey);

  StagingArea copyWith({List<TierItem>? items}) {
    return StagingArea(items: items ?? List.from(this.items));
  }

  factory StagingArea.fromJson(JsonMap json) => _$StagingAreaFromJson(json);

  @override
  JsonMap toJson() {
    final json = _$StagingAreaToJson(this);
    return {...json, 'type': 'staging_area'};
  }

  @override
  List<Object> get props => [items];
}
