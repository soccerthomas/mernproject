part of 'tier_lists_overview_bloc.dart';

sealed class TierListsOverviewEvent extends Equatable {
  const TierListsOverviewEvent();

  @override
  List<Object> get props => [];
}

final class TierListsOverviewSubscriptionRequested extends TierListsOverviewEvent {
  const TierListsOverviewSubscriptionRequested();
}

final class TierListsOverviewTierListAdded extends TierListsOverviewEvent {
  final String name;
  final String description;

  const TierListsOverviewTierListAdded({
    required this.name,
    required this.description
  });
}

final class TierListsOverviewTierListDeleted extends TierListsOverviewEvent {
  final TierList tierList;

  const TierListsOverviewTierListDeleted(this.tierList);

  @override
  List<Object> get props => [tierList];
}

final class TierListsOverviewUndoDeletionRequested extends TierListsOverviewEvent {
  const TierListsOverviewUndoDeletionRequested();
}