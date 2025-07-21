import 'package:flutter/material.dart';
import 'package:json_annotation/json_annotation.dart';

/// A custom converter for the Color class.
/// This tells json_serializable how to convert a Color object to and from an integer.
class ColorConverter implements JsonConverter<Color, String> {
  const ColorConverter();

  @override
  Color fromJson(String hexString) {
    return Color(int.parse('FF${hexString.substring(1)}', radix: 16));
  }

  @override
  String toJson(Color color) {
    final String hexR = (color.r * 255).round().toRadixString(16).padLeft(2, '0');
    final String hexG = (color.g * 255).round().toRadixString(16).padLeft(2, '0');
    final String hexB = (color.b * 255).round().toRadixString(16).padLeft(2, '0');
    return '#$hexR$hexG$hexB';
  }
}