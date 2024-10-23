export const questionsData = [
  {
    question: "Javascript is an _______ language?",
    options: [
      {
        id: 1,
        value: "Object-Oriented",
        correct: true,
      },
      {
        id: 2,
        value: "Object-Based",
        correct: false,
      },
      {
        id: 3,
        value: "Procedural",
        correct: false,
      },
      {
        id: 4,
        value: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question:
      "Which of the following keywords is used to define a variable in Javascript?",
    options: [
      {
        id: 1,
        value: "var",
        correct: false,
      },
      {
        id: 2,
        value: "let",
        correct: false,
      },
      {
        id: 3,
        value: "Both A and B",
        correct: true,
      },
      {
        id: 4,
        value: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question:
      "Which of the following methods is used to access HTML elements using Javascript?",
    options: [
      {
        id: 1,
        value: "getElementbyId()",
        correct: false,
      },
      {
        id: 2,
        value: "getElementsByClassName()",
        correct: false,
      },
      {
        id: 3,
        value: "Both A and B",
        correct: true,
      },
      {
        id: 4,
        value: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question:
      "Upon encountering empty statements, what does the Javascript Interpreter do?",
    options: [
      {
        id: 1,
        value: "Throws an error",
        correct: false,
      },
      {
        id: 2,
        value: "Ignores the statements",
        correct: true,
      },
      {
        id: 3,
        value: "Gives a warning",
        correct: false,
      },
      {
        id: 4,
        value: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question:
      "Which of the following methods can be used to display data in some form using Javascript?",
    options: [
      {
        id: 1,
        value: "document.write()",
        correct: false,
      },
      {
        id: 2,
        value: "console.log()",
        correct: false,
      },
      {
        id: 3,
        value: "window.alert()",
        correct: false,
      },
      {
        id: 4,
        value: "All of the above",
        correct: true,
      },
    ],
  },
  {
    question: "How can a datatype be declared to be a constant type?",
    options: [
      {
        id: 1,
        value: "const",
        correct: true,
      },
      {
        id: 2,
        value: "var",
        correct: false,
      },
      {
        id: 3,
        value: "let",
        correct: false,
      },
      {
        id: 4,
        value: "constant",
        correct: false,
      },
    ],
  },
  {
    question:
      'What will be the output of the following code snippet?\n\n<script type="text/javascript">\na = 5 + "9";\ndocument.write(a);\n</script>',
    options: [
      {
        id: 1,
        value: "Compilation Error",
        correct: false,
      },
      {
        id: 2,
        value: "14",
        correct: false,
      },
      {
        id: 3,
        value: "Runtime Error",
        correct: false,
      },
      {
        id: 4,
        value: "59",
        correct: true,
      },
    ],
  },
  {
    question:
      'What will be the output of the following code snippet?\n\n<script type="text/javascript" language="javascript">\n  \nvar a = "Scaler";\nvar result = a.substring(2, 4);\ndocument.write(result);\n  \n</script>',
    options: [
      {
        id: 1,
        value: "al",
        correct: true,
      },
      {
        id: 2,
        value: "ale",
        correct: false,
      },
      {
        id: 3,
        value: "cal",
        correct: false,
      },
      {
        id: 4,
        value: "caler",
        correct: false,
      },
    ],
  },
  {
    question:
      'What will be the output of the following code snippet?\n\n<script type="text/javascript" language="javascript">\n \nvar x=12;\nvar y=8;\nvar res=eval("x+y");\ndocument.write(res);\n \n</script>',
    options: [
      {
        id: 1,
        value: "20",
        correct: true,
      },
      {
        id: 2,
        value: "x+y",
        correct: false,
      },
      {
        id: 3,
        value: "128",
        correct: false,
      },
      {
        id: 4,
        value: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question:
      "When the switch statement matches the expression with the given labels, how is the comparison done?",
    options: [
      {
        id: 1,
        value:
          "Both the datatype and the result of the expression are compared.",
        correct: true,
      },
      {
        id: 2,
        value: "Only the datatype of the expression is compared.",
        correct: false,
      },
      {
        id: 3,
        value: "Only the value of the expression is compared.",
        correct: false,
      },
      {
        id: 4,
        value: "None of the above.",
        correct: false,
      },
    ],
  },
  {
    question:
      "What keyword is used to check whether a given property is valid or not?",
    options: [
      {
        id: 1,
        value: "in",
        correct: true,
      },
      {
        id: 2,
        value: "is in",
        correct: false,
      },
      {
        id: 3,
        value: "exists",
        correct: false,
      },
      {
        id: 4,
        value: "lies",
        correct: false,
      },
    ],
  },
  {
    question: "What is the use of the <noscript> tag in Javascript?",
    options: [
      {
        id: 1,
        value: "The contents are displayed by non-JS-based browsers.",
        correct: true,
      },
      {
        id: 2,
        value: "Clears all the cookies and cache.",
        correct: false,
      },
      {
        id: 3,
        value: "Both A and B.",
        correct: false,
      },
      {
        id: 4,
        value: "None of the above.",
        correct: false,
      },
    ],
  },
  {
    question:
      "What will be the output of the following code snippet?\n\n(function(){\n setTimeout(()=> console.log(1),2000);\n console.log(2);\n setTimeout(()=> console.log(3),0);\n console.log(4);\n})();",
    options: [
      {
        id: 1,
        value: "1 2 3 4",
        correct: false,
      },
      {
        id: 2,
        value: "2 3 4 1",
        correct: false,
      },
      {
        id: 3,
        value: "2 4 3 1",
        correct: true,
      },
      {
        id: 4,
        value: "4 3 2 1",
        correct: false,
      },
    ],
  },
  {
    question:
      "What will be the output of the following code snippet?\n\n(function(a){\n return (function(){\n   console.log(a);\n   a = 6;\n })()\n})(21);",
    options: [
      {
        id: 1,
        value: "6",
        correct: false,
      },
      {
        id: 2,
        value: "NaN",
        correct: false,
      },
      {
        id: 3,
        value: "21",
        correct: true,
      },
      {
        id: 4,
        value: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question:
      "What will be the output of the following code snippet?\n\nfunction solve(arr, rotations){\n if(rotations == 0) return arr;\n for(let i = 0; i < rotations; i++){\n   let element = arr.pop();\n   arr.unshift(element);\n }\n return arr;\n}\n// solve([44, 1, 22, 111], 5);",
    options: [
      {
        id: 1,
        value: "[111, 44, 1, 22]",
        correct: true,
      },
      {
        id: 2,
        value: "[44, 1, 22, 111]",
        correct: false,
      },
      {
        id: 3,
        value: "[111, 44, 1, 22]",
        correct: false,
      },
      {
        id: 4,
        value: "[1, 22, 111, 44]",
        correct: false,
      },
    ],
  },
  {
    question:
      'What will be the output for the following code snippet?\n\n<p id="example"></p>  \n<script>  \nfunction Func()  \n{  \ndocument.getElementById("example").innerHTML=Math.sqrt(81);  \n}  \n</script>',
    options: [
      {
        id: 1,
        value: "9",
        correct: true,
      },
      {
        id: 2,
        value: "81",
        correct: false,
      },
      {
        id: 3,
        value: "Error",
        correct: false,
      },
      {
        id: 4,
        value: "0",
        correct: false,
      },
    ],
  },
  {
    question:
      "When an operator’s value is NULL, the typeof returned by the unary operator is:",
    options: [
      {
        id: 1,
        value: "Boolean",
        correct: false,
      },
      {
        id: 2,
        value: "Undefined",
        correct: false,
      },
      {
        id: 3,
        value: "Object",
        correct: true,
      },
      {
        id: 4,
        value: "Integer",
        correct: false,
      },
    ],
  },
  {
    question:
      "What will be the output of the following code snippet?\n\nvar a = 1;  \nvar b = 0;  \nwhile (a <= 3)  \n{  \n   a++;  \n   b += a * 2;  \n   print(b);\n}",
    options: [
      {
        id: 1,
        value: "4 10 18",
        correct: true,
      },
      {
        id: 2,
        value: "1 2 3",
        correct: false,
      },
      {
        id: 3,
        value: "1 4 7",
        correct: false,
      },
      {
        id: 4,
        value: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question: "What does the Javascript “debugger” statement do?",
    options: [
      {
        id: 1,
        value: "It will debug all the errors in the program at runtime.",
        correct: false,
      },
      {
        id: 2,
        value: "It acts as a breakpoint in a program.",
        correct: true,
      },
      {
        id: 3,
        value: "It will debug error in the current statement if any.",
        correct: false,
      },
      {
        id: 4,
        value: "All of the above.",
        correct: false,
      },
    ],
  },
  {
    question:
      "What will be the output of the following code snippet?\n\nvar a = Math.max();\nvar b = Math.min();\nprint(a);\nprint(b);",
    options: [
      {
        id: 1,
        value: "-Infinity Infinity",
        correct: true,
      },
      {
        id: 2,
        value: "Infinity -Infinity",
        correct: false,
      },
      {
        id: 3,
        value: "Infinity Infinity",
        correct: false,
      },
      {
        id: 4,
        value: "-Infinity -Infinity",
        correct: false,
      },
    ],
  },
  {
    question:
      "What will be the output of the following code snippet?\n\nvar a = Math.max() < Math.min();\nvar b = Math.max() > Math.min();\nprint(a);\nprint(b);",
    options: [
      {
        id: 1,
        value: " true false",
        correct: true,
      },
      {
        id: 2,
        value: "false true",
        correct: false,
      },
      {
        id: 3,
        value: "true true",
        correct: false,
      },
      {
        id: 4,
        value: "false false",
        correct: false,
      },
    ],
  },
  {
    question:
      "What will be the output of the following code snippet?\n\nvar a = true + true + true * 3;\nprint(a)",
    options: [
      {
        id: 1,
        value: "3",
        correct: false,
      },
      {
        id: 2,
        value: "0",
        correct: false,
      },
      {
        id: 3,
        value: "Error",
        correct: false,
      },
      {
        id: 4,
        value: "5",
        correct: true,
      },
    ],
  },
  {
    question:
      "What is the output of the following code snippet?\n\nprint(NaN === NaN);",
    options: [
      {
        id: 1,
        value: "true",
        correct: false,
      },
      {
        id: 2,
        value: "false",
        correct: true,
      },
      {
        id: 3,
        value: "undefined",
        correct: false,
      },
      {
        id: 4,
        value: "Error",
        correct: false,
      },
    ],
  },
  {
    question:
      "What will be the output of the following code snippet?\n\nprint(typeof(NaN));",
    options: [
      {
        id: 1,
        value: "Object",
        correct: false,
      },
      {
        id: 2,
        value: "Number",
        correct: true,
      },
      {
        id: 3,
        value: "String",
        correct: false,
      },
      {
        id: 4,
        value: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question: "What does the ‘toLocateString()’ method do in JS?",
    options: [
      {
        id: 1,
        value: "Returns a localised object representation.",
        correct: false,
      },
      {
        id: 2,
        value: "Returns a parsed string.",
        correct: false,
      },
      {
        id: 3,
        value: "Returns a localized string representation of an object.",
        correct: true,
      },
      {
        id: 4,
        value: "None of the above.",
        correct: false,
      },
    ],
  },
  {
    question:
      "The process in which an object or data structure is translated into a format suitable for transferral over a network, or storage is called?",
    options: [
      {
        id: 1,
        value: "Object Serialization",
        correct: true,
      },
      {
        id: 2,
        value: "Object Encapsulation",
        correct: false,
      },
      {
        id: 3,
        value: "Object Inheritance",
        correct: false,
      },
      {
        id: 4,
        value: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question:
      "Which function is used to serialize an object into a JSON string in Javascript?",
    options: [
      {
        id: 1,
        value: "stringify()",
        correct: true,
      },
      {
        id: 2,
        value: "parse()",
        correct: false,
      },
      {
        id: 3,
        value: "convert()",
        correct: false,
      },
      {
        id: 4,
        value: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question: "The 3 basic object attributes in Javascript are:",
    options: [
      {
        id: 1,
        value: "Class, prototype, objects' parameters.",
        correct: false,
      },
      {
        id: 2,
        value: "Class, prototype, object's extensible flag.",
        correct: true,
      },
      {
        id: 3,
        value: "Class, parameters, object's extensible flag.",
        correct: false,
      },
    ],
  },
  {
    question:
      "What will be the output of the following code snippet?\n\nlet sum = 0; \nconst a = [1, 2, 3];\na.forEach(getSum);\nprint(sum);\nfunction getSum(ele) {\n   sum += ele;\n}",
    options: [
      {
        id: 1,
        value: "6",
        correct: true,
      },
      {
        id: 2,
        value: "1",
        correct: false,
      },
      {
        id: 3,
        value: "2",
        correct: false,
      },
      {
        id: 4,
        value: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question:
      "What will be the output of the following code snippet?\n\na = [1, 2, 3, 4, 5];\nprint(a.slice(2, 4));",
    options: [
      {
        id: 1,
        value: "3, 4",
        correct: true,
      },
      {
        id: 2,
        value: "2, 3",
        correct: false,
      },
      {
        id: 3,
        value: "3, 4, 5",
        correct: false,
      },
      {
        id: 4,
        value: "2, 3, 4",
        correct: false,
      },
    ],
  },
  {
    question:
      'What will be the output of the following code snippet?\n\nprint(parseInt("123Hello"));\nprint(parseInt("Hello123"));',
    options: [
      {
        id: 1,
        value: "123 NaN",
        correct: true,
      },
      {
        id: 2,
        value: "123Hello Hello123",
        correct: false,
      },
      {
        id: 3,
        value: "NaN NaN",
        correct: false,
      },
      {
        id: 4,
        value: "123 123",
        correct: false,
      },
    ],
  },
  {
    question: "Which of the following are closures in Javascript?",
    options: [
      {
        id: 1,
        value: "Variables",
        correct: false,
      },
      {
        id: 2,
        value: "Functions",
        correct: false,
      },
      {
        id: 3,
        value: "Objects",
        correct: false,
      },
      {
        id: 4,
        value: "All of the above",
        correct: true,
      },
    ],
  },
  {
    question: "Which of the following is not a Javascript framework?",
    options: [
      {
        id: 1,
        value: "Node",
        correct: false,
      },
      {
        id: 2,
        value: "Vue",
        correct: false,
      },
      {
        id: 3,
        value: "React",
        correct: false,
      },
      {
        id: 4,
        value: "Cassandra",
        correct: true,
      },
    ],
  },
  {
    question:
      "What will be the output of the following code snippet?\n\nvar a = \"hello\";\nvar sum = 0;\nfor(var i = 0; i < a.length; i++) {\n   sum += (a[i] - 'a');\n}\nprint(sum);",
    options: [
      {
        id: 1,
        value: "47",
        correct: false,
      },
      {
        id: 2,
        value: "NaN",
        correct: true,
      },
      {
        id: 3,
        value: "0",
        correct: false,
      },
      {
        id: 4,
        value: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question:
      "What keyword is used to declare an asynchronous function in Javascript?",
    options: [
      {
        id: 1,
        value: "async",
        correct: true,
      },
      {
        id: 2,
        value: "await",
        correct: false,
      },
      {
        id: 3,
        value: "setTimeout",
        correct: false,
      },
      {
        id: 4,
        value: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question: "How to stop an interval timer in Javascript?",
    options: [
      {
        id: 1,
        value: "clearInterval",
        correct: true,
      },
      {
        id: 2,
        value: "clearTimer",
        correct: false,
      },
      {
        id: 3,
        value: "intervalOver",
        correct: false,
      },
      {
        id: 4,
        value: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question:
      "What will be the output of the following code snippet?\n\nconst set = new Set();\nset.add(5);\nset.add('Hello');\nset.add({ name: 'Scaler' });\nfor (let item of set) {\n console.log(item + 6);\n}",
    options: [
      {
        id: 1,
        value: "11 NaN NaN",
        correct: false,
      },
      {
        id: 2,
        value: "11 NaN [object Object]",
        correct: false,
      },
      {
        id: 3,
        value: "11 Hello6 [object Object]6",
        correct: true,
      },
      {
        id: 4,
        value: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question:
      "How are objects compared when they are checked with the strict equality operator?",
    options: [
      {
        id: 1,
        value: "The contents of the objects are compared",
        correct: false,
      },
      {
        id: 2,
        value: "Their references are compared",
        correct: true,
      },
      {
        id: 3,
        value: "Both A and B",
        correct: false,
      },
      {
        id: 4,
        value: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question: "What does … operator do in JS?",
    options: [
      {
        id: 1,
        value: "It is used to spread iterables to individual elements",
        correct: true,
      },
      {
        id: 2,
        value: "It is used to describe a datatype of undefined size",
        correct: false,
      },
      {
        id: 3,
        value: "No such operator exists",
        correct: false,
      },
      {
        id: 4,
        value: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question:
      "What will be the output of the following code snippet?\n\nconst example = ({ a, b, c }) => {\n console.log(a, b, c);\n};\nexample(0, 1, 2);",
    options: [
      {
        id: 1,
        value: "0 1 2",
        correct: false,
      },
      {
        id: 2,
        value: "0 Undefined Undefined",
        correct: false,
      },
      {
        id: 3,
        value: "Undefined Undefined Undefined",
        correct: true,
      },
      {
        id: 4,
        value: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question:
      'What will be the output of the following code snippet?\n\nlet a = [1, 2, 3, 4, 5, 6];\nvar left = 0, right = 5;\nvar found = false;\nvar target = 5;\nwhile(left <= right) {\n   var mid = Math.floor((left + right) / 2);\n   if(a[mid] == target) {\n       found = true;\n       break;\n   }\n   else if(a[mid] < target) {\n       left = mid + 1;\n   }\n   else {\n       right = mid - 1;\n   }\n}\nif(found) {\n   print("YES");\n}\nelse {\n   print("NO");\n}',
    options: [
      {
        id: 1,
        value: "YES",
        correct: true,
      },
      {
        id: 2,
        value: "NO",
        correct: false,
      },
      {
        id: 3,
        value: "Syntax Error",
        correct: false,
      },
      {
        id: 4,
        value: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question:
      "What will be the output of the following code snippet?\n\nlet s = \"00000001111111\";\nlet l = 0, r = s.length - 1, ans = -1;\nwhile(l <= r) {\n   var mid = Math.floor((l + r) / 2);\n   if(s[mid] == '1') {\n       ans = mid;\n       r = mid - 1;\n   }\n   else {\n       l = mid + 1;\n   }\n}\nprint(ans);",
    options: [
      {
        id: 1,
        value: "8",
        correct: false,
      },
      {
        id: 2,
        value: "7",
        correct: true,
      },
      {
        id: 3,
        value: "0",
        correct: false,
      },
      {
        id: 4,
        value: "1",
        correct: false,
      },
    ],
  },
  {
    question:
      "What will be the output of the following code snippet?\n\nlet n = 24;\nlet l = 0, r = 100, ans = n;\nwhile(l <= r) {\n   let mid = Math.floor((l + r) / 2);\n   if(mid * mid <= n) {\n       ans = mid;\n       l = mid + 1;\n   }\n   else {\n       r = mid - 1;\n   }\n}\nprint(ans);",
    options: [
      {
        id: 1,
        value: "5",
        correct: false,
      },
      {
        id: 2,
        value: "4",
        correct: true,
      },
      {
        id: 3,
        value: "6",
        correct: false,
      },
      {
        id: 4,
        value: "3",
        correct: false,
      },
    ],
  },
  {
    question:
      'What will be the output of the following code snippet?\n\nconst obj1 = {Name: "Hello", Age: 16};\nconst obj2 = {Name: "Hello", Age: 16};\nprint(obj1 === obj2);',
    options: [
      {
        id: 1,
        value: "true",
        correct: false,
      },
      {
        id: 2,
        value: "false",
        correct: true,
      },
      {
        id: 3,
        value: "Undefined",
        correct: false,
      },
      {
        id: 4,
        value: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question:
      'What happens when we run this code?\n\nfunction dog() {\n   print("I am a dog.");\n}\ndog.sound = "Bark";',
    options: [
      {
        id: 1,
        value: "Syntax Error",
        correct: false,
      },
      {
        id: 2,
        value: "“I am a dog” gets printed",
        correct: false,
      },
      {
        id: 3,
        value: "ReferenceError",
        correct: false,
      },
      {
        id: 4,
        value: "Nothing happens",
        correct: true,
      },
    ],
  },
  {
    question: "How do we write a comment in javascript?",
    options: [
      {
        id: 1,
        value: "/* */",
        correct: false,
      },
      {
        id: 2,
        value: "//",
        correct: true,
      },
      {
        id: 3,
        value: "#",
        correct: false,
      },
      {
        id: 4,
        value: "$ $",
        correct: false,
      },
    ],
  },
  {
    question: "Which object in Javascript doesn’t have a prototype?",
    options: [
      {
        id: 1,
        value: "Base Object",
        correct: true,
      },
      {
        id: 2,
        value: "All objects have a prototype",
        correct: false,
      },
      {
        id: 3,
        value: "None of the objects have a prototype",
        correct: false,
      },
      {
        id: 4,
        value: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question:
      "What will be the output of the following code snippet?\n\nfunction test(...args) {\n console.log(typeof args);\n}\ntest(12);",
    options: [
      {
        id: 1,
        value: "NaN",
        correct: false,
      },
      {
        id: 2,
        value: "Number",
        correct: false,
      },
      {
        id: 3,
        value: "Object",
        correct: true,
      },
      {
        id: 4,
        value: "Array",
        correct: false,
      },
    ],
  },
  {
    question:
      "What will be the output of the following code snippet?\n\nconst obj1 = {first: 20, second: 30, first: 50};\nconsole.log(obj1);",
    options: [
      {
        id: 1,
        value: "{first: 20, second: 30}",
        correct: false,
      },
      {
        id: 2,
        value: "{first: 50, second: 30}",
        correct: true,
      },
      {
        id: 3,
        value: "{first: 20, second: 30, first: 50}",
        correct: false,
      },
      {
        id: 4,
        value: "Syntax Error",
        correct: false,
      },
    ],
  },
  {
    question: "Which of the following are not server-side Javascript objects?",
    options: [
      {
        id: 1,
        value: "Date",
        correct: false,
      },
      {
        id: 2,
        value: "FileUpload",
        correct: false,
      },
      {
        id: 3,
        value: "Function",
        correct: false,
      },
      {
        id: 4,
        value: "All of the above",
        correct: true,
      },
    ],
  },
];
