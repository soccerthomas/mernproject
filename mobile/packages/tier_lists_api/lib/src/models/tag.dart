import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:uuid/uuid.dart';
import 'json_map.dart';
import 'package:flutter/material.dart';

part 'tag.g.dart';

enum TagType { positive, neutral, negative }

const Map<TagType, Color> kColorMap = {
    TagType.positive: Colors.green,
    TagType.neutral: Colors.grey,
    TagType.negative: Colors.red,
  };

@immutable
@JsonSerializable()
class Tag extends Equatable {
  final TagType type;

  @JsonKey(name: 'name')
  final String text;

  @JsonKey(includeToJson: false)
  final String id;

  Tag({
    required this.type,
    required this.text,
    String? id,
  }) : id = id ?? const Uuid().v4();

  Tag copyWith({
    TagType? type,
    String? text
  }) {
    return Tag(
      id: id,
      type: type ?? this.type,
      text: text ?? this.text,
    );
  }

  static Tag fromJson(JsonMap json) => _$TagFromJson(json);

  JsonMap toJson() => _$TagToJson(this);

  @override
  List<Object> get props => [type, text, id];
}