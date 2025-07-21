import 'package:authentication_repository/authentication_repository.dart';
import 'package:bloc/bloc.dart';
import 'package:mobile/login_register/bloc/login_register_bloc.dart';
import 'package:mobile/authentication/models/confirm_password.dart';
import 'package:mobile/authentication/models/username.dart';
import 'package:mobile/authentication/models/password.dart';
import 'package:mobile/authentication/models/email.dart';
import 'package:formz/formz.dart';

class RegisterBloc extends LoginRegisterBloc {
  RegisterBloc({required super.authenticationRepository}) {
    on<LoginRegisterUsernameChanged>(_onUsernameChanged);
    on<LoginRegisterPasswordChanged>(_onPasswordChanged);
    on<LoginRegisterEmailChanged>(_onEmailChanged);
    on<LoginRegisterConfirmPasswordChanged>(_onConfirmPasswordChanged);
    on<LoginRegisterSubmitted>(_onSubmitted);
  }

  void _onUsernameChanged(
    LoginRegisterUsernameChanged event,
    Emitter<LoginRegisterState> emit,
  ) {
    final username = Username.dirty(event.username);
    emit(
      state.copyWith(
        username: username,
        isValid: Formz.validate([
          username,
          state.email,
          state.password,
          state.confirmPassword,
        ]),
      ),
    );
  }

  void _onEmailChanged(
    LoginRegisterEmailChanged event,
    Emitter<LoginRegisterState> emit,
  ) {
    final email = Email.dirty(event.email);
    emit(
      state.copyWith(
        email: email,
        isValid: Formz.validate([
          state.username,
          email,
          state.password,
          state.confirmPassword,
        ]),
      ),
    );
  }

  void _onPasswordChanged(
    LoginRegisterPasswordChanged event,
    Emitter<LoginRegisterState> emit,
  ) {
    final password = Password.dirty(event.password);
    final confirmPassword = ConfirmPassword.dirty(
      password: password.value,
      value: state.confirmPassword.value
    );
    emit(
      state.copyWith(
        password: password,
        confirmPassword: confirmPassword,
        isValid: Formz.validate([
          state.username,
          state.email,
          password,
          confirmPassword,
        ]),
      ),
    );
  }

  void _onConfirmPasswordChanged(
    LoginRegisterConfirmPasswordChanged event,
    Emitter<LoginRegisterState> emit,
  ) {
    final confirmPassword = ConfirmPassword.dirty(
      value: event.confirmPassword,
      password: state.password.value,
    );
    emit(
      state.copyWith(
        confirmPassword: confirmPassword,
        isValid: Formz.validate([
          state.username,
          state.email,
          state.password,
          confirmPassword,
        ]),
      ),
    );
  }

  Future<void> _onSubmitted(
    LoginRegisterSubmitted event,
    Emitter<LoginRegisterState> emit,
  ) async {
    if (state.isValid) {
      emit(state.copyWith(status: FormzSubmissionStatus.inProgress));
      try {
        await authenticationRepository.register(
          username: state.username.value,
          email: state.email.value,
          password: state.password.value,
        );
        emit(state.copyWith(status: FormzSubmissionStatus.success));
      } on RegisterFailure catch (e) {
        emit(
          state.copyWith(
            status: FormzSubmissionStatus.failure,
            errorMessage: e.message,
          ),
        );
      } catch (_) {
        emit(state.copyWith(status: FormzSubmissionStatus.failure));
      }
    }
  }
}
