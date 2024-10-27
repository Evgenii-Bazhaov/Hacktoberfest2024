import 'package:flutter/material.dart';
import 'package:hisaab/theme/theme_provider.dart';
import 'package:provider/provider.dart';
import 'components/money_list.dart';
import '../app_bar.dart';
import '../bottom_bar.dart';

class History extends StatefulWidget {
  const History({super.key});

  @override
  State<History> createState() => _HistoryState();
}

class _HistoryState extends State<History> {

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: const Scaffold(
        appBar: MyAppBar(),
        body:  MoneyList(),
        bottomNavigationBar: BottomBar(),
      ),
      theme: Provider.of<ThemeProvider>(context).themeData,
    );
  }
}