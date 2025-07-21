import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:formz/formz.dart';
import 'package:mobile/forgot_password/bloc/forgot_password_bloc.dart';

class EmailForm extends StatelessWidget {
  const EmailForm({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          'Enter your email address',
          style: Theme.of(context).textTheme.titleMedium,
        ),
        const SizedBox(height: 48),
        _EmailInput(),
        const SizedBox(height: 24),
        _SendCodeButton(),
      ],
    );
  }
}

class _EmailInput extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final displayError = context.select(
      (ForgotPasswordBloc bloc) => bloc.state.email.displayError,
    );

    return TextField(
      onChanged: (email) {
        context.read<ForgotPasswordBloc>().add(
          ForgotPasswordEmailChanged(email),
        );
      },
      decoration: InputDecoration(
        errorText: displayError == null ? null : 'invalid email'
      ),
    );
  }
}

class _SendCodeButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final isInProgressOrSuccess = context.select(
      (ForgotPasswordBloc bloc) => bloc.state.emailStatus.isInProgressOrSuccess
    );

    if (isInProgressOrSuccess) return const CircularProgressIndicator();

    final isValid = context.select((ForgotPasswordBloc bloc) => bloc.state.isValidEmail);

    return ElevatedButton(
      onPressed: isValid
          ? () => context.read<ForgotPasswordBloc>().add(const ForgotPasswordEmailSubmitted())
          : null, 
      child: const Text('Send Verification Code')
    );
  }
}