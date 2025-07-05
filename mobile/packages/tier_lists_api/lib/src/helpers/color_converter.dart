import 'package:flutter/material.dart';
import 'package:json_annotation/json_annotation.dart';

/// A custom converter for the Color class.
/// This tells json_serializable how to convert a Color object to and from an integer.
class ColorConverter implements JsonConverter<Color, int> {
  const ColorConverter();

  // Converts an integer from JSON to a Color object.
  @override
  Color fromJson(int json) {
    return Color(json);
  }

  // Converts a Color object to an integer for JSON.
  @override
  int toJson(Color object) {
    return object.toARGB32();
  }
}