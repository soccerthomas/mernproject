import 'package:flutter/material.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart';

class ItemDetailsPage extends StatelessWidget {
  final TierItem? item;

  const ItemDetailsPage(this.item, {super.key});

  static Route<void> route(item) {
    return MaterialPageRoute(
      builder: (context) => ItemDetailsPage(item)
    );
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    throw UnimplementedError();
  }
}