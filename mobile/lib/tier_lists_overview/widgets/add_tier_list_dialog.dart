import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/tier_lists_overview/add_tier_list/cubit/add_tier_list_cubit.dart';
import 'package:mobile/tier_lists_overview/bloc/tier_lists_overview_bloc.dart';

class AddTierListDialog extends StatelessWidget {
  const AddTierListDialog({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => AddTierListCubit(),
      child: Builder(
        builder: (context) {
          return BlocListener<AddTierListCubit, AddTierListState>(
            listener: (context, state) {
              if (state.status == AddTierListStatus.success) {
                context.read<TierListsOverviewBloc>().add(
                  TierListsOverviewTierListAdded(
                    name: state.name,
                    description: state.description,
                  ),
                );
                Navigator.of(context).pop();
              }
            },
            child: AlertDialog(
              title: const Text('Add New Tier List'),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Text('Title'),
                  TextFormField(
                    onChanged: (title) {
                      context.read<AddTierListCubit>().onNameChanged(title);
                    },
                  ),
                  const SizedBox(height: 12),
                  const Text('Description'),
                  TextFormField(
                    onChanged: (description) {
                      context.read<AddTierListCubit>().onDescriptionChanged(
                        description,
                      );
                    },
                  ),
                ],
              ),
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
      ),
    );
  }
}
