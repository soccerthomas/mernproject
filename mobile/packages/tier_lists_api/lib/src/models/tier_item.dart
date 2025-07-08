import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:meta/meta.dart';
import 'json_map.dart';
import 'tag.dart';

part 'tier_item.g.dart';

@immutable
@JsonSerializable()
class TierItem extends Equatable {
  final String? imageUrl;
  final String name;
  final String description;
  final List<Tag> tags;

  const TierItem({
    required this.name,
    this.description = '',
    this.imageUrl,
    required this.tags
  });

  TierItem copyWith({
    String? thumbnailUrl,
    String? imageUrl,
    String? name,
    String? description,
    List<Tag>? tags,
  }) {
    return TierItem(
      imageUrl: imageUrl ?? this.imageUrl,
      name: name ?? this.name,
      description: description ?? this.description,
      tags: tags ?? List.from(this.tags)
    );
  }

  static TierItem fromJson(JsonMap json) => _$TierItemFromJson(json);

  JsonMap toJson() => _$TierItemToJson(this);

  @override
  List<Object?> get props => [imageUrl, name, description, tags];
} 