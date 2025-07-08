part of 'tier_list_editor_bloc.dart';

enum TierListEditorStatus { initial, loading, success, failure }

final class TierListEditorState extends Equatable {
  final TierListEditorStatus status;
  final TierList? tierList;
  final String? originalTitle;
  final Tier? lastDeletedTier;
  final TierItem? lastMovedItem;
  final String? moveMessage;

  const TierListEditorState({
    this.status = TierListEditorStatus.initial,
    this.tierList,
    this.originalTitle,
    this.lastDeletedTier,
    this.lastMovedItem,
    this.moveMessage,
  });

  TierListEditorState copyWith({
    TierListEditorStatus Function()? status,
    TierList? Function()? tierList,
    String? Function()? originalTitle,
    Tier? Function()? lastDeletedTier,
    TierItem? Function()? lastMovedItem,
    String? Function()? moveMessage,
  }) {
    return TierListEditorState(
      status: status == null ? this.status : status(),
      tierList: tierList == null ? this.tierList : tierList(),
      originalTitle: originalTitle == null
          ? this.originalTitle
          : originalTitle(),
      lastDeletedTier: lastDeletedTier == null
          ? this.lastDeletedTier
          : lastDeletedTier(),
      lastMovedItem: lastMovedItem == null
          ? this.lastMovedItem
          : lastMovedItem(),
      moveMessage: moveMessage == null ? this.moveMessage : moveMessage(),
    );
  }

  @override
  List<Object?> get props => [
    status,
    tierList,
    originalTitle,
    lastDeletedTier,
    lastMovedItem,
    moveMessage,
  ];
}
