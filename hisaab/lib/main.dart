import 'package:flutter/material.dart';
import 'package:hisaab/app_bar.dart';
import 'package:hisaab/bottom_bar.dart';
import 'package:hisaab/models/money_database.dart';
import 'package:hisaab/theme/theme_provider.dart';
import 'package:provider/provider.dart';
import 'pages/home.dart';

void main() async{
  WidgetsFlutterBinding.ensureInitialized();
  await MoneyDatabase().init();

  runApp(MultiProvider(
    providers: [
      ChangeNotifierProvider(create: (context)=>MoneyDatabase()),
      ChangeNotifierProvider(create: (context)=>ThemeProvider()),
    ],
    child: const MyApp()
    )
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return  MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: const MyAppBar(),
        backgroundColor: Theme.of(context).colorScheme.secondary,
        body: const HomePage(),
        bottomNavigationBar: const BottomBar(),
      ),
      theme: Provider.of<ThemeProvider>(context).themeData,
    );
  }
}

