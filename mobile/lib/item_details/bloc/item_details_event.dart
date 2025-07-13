part of 'item_details_bloc.dart';

sealed class ItemDetailsEvent extends Equatable {
  const ItemDetailsEvent();

  @override
  List<Object?> get props => [];
}

final class ItemDetailsTitleChanged extends ItemDetailsEvent {
  final String newTitle;
  
  const ItemDetailsTitleChanged(this.newTitle);

  @override
  List<Object?> get props => [newTitle];
}

final class ItemDetailsDescriptionChanged extends ItemDetailsEvent {
  final String newDescription;

  const ItemDetailsDescriptionChanged(this.newDescription);

  @override
  List<Object?> get props => [newDescription];
}

final class ItemDetailsImageUrlChanged extends ItemDetailsEvent {
  final String newUrl;

  const ItemDetailsImageUrlChanged(this.newUrl);

  @override
  List<Object?> get props => [newUrl];
}

final class ItemDetailsTagsChanged extends ItemDetailsEvent {
  final List<Tag> newTags;

  const ItemDetailsTagsChanged(this.newTags);

  @override
  List<Object?> get props => [newTags];
}

final class ItemDetailsEditModeToggled extends ItemDetailsEvent {
  final bool isEditing;

  const ItemDetailsEditModeToggled(this.isEditing);

  @override
  List<Object?> get props => [isEditing];
}

final class ItemDetailsSubmitted extends ItemDetailsEvent {
  const ItemDetailsSubmitted();
}