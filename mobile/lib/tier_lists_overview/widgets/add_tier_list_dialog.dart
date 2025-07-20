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
            const Align(
              alignment: Alignment.centerLeft,
              child: Text('Title'),
            ),
            TextFormField(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
              ),
              onChanged: (v) => context.read<AddTierListCubit>().onNameChanged(v),
            ),
            const SizedBox(height: 16),
            const Align(
              alignment: Alignment.centerLeft,
              child: Text('Description'),
            ),
            TextFormField(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
              ),
              minLines: 3,
              maxLines: 5,
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
