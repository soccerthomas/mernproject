part of 'register_bloc.dart';

final class RegisterState extends Equatable {
  final FormzSubmissionStatus status;
  final Username username;
  final Email email;
  final Password password;
  final Password confirmPassword;
  final bool isValid;
  final String? errorMessage;

  const RegisterState({
    this.status = FormzSubmissionStatus.initial,
    this.username = const Username.pure(),
    this.email = const Email.pure(),
    this.password = const Password.pure(),
    this.confirmPassword = const Password.pure(),
    this.isValid = false,
    this.errorMessage,
  });

  RegisterState copyWith({
    FormzSubmissionStatus? status,
    Username? username,
    Email? email,
    Password? password,
    Password? confirmPassword,
    bool? isValid,
    String? errorMessage,
  }) {
    return RegisterState(
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
