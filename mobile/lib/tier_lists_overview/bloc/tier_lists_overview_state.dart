part of 'tier_lists_overview_bloc.dart';

enum TierListsOverviewStatus { initial, loading, success, failure }

final class TierListsOverviewState extends Equatable {
  final TierListsOverviewStatus status;
  final List<TierList> tierLists;
  final TierList? lastDeletedTierList;

  const TierListsOverviewState({
    this.status = TierListsOverviewStatus.initial,
    this.tierLists = const [],
    this.lastDeletedTierList,
  });

  // copyWith uses functions as parameters so that state members can be set as null
  TierListsOverviewState copyWith({
    TierListsOverviewStatus Function()? status,
    List<TierList> Function()? tierLists,
    TierList? Function()? lastDeletedTierList,
  }) {
    return TierListsOverviewState(
      status: status == null ? this.status : status(),
      tierLists: tierLists == null ? this.tierLists : tierLists(),
      lastDeletedTierList: lastDeletedTierList == null
          ? this.lastDeletedTierList
          : lastDeletedTierList(),
    );
  }

  @override
  List<Object?> get props => [status, tierLists, lastDeletedTierList];
}
