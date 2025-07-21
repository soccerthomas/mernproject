import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:formz/formz.dart';
import 'package:mobile/authentication/models/confirm_password.dart';
import 'package:mobile/authentication/models/password.dart';

import '../bloc/forgot_password_bloc.dart';

class NewPasswordForm extends StatelessWidget {
  const NewPasswordForm({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocListener<ForgotPasswordBloc, ForgotPasswordState>(
      listenWhen:(previous, current) => previous.passwordStatus != current.passwordStatus,
      listener: (context, state) {
        if (state.passwordStatus.isSuccess) {
          ScaffoldMessenger.of(context)
            ..hideCurrentSnackBar()
            ..showSnackBar(
              const SnackBar(content: Text('Password Changed Successfully')),
            );
          Navigator.of(context).pop();
        }
      },
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            'Enter your new password',
            style: Theme.of(context).textTheme.titleMedium,
          ),
          const SizedBox(height: 48),
          _PasswordInput(),
          const SizedBox(height: 12),
          _ConfirmPasswordInput(),
          const SizedBox(height: 24),
          _SubmitButton(),
        ],
      ),
    );
  }
}

class _PasswordInput extends StatelessWidget {
  String? getErrorText(PasswordValidationError? error) {
    switch (error) {
      case PasswordValidationError.empty:
        return 'Password cannot be empty';
      case PasswordValidationError.includesWhiteSpace:
        return 'Password cannot contain spaces';
      case PasswordValidationError.tooShort:
        return 'Password must be at least 8 characters';
      case PasswordValidationError.missingNumber:
        return 'Password must contain at least one number';
      default:
        return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    final displayError = context.select(
      (ForgotPasswordBloc bloc) => bloc.state.newPassword.displayError,
    );

    return TextField(
      onChanged: (newPassword) {
        context.read<ForgotPasswordBloc>().add(
          ForgotPasswordPasswordChanged(newPassword),
        );
      },
      obscureText: true,
      decoration: InputDecoration(
        labelText: 'password',
        errorText: displayError == null ? null : getErrorText(displayError),
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
      (ForgotPasswordBloc bloc) => bloc.state.confirmPassword.displayError,
    );

    return TextField(
      onChanged: (password) {
        context.read<ForgotPasswordBloc>().add(
          ForgotPasswordConfirmPasswordChanged(password),
        );
      },
      obscureText: true,
      decoration: InputDecoration(
        labelText: 'confirm password',
        errorText: displayError != null ? getErrorText(displayError) : null,
      ),
    );
  }
}

class _SubmitButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final isInProgressOrSuccess = context.select(
      (ForgotPasswordBloc bloc) =>
          bloc.state.passwordStatus.isInProgressOrSuccess,
    );

    if (isInProgressOrSuccess) return const CircularProgressIndicator();

    final isValid = context.select(
      (ForgotPasswordBloc bloc) => bloc.state.isValidPassword,
    );

    return ElevatedButton(
      onPressed: isValid
          ? () => context.read<ForgotPasswordBloc>().add(
              const ForgotPasswordPasswordSubmitted(),
            )
          : null,
      child: const Text('Submit'),
    );
  }
}
