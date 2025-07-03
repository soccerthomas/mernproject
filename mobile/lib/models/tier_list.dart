import 'package:flutter/material.dart';

enum TagType { positive, neutral, negative }

class TierList {
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
}

abstract class ListRow {
  final String id;
  final String name;
  final Color color;
  final List<TierItem> items;

  const ListRow({
    required this.id,
    required this.name,
    required this.color,
    required this.items
  });
}

class Tier extends ListRow {
  Tier({
    required super.id,
    required super.name,
    required super.color,
    required super.items,
  });
}

class StagingArea extends ListRow {
  StagingArea({
    required super.items
  }) : super(
    id: 'staging', 
    name: 'Staging Area', 
    color: Colors.grey
  );
}

class Tag {
  final TagType type;
  final String text;

  const Tag({
    required this.type,
    required this.text
  });
}

class TierItem {
  final String? thumbnailUrl;
  final String? imageUrl;
  final String name;
  final String description;
  final List<Tag> tags;

  const TierItem({
    required this.name,
    this.description = '',
    this.thumbnailUrl,
    this.imageUrl,
    required this.tags
  });
}