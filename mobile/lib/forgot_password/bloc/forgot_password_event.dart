part of 'forgot_password_bloc.dart';

@immutable
sealed class ForgotPasswordEvent extends Equatable {
  const ForgotPasswordEvent();

  @override
  List<Object?> get props => [];
}

final class ForgotPasswordEmailChanged extends ForgotPasswordEvent {
  final String email;

  const ForgotPasswordEmailChanged(this.email);

  @override
  List<Object?> get props => [email];
}

final class ForgotPasswordEmailSubmitted extends ForgotPasswordEvent {
  const ForgotPasswordEmailSubmitted();
}

final class ForgotPasswordCodeChanged extends ForgotPasswordEvent {
  final String code;

  const ForgotPasswordCodeChanged(this.code);

  @override
  List<Object?> get props => [code];
}

final class ForgotPasswordCodeSubmitted extends ForgotPasswordEvent {
  const ForgotPasswordCodeSubmitted();
}

final class ForgotPasswordPasswordChanged extends ForgotPasswordEvent {
  final String password;

  const ForgotPasswordPasswordChanged(this.password);

  @override
  List<Object?> get props => [password];
}

final class ForgotPasswordConfirmPasswordChanged extends ForgotPasswordEvent {
  final String password;

  const ForgotPasswordConfirmPasswordChanged(this.password);

  @override
  List<Object?> get props => [password];
}

final class ForgotPasswordPasswordSubmitted extends ForgotPasswordEvent {
  const ForgotPasswordPasswordSubmitted();
}