import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';
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
  final String text;
  final String id;

  const Tag({
    required this.type,
    required this.text,
    required this.id,
  });

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