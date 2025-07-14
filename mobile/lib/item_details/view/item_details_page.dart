import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/item_details/bloc/item_details_bloc.dart';
import 'package:mobile/tier_list_editor/bloc/tier_list_editor_bloc.dart';
import '../widgets/item_details_navigation_button.dart';
import '../widgets/tags_widget.dart';

class ItemDetailsPage extends StatelessWidget {
  final String? _itemId;
  final String _rowId;

  const ItemDetailsPage({
    super.key,
    required String? itemId,
    required String rowId,
  }) : _itemId = itemId,
       _rowId = rowId;

  static Route<void> route({
    required String? itemId,
    required String rowId,
    required TierListEditorBloc editorBloc,
  }) {
    return MaterialPageRoute(
      builder: (context) => BlocProvider.value(
        value: editorBloc,
        child: ItemDetailsPage(itemId: itemId, rowId: rowId),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final editorBloc = context.read<TierListEditorBloc>();
    final tierList = editorBloc.state.tierList!;
    final row = _rowId == 'staging'
        ? tierList.stagingArea
        : tierList.tiers.firstWhere((tier) => tier.id == _rowId);
    final item = _itemId == null
        ? null
        : row.items.firstWhere((item) => item.id == _itemId);

    return BlocProvider(
      create: (context) => ItemDetailsBloc(
        editorBloc: editorBloc,
        initialItem: item,
        tierRowId: _rowId,
      ),
      child: BlocBuilder<ItemDetailsBloc, ItemDetailsState>(
        builder: (context, state) {
          return Scaffold(
            appBar: AppBar(
              title: Text(_rowId == 'staging' ? '' : row.name),
              backgroundColor: row.color,
              actions: [
                ItemDetailsNavigationButton(
                  direction: NavigationDirection.left,
                  rowId: _rowId,
                  itemId: _itemId,
                ),
                ItemDetailsNavigationButton(
                  direction: NavigationDirection.right,
                  rowId: _rowId,
                  itemId: _itemId,
                ),
              ],
            ),
            floatingActionButton: FloatingActionButton(
              onPressed: () {
                if (state.isEditing) {
                  context.read<ItemDetailsBloc>().add(
                    const ItemDetailsSubmitted(),
                  );
                }

                context.read<ItemDetailsBloc>().add(
                  ItemDetailsEditModeToggled(!state.isEditing),
                );
              },
              child: Icon(state.isEditing ? Icons.check : Icons.edit),
            ),
            body: Column(
              children: [
                state.isEditing
                    ? TextFormField(
                        initialValue: state.title,
                        onChanged: (value) {
                          context.read<ItemDetailsBloc>().add(
                            ItemDetailsTitleChanged(value),
                          );
                        },
                      )
                    : Text(state.title),
                const SizedBox(height: 24),
                if (state.imageUrl != null)
                  Column(
                    children: [
                      CachedNetworkImage(imageUrl: state.imageUrl!),
                      SizedBox(height: state.isEditing ? 12 : 24),
                    ],
                  ),
                if (state.isEditing)
                  Column(
                    children: [
                      TextButton(
                        onPressed: () {},
                        child: const Text('Upload Image'),
                      ),
                      const SizedBox(height: 24),
                    ],
                  ),
                const TagsWidget(),
                const SizedBox(height: 24),
                state.isEditing
                    ? TextFormField(
                        initialValue: state.description,
                        onChanged: (value) {
                          context.read<ItemDetailsBloc>().add(
                            ItemDetailsDescriptionChanged(value),
                          );
                        },
                      )
                    : Text(state.description),
              ],
            ),
          );
        },
      ),
    );
  }
}
