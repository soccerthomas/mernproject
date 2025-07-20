part of 'email_verification_bloc.dart';

enum ResendEmailStatus { initial, sending, success, failure }

@immutable
final class EmailVerificationState extends Equatable {
  final FormzSubmissionStatus status;
  final Code code;
  final bool isValid;
  final ResendEmailStatus resendEmailStatus;
  final String? errorMessage;

  const EmailVerificationState({
    this.status = FormzSubmissionStatus.initial,
    this.code = const Code.pure(),
    this.isValid = false,
    this.resendEmailStatus = ResendEmailStatus.initial,
    this.errorMessage
  });

  EmailVerificationState copyWith({
    FormzSubmissionStatus? status,
    Code? code,
    bool? isValid,
    ResendEmailStatus? resendEmailStatus,
    String? errorMessage,
  }) {
    return EmailVerificationState(
      status: status ?? this.status,
      code: code ?? this.code,
      isValid: isValid ?? this.isValid,
      resendEmailStatus: resendEmailStatus ?? this.resendEmailStatus,
      errorMessage: errorMessage ?? this.errorMessage
    );
  }

  @override
  List<Object?> get props => [status, code, isValid, resendEmailStatus, errorMessage];
}


