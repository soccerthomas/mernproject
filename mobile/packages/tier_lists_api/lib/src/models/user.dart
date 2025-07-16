import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:meta/meta.dart';
import 'json_map.dart';

part 'user.g.dart';

@immutable
@JsonSerializable()
class User extends Equatable {
  final String id;
  final String username;
  final String email;

  const User({
    required this.id,
    required this.username,
    required this.email,
  });

  static User fromJson(JsonMap json) => _$UserFromJson(json);
  JsonMap toJson() => _$UserToJson(this);

  @override
  List<Object> get props => [id, username, email];
}