import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:formz/formz.dart';
import 'package:mobile/login/view/login_page.dart';
import 'package:pinput/pinput.dart';

import '../bloc/email_verification_bloc.dart';

class EmailVerificationForm extends StatelessWidget {
  const EmailVerificationForm({super.key});

  @override
  Widget build(BuildContext context) {
    final email = context.read<EmailVerificationBloc>().email;

    return BlocListener<EmailVerificationBloc, EmailVerificationState>(
      listenWhen: (previous, current) => previous.status != current.status,
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
            BlocBuilder<EmailVerificationBloc, EmailVerificationState>(
              builder: (context, state) {
                return state.status.isInProgress
                    ? const CircularProgressIndicator()
                    : Pinput(
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
                      );
              },
            ),
          ],
        ),
      ),
    );
  }
}
