part of 'email_verification_bloc.dart';

@immutable
sealed class EmailVerificationEvent extends Equatable {
  const EmailVerificationEvent();

  @override
  List<Object?> get props => [];
}

final class EmailVerificationCodeChanged extends EmailVerificationEvent {
  final String code;

  const EmailVerificationCodeChanged(this.code);

  @override
  List<Object?> get props => [code];
}

final class EmailVerificationSubmitted extends EmailVerificationEvent {
  const EmailVerificationSubmitted();
}

final class EmailVerificationResendEmailRequested extends EmailVerificationEvent {
  const EmailVerificationResendEmailRequested();
}
