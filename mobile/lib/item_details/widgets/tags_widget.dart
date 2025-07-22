import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/item_details/bloc/item_details_bloc.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart'
    show Tag, TagType;
import 'edit_tag_dialog.dart';
import 'tag_chip_widget.dart';

class TagsWidget extends StatelessWidget {
  final List<Tag> _tags;
  final bool _isEditing;

  const TagsWidget({
    super.key,
    required List<Tag> tags,
    required bool isEditing,
  }) : _tags = tags,
       _isEditing = isEditing;

  @override
  Widget build(BuildContext context) {
    const spacing = 8.0;
    const runSpacing = 4.0;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Wrap(
          spacing: spacing,
          runSpacing: runSpacing,
          children: _tags
              .where((tag) => tag.type == TagType.positive)
              .map(
                (tag) => TagChipWidget(
                  tag: tag,
                  tags: _tags,
                  isEditing: _isEditing,
                ),
              )
              .toList(),
        ),
        const SizedBox(height: spacing),
        Wrap(
          spacing: spacing,
          runSpacing: runSpacing,
          children: _tags
              .where((tag) => tag.type == TagType.neutral)
              .map(
                (tag) =>
                    TagChipWidget(tag: tag, tags: _tags, isEditing: _isEditing),
              )
              .toList(),
        ),
        const SizedBox(height: spacing),
        Wrap(
          spacing: spacing,
          runSpacing: runSpacing,
          children: _tags
              .where((tag) => tag.type == TagType.negative)
              .map(
                (tag) =>
                    TagChipWidget(tag: tag, tags: _tags, isEditing: _isEditing),
              )
              .toList(),
        ),
        const SizedBox(height: spacing),
        if (_isEditing)
          TextButton(
            onPressed: () {
              showDialog(
                context: context,
                builder: (_) => BlocProvider.value(
                  value: context.read<ItemDetailsBloc>(),
                  child: EditTagDialog(tag: null, tags: _tags),
                ),
              );
            },
            child: const Center(child: Text('Add Tag')),
          ),
      ],
    );
  }
}
