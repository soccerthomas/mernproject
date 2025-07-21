import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:formz/formz.dart';
import 'package:mobile/forgot_password/bloc/forgot_password_bloc.dart';
import 'package:pinput/pinput.dart';

class CodeForm extends StatelessWidget {
  const CodeForm({super.key});

  @override
  Widget build(BuildContext context) {
    final email = context.read<ForgotPasswordBloc>().state.email.value;

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text('A verification code has been sent to $email'),
        const SizedBox(height: 48),
        Text(
          'Enter Verification Code',
          style: Theme.of(context).textTheme.titleMedium,
        ),
        const SizedBox(height: 24),
        Pinput(
          length: 6,
          onChanged: (code) {
            context.read<ForgotPasswordBloc>().add(
              ForgotPasswordCodeChanged(code),
            );
          },
          onCompleted: (_) {
            context.read<ForgotPasswordBloc>().add(
              const ForgotPasswordCodeSubmitted(),
            );
          },
        ),
        const SizedBox(height: 30),
        BlocBuilder<ForgotPasswordBloc, ForgotPasswordState>(
          builder: (context, state) {
            return state.codeStatus.isInProgressOrSuccess
                ? const SizedBox(height: 48, child: CircularProgressIndicator())
                : const SizedBox(height: 48);
          },
        ),
      ],
    );
  }
}
