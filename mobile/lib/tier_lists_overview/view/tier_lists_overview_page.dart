import 'dart:async';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/tier_list_editor/view/tier_list_editor_page.dart';
import 'package:mobile/tier_lists_overview/add_tier_list/cubit/add_tier_list_cubit.dart';
import 'package:mobile/tier_lists_overview/bloc/tier_lists_overview_bloc.dart';
import 'package:mobile/tier_lists_overview/widgets/add_tier_list_dialog.dart';
import 'package:mobile/tier_lists_overview/widgets/tier_list_list_tile.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart';

class TierListsOverviewPage extends StatelessWidget {
  const TierListsOverviewPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => TierListsOverviewBloc(
        tierListsRepository: context.read<TierListsRepository>(),
      )..add(const TierListsOverviewSubscriptionRequested()),
      child: const TierListsOverviewView(),
    );
  }
}

class TierListsOverviewView extends StatefulWidget {
  const TierListsOverviewView({super.key});

  @override
  State<TierListsOverviewView> createState() => _TierListsOverviewViewState();
}

class _TierListsOverviewViewState extends State<TierListsOverviewView> {
  Timer? _debounce;

  @override
  void dispose() {
    _debounce?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: TextFormField(
          onChanged: (query) {
            _debounce?.cancel();
            _debounce = Timer(const Duration(milliseconds: 500), () {
              context.read<TierListsOverviewBloc>().add(
                    TierListsOverviewQueryUpdated(query),
                  );
            });
          },
          decoration: const InputDecoration(
            hintText: 'Search Tier Lists...',
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () {
              showDialog(
                context: context,
                builder: (_) => MultiBlocProvider(
                  providers: [
                    BlocProvider.value(
                      value: context.read<TierListsOverviewBloc>(),
                    ),
                    BlocProvider(create: (_) => AddTierListCubit()),
                  ],
                  child: const AddTierListDialog(),
                ),
              );
            },
          ),
        ],
      ),
      body: MultiBlocListener(
        listeners: [
          BlocListener<TierListsOverviewBloc, TierListsOverviewState>(
            listenWhen: (p, c) => p.status != c.status,
            listener: (context, state) {
              if (state.status == TierListsOverviewStatus.failure) {
                ScaffoldMessenger.of(context)
                  ..hideCurrentSnackBar()
                  ..showSnackBar(
                    const SnackBar(content: Text('Error Loading Tier Lists')),
                  );
              }
            },
          ),
          BlocListener<TierListsOverviewBloc, TierListsOverviewState>(
            listenWhen: (p, c) =>
                p.lastDeletedTierList != c.lastDeletedTierList &&
                c.lastDeletedTierList != null,
            listener: (context, state) {
              final deleted = state.lastDeletedTierList!;
              final messenger = ScaffoldMessenger.of(context);
              messenger
                ..hideCurrentSnackBar()
                ..showSnackBar(
                  SnackBar(
                    content: Text('Deleted Tier List: ${deleted.title}'),
                    action: SnackBarAction(
                      label: 'Undo',
                      onPressed: () {
                        messenger.hideCurrentSnackBar();
                        context
                            .read<TierListsOverviewBloc>()
                            .add(const TierListsOverviewUndoDeletionRequested());
                      },
                    ),
                  ),
                );
            },
          ),
        ],
        child: BlocBuilder<TierListsOverviewBloc, TierListsOverviewState>(
          builder: (context, state) {
            final searching = state.query.trim().isNotEmpty;
            final lists = searching ? (state.searchResults ?? []) : state.tierLists;

            if (lists.isEmpty) {
              if (state.status == TierListsOverviewStatus.loading) {
                return const Center(child: CupertinoActivityIndicator());
              }
              if (state.status != TierListsOverviewStatus.success) {
                return const SizedBox();
              }
              return Center(
                child: Text(
                  searching ? 'No results found' : 'Create your first tier list',
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              );
            }

            return CupertinoScrollbar(
              child: ListView.builder(
                itemCount: lists.length,
                itemBuilder: (_, i) {
                  final t = lists[i];
                  return TierListListTile(
                    tierList: t,
                    onDelete: () => context
                        .read<TierListsOverviewBloc>()
                        .add(TierListsOverviewTierListDeleted(t)),
                    onTap: () => Navigator.of(context)
                        .push(TierListEditorPage.route(t.id)),
                  );
                },
              ),
            );
          },
        ),
      ),
    );
  }
}
