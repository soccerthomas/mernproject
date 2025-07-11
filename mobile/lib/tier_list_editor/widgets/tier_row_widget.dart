import 'package:flutter/material.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart' show ListRow;
import 'tier_item_tile.dart';


class TierRowWidget extends StatelessWidget {
  final ListRow row;

  const TierRowWidget({super.key, required this.row});

  @override
  Widget build(BuildContext context) {
    final stagingOffset = row.id == 'staging' ? 1 : 0;

    return Column(
      children: [
        row.id == 'staging'
            ? const SizedBox(height: 36)
            : SizedBox(
                width: 42, 
                height: 24, 
                child: InkWell(
                  child: Text(row.name)
                )
              ),
        Container(
          color: row.color,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: row.items.length + stagingOffset,
            itemBuilder: (context, index) {
              if (index == 0 && row.id == 'staging') {
                return const TierItemTile(item: null);
              }

              return TierItemTile(item: row.items[index-stagingOffset]);
            },
          ),
        ),
      ],
    );
  }
}
