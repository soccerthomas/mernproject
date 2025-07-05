import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:meta/meta.dart';
import 'json_map.dart';

part 'tag.g.dart';

enum TagType { positive, neutral, negative }

@immutable
@JsonSerializable()
class Tag extends Equatable {
  final TagType type;
  final String text;

  const Tag({
    required this.type,
    required this.text
  });

  Tag copyWith({
    TagType? type,
    String? text
  }) {
    return Tag(
      type: type ?? this.type,
      text: text ?? this.text,
    );
  }

  static Tag fromJson(JsonMap json) => _$TagFromJson(json);

  JsonMap toJson() => _$TagToJson(this);

  @override
  List<Object> get props => [type, text];
}