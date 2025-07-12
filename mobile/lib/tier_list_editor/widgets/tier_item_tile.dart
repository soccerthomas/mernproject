import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:mobile/item_details/view/item_details_page.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart' show TierItem;

class TierItemTile extends StatelessWidget {
  final TierItem? item;
  
  const TierItemTile({super.key, required this.item});

  @override
  Widget build(BuildContext context) {
    const tileSize = 150.0;

    if (item == null) {
      return SizedBox(
        width: tileSize,
        height: tileSize,
        child: InkWell(
          onTap: () {
            Navigator.of(context).push(ItemDetailsPage.route(null));
          },
          child: const Icon(Icons.add),
        ),
      );
    }

    if (item!.imageUrl == null) {
      return SizedBox(
        width: tileSize,
        height: tileSize,
        child: InkWell(
          onTap: () {
            Navigator.of(context).push(ItemDetailsPage.route(item));
          },
          child: Text(item!.name),
        ),
      );
    }

    return SizedBox(
        width: tileSize,
        height: tileSize,
        child: InkWell(
          onTap: () {
            Navigator.of(context).push(ItemDetailsPage.route(item));
          },
          child: CachedNetworkImage(imageUrl: item!.imageUrl!),
        ),
      );
  }
}