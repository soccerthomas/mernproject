import 'package:authentication_repository/authentication_repository.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/email_verification/bloc/email_verification_bloc.dart';

import 'email_verification_form.dart';

class EmailVerificationPage extends StatelessWidget {
  final String _email;

  const EmailVerificationPage(String email, {super.key}) : _email = email;

  static Route<void> route(String email) {
    return MaterialPageRoute(builder: (_) => EmailVerificationPage(email));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Enter Verification Code')),
      body: Padding(
        padding: const EdgeInsets.all(12),
        child: BlocProvider(
          create: (context) => EmailVerificationBloc(
            authenticationRepository: context.read<AuthenticationRepository>(),
            email: _email,
          ),
          child: const EmailVerificationForm(),
        ),
      ),
    );
  }
}
