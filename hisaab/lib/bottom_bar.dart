import 'package:flutter/material.dart';
import 'package:hisaab/main.dart';
import 'package:hisaab/pages/history.dart';
import 'package:hisaab/pages/settings.dart';

class BottomBar extends StatefulWidget {
  const BottomBar({super.key});

  @override
  State<BottomBar> createState() => _BottomBarState();
}

class _BottomBarState extends State<BottomBar> {
  @override
  Widget build(BuildContext context) {
    return BottomAppBar(
          color: Theme.of(context).colorScheme.primary,
          height: 60, // Background color of the bottom app bar
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              IconButton(
                icon: const Icon(Icons.home),
                onPressed: () {
                  Navigator.push(context, MaterialPageRoute(builder: (context)=> MyApp()));
                },
                color: Theme.of(context).colorScheme.inversePrimary,
              ),
              IconButton(
                icon: const Icon(Icons.card_giftcard),
                onPressed: () {
                  Navigator.push(context, MaterialPageRoute(builder: (context)=> History()));
                },
                color: Theme.of(context).colorScheme.inversePrimary,
              ),
              IconButton(
                icon: const Icon(Icons.settings),
                onPressed: () {
                  Navigator.push(context, MaterialPageRoute(builder: (context)=> Settings()));
                },
                color: Theme.of(context).colorScheme.inversePrimary,
              ),
            ],
          ),
        );
  }
}
