import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/tier_list_editor/bloc/tier_list_editor_bloc.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart';

class TierListEditorPage extends StatelessWidget {
  final String tierListId;

  const TierListEditorPage(this.tierListId, {super.key});

  static Route<void> route(String tierListId) {
    return MaterialPageRoute(
      builder: (context) => TierListEditorPage(tierListId),
    );
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => TierListEditorBloc(
        tierListsRepository: context.read<TierListsRepository>(),
        tierListId: tierListId,
      )..add(const TierListEditorSubscriptionRequested()),
      child: const TierListEditorView(),
    );
  }
}

class TierListEditorView extends StatelessWidget {
  const TierListEditorView({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<TierListEditorBloc, TierListEditorState>(
      builder: (context, state) {
        if (state.status == TierListEditorStatus.loading) {
          return const Center(child: CupertinoActivityIndicator());
        } else if (state.status != TierListEditorStatus.success) {
          return const Center(child: Text('Error loading tier list'));
        }

        return Scaffold(
          appBar: AppBar(title: Text(state.tierList!.title)),
          body: const Center(child: Text('Your Tierlist')),
        );
      },
    );
  }
}
