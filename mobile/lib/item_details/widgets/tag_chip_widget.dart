import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/item_details/bloc/item_details_bloc.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart';

import 'edit_tag_dialog.dart';

class TagChipWidget extends StatelessWidget {
  final Tag _tag;
  final List<Tag> _tags;
  final bool _isEditing;

  const TagChipWidget({
    super.key,
    required Tag tag,
    required List<Tag> tags,
    required bool isEditing,
  }) : _tag = tag,
       _tags = tags,
       _isEditing = isEditing;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _isEditing
          ? () {
              showDialog(
                context: context,
                builder: (_) => BlocProvider.value(
                  value: context.read<ItemDetailsBloc>(),
                  child: EditTagDialog(tag: _tag, tags: _tags),
                ),
              );
            }
          : null,
      child: Chip(
        label: Text(_tag.text),
        side: BorderSide(color: kColorMap[_tag.type]!),
        onDeleted: _isEditing
            ? () {
                context.read<ItemDetailsBloc>().add(
                  ItemDetailsTagsChanged(
                    _tags.where((tag) => tag.id != _tag.id).toList(),
                  ),
                );
              }
            : null,
      ),
    );
  }
}
