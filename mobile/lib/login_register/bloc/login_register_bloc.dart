import 'package:authentication_repository/authentication_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:formz/formz.dart';
import 'package:equatable/equatable.dart';
import 'package:mobile/authentication/models/confirm_password.dart';
import '../../authentication/models/username.dart';
import '../../authentication/models/password.dart';
import '../../authentication/models/email.dart';

part 'login_register_event.dart';
part 'login_register_state.dart';

abstract class LoginRegisterBloc extends Bloc<LoginRegisterEvent, LoginRegisterState> {
  final AuthenticationRepository authenticationRepository;

  LoginRegisterBloc({required this.authenticationRepository})
    : super(const LoginRegisterState());
}