part of 'home_cubit.dart';

enum HomeTab { tierLists, settings }

final class HomeState extends Equatable {
  final HomeTab tab;
  
  const HomeState({
    this.tab = HomeTab.tierLists,
  });

  @override
  List<Object> get props => [tab];
}