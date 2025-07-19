import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/login/bloc/login_bloc.dart';
import 'package:formz/formz.dart';
import 'package:mobile/login_register/bloc/login_register_bloc.dart';
import 'package:mobile/register/view/register_page.dart';

class LoginForm extends StatelessWidget {
  const LoginForm({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocListener<LoginBloc, LoginRegisterState>(
      listenWhen: (previous, current) => previous.status != current.status,
      listener: (context, state) {
        if (state.status.isFailure) {
          ScaffoldMessenger.of(context)
            ..hideCurrentSnackBar()
            ..showSnackBar(
              SnackBar(
                content: Text(state.errorMessage ?? 'Authentication Failure'),
              ),
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
            _PasswordInput(),
            const Padding(padding: EdgeInsets.all(12)),
            _LoginButton(),
            const Padding(padding: EdgeInsets.all(12)),
            _registerButton(context)
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
      (LoginBloc bloc) => bloc.state.username.displayError,
    );

    return TextField(
      key: const Key('loginForm_usernameInput_textField'),
      onChanged: (username) {
        context.read<LoginBloc>().add(LoginRegisterUsernameChanged(username));
      },
      decoration: const InputDecoration(
        labelText: 'username',
      ),
    );
  }
}

class _PasswordInput extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final displayError = context.select(
      (LoginBloc bloc) => bloc.state.password.displayError,
    );

    return TextField(
      key: const Key('registerForm_passwordInput_textField'),
      onChanged: (password) {
        context.read<LoginBloc>().add(LoginRegisterPasswordChanged(password));
      },
      obscureText: true,
      decoration: const InputDecoration(
        labelText: 'password',
      ),
    );
  }
}

class _LoginButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final isInProgressOrSuccess = context.select(
      (LoginBloc bloc) => bloc.state.status.isInProgressOrSuccess,
    );

    if (isInProgressOrSuccess) return const CircularProgressIndicator();

    return ElevatedButton(
      key: const Key('loginForm_continue_raisedButton'),
      onPressed: () => context.read<LoginBloc>().add(const LoginRegisterSubmitted()),
      child: const Text('Login'),
    );
  }
}

Widget _registerButton(BuildContext context) => TextButton(
  onPressed: () {
    Navigator.of(context).push(RegisterPage.route());
  }, 
  child: const Text('Create an account')
);
