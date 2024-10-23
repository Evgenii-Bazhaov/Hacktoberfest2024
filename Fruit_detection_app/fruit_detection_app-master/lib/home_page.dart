// home_page.dart
import 'package:flutter/material.dart';
import 'package:login_page_day_23/profile_management_page.dart';
import 'package:login_page_day_23/calories_counter_page.dart';
import 'package:login_page_day_23/notes.dart';

void main() {
  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    home: HomePage(),
  ));
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Home Page'),
      ),
      body: Center(
        child: Text('Welcome to the Home Page!',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
              child: Text(
                'vedant yaha icon dal dena',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                ),
              ),
            ),
            ListTile(
              leading: Icon(Icons.account_circle),
              title: Text('Profile Management'),
              onTap: () {
                Navigator.pop(context);
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => ProfileManagementPage()));
              },
            ),
            ListTile(
              leading: Icon(Icons.fastfood),
              title: Text('Calories Counter'),
              onTap: () {
                Navigator.pop(context);
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => CaloriesCounterPage()));
              },
            ),
            ListTile(
              leading: Icon(Icons.scanner),
              title: Text('Nutrients Diary'),
              onTap: () {
                Navigator.pop(context);
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => EventCalendarScreen()));
              },
            ),
          ],
        ),
      ),
    );
  }
}
