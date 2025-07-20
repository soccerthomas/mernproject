import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/tier_lists_overview/add_tier_list/cubit/add_tier_list_cubit.dart';
import 'package:mobile/tier_lists_overview/bloc/tier_lists_overview_bloc.dart';

class AddTierListDialog extends StatelessWidget {
  const AddTierListDialog({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocListener<AddTierListCubit, AddTierListState>(
      listenWhen: (prev, curr) =>
          prev.status != curr.status && curr.status == AddTierListStatus.success,
      listener: (context, state) {
        context.read<TierListsOverviewBloc>().add(
              TierListsOverviewTierListAdded(
                name: state.name,
                description: state.description,
              ),
            );
        Navigator.of(context).pop();
      },
      child: AlertDialog(
        title: const Center(
          child: Text(
            'Add New Tier List',
            textAlign: TextAlign.center,
          ),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text('Title'),
            TextFormField(
              onChanged: (v) =>
                  context.read<AddTierListCubit>().onNameChanged(v),
            ),
            const SizedBox(height: 12),
            const Text('Description'),
            TextFormField(
              onChanged: (v) =>
                  context.read<AddTierListCubit>().onDescriptionChanged(v),
            ),
          ],
        ),
        actionsAlignment: MainAxisAlignment.center,
        actions: [
          BlocBuilder<AddTierListCubit, AddTierListState>(
            builder: (context, state) => ElevatedButton(
              onPressed: state.isValid
                  ? () => context.read<AddTierListCubit>().submit()
                  : null,
              child: const Text('Add'),
            ),
          ),
        ],
      ),
    );
  }
}
