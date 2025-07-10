import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';

part 'add_tier_list_state.dart';

class AddTierListCubit extends Cubit<AddTierListState> {
  AddTierListCubit() : super(const AddTierListState());

  void onNameChanged(String name) {
    emit(state.copyWith(
      name: name,
    ));
  }

  void onDescriptionChanged(String description) {
    emit(state.copyWith(description: description));
  }

  void submit() {
    emit(state.copyWith(status: AddTierListStatus.success));
  }
}