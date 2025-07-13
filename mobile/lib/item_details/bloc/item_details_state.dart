part of 'item_details_bloc.dart';

enum ItemDetailsStatus { initial, loading, success, failure }

final class ItemDetailsState extends Equatable {
  final ItemDetailsStatus status;
  final TierItem? initialItem;
  final bool isEditing;
  final String title;
  final String description;
  final String? imageUrl;
  final List<Tag>? tags;

  const ItemDetailsState({
    this.status = ItemDetailsStatus.initial,
    this.initialItem,
    required this.isEditing,
    required this.title,
    this.description = '',
    this.imageUrl,
    this.tags = const []
  });

  bool get isValid => title.trim().isNotEmpty;
  bool get isNew => initialItem == null;

  ItemDetailsState copyWith({
    ItemDetailsStatus? status,
    TierItem? initialItem,
    bool? isEditing,
    String? title,
    String? description,
    String? imageUrl,
    List<Tag>? tags,
  }) {
    return ItemDetailsState(
      status: status ?? this.status,
      initialItem: initialItem ?? this.initialItem,
      isEditing: isEditing ?? this.isEditing,
      title: title ?? this.title,
      description: description ?? this.description,
      imageUrl: imageUrl ?? this.imageUrl,
      tags: tags ?? this.tags
    );
  }

  @override
  List<Object?> get props => [
    status,
    initialItem,
    isEditing,
    title,
    description,
    imageUrl,
    tags
  ];
}