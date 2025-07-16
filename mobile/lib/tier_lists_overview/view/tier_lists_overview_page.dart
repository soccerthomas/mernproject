import 'dart:async';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/tier_list_editor/view/tier_list_editor_page.dart';
import 'package:mobile/tier_lists_overview/bloc/tier_lists_overview_bloc.dart';
import 'package:mobile/tier_lists_overview/widgets/tier_list_list_tile.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart';
import '../widgets/add_tier_list_button.dart';

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
            if (_debounce?.isActive ?? false) _debounce!.cancel();
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
        actions: [const AddTierListButton()],
      ),
      body: MultiBlocListener(
        listeners: [
          BlocListener<TierListsOverviewBloc, TierListsOverviewState>(
            listenWhen: (previous, current) =>
                previous.status != current.status,
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
            listenWhen: (previous, current) =>
                previous.lastDeletedTierList != current.lastDeletedTierList &&
                current.lastDeletedTierList != null,
            listener: (context, state) {
              final deletedTierList = state.lastDeletedTierList!;
              final messenger = ScaffoldMessenger.of(context);
              messenger
                ..hideCurrentSnackBar()
                ..showSnackBar(
                  SnackBar(
                    content: Text(
                      'Deleted Tier List: ${deletedTierList.title}',
                    ),
                    action: SnackBarAction(
                      label: 'Undo',
                      onPressed: () {
                        messenger.hideCurrentSnackBar();
                        context.read<TierListsOverviewBloc>().add(
                          const TierListsOverviewUndoDeletionRequested(),
                        );
                      },
                    ),
                  ),
                );
            },
          ),
        ],
        child: BlocBuilder<TierListsOverviewBloc, TierListsOverviewState>(
          builder: (context, state) {
            final bool isSearching = state.query.trim().isNotEmpty;
            final List<TierList> activeList = isSearching
                ? state.searchResults ?? []
                : state.tierLists;

            if (activeList.isEmpty) {
              if (state.status == TierListsOverviewStatus.loading) {
                return const Center(child: CupertinoActivityIndicator());
              } else if (state.status != TierListsOverviewStatus.success) {
                return const SizedBox();
              } else {
                return Center(
                  child: Text(
                    isSearching
                        ? 'No results found'
                        : 'Create your first tier list',
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                );
              }
            }

            return CupertinoScrollbar(
              child: ListView.builder(
                itemCount: activeList.length,
                itemBuilder: (_, index) {
                  final tierList = activeList.elementAt(index);
                  return TierListListTile(
                    tierList: tierList,
                    onDismissed: (_) {
                      context.read<TierListsOverviewBloc>().add(
                        TierListsOverviewTierListDeleted(tierList),
                      );
                    },
                    onTap: () {
                      Navigator.of(
                        context,
                      ).push(TierListEditorPage.route(tierList.id));
                    },
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
