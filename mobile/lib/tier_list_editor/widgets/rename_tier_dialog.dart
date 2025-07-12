import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/tier_list_editor/bloc/tier_list_editor_bloc.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart' show Tier;

class RenameTierDialog extends StatefulWidget {
  final Tier tier;

  const RenameTierDialog(this.tier, {super.key});

  @override
  State<RenameTierDialog> createState() => _RenameTierListDialogState();
}

class _RenameTierListDialogState extends State<RenameTierDialog> {
  late final TextEditingController _textController;
  bool _isButtonDisabled = false;

  @override
  void initState() {
    super.initState();

    _textController = TextEditingController(text: widget.tier.name);

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
      title: const Text('Rename Tier'),
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
                    TierListEditorTierRenamed(
                      tierId: widget.tier.id,
                      newName: _textController.text,
                    ),
                  );
                  Navigator.of(context).pop();
                },
          child: const Text('Submit'),
        ),
      ],
    );
  }
}
