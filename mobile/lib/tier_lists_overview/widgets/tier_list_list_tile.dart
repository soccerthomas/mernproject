import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart';
import 'package:mobile/tier_lists_overview/bloc/tier_lists_overview_bloc.dart';

class TierListListTile extends StatelessWidget {
  final TierList tierList;
  final VoidCallback? onTap;

  const TierListListTile({
    super.key,
    required this.tierList,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Dismissible(
      key: ValueKey(tierList.id),
      background: _buildSwipeBackground(
        tierList.pinned ? Icons.remove_circle_outline : Icons.push_pin,
        Alignment.centerLeft,
      ),
      secondaryBackground: _buildSwipeBackground(Icons.delete, Alignment.centerRight),
      confirmDismiss: (direction) async {
        if (direction == DismissDirection.endToStart) {
          context.read<TierListsOverviewBloc>().add(
                TierListsOverviewTierListDeleted(tierList),
              );
          return true;
        } else if (direction == DismissDirection.startToEnd) {
          context.read<TierListsOverviewBloc>().add(
                TierListsOverviewTierListPinned(tierList.id, !tierList.pinned),
              );
          return false;
        }
        return false;
      },
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: tierList.pinned
              ? Colors.amber.withOpacity(0.1)
              : Theme.of(context).cardColor.withOpacity(0.2),
          border: Border.all(
            color: tierList.pinned ? Colors.amber : Colors.white24,
          ),
          borderRadius: BorderRadius.circular(10),
        ),
        child: ListTile(
          contentPadding: EdgeInsets.zero,
          onTap: onTap,
          title: Row(
            children: [
              if (tierList.pinned)
                const Icon(Icons.push_pin, size: 18, color: Colors.amber),
              if (tierList.pinned) const SizedBox(width: 6),
              Expanded(
                child: Text(
                  tierList.title,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
          subtitle: Text(
            tierList.pinned
                ? '📌 Pinned • ${tierList.description}'
                : tierList.description,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ),
    );
  }

  Widget _buildSwipeBackground(IconData icon, Alignment alignment) {
    return Container(
      alignment: alignment,
      color: alignment == Alignment.centerLeft ? Colors.blue : Colors.red,
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Icon(icon, color: Colors.white),
    );
  }
}
