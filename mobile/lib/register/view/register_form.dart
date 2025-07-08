import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:formz/formz.dart';
import 'package:mobile/login_register/bloc/login_register_bloc.dart';
import 'package:mobile/login_register/models/confirm_password.dart';
import 'package:mobile/login_register/models/password.dart';
import 'package:mobile/register/bloc/register_bloc.dart';

class RegisterForm extends StatelessWidget {
  const RegisterForm({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocListener<RegisterBloc, LoginRegisterState>(
      listener: (context, state) {
        if (state.status.isFailure) {
          ScaffoldMessenger.of(context)
            ..hideCurrentSnackBar()
            ..showSnackBar(
              SnackBar(content: Text(state.errorMessage ?? 'Registration Failure')),
            );
        }
      },
      child: Align(
        alignment: const Alignment(0, -1 / 3),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            _UsernameInput(),
            const Padding(padding: EdgeInsets.all(12)),
            _EmailInput(),
            const Padding(padding: EdgeInsets.all(12)),
            _PasswordInput(),
            const Padding(padding: EdgeInsets.all(12)),
            _ConfirmPasswordInput(),
            const Padding(padding: EdgeInsets.all(12)),
            _RegisterButton(),
          ],
        ),
      ),
    );
  }
}

class _UsernameInput extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final displayError = context.select(
      (RegisterBloc bloc) => bloc.state.username.displayError,
    );

    return TextField(
      key: const Key('registerForm_usernameInput_textField'),
      onChanged: (username) {
        context.read<RegisterBloc>().add(LoginRegisterUsernameChanged(username));
      },
      decoration: InputDecoration(
        labelText: 'username',
        errorText: displayError != null ? 'invalid username' : null,
      ),
    );
  }
}

class _EmailInput extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final displayError = context.select(
      (RegisterBloc bloc) => bloc.state.email.displayError,
    );

    return TextField(
      key: const Key('registerForm_emailInput_textField'),
      onChanged: (email) {
        context.read<RegisterBloc>().add(LoginRegisterEmailChanged(email));
      },
      decoration: InputDecoration(
        labelText: 'email',
        errorText: displayError == null ? null : 'invalid email',
      ),
    );
  }
}

class _PasswordInput extends StatelessWidget {
  String? getErrorText(PasswordValidationError? displayError) {
    switch (displayError) {
      case PasswordValidationError.empty:
        return 'Password cannot be empty';
      case PasswordValidationError.tooShort:
        return 'Password must be at least 8 characters';
      default:
        return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    final displayError = context.select(
      (RegisterBloc bloc) => bloc.state.password.displayError,
    );

    return TextField(
      key: const Key('registerForm_passwordInput_textField'),
      onChanged: (password) {
        context.read<RegisterBloc>().add(LoginRegisterPasswordChanged(password));
      },
      obscureText: true,
      decoration: InputDecoration(
        labelText: 'password',
        errorText: displayError != null ? getErrorText(displayError) : null,
      ),
    );
  }
}

class _ConfirmPasswordInput extends StatelessWidget {
  String? getErrorText(ConfirmPasswordValidationError? displayError) {
    switch (displayError) {
      case ConfirmPasswordValidationError.empty:
        return 'Please confirm your password';
      case ConfirmPasswordValidationError.mismatch:
        return 'Passwords must match';
      default:
        return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    final displayError = context.select(
      (RegisterBloc bloc) => bloc.state.confirmPassword.displayError,
    );

    return TextField(
      key: const Key('registerForm_confirmPasswordInput_textField'),
      onChanged: (password) {
        context.read<RegisterBloc>().add(LoginRegisterConfirmPasswordChanged(password));
      },
      obscureText: true,
      decoration: InputDecoration(
        labelText: 'confirm password',
        errorText: displayError != null ? getErrorText(displayError) : null,
      ),
    );
  }
}

class _RegisterButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final isInProgressOrSuccess = context.select(
      (RegisterBloc bloc) => bloc.state.status.isInProgressOrSuccess,
    );

    if (isInProgressOrSuccess) return const CircularProgressIndicator();

    final isValid = context.select((RegisterBloc bloc) => bloc.state.isValid);

    return ElevatedButton(
      key: const Key('registerForm_continue_raisedButton'),
      onPressed: isValid
          ? () =>
                context.read<RegisterBloc>().add(const LoginRegisterSubmitted())
          : null,
      child: const Text('Register'),
    );
  }
}
