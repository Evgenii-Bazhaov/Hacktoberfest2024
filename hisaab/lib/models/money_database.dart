import 'package:flutter/material.dart';
import 'package:hisaab/models/money.dart';
import 'package:isar/isar.dart';
import 'package:path_provider/path_provider.dart';

class MoneyDatabase extends ChangeNotifier{
  static late Isar isar;

  //init db
  Future<void> init() async{
    final dir = await getApplicationDocumentsDirectory();
    isar = await Isar.open([MoneySchema], directory: dir.path);
  }

  final List<Money> currentMoney = [];

  //create
  Future <void> addMoney(int moneyInput) async{
    final newMoney = Money()..ammount = moneyInput;
    await isar.writeTxn(() => isar.moneys.put(newMoney));
    getMoney();
  }

  //read
  Future<void> getMoney() async{
    List<Money> allMoney = await isar.moneys.where().findAll();
    currentMoney.clear();
    currentMoney.addAll(allMoney);
    notifyListeners();
  }

  //update
  Future<void> updateMoney(int id, int ammount) async{
    final existingMoney = await isar.moneys.get(id);
    if(existingMoney==null) return;

    existingMoney.ammount = ammount;
    await isar.writeTxn(() => isar.moneys.put(existingMoney));
    await getMoney();
  }

  //delete
  Future<void> deleteMonet(int id) async{
    await isar.writeTxn(() => isar.moneys.delete(id));
    await getMoney();
  }

}