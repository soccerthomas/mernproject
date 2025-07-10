import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart';
import 'package:uuid/uuid.dart';

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
  }

  Future<void> _onSubscriptionRequested(
    TierListsOverviewSubscriptionRequested event,
    Emitter<TierListsOverviewState> emit,
  ) async {
    emit(state.copyWith(status: () => TierListsOverviewStatus.loading));

    await emit.forEach<List<TierList>>(
      _tierListsRepository.getTierLists(), // subscribe to stream
      onData: (tierLists) => state.copyWith(
        status: () => TierListsOverviewStatus.success,
        tierLists: () => tierLists,
      ),
      onError: (_, _) =>
          state.copyWith(status: () => TierListsOverviewStatus.failure),
    );
  }

  void _onTierListAdded(
    TierListsOverviewTierListAdded event,
    Emitter<TierListsOverviewState> emit
  ) {
    _tierListsRepository.saveTierList(
      TierList(
        id: const Uuid().v4(),
        title: event.name,
        description: event.description,
        tiers: [],
        tags: [],
        stagingArea: const StagingArea(items: [])
      )
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
}
