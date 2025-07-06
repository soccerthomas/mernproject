import 'dart:developer';

import 'package:authentication_repository/authentication_repository.dart';
import 'package:flutter/widgets.dart';
import 'package:mobile/app.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart';

void bootstrap({required LocalTierListsApi localTierListsApi}) {
  FlutterError.onError = (details) {
    log(details.exceptionAsString(), stackTrace: details.stack);
  };

  final authenticationRepository = AuthenticationRepository();
  final tierListsRepository = TierListsRepository(localTierListsApi: localTierListsApi);

  runApp(
    App(
      authenticationRepository: authenticationRepository,
      tierListsRepository: tierListsRepository,
    ),
  );
}
