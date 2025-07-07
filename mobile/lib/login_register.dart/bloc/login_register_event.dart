part of 'login_register_bloc.dart';

sealed class LoginRegisterEvent extends Equatable {
  const LoginRegisterEvent();

  @override
  List<Object> get props => [];
}

final class LoginRegisterUsernameChanged extends LoginRegisterEvent {
  final String username;
  
  const LoginRegisterUsernameChanged(this.username);

  @override
  List<Object> get props => [username];
}

final class LoginRegisterEmailChanged extends LoginRegisterEvent {
  final String email;
  
  const LoginRegisterEmailChanged(this.email);

  @override
  List<Object> get props => [email];
}

final class LoginRegisterPasswordChanged extends LoginRegisterEvent {
  final String password;
  
  const LoginRegisterPasswordChanged(this.password);

  @override
  List<Object> get props => [password];
}

final class LoginRegisterConfirmPasswordChanged extends LoginRegisterEvent {
  final String confirmPassword;
  
  const LoginRegisterConfirmPasswordChanged(this.confirmPassword);

  @override
  List<Object> get props => [confirmPassword];
}

final class LoginRegisterSubmitted extends LoginRegisterEvent {
  const LoginRegisterSubmitted();
}