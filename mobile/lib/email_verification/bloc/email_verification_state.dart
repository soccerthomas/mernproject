part of 'email_verification_bloc.dart';

@immutable
final class EmailVerificationState extends Equatable {
  final FormzSubmissionStatus status;
  final Code code;
  final bool isValid;
  final String? errorMessage;

  const EmailVerificationState({
    this.status = FormzSubmissionStatus.initial,
    this.code = const Code.pure(),
    this.isValid = false,
    this.errorMessage
  });

  EmailVerificationState copyWith({
    FormzSubmissionStatus? status,
    Code? code,
    bool? isValid,
    String? errorMessage,
  }) {
    return EmailVerificationState(
      status: status ?? this.status,
      code: code ?? this.code,
      isValid: isValid ?? this.isValid,
      errorMessage: errorMessage ?? this.errorMessage
    );
  }

  @override
  List<Object?> get props => [status, code, isValid, errorMessage];
}


