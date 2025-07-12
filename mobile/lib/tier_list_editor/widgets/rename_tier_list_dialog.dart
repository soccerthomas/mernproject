import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/tier_list_editor/bloc/tier_list_editor_bloc.dart';

class RenameTierListDialog extends StatefulWidget {
  const RenameTierListDialog({super.key});

  @override
  State<RenameTierListDialog> createState() => _RenameTierListDialogState();
}

class _RenameTierListDialogState extends State<RenameTierListDialog> {
  late final TextEditingController _textController;
  bool _isButtonDisabled = false;

  @override
  void initState() {
    super.initState();

    final initialText = context
        .read<TierListEditorBloc>()
        .state
        .tierList!
        .title;
    _textController = TextEditingController(text: initialText);

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
      title: const Text('Rename Tier List'),
      content: TextFormField(controller: _textController),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Cancel'),
        ),
        TextButton(
          onPressed: _isButtonDisabled
              ? null
              : () {
                  context.read<TierListEditorBloc>().add(
                    TierListEditorTierListRenamed(_textController.text),
                  );
                  Navigator.of(context).pop();
                },
          child: const Text('Submit'),
        ),
      ],
    );
  }
}
