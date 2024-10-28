import 'package:flutter/material.dart';
import 'package:login_page_day_23/fruit.dart';

class CaloriesCounterPage extends StatefulWidget {
  @override
  _CaloriesCounterPageState createState() => _CaloriesCounterPageState();
}

class _CaloriesCounterPageState extends State<CaloriesCounterPage> {
  final List<Fruit> fruits = [
    Fruit('Apple', 95),
    Fruit('Banana', 105),
    Fruit('Orange', 62),
    Fruit('Strawberry', 4), // per berry
    Fruit('Grapes', 3),
    Fruit('Watermelon', 46),
    Fruit('Peach', 59),
    Fruit('Pear', 57),
    Fruit('Plum', 46),
    Fruit('Cherry', 50),
    Fruit('Mango', 99),
    Fruit('Pineapple', 50),
    Fruit('Kiwi', 61),
    Fruit('Blueberry', 57),
    Fruit('Raspberry', 64),
    Fruit('Cranberry', 46),
    Fruit('Blackberry', 43),
    Fruit('Pomegranate', 83),
    Fruit('Lemon', 29),
    Fruit('Lime', 30),
    Fruit('Coconut', 283),
    Fruit('Papaya', 43),
    Fruit('Apricot', 48),
    Fruit('Fig', 107),
    Fruit('Guava', 68),
    Fruit('Lychee', 66),
    Fruit('Passion Fruit', 17),
    Fruit('Dragon Fruit', 60),
    Fruit('Avocado', 160),
    Fruit('Cantaloupe', 34),
    Fruit('Honeydew', 64),
    Fruit('Tangerine', 47),
    Fruit('Nectarine', 62),
    Fruit('Persimmon', 118),
    Fruit('Star Fruit', 28),
    Fruit('Elderberry', 73),
    Fruit('Gooseberry', 66),
    Fruit('Jackfruit', 95),
    Fruit('Kumquat', 71),
    Fruit('Mulberry', 43),
    Fruit('Plantain', 122),
    Fruit('Quince', 57),
    Fruit('Soursop', 66),
    Fruit('Tamarind', 287),
    Fruit('Ugli Fruit', 45),
    Fruit('Yuzu', 29),
    Fruit('Ackee', 151),
    Fruit('Bilberry', 43),
    Fruit('Cherimoya', 75),
    Fruit('Durian', 147),
  ];

  int _totalCalories = 0;
  String _searchedFruit = '';
  int _searchedCalories = 0;

  void _addCalories(int calories) {
    setState(() {
      _totalCalories += calories;
    });
  }

  void _searchFruit(String query) {
    setState(() {
      _searchedFruit = query;
      _searchedCalories = fruits
          .firstWhere(
            (fruit) => fruit.name.toLowerCase() == query.toLowerCase(),
            orElse: () => Fruit('', 0),
          )
          .calories;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Calories Counter'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.search),
            onPressed: () async {
              final String? selected = await showSearch<String>(
                context: context,
                delegate:
                    _FruitSearchDelegate(fruits.map((e) => e.name).toList()),
              );
              if (selected != null) {
                _searchFruit(selected);
              }
            },
          ),
        ],
      ),
      body: Column(
        children: <Widget>[
          if (_searchedFruit.isNotEmpty)
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                '$_searchedFruit: $_searchedCalories cal',
                style: TextStyle(fontSize: 18),
              ),
            ),
          Expanded(
            child: ListView.builder(
              itemCount: fruits.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text(fruits[index].name),
                  trailing: Text('${fruits[index].calories} cal'),
                  onTap: () => _addCalories(fruits[index].calories),
                );
              },
            ),
          ),
          Text('Total Calories: $_totalCalories',
              style: TextStyle(fontSize: 20)),
        ],
      ),
    );
  }
}

class _FruitSearchDelegate extends SearchDelegate<String> {
  final List<String> fruitNames;

  _FruitSearchDelegate(this.fruitNames);

  @override
  List<Widget> buildActions(BuildContext context) {
    return [
      IconButton(
        icon: Icon(Icons.clear),
        onPressed: () {
          query = '';
        },
      ),
    ];
  }

  @override
  Widget buildLeading(BuildContext context) {
    return IconButton(
      icon: Icon(Icons.arrow_back),
      onPressed: () {
        close(context, '');
      },
    );
  }

  @override
  Widget buildResults(BuildContext context) {
    final results = fruitNames
        .where((fruit) => fruit.toLowerCase().contains(query.toLowerCase()))
        .toList();
    return ListView.builder(
      itemCount: results.length,
      itemBuilder: (context, index) {
        return ListTile(
          title: Text(results[index]),
          onTap: () {
            close(context, results[index]);
          },
        );
      },
    );
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    final results = fruitNames
        .where((fruit) => fruit.toLowerCase().contains(query.toLowerCase()))
        .toList();
    return ListView.builder(
      itemCount: results.length,
      itemBuilder: (context, index) {
        return ListTile(
          title: Text(results[index]),
          onTap: () {
            close(context, results[index]);
          },
        );
      },
    );
  }
}
