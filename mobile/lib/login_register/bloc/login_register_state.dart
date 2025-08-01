part of 'login_register_bloc.dart';

final class LoginRegisterState extends Equatable {
  final FormzSubmissionStatus status;
  final Username username;
  final Email email;
  final Password password;
  final ConfirmPassword confirmPassword;
  final bool isValid;
  final String? errorMessage;

  const LoginRegisterState({
    this.status = FormzSubmissionStatus.initial,
    this.username = const Username.pure(),
    this.email = const Email.pure(),
    this.password = const Password.pure(),
    this.confirmPassword = const ConfirmPassword.pure(),
    this.isValid = false,
    this.errorMessage,
  });

  LoginRegisterState copyWith({
    FormzSubmissionStatus? status,
    Username? username,
    Email? email,
    Password? password,
    ConfirmPassword? confirmPassword,
    bool? isValid,
    String? errorMessage,
  }) {
    return LoginRegisterState(
      status: status ?? this.status,
      username: username ?? this.username,
      email: email ?? this.email,
      password: password ?? this.password,
      confirmPassword: confirmPassword ?? this.confirmPassword,
      isValid: isValid ?? this.isValid,
      errorMessage: errorMessage,
    );
  }

  @override
  List<Object?> get props => [
    status,
    username,
    email,
    password,
    confirmPassword,
    isValid,
    errorMessage
  ];
}
