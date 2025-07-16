import 'package:flutter/material.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:tier_lists_api/src/helpers/color_converter.dart';
import 'package:uuid/uuid.dart';
import 'json_map.dart';
import 'tier_item.dart';
import 'list_row.dart';

part 'tier.g.dart';

@immutable
@JsonSerializable()
class Tier extends ListRow {
  Tier({
    String? id,
    required super.name,
    required super.color,
    required super.items,
  }) : super(
    id: id ?? const Uuid().v4(),
  );

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

  factory Tier.fromJson(JsonMap json) {
    final dynamic colorJson = json['color'];
    late final int colorValue;

    if (colorJson is String) {
      colorValue = int.parse(colorJson);
    } else if (colorJson is num) {
      colorValue = colorJson.toInt();
    } else {
      throw FormatException('Unexpected type for color: ${colorJson.runtimeType}');
    }

    return Tier(
      id: json['_id'] as String?,
      name: json['name'] as String,
      color: Color(colorValue),
      items: (json['items'] as List<dynamic>)
          .map((itemJson) => TierItem.fromJson(itemJson as Map<String, dynamic>)).toList()
    );
  }

  @override
  JsonMap toJson() {
    final json = _$TierToJson(this);
    json.remove('id');
    return {...json, 'type': 'tier'};
  }
}
