import 'package:formz/formz.dart';

enum ConfirmPasswordValidationError { empty, mismatch }

class ConfirmPassword extends FormzInput<String, ConfirmPasswordValidationError> {
  final String password;

  const ConfirmPassword.pure() : password = '', super.pure('');
  const ConfirmPassword.dirty({this.password = '', String value = ''}) : super.dirty(value);

  @override
  ConfirmPasswordValidationError? validator(String value) {
    if (value.isEmpty) return ConfirmPasswordValidationError.empty;
    return null;
  }
}