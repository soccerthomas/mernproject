import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart';

part 'tier_lists_overview_event.dart';
part 'tier_lists_overview_state.dart';

class TierListsOverviewBloc
    extends Bloc<TierListsOverviewEvent, TierListsOverviewState> {
  final TierListsRepository _tierListsRepository;

  TierListsOverviewBloc({required TierListsRepository tierListsRepository})
      : _tierListsRepository = tierListsRepository,
        super(const TierListsOverviewState()) {
    on<TierListsOverviewSubscriptionRequested>(_onSubscriptionRequested);
    on<TierListsOverviewTierListAdded>(_onTierListAdded);
    on<TierListsOverviewTierListDeleted>(_onTierListDeleted);
    on<TierListsOverviewUndoDeletionRequested>(_onUndoDeletionRequested);
    on<TierListsOverviewQueryUpdated>(_onQueryUpdated);
    on<TierListsOverviewTierListPinned>(_onTierListPinned);
  }

  Future<void> _onSubscriptionRequested(
    TierListsOverviewSubscriptionRequested event,
    Emitter<TierListsOverviewState> emit,
  ) async {
    emit(state.copyWith(status: () => TierListsOverviewStatus.loading));

    _tierListsRepository.refreshTierLists();

    await emit.forEach<List<TierList>>(
      _tierListsRepository.getTierLists(),
      onData: (tierLists) {
        final sorted = List<TierList>.from(tierLists)
          ..sort((a, b) {
            if (a.pinned == b.pinned) return 0;
            return a.pinned ? -1 : 1;
          });

        return state.copyWith(
          status: () => TierListsOverviewStatus.success,
          tierLists: () => sorted,
        );
      },
      onError: (_, __) =>
          state.copyWith(status: () => TierListsOverviewStatus.failure),
    );
  }

  void _onTierListAdded(
    TierListsOverviewTierListAdded event,
    Emitter<TierListsOverviewState> emit,
  ) {
    _tierListsRepository.saveTierList(
      TierList(
        title: event.name,
        description: event.description,
        tiers: defaultTiers,
        stagingArea: const StagingArea(items: []),
      ),
    );
  }

  Future<void> _onTierListDeleted(
    TierListsOverviewTierListDeleted event,
    Emitter<TierListsOverviewState> emit,
  ) async {
    emit(state.copyWith(lastDeletedTierList: () => event.tierList));
    await _tierListsRepository.deleteTierList(event.tierList.id);
  }

  Future<void> _onUndoDeletionRequested(
    TierListsOverviewUndoDeletionRequested event,
    Emitter<TierListsOverviewState> emit,
  ) async {
    final tierList = state.lastDeletedTierList!;
    emit(state.copyWith(lastDeletedTierList: () => null));
    await _tierListsRepository.saveTierList(tierList);
  }

  Future<void> _onQueryUpdated(
    TierListsOverviewQueryUpdated event,
    Emitter<TierListsOverviewState> emit,
  ) async {
    emit(state.copyWith(query: () => event.newQuery));

    if (event.newQuery.trim().isEmpty) {
      return emit(state.copyWith(searchResults: () => null));
    }

    emit(state.copyWith(status: () => TierListsOverviewStatus.loading));
    try {
      final searchResults =
          await _tierListsRepository.searchTierLists(event.newQuery);
      emit(state.copyWith(
        searchResults: () => searchResults,
        status: () => TierListsOverviewStatus.success,
      ));
    } catch (_) {
      emit(state.copyWith(status: () => TierListsOverviewStatus.failure));
    }
  }

 Future<void> _onTierListPinned(
  TierListsOverviewTierListPinned event,
  Emitter<TierListsOverviewState> emit,
) async {
  final updated = state.tierLists.map((t) {
    if (t.id == event.tierListId) return t.copyWith(pinned: event.pinned);
    return t;
  }).toList();

  updated.sort((a, b) {
    if (a.pinned == b.pinned) return 0;
    return a.pinned ? -1 : 1;
  });

  emit(state.copyWith(tierLists: () => updated));

  final changedItem = updated.firstWhere((t) => t.id == event.tierListId);
  await _tierListsRepository.updateTierList(changedItem);
}
}
