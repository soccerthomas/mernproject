import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/tier_list_editor/bloc/tier_list_editor_bloc.dart';
import '../view/item_details_page.dart';

enum NavigationDirection { left, right }

class ItemDetailsNavigationButton extends StatelessWidget {
  final NavigationDirection _direction;
  final String _rowId;
  final String? _itemId;

  const ItemDetailsNavigationButton({
    super.key,
    required NavigationDirection direction,
    required String rowId,
    required String? itemId,
  }) : _direction = direction,
       _rowId = rowId,
       _itemId = itemId;

  int get _directionOffset => _direction == NavigationDirection.left ? -1 : 1;

  @override
  Widget build(BuildContext context) {
    return IconButton(
      onPressed: () {
        final editorBloc = context.read<TierListEditorBloc>();
        final tierList = editorBloc.state.tierList!;
        final row = _rowId == 'staging'
            ? tierList.stagingArea
            : tierList.tiers.firstWhere((tier) => tier.id == _rowId);

        if (row.items.isEmpty) return;

        final itemIndex = _itemId == null
            ? -1
            : row.items.indexWhere((item) => item.id == _itemId);

        Navigator.of(context).pushReplacement(
          ItemDetailsPage.route(
            itemId:
                row.items[_itemId == null
                    ? 0
                    : (itemIndex + _directionOffset + row.items.length) %
                          row.items.length].id,
            rowId: _rowId,
            editorBloc: editorBloc,
          ),
        );
      },
      icon: Icon(
        _direction == NavigationDirection.left
            ? Icons.arrow_left
            : Icons.arrow_right,
      ),
    );
  }
}
