import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_colorpicker/flutter_colorpicker.dart';
import 'package:mobile/tier_list_editor/bloc/tier_list_editor_bloc.dart';
import 'package:mobile/tier_list_editor/color_picker_cubit/color_picker_cubit.dart';
import 'package:mobile/tier_list_editor/color_picker_cubit/color_picker_state.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart' show Tier;

class ColorPickerDialog extends StatelessWidget {
  final Tier tier;
  
  const ColorPickerDialog(this.tier, {super.key});

  static const List<Color> _colorChoices = [
    Colors.red, Colors.pink, Colors.purple, Colors.deepPurple,
    Colors.indigo, Colors.blue, Colors.lightBlue, Colors.cyan,
    Colors.teal, Colors.green, Colors.lightGreen, Colors.lime,
    Colors.yellow, Colors.amber, Colors.orange, Colors.deepOrange,
    Colors.brown, Colors.grey, Colors.blueGrey, Colors.black, 
  ];

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => ColorPickerCubit(tier.color),
      child: BlocBuilder<ColorPickerCubit, ColorPickerState>(
        builder: (context, state) => AlertDialog(
          title: const Text('Choose Tier Color'),
          content: BlockPicker(
            pickerColor: state.selectedColor, 
            availableColors: _colorChoices,
            onColorChanged: (color) {
              context.read<ColorPickerCubit>().changeColor(color);
              context.read<TierListEditorBloc>().add(
                TierListEditorTierColorChanged(tierId: tier.id, newColor: color)
              );
              Navigator.of(context).pop();
            }
          ),
        ),
      ),
    );
  }
}