import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:local_storage_tier_lists_api/local_storage_tier_lists_api.dart';
import 'bootstrap.dart';
import 'package:shared_preferences/shared_preferences.dart';


Future main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load();
  
  final localTierListsApi = LocalStorageTierListsApi(
    plugin: await SharedPreferences.getInstance(),
  );

  bootstrap(localTierListsApi: localTierListsApi);
}
