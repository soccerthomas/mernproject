// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'tag.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Tag _$TagFromJson(Map<String, dynamic> json) => Tag(
  type: $enumDecode(_$TagTypeEnumMap, json['color']),
  text: json['name'] as String,
  id: json['id'] as String?,
);

Map<String, dynamic> _$TagToJson(Tag instance) => <String, dynamic>{
  'color': _$TagTypeEnumMap[instance.type]!,
  'name': instance.text,
};

const _$TagTypeEnumMap = {
  TagType.positive: 'border-green-500 text-lg',
  TagType.neutral: 'border-gray-500',
  TagType.negative: 'border-red-500 text-lg',
};
