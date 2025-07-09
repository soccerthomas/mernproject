import 'package:flutter/material.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart';
import 'package:uuid/uuid.dart';

part 'tier_list_editor_event.dart';
part 'tier_list_editor_state.dart';

class TierListEditorBloc
    extends Bloc<TierListEditorEvent, TierListEditorState> {
  final TierListsRepository _tierListsRepository;
  final String _tierListId;

  TierListEditorBloc({
    required TierListsRepository tierListsRepository,
    required String tierListId,
  }) : _tierListsRepository = tierListsRepository,
       _tierListId = tierListId,
       super(const TierListEditorState()) {
    on<TierListEditorSubscriptionRequested>(_onSubscriptionRequested);
    on<TierListEditorTierListRenamed>(_onTierListRenamed);
    on<TierListEditorTierAdded>(_onTierAdded);
    on<TierListEditorTierDeleted>(_onTierDeleted);
    on<TierListEditorTierRenamed>(_onTierRenamed);
    on<TierListEditorTierColorChanged>(_onTierColorChanged);
    on<TierListEditorUndoTierDeletionRequested>(_undoTierDeletionRequested);
    on<TierListEditorItemAddedToStaging>(_onItemAddedToStaging);
    on<TierListEditorItemDeleted>(_onItemDeleted);
    on<TierListEditorItemUpdated>(_onItemUpdated);
    on<TierListEditorItemMoved>(_onItemMoved);
  }

  Future<void> _onSubscriptionRequested(
    TierListEditorSubscriptionRequested event,
    Emitter<TierListEditorState> emit,
  ) async {
    emit(state.copyWith(status: () => TierListEditorStatus.loading));

    await emit.forEach(
      _tierListsRepository.getTierList(_tierListId),
      onData: (tierList) => state.copyWith(
        status: () => TierListEditorStatus.success,
        tierList: () => tierList,
        originalTitle: () => tierList.title,
      ),
      onError: (_, _) =>
          state.copyWith(status: () => TierListEditorStatus.failure),
    );
  }

  void _onTierListRenamed(
    TierListEditorTierListRenamed event,
    Emitter<TierListEditorState> emit,
  ) {
    emit(state.copyWith(originalTitle: () => event.newTitle));
    final newTierList = state.tierList!.copyWith(title: event.newTitle);
    _tierListsRepository.saveTierList(newTierList);
  }

  void _onTierAdded(
    TierListEditorTierAdded event,
    Emitter<TierListEditorState> emit,
  ) {
    final newTierList = state.tierList!.copyWith(
      tiers: [
        ...state.tierList!.tiers,
        Tier(
          id: const Uuid().v4(),
          name: 'New Tier',
          color: Colors.grey,
          items: [],
        ),
      ],
    );
    _tierListsRepository.saveTierList(newTierList);
  }

  void _onTierDeleted(
    TierListEditorTierDeleted event,
    Emitter<TierListEditorState> emit,
  ) {
    final deletedTierIndex = state.tierList!.tiers.indexWhere(
      (tier) => tier.id == event.tier.id,
    );
    emit(
      state.copyWith(
        lastDeletedTier: () => event.tier.copyWith(items: []),
        lastDeletedTierIndex: () => deletedTierIndex,
      ),
    );

    final newStagingArea = state.tierList!.stagingArea.copyWith(
      items: state.tierList!.stagingArea.items + event.tier.items,
    );

    final newTierList = state.tierList!.copyWith(
      tiers: List<Tier>.from(state.tierList!.tiers)..removeAt(deletedTierIndex),
      stagingArea: newStagingArea
    );
    _tierListsRepository.saveTierList(newTierList);
  }

  void _onTierRenamed(
    TierListEditorTierRenamed event,
    Emitter<TierListEditorState> emit,
  ) {
    final newTiers = state.tierList!.tiers
        .map(
          (tier) => tier.id == event.tierId
              ? tier.copyWith(name: event.newName)
              : tier,
        )
        .toList();
    final newTierList = state.tierList!.copyWith(tiers: newTiers);
    _tierListsRepository.saveTierList(newTierList);
  }

  void _onTierColorChanged(
    TierListEditorTierColorChanged event,
    Emitter<TierListEditorState> emit,
  ) {
    final newTiers = state.tierList!.tiers
        .map(
          (tier) => tier.id == event.tierId
              ? tier.copyWith(color: event.newColor)
              : tier,
        )
        .toList();
    final newTierList = state.tierList!.copyWith(tiers: newTiers);
    _tierListsRepository.saveTierList(newTierList);
  }

  void _undoTierDeletionRequested(
    TierListEditorUndoTierDeletionRequested event,
    Emitter<TierListEditorState> emit,
  ) {
    final newTiers = List<Tier>.from(state.tierList!.tiers);
    newTiers.insert(state.lastDeletedTierIndex!, state.lastDeletedTier!);
    final newTierList = state.tierList!.copyWith(tiers: newTiers);
    _tierListsRepository.saveTierList(newTierList);
  }

  void _onItemAddedToStaging(
    TierListEditorItemAddedToStaging event,
    Emitter<TierListEditorState> emit,
  ) {
    final newStagingItems = List<TierItem>.from(
      state.tierList!.stagingArea.items,
    );
    newStagingItems.add(
      TierItem(
        id: const Uuid().v4(),
        name: event.title,
        imageUrl: event.imagePath,
        tags: event.tags ?? [],
        description: event.description ?? '',
      ),
    );
    final newStagingArea = state.tierList!.stagingArea.copyWith(
      items: newStagingItems,
    );
    final newTierList = state.tierList!.copyWith(stagingArea: newStagingArea);
    _tierListsRepository.saveTierList(newTierList);
  }

  void _onItemDeleted(
    TierListEditorItemDeleted event,
    Emitter<TierListEditorState> emit,
  ) {
    final newTiers = state.tierList!.tiers.map((tier) {
      if (tier.id == event.row.id) {
        final newItems = tier.items
            .where((item) => item.id != event.item.id)
            .toList();
        return tier.copyWith(items: newItems);
      } else {
        return tier;
      }
    }).toList();

    final newStagingArea = event.row.id == 'staging'
        ? state.tierList!.stagingArea.copyWith(
            items: state.tierList!.stagingArea.items
                .where((item) => item.id != event.item.id)
                .toList(),
          )
        : state.tierList!.stagingArea;

    final newTierList = state.tierList!.copyWith(
      tiers: newTiers,
      stagingArea: newStagingArea,
    );

    _tierListsRepository.saveTierList(newTierList);
  }

  void _onItemUpdated(
    TierListEditorItemUpdated event,
    Emitter<TierListEditorState> emit,
  ) {
    final newTiers = state.tierList!.tiers
        .map(
          (tier) => tier.id == event.row.id
              ? tier.copyWith(
                  items: tier.items
                      .map(
                        (item) => item.id == event.updatedItem.id
                            ? event.updatedItem
                            : item,
                      )
                      .toList(),
                )
              : tier,
        )
        .toList();

    final newStagingArea = event.row.id == 'staging'
        ? state.tierList!.stagingArea.copyWith(
            items: state.tierList!.stagingArea.items
                .map(
                  (item) => item.id == event.updatedItem.id
                      ? event.updatedItem
                      : item,
                )
                .toList(),
          )
        : state.tierList!.stagingArea;

    final newTierList = state.tierList!.copyWith(
      tiers: newTiers,
      stagingArea: newStagingArea,
    );

    _tierListsRepository.saveTierList(newTierList);
  }

  void _onItemMoved(
    TierListEditorItemMoved event,
    Emitter<TierListEditorState> emit,
  ) {
    final itemToMove = event.sourceTierId == 'staging'
        ? state.tierList!.stagingArea.items[event.oldIndex]
        : state.tierList!.tiers
              .firstWhere((tier) => tier.id == event.sourceTierId)
              .items[event.oldIndex];

    final newTiers = state.tierList!.tiers.map((tier) {
      if (tier.id == event.sourceTierId) {
        final newItems = List<TierItem>.from(tier.items);
        newItems.removeAt(event.oldIndex);
        tier = tier.copyWith(items: newItems);
      }
      if (tier.id == event.destinationTierId) {
        final newItems = List<TierItem>.from(tier.items);
        newItems.insert(event.newIndex, itemToMove);
        tier = tier.copyWith(items: newItems);
      }
      return tier;
    }).toList();

    final newStagingItems = List<TierItem>.from(
      state.tierList!.stagingArea.items,
    );
    if (event.sourceTierId == 'staging') {
      newStagingItems.removeAt(event.oldIndex);
    }
    if (event.destinationTierId == 'staging') {
      newStagingItems.insert(event.newIndex, itemToMove);
    }

    final newTierList = state.tierList!.copyWith(
      tiers: newTiers,
      stagingArea: state.tierList!.stagingArea.copyWith(items: newStagingItems),
    );

    _tierListsRepository.saveTierList(newTierList);
  }
}
