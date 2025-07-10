import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/tier_lists_overview/bloc/tier_lists_overview_bloc.dart';
import 'package:mobile/tier_lists_overview/widgets/add_tier_list_dialog.dart';

class AddTierListButton extends StatelessWidget {
  const AddTierListButton({super.key});

  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: const Icon(Icons.add),
      onPressed: () {
        showDialog(
          context: context,
          builder: (dialogContext) => BlocProvider.value(
            value: context.read<TierListsOverviewBloc>(),
            child: const AddTierListDialog(),
          )
        );
      },
    );
  }
}