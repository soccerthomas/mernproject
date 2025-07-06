import 'package:flutter/material.dart';

class TierMasterTheme {
  static ThemeData get theme {
    return ThemeData(
      brightness: Brightness.dark,
      colorScheme: ColorScheme.fromSeed(
        brightness: Brightness.dark,
        seedColor: const Color(0xFF4B5563), 
      ),
    );
  }
}