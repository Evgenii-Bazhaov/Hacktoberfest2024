import 'package:flutter/material.dart';

ThemeData darkMode = ThemeData(
  brightness: Brightness.dark,
  colorScheme: ColorScheme.dark(
    background: const Color.fromARGB(255, 24, 24, 24),
    primary: const Color.fromARGB(255, 34, 34, 34),
    secondary: const Color.fromARGB(255, 49, 49, 49),
    inversePrimary: Colors.grey.shade300,
  ),
  fontFamily: 'Inter'
);

ThemeData lightMode = ThemeData(
  brightness: Brightness.light,
  colorScheme: const ColorScheme.light(
    background: Color.fromARGB(255, 3, 7, 17),
    primary: Color.fromARGB(255, 15, 22, 41),
    secondary: Color.fromARGB(255, 3, 7, 17),
    inversePrimary: Colors.white,
  ),
  fontFamily: 'Inter'
);