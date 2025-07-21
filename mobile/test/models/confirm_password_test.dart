import 'package:test/test.dart';
import 'package:mobile/authentication/models/confirm_password.dart';

void main() {
  group('ConfirmPassword Model', () {
    test('should return empty error when confirmPassword is empty', () {
      const confirmPassword = ConfirmPassword.dirty(value: '', password: '');
      expect(confirmPassword.error, ConfirmPasswordValidationError.empty);
    });

    test('should return mismatch error when confirmPassword does not match password', () {
      const confirmPassword = ConfirmPassword.dirty(value: '12345678', password: '11345678');
      expect(confirmPassword.error, ConfirmPasswordValidationError.mismatch);
    });
  });
}