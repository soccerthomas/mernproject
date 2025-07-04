import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:mobile/presentation/widgets/app.dart';


Future main() async {
  await dotenv.load();
  runApp(const App());
}
