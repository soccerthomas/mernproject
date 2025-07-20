import 'package:flutter/material.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart';

class TierListListTile extends StatelessWidget {
  final TierList tierList;
  final VoidCallback? onDelete;
  final VoidCallback? onTap;

  const TierListListTile({
    super.key,
    required this.tierList,
    this.onDelete,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
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
      trailing: IconButton(
        icon: const Icon(Icons.delete),
        onPressed: onDelete,
        color: Theme.of(context).colorScheme.error,
      ),
    );
  }
}
