import 'package:flutter/material.dart';

class MyAppBar extends StatelessWidget implements PreferredSizeWidget {
  const MyAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    return AppBar(
          backgroundColor: Theme.of(context).colorScheme.primary,
          foregroundColor: Theme.of(context).colorScheme.inversePrimary,
          title: const Text(
            "HISAAB",
            style: TextStyle(
              fontFamily: "Rusilla", 
              fontSize: 30,
              fontWeight: FontWeight.bold,
              ),
            ),
          centerTitle: true,
        );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}