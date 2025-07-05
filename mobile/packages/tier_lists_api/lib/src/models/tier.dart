import 'package:flutter/material.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:tier_lists_api/src/helpers/color_converter.dart';
import 'json_map.dart';
import 'tier_item.dart';
import 'list_row.dart';

part 'tier.g.dart';

@immutable
@JsonSerializable()
class Tier extends ListRow {
  const Tier({
    required super.id,
    required super.name,
    required super.color,
    required super.items,
  });

  Tier copyWith({
    String? id,
    String? name,
    Color? color,
    List<TierItem>? items,
  }) {
    return Tier(
      id: id ?? this.id,
      name: name ?? this.name,
      color: color ?? this.color,
      items: items ?? List.from(this.items),
    );
  }

  factory Tier.fromJson(JsonMap json) => _$TierFromJson(json);

  @override
  JsonMap toJson() {
    final json = _$TierToJson(this);
    return {...json, 'type': 'tier'};
  }
}
