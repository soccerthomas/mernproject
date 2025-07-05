import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:mobile/app.dart';


Future main() async {
  await dotenv.load();
  runApp(const App());
}
