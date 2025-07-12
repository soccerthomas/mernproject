import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'color_picker_state.dart';

class ColorPickerCubit extends Cubit<ColorPickerState> {
  ColorPickerCubit(Color initialColor)
    : super(ColorPickerState(initialColor));

  void changeColor(Color color) {
    emit(ColorPickerState(color));
  }
}
