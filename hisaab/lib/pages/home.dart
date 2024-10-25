import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:hisaab/models/money_database.dart';
import 'package:provider/provider.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> with SingleTickerProviderStateMixin {

  late AnimationController _sliding; 
  late Animation<Offset> _offsetAnimation;

  @override
  void initState(){
    super.initState();

  _sliding = AnimationController(
    duration: const Duration(milliseconds: 700),
    vsync: this,
  );
  _offsetAnimation = Tween<Offset>(
    begin: Offset.zero,
    end: const Offset(5, 0)
  ).animate(CurvedAnimation(parent: _sliding, curve: Curves.ease));
  _sliding.addStatusListener((status) {
    if(status == AnimationStatus.completed){
      _sliding.reset();
    }
  });
  
    showMoney();
  }

  TextEditingController ammount = TextEditingController();

  @override
  void dispose(){
    _sliding.dispose();
    super.dispose();
  }

  void addMoney(){
    if(int.tryParse(ammount.text) is int){
      context.read<MoneyDatabase>().addMoney(int.tryParse(ammount.text)??0);
      _sliding.forward();
    }
    ammount.text = "";
    FocusScope.of(context).requestFocus(FocusNode());
  }

  void showMoney(){
    context.read<MoneyDatabase>().getMoney();
  }

  final FocusNode _focusNode = FocusNode();

  @override
  Widget build(BuildContext context) {
    return Center(
          child:  Padding(
            padding: const EdgeInsets.only(top: 250, left: 30, right: 30),
            child: Column(
              children: [
                // Lottie.asset('../assets/animations/done.json'),
                TextField(
                  controller: ammount,
                  focusNode: _focusNode,
                  keyboardType: TextInputType.number, // Set keyboard type to numeric
                  inputFormatters: [
                    FilteringTextInputFormatter.digitsOnly, // Allow only digits
                  ],
                  textAlign: TextAlign.center,
                  cursorColor:  Theme.of(context).colorScheme.inversePrimary,
                  decoration: InputDecoration(
                    border: const OutlineInputBorder(),
                    filled: true,
                    fillColor:  Theme.of(context).colorScheme.primary,
                    hintText: "ammount",
                    hintStyle: const TextStyle(color: Color.fromARGB(170, 255, 255, 255)),
                    contentPadding: const EdgeInsets.symmetric(vertical: 17),
                    prefixIcon: SlideTransition(
                      position: _offsetAnimation, 
                      child: Icon(Icons.arrow_forward, color:  Theme.of(context).colorScheme.inversePrimary),
                    ),
                    suffixIcon: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.currency_rupee, color:  Theme.of(context).colorScheme.inversePrimary),
                      ],
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderSide: BorderSide(color:  Theme.of(context).colorScheme.inversePrimary), // Set focused border color
                    ),
                  ),
                  style: TextStyle(
                    color:  Theme.of(context).colorScheme.inversePrimary, 
                    fontSize: 17, 
                    fontWeight: FontWeight.bold
                  )
                ),
                Container(
                  margin: const EdgeInsets.only(top: 20),
                  child: ElevatedButton(
                    onPressed: addMoney,
                    style: ButtonStyle(
                      padding: MaterialStateProperty.all(const EdgeInsets.symmetric(horizontal: 40)),
                      shape: MaterialStateProperty.all(
                        RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(5)
                        )
                      )
                    ), 
                    child: const Text(
                      "ADD",
                      style: TextStyle(
                        height: 3.7,
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                    ),
                  )
                ),
                // const  History()
              ],
            )
          )
      );
  }
}