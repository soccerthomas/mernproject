import 'package:authentication_repository/authentication_repository.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/authentication/authentication.dart';
import 'package:mobile/home/home.dart';
import 'package:mobile/login/login.dart';
import 'package:mobile/splash/splash.dart';
import 'package:mobile/theme/theme.dart';
import 'package:tier_lists_repository/tier_lists_repository.dart';

class App extends StatelessWidget {
  final LocalTierListsApi localTierListsApi;

  const App({
    super.key,
    required this.localTierListsApi
  });

  @override
  Widget build(BuildContext context) {
    return MultiRepositoryProvider(
      providers: [
        RepositoryProvider(
          create: (_) => AuthenticationRepository(),
          dispose: (repository) => repository.dispose(),
        ),
        RepositoryProvider(
          create: (_) => TierListsRepository(localTierListsApi: localTierListsApi),
          dispose: (repository) => repository.dispose(),
        )
      ],
      child: BlocProvider(
        lazy: false,
        create: (context) =>
            AuthenticationBloc(
              authenticationRepository: context
                  .read<AuthenticationRepository>(),
            )..add(
              AuthenticationSubscriptionRequested(),
            ), // .. is cascade syntax: calls .add() but returns from AuthenticationBloc() instead
        child: const AppView(),
      ),
    );
  }
}

class AppView extends StatefulWidget {
  const AppView({super.key});

  @override
  State<AppView> createState() => _AppViewState();
}

class _AppViewState extends State<AppView> {
  final _navigatorKey = GlobalKey<NavigatorState>();

  NavigatorState get _navigator => _navigatorKey.currentState!;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      navigatorKey: _navigatorKey,
      theme: TierMasterTheme.theme,
      builder: (context, child) {
        return BlocListener<AuthenticationBloc, AuthenticationState>(
          listener: (context, state) {
            switch (state.status) {
              case AuthenticationStatus.authenticated:
                _navigator.pushAndRemoveUntil<void>(
                  HomePage.route(),
                  (route) => false,
                );
              case AuthenticationStatus.unauthenticated:
                _navigator.pushAndRemoveUntil<void>(
                  LoginPage.route(),
                  (route) => false,
                );
              case AuthenticationStatus.unknown:
                break;
            }
          },
          child: child,
        );
      },
      onGenerateRoute: (_) => SplashPage.route(),
    );
  }
}
