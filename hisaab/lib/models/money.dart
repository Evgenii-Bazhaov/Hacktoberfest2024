import 'package:isar/isar.dart';

//dart run build_runner build 
part 'money.g.dart';

@Collection()
class Money {
  Id id = Isar.autoIncrement;
  DateTime date = DateTime.now();
  late int ammount;
}