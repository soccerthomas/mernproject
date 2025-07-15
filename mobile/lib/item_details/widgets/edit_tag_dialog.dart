import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/item_details/bloc/item_details_bloc.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart';

class EditTagDialog extends StatefulWidget {
  final Tag? _tag;
  final List<Tag> _tags;

  const EditTagDialog({super.key, required Tag? tag, required List<Tag> tags})
    : _tag = tag,
      _tags = tags;

  @override
  State<EditTagDialog> createState() => _EditTagDialogState();
}

class _EditTagDialogState extends State<EditTagDialog> {
  late final TextEditingController _textController;
  late bool _isButtonDisabled;
  late TagType _selectedType;

  @override
  void initState() {
    super.initState();

    _selectedType = widget._tag == null ? TagType.neutral : widget._tag!.type;
    _textController = TextEditingController(text: widget._tag?.text ?? '');
    _isButtonDisabled = _textController.text.isEmpty;

    _textController.addListener(() {
      setState(() {
        _isButtonDisabled = _textController.text.isEmpty;
      });
    });
  }

  @override
  void dispose() {
    _textController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(widget._tag == null ? 'Create Tag' : 'Edit Tag'),
      content: Padding(
        padding: const EdgeInsets.all(8),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _createChoiceChip(TagType.positive),
                _createChoiceChip(TagType.neutral),
                _createChoiceChip(TagType.negative),
              ],
            ),
            const SizedBox(height: 16),
            TextFormField(controller: _textController),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Cancel'),
        ),
        TextButton(
          onPressed: _isButtonDisabled
              ? null
              : () {
                  final newTag = Tag(
                    id: widget._tag?.id,
                    text: _textController.text,
                    type: _selectedType,
                  );

                  final newTags = widget._tag == null
                      ? (widget._tags.toList()..add(newTag))
                      : widget._tags
                            .toList()
                            .map(
                              (tag) => tag.id == widget._tag!.id ? newTag : tag,
                            )
                            .toList();

                  context.read<ItemDetailsBloc>().add(
                    ItemDetailsTagsChanged(newTags),
                  );

                  Navigator.of(context).pop();
                },
          child: const Text('Submit'),
        ),
      ],
    );
  }

  Widget _createChoiceChip(TagType type) {
    late final String label;
    if (type == TagType.positive) {
      label = '+';
    } else if (type == TagType.negative) {
      label = '-';
    } else {
      label = 'o';
    }

    return ChoiceChip(
      padding: const EdgeInsets.all(8),
      label: Text(label),
      selected: type == _selectedType,
      selectedColor: kColorMap[type],
      onSelected: (_) {
        setState(() {
          _selectedType = type;
        });
      },
    );
  }
}
