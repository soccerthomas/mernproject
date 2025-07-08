part of 'tier_list_editor_bloc.dart';

sealed class TierListEditorEvent extends Equatable {
  const TierListEditorEvent();

  @override
  List<Object?> get props => [];
}

final class TierListEditorSubscriptionRequested extends TierListEditorEvent {
  const TierListEditorSubscriptionRequested();
}

final class TierListEditorTierAdded extends TierListEditorEvent {
  const TierListEditorTierAdded();
}

final class TierListEditorTierDeleted extends TierListEditorEvent {
  final Tier tier;

  const TierListEditorTierDeleted(this.tier);

  @override
  List<Object?> get props => [tier];
}

final class TierListEditorTierRenamed extends TierListEditorEvent {
  final String tierId;
  final String newName;

  const TierListEditorTierRenamed({
    required this.tierId,
    required this.newName,
  });

  @override
  List<Object?> get props => [tierId, newName];
}

final class TierListEditorTierColorChanged extends TierListEditorEvent {
  final String tierId;
  final Color newColor;

  const TierListEditorTierColorChanged({
    required this.tierId,
    required this.newColor,
  });

  @override
  List<Object?> get props => [tierId, newColor];
}

final class TierListEditorUndoTierDeletionRequested
    extends TierListEditorEvent {
  const TierListEditorUndoTierDeletionRequested();
}

final class TierListEditorItemAddedToStaging extends TierListEditorEvent {
  final String title;
  final String? imagePath;
  final String? description;
  final List<Tag>? tags;

  const TierListEditorItemAddedToStaging({
    required this.title,
    this.imagePath,
    this.description,
    this.tags,
  });

  @override
  List<Object?> get props => [title, imagePath, description, tags];
}

final class TierListEditorItemDeleted extends TierListEditorEvent {
  final TierItem item;

  const TierListEditorItemDeleted(this.item);

  @override
  List<Object?> get props => [item];
}

final class TierListEditorItemUpdated extends TierListEditorEvent {
  final TierItem updatedItem;

  const TierListEditorItemUpdated(this.updatedItem);

  @override
  List<Object?> get props => [updatedItem];
}

final class TierListEditorItemMoved extends TierListEditorEvent {
  final String sourceTierId;
  final int oldIndex;
  final String destinationTierId;
  final int newIndex;

  const TierListEditorItemMoved({
    required this.sourceTierId,
    required this.oldIndex,
    required this.destinationTierId,
    required this.newIndex,
  });

  @override
  List<Object?> get props => [
    sourceTierId,
    oldIndex,
    destinationTierId,
    newIndex,
  ];
}
