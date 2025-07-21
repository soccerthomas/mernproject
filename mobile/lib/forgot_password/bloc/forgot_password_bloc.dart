import 'package:authentication_repository/authentication_repository.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:formz/formz.dart';
import 'package:meta/meta.dart';
import 'package:mobile/authentication/models/code.dart';
import 'package:mobile/authentication/models/confirm_password.dart';
import 'package:mobile/authentication/models/email.dart';
import 'package:mobile/authentication/models/password.dart';

part 'forgot_password_event.dart';
part 'forgot_password_state.dart';

class ForgotPasswordBloc
    extends Bloc<ForgotPasswordEvent, ForgotPasswordState> {
  final AuthenticationRepository _authenticationRepository;

  ForgotPasswordBloc(AuthenticationRepository authenticationRepository)
    : _authenticationRepository = authenticationRepository,
      super(const ForgotPasswordState()) {
    on<ForgotPasswordEmailChanged>(_onEmailChanged);
    on<ForgotPasswordEmailSubmitted>(_onEmailSubmitted);
    on<ForgotPasswordCodeChanged>(_onCodeChanged);
    on<ForgotPasswordCodeSubmitted>(_onCodeSubmitted);
    on<ForgotPasswordPasswordChanged>(_onPasswordChanged);
    on<ForgotPasswordConfirmPasswordChanged>(_onConfirmPasswordChanged);
    on<ForgotPasswordPasswordSubmitted>(_onPasswordSubmitted);
  }

  void _onEmailChanged(
    ForgotPasswordEmailChanged event,
    Emitter<ForgotPasswordState> emit,
  ) {
    final email = Email.dirty(event.email);
    emit(state.copyWith(email: email, isValidEmail: Formz.validate([email])));
  }

  Future<void> _onEmailSubmitted(
    ForgotPasswordEmailSubmitted event,
    Emitter<ForgotPasswordState> emit,
  ) async {
    emit(state.copyWith(emailStatus: FormzSubmissionStatus.inProgress));
    try {
      await _authenticationRepository.sendPasswordResetCode(state.email.value);
      emit(state.copyWith(emailStatus: FormzSubmissionStatus.success));
    } catch (e) {
      emit(
        state.copyWith(
          emailStatus: FormzSubmissionStatus.failure,
          errorMessage: e.toString(),
        ),
      );
    }
  }

  void _onCodeChanged(
    ForgotPasswordCodeChanged event,
    Emitter<ForgotPasswordState> emit,
  ) {
    final code = Code.dirty(event.code);
    emit(state.copyWith(code: code, isValidCode: Formz.validate([code])));
  }

  Future<void> _onCodeSubmitted(
    ForgotPasswordCodeSubmitted event,
    Emitter<ForgotPasswordState> emit,
  ) async {
    emit(state.copyWith(codeStatus: FormzSubmissionStatus.inProgress));
    try {
      await _authenticationRepository.verifyPasswordResetCode(
        email: state.email.value,
        code: state.code.value,
      );
      emit(state.copyWith(codeStatus: FormzSubmissionStatus.success));
    } catch (e) {
      emit(
        state.copyWith(
          codeStatus: FormzSubmissionStatus.failure,
          errorMessage: e.toString(),
        ),
      );
    }
  }

  void _onPasswordChanged(
    ForgotPasswordPasswordChanged event,
    Emitter<ForgotPasswordState> emit,
  ) {
    final newPassword = Password.dirty(event.password);
    final confirmPassword = ConfirmPassword.dirty(
      password: newPassword.value,
      value: state.confirmPassword.value
    );
    emit(
      state.copyWith(
        newPassword: newPassword,
        confirmPassword: confirmPassword,
        isValidPassword: Formz.validate([newPassword, confirmPassword]),
      ),
    );
  }

  void _onConfirmPasswordChanged(
    ForgotPasswordConfirmPasswordChanged event,
    Emitter<ForgotPasswordState> emit,
  ) {
    final newConfirmPassword = ConfirmPassword.dirty(
      value: event.password,
      password: state.newPassword.value,
    );
    emit(
      state.copyWith(
        confirmPassword: newConfirmPassword,
        isValidPassword: Formz.validate([
          state.newPassword,
          newConfirmPassword,
        ]),
      ),
    );
  }

  Future<void> _onPasswordSubmitted(
    ForgotPasswordPasswordSubmitted event,
    Emitter<ForgotPasswordState> emit,
  ) async {
    emit(state.copyWith(passwordStatus: FormzSubmissionStatus.inProgress));
    try {
      await _authenticationRepository.resetPassword(
        email: state.email.value,
        newPassword: state.newPassword.value,
      );
      emit(state.copyWith(passwordStatus: FormzSubmissionStatus.success));
    } catch (e) {
      emit(
        state.copyWith(
          passwordStatus: FormzSubmissionStatus.failure,
          errorMessage: e.toString(),
        ),
      );
    }
  }
}
