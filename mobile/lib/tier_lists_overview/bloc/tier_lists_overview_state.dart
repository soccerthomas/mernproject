part of 'tier_lists_overview_bloc.dart';

enum TierListsOverviewStatus { initial, loading, success, failure }

final class TierListsOverviewState extends Equatable {
  final TierListsOverviewStatus status;
  final List<TierList> tierLists;
  final TierList? lastDeletedTierList;
  final String query;
  final List<TierList>? searchResults;
  final String? errorMessage;

  const TierListsOverviewState({
    this.status = TierListsOverviewStatus.initial,
    this.tierLists = const [],
    this.lastDeletedTierList,
    this.query = '',
    this.searchResults,
    this.errorMessage
  });

  // copyWith uses functions as parameters so that state members can be set as null
  TierListsOverviewState copyWith({
    TierListsOverviewStatus Function()? status,
    List<TierList> Function()? tierLists,
    TierList? Function()? lastDeletedTierList,
    String Function()? query,
    List<TierList>? Function()? searchResults,
    String Function()? errorMessage,
  }) {
    return TierListsOverviewState(
      status: status == null ? this.status : status(),
      tierLists: tierLists == null ? this.tierLists : tierLists(),
      lastDeletedTierList: lastDeletedTierList == null
          ? this.lastDeletedTierList
          : lastDeletedTierList(),
      query: query == null ? this.query : query(),
      searchResults: searchResults == null ? this.searchResults : searchResults(),
      errorMessage: errorMessage == null ? this.errorMessage : errorMessage()
    );
  }

  @override
  List<Object?> get props => [status, tierLists, lastDeletedTierList, query, searchResults, errorMessage];
}
