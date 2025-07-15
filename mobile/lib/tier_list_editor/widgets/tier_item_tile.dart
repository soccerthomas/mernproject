import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/item_details/view/item_details_page.dart';
import 'package:mobile/tier_list_editor/bloc/tier_list_editor_bloc.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart' show TierItem;

import 'move_item_sheet.dart';

class TierItemTile extends StatelessWidget {
  final String? _itemId;
  final String _rowId;

  const TierItemTile({
    super.key,
    required String? itemId,
    required String rowId,
  }) : _itemId = itemId,
       _rowId = rowId;

  @override
  Widget build(BuildContext context) {
    final editorBloc = context.read<TierListEditorBloc>();
    final tierList = editorBloc.state.tierList!;

    late final TierItem? item;
    if (_itemId == null) {
      item = null;
    } else if (_rowId == 'staging') {
      item = tierList.stagingArea.items.firstWhere(
        (item) => item.id == _itemId,
      );
    } else {
      item = tierList.tiers
          .firstWhere((tier) => tier.id == _rowId)
          .items
          .firstWhere((item) => item.id == _itemId);
    }

    late final Widget child;
    if (_itemId == null) {
      child = const Center(child: Icon(Icons.add, size: 48));
    } else if (item!.imageUrl == null || item.imageUrl!.isEmpty) {
      child = Center(child: Text(item.name, textAlign: TextAlign.center));
    } else {
      child = CachedNetworkImage(
        imageUrl: item.imageUrl!,
        fit: BoxFit.contain,
        placeholder: (context, url) =>
            const Center(child: CircularProgressIndicator()),
        errorWidget: (context, url, error) => const Icon(Icons.error),
      );
    }

    const tileSize = 150.0;
    return SizedBox(
      width: tileSize,
      height: tileSize,
      child: InkWell(
        onTap: () {
          Navigator.of(context).push(
            ItemDetailsPage.route(
              itemId: _itemId,
              rowId: _rowId,
              editorBloc: editorBloc,
            ),
          );
        },
        onLongPress: () {
          if (_itemId == null) return;

          showModalBottomSheet(
            context: context,
            builder: (_) => BlocProvider.value(
              value: context.read<TierListEditorBloc>(),
              child: MoveItemSheet(item: item!, sourceRowId: _rowId),
            ),
          );
        },
        child: Card(child: child),
      ),
    );
  }
}
