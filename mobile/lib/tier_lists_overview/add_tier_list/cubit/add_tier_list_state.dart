part of 'add_tier_list_cubit.dart';

enum AddTierListStatus { initial, submitting, success, failure }

class AddTierListState extends Equatable {
  final AddTierListStatus status;
  final String name;
  final String description;

  const AddTierListState({
    this.status = AddTierListStatus.initial,
    this.name = '',
    this.description = '',
  });

  bool get isValid => name.trim().isNotEmpty;

  AddTierListState copyWith({
    AddTierListStatus? status,
    String? name,
    String? description,
  }) {
    return AddTierListState(
      status: status ?? this.status,
      name: name ?? this.name,
      description: description ?? this.description,
    );
  }

  @override
  List<Object> get props => [status, name, description];
}