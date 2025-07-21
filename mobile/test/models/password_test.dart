import 'package:test/test.dart';
import 'package:mobile/authentication/models/password.dart';

void main() {
  group('Password Model', () {
    test('should return empty error when password is empty', () {
      const password = Password.dirty('');
      expect(password.error, PasswordValidationError.empty);
    });

    test(
      'should return tooShort error when password is fewer than eight characters',
      () {
        const password = Password.dirty('a');
        expect(password.error, PasswordValidationError.tooShort);
      },
    );

    test(
      'should return includesWhiteSpace error when password contains a space',
      () {
        const password = Password.dirty('12345 678');
        expect(password.error, PasswordValidationError.includesWhiteSpace);
      },
    );

    test(
      'should return missingNumber error when password does not contain a number',
      () {
        const password = Password.dirty('abcdefgh');
        expect(password.error, PasswordValidationError.missingNumber);
      },
    );
  });
}
