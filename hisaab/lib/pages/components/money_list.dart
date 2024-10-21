import 'package:flutter/material.dart';
import 'package:hisaab/models/money.dart';
import 'package:hisaab/models/money_database.dart';
import 'package:provider/provider.dart';

class MoneyList extends StatefulWidget {
  const MoneyList({super.key});

  @override
  State<MoneyList> createState() => _MoneyListState();
}

class _MoneyListState extends State<MoneyList> {
  void deleteMoney(id){
    context.read<MoneyDatabase>().deleteMonet(id);
  }

  @override
  Widget build(BuildContext context) {
    final moneyDatabase = context.watch<MoneyDatabase>();
    List<Money> currentMoney = moneyDatabase.currentMoney;
    return ListView.builder(
        itemCount: currentMoney.length,
        itemBuilder: (context, index){
          final money = currentMoney[currentMoney.length - index -1];
          return Container(
            width: 200,
            height: 60,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8),
              color: Theme.of(context).colorScheme.primary
            ),
            margin: const EdgeInsets.only(left: 10, right: 10, top: 5),
            child: Center(
                child: ListTile(
                  textColor: Theme.of(context).colorScheme.inversePrimary,
                  iconColor: Theme.of(context).colorScheme.inversePrimary,
                  title: Row(children: [
                    const Icon(Icons.currency_rupee),
                    Text(money.ammount.toString())
                  ]),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text("${money.date.hour}:${money.date.minute>9?money.date.minute:"0${money.date.minute}"}"),
                      const SizedBox(width: 10,),
                      GestureDetector(
                        onTap: (){
                          deleteMoney(money.id);
                        },
                        child: const Icon(Icons.delete),
                      )
                    ],
                  ),
                  contentPadding: const EdgeInsets.symmetric(horizontal: 20),
                ),
              ),
            
          );
        },
      );
  }
}