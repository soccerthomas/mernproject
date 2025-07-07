import 'package:flutter/material.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart';

class TierListListTile extends StatelessWidget {
  final TierList tierList;
  final DismissDirectionCallback? onDismissed;
  final VoidCallback? onTap;

  const TierListListTile({
    super.key,
    required this.tierList,
    this.onDismissed,
    this.onTap
  });

  @override
  Widget build(BuildContext context) {
    return Dismissible(
      key: Key('tierListListTile_dismissible_${tierList.id}'),
      onDismissed: onDismissed,
      direction: DismissDirection.endToStart,
      background: Container(
        alignment: Alignment.centerRight,
        color: Theme.of(context).colorScheme.error,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: const Icon(
          Icons.delete,
          color: Colors.black
        ),
      ),
      child: ListTile(
        onTap: onTap,
        title: Text(
          tierList.title,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
        subtitle: Text(
          tierList.description,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
      ),
    );
  }
}