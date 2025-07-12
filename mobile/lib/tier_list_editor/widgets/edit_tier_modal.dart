import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/tier_list_editor/bloc/tier_list_editor_bloc.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart' show Tier;
import 'rename_tier_dialog.dart';

class EditTierModal extends StatelessWidget {
  final Tier tier;

  const EditTierModal(this.tier, {super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 250,
      color: tier.color,
      child: Column(
        children: [
          Text(tier.name),
          ListTile(
            leading: const Icon(Icons.edit), 
            title: const Text('Rename Tier'),
            onTap: () {
              Navigator.of(context).pop();
              showDialog(
                context: context,
                builder: (_) => BlocProvider.value(
                  value: context.read<TierListEditorBloc>(),
                  child: RenameTierDialog(tier),
                )
              );
            },
          ),
          const ListTile(
            leading: Icon(Icons.palette),
            title: Text('Change Tier Color'),
          ),
          ListTile(
            leading: const Icon(Icons.delete), 
            title: const Text('Delete Tier'),
            onTap: () {
              Navigator.of(context).pop();
              showDialog(
                context: context,
                builder: (_) => BlocProvider.value(
                  value: context.read<TierListEditorBloc>(),
                  child: DeleteTierDialog(tier)
                )
              );
            },
          ),
        ],
      ),
    );
  }
}

class DeleteTierDialog extends StatelessWidget {
  final Tier tier;

  const DeleteTierDialog(this.tier, {super.key});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text('Are you sure you want to delete ${tier.name}?'),
      content: const Text('All tier items will be moved to staging.'),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Cancel'),
        ),
        TextButton(
          onPressed: () {
            context.read<TierListEditorBloc>().add(
              TierListEditorTierDeleted(tier)
            );
            Navigator.pop(context);
          }, 
          child: const Text('Delete')
        )
      ],
    );
  }
} 
