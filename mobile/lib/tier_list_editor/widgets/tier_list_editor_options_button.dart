import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/tier_list_editor/bloc/tier_list_editor_bloc.dart';

import 'rename_tier_list_dialog.dart';

enum TierListEditorOption { renameTierlist, addTier }

class TierListEditorOptionsButton extends StatelessWidget {
  const TierListEditorOptionsButton({super.key});

  @override
  Widget build(BuildContext context) {
    return PopupMenuButton<TierListEditorOption>(
      icon: const Icon(Icons.more_horiz),
      onSelected: (options) {
        switch (options) {
          case TierListEditorOption.renameTierlist:
            showDialog(
              context: context, 
              builder: (_) => BlocProvider.value(
                value: context.read<TierListEditorBloc>(),
                child: const RenameTierListDialog()
              )
            );
            break;
          case TierListEditorOption.addTier:
            context.read<TierListEditorBloc>().add(
              const TierListEditorTierAdded(),
            );
            break;
        }
      },
      itemBuilder: (context) => [
        const PopupMenuItem(
          value: TierListEditorOption.renameTierlist,
          child: Text('Rename Tier List'),
        ),
        const PopupMenuItem(
          value: TierListEditorOption.addTier,
          child: Text('Add Tier'),
        ),
      ],
    );
  }
}