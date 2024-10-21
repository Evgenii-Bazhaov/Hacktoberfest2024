import 'package:flutter/material.dart';
import 'package:hisaab/theme/theme_provider.dart';
import 'package:provider/provider.dart';
import '../app_bar.dart';
import '../bottom_bar.dart';

class Settings extends StatelessWidget {
  const Settings({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: const MyAppBar(),
        body: Column(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const SizedBox(height: 20),
                    Container(
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
                          title: const Row(children: [
                            Text("Theme")
                          ]),
                          trailing: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              const Text("hi"),
                              const SizedBox(width: 10,),
                              GestureDetector(
                                onTap: (){
                                  
                                },
                                child: const Icon(Icons.delete),
                              )
                            ],
                          ),
                          contentPadding: const EdgeInsets.symmetric(horizontal: 20),
                        ),
                      ),
                    ),
                    const SizedBox(height: 10,)
                  ],
                ),
        bottomNavigationBar: const BottomBar(),
      ),
      theme: Provider.of<ThemeProvider>(context).themeData,
    );
  }
}

