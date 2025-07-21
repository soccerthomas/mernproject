import 'package:authentication_repository/authentication_repository.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:formz/formz.dart';
import 'package:mobile/forgot_password/bloc/forgot_password_bloc.dart';
import 'code_form.dart';
import 'email_form.dart';
import 'new_password_form.dart';

class ForgotPasswordPage extends StatelessWidget {
  const ForgotPasswordPage({super.key});

  static Route<void> route() {
    return MaterialPageRoute(builder: (_) => const ForgotPasswordPage());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Reset Password')),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: BlocProvider(
          create: (context) =>
              ForgotPasswordBloc(context.read<AuthenticationRepository>()),
          child: BlocListener<ForgotPasswordBloc, ForgotPasswordState>(
            listenWhen: (previous, current) =>
                previous.emailStatus != current.emailStatus ||
                previous.codeStatus != current.codeStatus ||
                previous.passwordStatus != current.passwordStatus,
            listener: (context, state) {
              if (state.emailStatus.isFailure ||
                  state.codeStatus.isFailure ||
                  state.passwordStatus.isFailure) {
                ScaffoldMessenger.of(context)
                  ..hideCurrentSnackBar()
                  ..showSnackBar(
                    SnackBar(
                      content: Text(
                        state.errorMessage ?? 'Password Reset Error',
                      ),
                    ),
                  );
              }
            },
            child: BlocBuilder<ForgotPasswordBloc, ForgotPasswordState>(
              builder: (context, state) {
                return AnimatedSwitcher(
                  duration: const Duration(milliseconds: 300),
                  child: Align(
                    alignment: const Alignment(0, -1 / 3),
                    child: _getCurrentForm(state),
                  ),
                );
              },
            ),
          ),
        ),
      ),
    );
  }

  Widget _getCurrentForm(ForgotPasswordState state) {
    if (state.emailStatus.isSuccess && state.codeStatus.isSuccess) {
      return const NewPasswordForm(key: ValueKey('NewPasswordForm'));
    } else if (state.emailStatus.isSuccess) {
      return const CodeForm(key: ValueKey('CodeForm'));
    } else {
      return const EmailForm(key: ValueKey('EmailForm'));
    }
  }
}