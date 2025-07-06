import 'dart:developer';
import 'package:flutter/widgets.dart';
import 'package:mobile/app.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart';

void bootstrap({required LocalTierListsApi localTierListsApi}) {
  FlutterError.onError = (details) {
    log(details.exceptionAsString(), stackTrace: details.stack);
  };

  runApp(App(localTierListsApi: localTierListsApi));
}
