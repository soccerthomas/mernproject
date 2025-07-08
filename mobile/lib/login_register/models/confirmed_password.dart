import 'package:formz/formz.dart';

enum ConfirmedPasswordValidationError { empty, mismatch }

class ConfirmedPassword extends FormzInput<String, ConfirmedPasswordValidationError> {
  final String password;

  const ConfirmedPassword.pure({this.password = ''}) : super.pure('');
  const ConfirmedPassword.dirty({required this.password, String value = ''}) : super.dirty(value);

  @override
  ConfirmedPasswordValidationError? validator(String value) {
    if (value.isEmpty) return ConfirmedPasswordValidationError.empty;
    return password == value ? null : ConfirmedPasswordValidationError.mismatch;
  }
}
