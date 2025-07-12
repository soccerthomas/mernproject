import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';

class ColorPickerState extends Equatable {
  final Color selectedColor;

  const ColorPickerState(this.selectedColor);

  @override
  List<Object?> get props => [selectedColor];
}