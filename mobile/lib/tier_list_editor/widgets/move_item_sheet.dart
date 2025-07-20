import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/tier_list_editor/bloc/tier_list_editor_bloc.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart'
    show ListRow, TierItem;

class MoveItemSheet extends StatefulWidget {
  final TierItem _item;
  final String _sourceRowId;

  const MoveItemSheet({
    super.key,
    required TierItem item,
    required String sourceRowId,
  }) : _item = item,
       _sourceRowId = sourceRowId;

  @override
  State<MoveItemSheet> createState() => _MoveItemSheetState();
}

class _MoveItemSheetState extends State<MoveItemSheet> {
  ListRow? _selectedRow;

  @override
  Widget build(BuildContext context) {
    final editorState = context.watch<TierListEditorBloc>().state;
    final availableRows = [
      ...editorState.tierList!.tiers,
      editorState.tierList!.stagingArea,
    ];

    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        mainAxisSize: MainAxisSize.max,
        children: [
          Text('Move Item', style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 16),
          Text(
            _selectedRow == null
                ? 'Select a destination tier'
                : 'Move "${widget._item.name}" to position:',
          ),
          const SizedBox(height: 24),
          if (_selectedRow == null)
            Expanded(child: _rowSelection(availableRows))
          else
            _positionSelection(_selectedRow!, availableRows),
        ],
      ),
    );
  }

  Widget _rowSelection(List<ListRow> availableRows) {
    return Material(
      clipBehavior: Clip.hardEdge,
      child: ListView.builder(
        itemCount: availableRows.length,
        itemBuilder: (_, index) => ListTile(
          title: Text(availableRows[index].name),
          tileColor: availableRows[index].color,
          onTap: () {
            setState(() {
              _selectedRow = availableRows[index];
            });
          },
        ),
      ),
    );
  }

  Widget _positionSelection(
    ListRow destinationRow,
    List<ListRow> availableRows,
  ) {
    return SizedBox(
      height: 32,
      child: ListView.builder(
        itemCount:
            destinationRow.items.length +
            (destinationRow.id == widget._sourceRowId ? 0 : 1),
        scrollDirection: Axis.horizontal,
        itemBuilder: (_, index) => GestureDetector(
          onTap: () {
            final oldIndex = availableRows
                .firstWhere((row) => row.id == widget._sourceRowId)
                .items
                .indexWhere((item) => item.id == widget._item.id);

            context.read<TierListEditorBloc>().add(
              TierListEditorItemMoved(
                sourceTierId: widget._sourceRowId,
                oldIndex: oldIndex,
                destinationTierId: destinationRow.id,
                newIndex: index,
              ),
            );

            Navigator.of(context).pop();
          },
          child: Container(
            width: 32,
            height: 32,
            margin: const EdgeInsets.only(right: 8),
            color: destinationRow.color,
            child: Center(child: Text((index + 1).toString())),
          ),
        ),
      ),
    );
  }
}
