import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/tier_lists_overview/bloc/tier_lists_overview_bloc.dart';
import 'package:mobile/tier_lists_overview/widgets/add_tier_list_dialog.dart';
import 'package:mobile/tier_lists_overview/add_tier_list/cubit/add_tier_list_cubit.dart';

class AddTierListButton extends StatelessWidget {
  const AddTierListButton({super.key});

  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: const Icon(Icons.add),
      onPressed: () {
        final overviewBloc = context.read<TierListsOverviewBloc>();

        showDialog(
          context: context,
          builder: (dialogContext) => MultiBlocProvider(
            providers: [
              BlocProvider.value(value: overviewBloc),
              BlocProvider(create: (_) => AddTierListCubit()),
            ],
            child: const AddTierListDialog(),
          ),
        );
      },
    );
  }
}
