import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/tier_list_editor/bloc/tier_list_editor_bloc.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart';

part 'item_details_state.dart';
part 'item_details_event.dart';

class ItemDetailsBloc extends Bloc<ItemDetailsEvent, ItemDetailsState> {
  final TierListEditorBloc _editorBloc;
  final String? _tierRowId;

  ItemDetailsBloc({
    required TierListEditorBloc editorBloc,
    TierItem? initialItem,
    String? tierRowId,
  }) : _editorBloc = editorBloc,
       _tierRowId = tierRowId,
       super(
         ItemDetailsState(
           isEditing: initialItem == null,
           initialItem: initialItem,
           title: initialItem?.name ?? '',
           description: initialItem?.description ?? '',
           imageUrl: initialItem?.imageUrl,
           tags: initialItem?.tags ?? []
         ),
       ) {
    on<ItemDetailsTitleChanged>(_onTitleChanged);
    on<ItemDetailsDescriptionChanged>(_onDescriptionChanged);
    on<ItemDetailsImageUrlChanged>(_onImageUrlChanged);
    on<ItemDetailsTagsChanged>(_onTagsChanged);
    on<ItemDetailsEditModeToggled>(_onEditModeToggled);
    on<ItemDetailsSubmitted>(_onSubmitted);
  }

  void _onTitleChanged(
    ItemDetailsTitleChanged event,
    Emitter<ItemDetailsState> emit,
  ) {
    emit(state.copyWith(title: event.newTitle));
  }

  void _onDescriptionChanged(
    ItemDetailsDescriptionChanged event,
    Emitter<ItemDetailsState> emit,
  ) {
    emit(state.copyWith(description: event.newDescription));
  }

  void _onImageUrlChanged(
    ItemDetailsImageUrlChanged event,
    Emitter<ItemDetailsState> emit,
  ) {
    emit(state.copyWith(imageUrl: event.newUrl));
  }

  void _onTagsChanged(
    ItemDetailsTagsChanged event,
    Emitter<ItemDetailsState> emit,
  ) {
    emit(state.copyWith(tags: event.newTags));
  }

  void _onEditModeToggled(
    ItemDetailsEditModeToggled event,
    Emitter<ItemDetailsState> emit,
  ) {
    emit(state.copyWith(isEditing: event.isEditing));
  }

  void _onSubmitted(
    ItemDetailsSubmitted event,
    Emitter<ItemDetailsState> emit,
  ) {
    if (!state.isValid) return;

    final newItem = TierItem(
      id: state.initialItem?.id,
      name: state.title,
      description: state.description,
      imageUrl: state.imageUrl,
      tags: state.tags!,
    );

    if (state.isNew) {
      _editorBloc.add(TierListEditorItemAddedToStaging(newItem));
    } else {
      _editorBloc.add(
        TierListEditorItemUpdated(updatedItem: newItem, rowId: _tierRowId!),
      );
    }

    emit(state.copyWith(initialItem: newItem, status: ItemDetailsStatus.success));
  }
}