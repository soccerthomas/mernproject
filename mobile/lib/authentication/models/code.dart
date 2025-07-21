import 'package:formz/formz.dart';

enum CodeValidationError { empty, nonNumeric }

class Code extends FormzInput<String, CodeValidationError> {
  const Code.pure() : super.pure('');
  const Code.dirty([super.value = '']) : super.dirty();

  @override
  CodeValidationError? validator(String value) {
    if (value.isEmpty) return CodeValidationError.empty;
    if (int.tryParse(value) == null) return CodeValidationError.nonNumeric;
    return null;
  }
}