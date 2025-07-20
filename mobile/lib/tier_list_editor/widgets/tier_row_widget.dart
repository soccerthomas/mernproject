import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/tier_list_editor/bloc/tier_list_editor_bloc.dart';
import 'edit_tier_modal.dart';
import 'tier_item_tile.dart';

class TierRowWidget extends StatelessWidget {
  final String _rowId;

  const TierRowWidget({super.key, required String rowId}) : _rowId = rowId;

  @override
  Widget build(BuildContext context) {
    final stagingOffset = _rowId == 'staging' ? 1 : 0;
    final editorBloc = context.read<TierListEditorBloc>();
    final tierList = editorBloc.state.tierList!;
    final row = _rowId == 'staging'
        ? tierList.stagingArea
        : tierList.tiers.firstWhere((tier) => tier.id == _rowId);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _rowId == 'staging'
            ? const SizedBox(height: 50)
            : Column(
              children: [
                const SizedBox(height: 12),
                Align(
                  alignment: Alignment.centerLeft,
                  child: Container(
                      decoration: BoxDecoration(
                        color: row.color.withAlpha(150),
                        borderRadius: const BorderRadius.only(topRight: Radius.circular(10))
                      ),
                      child: InkWell(
                        onTap: () {
                          showModalBottomSheet(
                            context: context,
                            builder: (_) => BlocProvider.value(
                              value: editorBloc,
                              child: EditTierModal(_rowId),
                            ),
                          );
                        },
                        child: Column(
                          children: [
                            const SizedBox(width: 100),
                            Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 8.0),
                              child: Text(row.name, style: Theme.of(context).textTheme.titleLarge),
                            ),
                          ],
                        ),
                      ),
                    ),
                ),
              ],
            ),
        Container(
          height: 180,
          color: row.color,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: row.items.length + stagingOffset,
            itemBuilder: (context, index) {
              if (index == 0 && row.id == 'staging') {
                return TierItemTile(itemId: null, rowId: _rowId);
              }

              return TierItemTile(
                itemId: row.items[index - stagingOffset].id,
                rowId: _rowId,
              );
            },
          ),
        ),
      ],
    );
  }
}
