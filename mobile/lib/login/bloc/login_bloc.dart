import 'package:authentication_repository/authentication_repository.dart';
import 'package:bloc/bloc.dart';
import 'package:mobile/login_register.dart/bloc/login_register_bloc.dart';
import 'package:mobile/login_register.dart/models/username.dart';
import 'package:mobile/login_register.dart/models/password.dart';
import 'package:formz/formz.dart';

class LoginBloc extends LoginRegisterBloc {
  LoginBloc({required super.authenticationRepository}) {
    on<LoginRegisterUsernameChanged>(_onUsernameChanged);
    on<LoginRegisterPasswordChanged>(_onPasswordChanged);
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
        isValid: Formz.validate([state.password, username]),
      ),
    );
  }

  void _onPasswordChanged(
    LoginRegisterPasswordChanged event,
    Emitter<LoginRegisterState> emit,
  ) {
    final password = Password.dirty(event.password);
    emit(
      state.copyWith(
        password: password,
        isValid: Formz.validate([password, state.username]),
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
        await authenticationRepository.logIn(
          username: state.username.value,
          password: state.password.value,
        );
        emit(state.copyWith(status: FormzSubmissionStatus.success));
      } on LogInFailure catch (e) {
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
