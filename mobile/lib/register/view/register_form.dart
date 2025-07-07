import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:formz/formz.dart';
import 'package:mobile/login_register.dart/bloc/login_register_bloc.dart';
import 'package:mobile/login_register.dart/widgets/password_input.dart';
import 'package:mobile/login_register.dart/widgets/username_input.dart';
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
              SnackBar(content: Text(state.errorMessage ?? 'Unknown Error')),
            );
        }
      },
      child: Align(
        alignment: const Alignment(0, -1 / 3),
        child: Column(
          children: [
            _usernameInput(),
            const Padding(padding: EdgeInsets.all(12)),
            _passwordInput(),
            const Padding(padding: EdgeInsets.all(12)),
            _RegisterButton(),
          ],
        ),
      ),
    );
  }
}

Widget _usernameInput() => BlocBuilder<RegisterBloc, LoginRegisterState>(
  buildWhen: (previous, current) => previous.username != current.username,
  builder: (context, state) => UsernameInput(
    keyText: 'registerForm_usernameInput_textField',
    onChanged: (username) =>
        context.read<RegisterBloc>().add(LoginRegisterUsernameChanged(username)),
    errorText: state.username.displayError == null ? null : 'invalid username',
  ),
);

Widget _passwordInput() => BlocBuilder<RegisterBloc, LoginRegisterState>(
  buildWhen: (previous, current) => previous.password != current.password,
  builder: (context, state) => PasswordInput(
    onChanged: (password) =>
        context.read<RegisterBloc>().add(LoginRegisterPasswordChanged(password)),
    keyText: 'registerForm_passwordInput_textField',
    errorText: state.password.displayError == null ? null : 'invalid password',
  ),
);

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
          ? () => context.read<RegisterBloc>().add(const LoginRegisterSubmitted())
          : null,
      child: const Text('Register'),
    );
  }
}