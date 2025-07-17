import 'package:authentication_repository/authentication_repository.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:formz/formz.dart';
import 'package:meta/meta.dart';
import '../models/code.dart';

part 'email_verification_event.dart';
part 'email_verification_state.dart';

class EmailVerificationBloc
    extends Bloc<EmailVerificationEvent, EmailVerificationState> {
  final AuthenticationRepository _authenticationRepository;
  final String email;

  EmailVerificationBloc({required AuthenticationRepository authenticationRepository, required this.email})
    : _authenticationRepository = authenticationRepository,
      super(const EmailVerificationState()) {
    on<EmailVerificationCodeChanged>(_onCodeChanged);
    on<EmailVerificationSubmitted>(_onSubmitted);
    on<EmailVerificationResendEmailRequested>(_onResendRequested);
  }

  void _onCodeChanged(
    EmailVerificationCodeChanged event,
    Emitter<EmailVerificationState> emit,
  ) {
    final code = Code.dirty(event.code);
    emit( 
      state.copyWith(
        code: code,
        isValid: Formz.validate([code])
      )
    );
  }

  Future<void> _onSubmitted(
    EmailVerificationSubmitted event,
    Emitter<EmailVerificationState> emit,
  ) async {
    emit(state.copyWith(status: FormzSubmissionStatus.inProgress));
    try {
      await _authenticationRepository.verifyCode(
        email: email,
        code: state.code.value,
      );
      emit(state.copyWith(status: FormzSubmissionStatus.success));
    } catch (e) {
      emit(state.copyWith(status: FormzSubmissionStatus.failure, errorMessage: e.toString()));
    }
  }

  Future<void> _onResendRequested(
    EmailVerificationResendEmailRequested event,
    Emitter<EmailVerificationState> emit,
  ) async {
    try {
      await _authenticationRepository.resendVerificationEmail(email);
    } catch (e) {
      emit(state.copyWith(errorMessage: e.toString()));
    }
  }
}
