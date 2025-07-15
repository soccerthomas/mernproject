// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'tag.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Tag _$TagFromJson(Map<String, dynamic> json) => Tag(
  type: $enumDecode(_$TagTypeEnumMap, json['type']),
  text: json['text'] as String,
  id: json['id'] as String,
);

Map<String, dynamic> _$TagToJson(Tag instance) => <String, dynamic>{
  'type': _$TagTypeEnumMap[instance.type]!,
  'text': instance.text,
  'id': instance.id,
};

const _$TagTypeEnumMap = {
  TagType.positive: 'positive',
  TagType.neutral: 'neutral',
  TagType.negative: 'negative',
};
