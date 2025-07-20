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
    return Dismissible(
      key: ValueKey(tierList.id),
      direction: DismissDirection.horizontal,
      background: _buildSwipeBackground(Alignment.centerLeft),
      secondaryBackground: _buildSwipeBackground(Alignment.centerRight),
      confirmDismiss: (_) async => true,
      onDismissed: (_) => onDelete?.call(),
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

  Widget _buildSwipeBackground(Alignment alignment) {
    return Container(
      alignment: alignment,
      color: Colors.red,
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: const Icon(Icons.delete, color: Colors.white),
    );
  }
}
