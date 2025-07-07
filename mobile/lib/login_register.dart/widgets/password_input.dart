import 'package:flutter/material.dart';

class PasswordInput extends StatelessWidget {
  final void Function(String) onChanged;
  final String keyText;
  final String? errorText;

  const PasswordInput({
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
      obscureText: true,
      decoration: InputDecoration(
        labelText: 'password',
        errorText: errorText
      ),
    );
  }
}