part of 'forgot_password_bloc.dart';

@immutable
final class ForgotPasswordState extends Equatable {
  final FormzSubmissionStatus emailStatus;
  final Email email;
  final bool isValidEmail;

  final FormzSubmissionStatus codeStatus;
  final Code code;
  final bool isValidCode;

  final FormzSubmissionStatus passwordStatus;
  final Password newPassword;
  final ConfirmPassword confirmPassword;
  final bool isValidPassword;

  final String? errorMessage;

  const ForgotPasswordState({
    this.emailStatus = FormzSubmissionStatus.initial,
    this.email = const Email.pure(),
    this.isValidEmail = false,

    this.codeStatus = FormzSubmissionStatus.initial,
    this.code = const Code.pure(),
    this.isValidCode = false,

    this.passwordStatus = FormzSubmissionStatus.initial,
    this.newPassword = const Password.pure(),
    this.confirmPassword = const ConfirmPassword.pure(),
    this.isValidPassword = false,

    this.errorMessage,
  });

  ForgotPasswordState copyWith({
    FormzSubmissionStatus? emailStatus,
    Email? email,
    bool? isValidEmail,

    FormzSubmissionStatus? codeStatus,
    Code? code,
    bool? isValidCode,

    FormzSubmissionStatus? passwordStatus,
    Password? newPassword,
    ConfirmPassword? confirmPassword,
    bool? isValidPassword,

    String? errorMessage,
  }) {
    return ForgotPasswordState(
      emailStatus: emailStatus ?? this.emailStatus,
      email: email ?? this.email,
      isValidEmail: isValidEmail ?? this.isValidEmail,

      codeStatus: codeStatus ?? this.codeStatus,
      code: code ?? this.code,
      isValidCode: isValidCode ?? this.isValidCode,

      passwordStatus: passwordStatus ?? this.passwordStatus,
      newPassword: newPassword ?? this.newPassword,
      confirmPassword: confirmPassword ?? this.confirmPassword,
      isValidPassword: isValidPassword ?? this.isValidPassword,

      errorMessage: errorMessage ?? this.errorMessage,
    );
  }

  @override
  List<Object?> get props => [
    emailStatus,
    email,
    isValidEmail,

    codeStatus,
    code,
    isValidCode,

    passwordStatus,
    newPassword,
    confirmPassword,
    isValidPassword,

    errorMessage,
  ];
}
