import 'package:flutter/material.dart';

class UsernameInput extends StatelessWidget {
  final void Function(String) onChanged;
  final String keyText;
  final String? errorText;

  const UsernameInput({
    super.key, 
    required this.onChanged, 
    required this.keyText, 
    this.errorText
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      key: Key(keyText),
      onChanged: onChanged,
      decoration: InputDecoration(
        labelText: 'username',
        errorText: errorText
      ),
    );
  }
}