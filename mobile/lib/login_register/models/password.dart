import 'package:formz/formz.dart';

enum PasswordValidationError { empty, tooShort, missingNumber, includesWhiteSpace }

class Password extends FormzInput<String, PasswordValidationError> {
  const Password.pure() : super.pure('');
  const Password.dirty([super.value = '']) : super.dirty();

  @override
  PasswordValidationError? validator(String value) {
    if (value.isEmpty) return PasswordValidationError.empty;

    final whiteSpaceRegex = RegExp(r'\s');
    if (whiteSpaceRegex.hasMatch(value)) return PasswordValidationError.includesWhiteSpace;

    if (value.length < 8) return PasswordValidationError.tooShort;

    final RegExp numRegex = RegExp(r'\d');
    if (!numRegex.hasMatch(value)) return PasswordValidationError.missingNumber;

    return null;
  }
}