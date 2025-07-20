import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:formz/formz.dart';
import 'package:pinput/pinput.dart';

import '../bloc/email_verification_bloc.dart';

class EmailVerificationForm extends StatelessWidget {
  const EmailVerificationForm({super.key});

  @override
  Widget build(BuildContext context) {
    final email = context.read<EmailVerificationBloc>().email;

    return BlocListener<EmailVerificationBloc, EmailVerificationState>(
      listenWhen: (previous, current) =>
          previous.status != current.status ||
          previous.resendEmailStatus != current.resendEmailStatus,
      listener: (context, state) {
        if (state.status.isFailure) {
          ScaffoldMessenger.of(context)
            ..hideCurrentSnackBar()
            ..showSnackBar(
              SnackBar(
                content: Text(state.errorMessage ?? 'Verification Failure'),
              ),
            );
        } else if (state.status.isSuccess) {
          ScaffoldMessenger.of(context)
            ..hideCurrentSnackBar()
            ..showSnackBar(
              const SnackBar(content: Text('Verification Successful')),
            );
          Navigator.of(context).pop();
        }

        if (state.resendEmailStatus == ResendEmailStatus.success) {
          ScaffoldMessenger.of(context)
            ..hideCurrentSnackBar()
            ..showSnackBar(
              const SnackBar(content: Text('Email has been sent')),
            );
        } else if (state.resendEmailStatus == ResendEmailStatus.failure) {
          ScaffoldMessenger.of(context)
            ..hideCurrentSnackBar()
            ..showSnackBar(
              SnackBar(
                content: Text(state.errorMessage ?? 'Failed to send email'),
              ),
            );
        }
      },
      child: Align(
        alignment: const Alignment(0, -1 / 3),
        child: Column(
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
                context.read<EmailVerificationBloc>().add(
                  EmailVerificationCodeChanged(code),
                );
              },
              onCompleted: (_) {
                context.read<EmailVerificationBloc>().add(
                  const EmailVerificationSubmitted(),
                );
              },
            ),
            const SizedBox(height: 30),
            BlocBuilder<EmailVerificationBloc, EmailVerificationState>(
              builder: (context, state) {
                return state.status.isInProgressOrSuccess ||
                        state.resendEmailStatus == ResendEmailStatus.sending
                    ? const CircularProgressIndicator()
                    : TextButton(
                        onPressed: () {
                          context.read<EmailVerificationBloc>().add(
                            const EmailVerificationResendEmailRequested(),
                          );
                        },
                        child: const Text('Resend verification code'),
                      );
              },
            ),
          ],
        ),
      ),
    );
  }
}
