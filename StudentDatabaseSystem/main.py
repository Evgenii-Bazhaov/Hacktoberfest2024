# Starting of the program
#! --------------------------------------------------
#! ---------- Credits
#! --------------------------------------------------
# region credits
# * ---- Made by:
# * ------- Aaloke Eppalapalli
# * ------- Hemanth Tenneti
# * ------- Husain Khorakiwala

# * ---- Source Code:
# * ------- https://github.com/AverageBlank/StudentDatabase

# endregion


#! --------------------------------------------------
#! ---------- Imports
#! --------------------------------------------------
# region Imports
# ? Maths --> For rounding
from math import ceil

# ? Importing OS to get operating system, to run commands in terminal, to block print
from os import name as OsName, system, getcwd, path, makedirs, devnull, popen

# ? Importing string to have a valid name without symbols
from string import ascii_letters, digits, punctuation

# ? Time --> For pausing the program
from time import sleep

# ? Questionary --> To provide choices and autocompletions
import questionary
from questionary import Style

# ? Matplotlib --> for plotting a graph
from matplotlib.pyplot import bar, show, title, xlabel, ylabel

# ? Pandas --> for storing data
import pandas as pd

# ? Rich --> For great terminal user interface
from rich import print
from rich.console import Console

console = Console()
from rich.table import Table
from rich import box
from rich.panel import Panel
from rich.progress import (
    BarColumn,
    Progress,
    TextColumn,
)
from rich.align import Align

# ? Sys --> Prevents printing
import sys

# ? SQLite3 --> For connecting to SQL database
from sqlite3 import connect

# ? Fernet --> For encrypting passwords
from cryptography.fernet import Fernet


# endregion
#! --------------------------------------------------
#! --------------------------------------------------


#! --------------------------------------------------
#! ---------- Functions
#! --------------------------------------------------
# region Functions


# ! Function to prevent printing
def DisablePrint():
    sys.stdout = open(devnull, "w")


# ! Function to enable printing
def EnablePrint():
    sys.stdout = sys.__stdout__


# ! Function to avoid getting improper section
def IsProperSection(prompt):
    while True:
        section = questionary.text(prompt, style=minimalStyle).ask()
        try:
            if len(section) > 2 or len(section) <= 0:
                raise ValueError
            elif section[0] not in ascii_letters:
                raise KeyError
            elif len(section) == 2:
                if section[1] not in digits or section[1] == " ":
                    raise TabError
            return section.upper()

        except ValueError:
            print("Length of section cannot have more than 2 or less than 1 character")
        except KeyError:
            print("Section can only have alphabets as the first character")
        except TabError:
            print("Section cannot have symbols")


# ! Function to avoid getting improper marks
def IsProperMarks(prompt):
    # ? To check for input parameters and returning the desired input.
    while True:
        try:
            # ? Rounds off the marks to the nearest integer value
            marks = ceil(float(questionary.text(prompt, style=minimalStyle).ask()))
            if 0 > marks or marks > 100:
                # ? If marks aren't between 0 or 100, rejects the marks
                raise AttributeError
            else:
                return marks
        except AttributeError:
            print(f"Marks need to be less than 100 and greater than 0.")
        except:
            print("Enter valid marks.")


# ! Function to avoid getting an error on an improper name
def IsProperName(name):
    # ? Checks for alphanumeric symbols in a name and rejects it if one exists
    NumericSymbols = [x for x in digits + punctuation]
    while True:
        try:
            for i in name:
                if i in NumericSymbols:
                    raise ValueError
            else:
                # ? If no symbols or numbers in a name, return the name
                return name
        except:
            name = (
                questionary.text("Enter a valid student's name: ", style=minimalStyle)
                .ask()
                .title()
            )


# ! Function to avoid getting an error on an improper class number
def IsProperClass(classno):
    # ? Checks for alphanumeric symbols in a name and rejects it if one exists
    AlphabeticalSymbols = [x for x in ascii_letters + punctuation]
    while True:
        try:
            for i in classno:
                if i in AlphabeticalSymbols:
                    raise ValueError
            else:
                # ? If no symbols or numbers in a name, return the name
                return int(classno)
        except:
            classno = questionary.text(
                f"Please enter a valid class number.", style=minimalStyle
            ).ask()


# ! Function to avoid getting an error on fcore input depending on user's stream
def IsProperFcore(Fcore, Stream):
    while True:
        try:
            # ? If 5th core is not valid, raise a ValueError
            if Fcore.lower() not in [
                "mathematics",
                "math",
                "maths",
                "psychology",
                "psy",
                "informatics practices",
                "ip",
                "physical education",
                "pe",
                "fine arts",
                "fa",
            ]:
                raise ValueError
            else:
                # ? When chosen stream is valid, rename it to a common name to keep it uniform
                if Stream.lower() == "humanities" or Stream.lower() == "mpc":
                    if Fcore.lower() in ["math", "mathematics", "maths"]:
                        raise ValueError
                if Fcore.lower() == "math" or Fcore.lower() == "maths":
                    Fcore = "Mathematics"
                if Fcore.lower() == "psy":
                    Fcore = "Psychology"
                if Fcore.lower() == "ip":
                    Fcore = "Informatics Practices"
                if Fcore.lower() == "pe":
                    Fcore = "Physical Education"
                if Fcore.lower() == "fa":
                    Fcore = "Fine Arts"
                return Fcore
        except:
            # ? If checks fail, ask for an input again
            Fcore = questionary.select(
                "Choose a valid 5th Core: ",
                choices=[
                    "Mathematics",
                    "Informatics Practices",
                    "Psychology",
                    "Physical Education",
                    "Fine Arts",
                ],
                style=minimalStyle,
                instruction="\n",
            ).ask()


# ! Function to avoid getting an error on choosing a 3rd language
def IsProperLang3(Lang3Name, Lang2Name):
    while True:
        try:
            # ? Checks for improper languages given and raises error
            if Lang3Name.lower() not in [
                "hindi",
                "h",
                "telugu",
                "t",
                "french",
                "f",
                "sanskrit",
                "s",
            ]:
                raise ValueError
            else:
                # ? Refactors given input of a language into a uniform input for all
                if Lang3Name.lower() == "h":
                    Lang3Name = "Hindi"
                if Lang3Name.lower() == "t":
                    Lang3Name = "Telugu"
                if Lang3Name.lower() == "f":
                    Lang3Name = "French"
                if Lang3Name.lower() == "s":
                    Lang3Name = "Sanskrit"
                if Lang2Name == Lang3Name:
                    raise ValueError
                return Lang3Name
        except:
            Lang3Name = (
                questionary.select(
                    "Choose a valid 3rd language: ",
                    choices=["Hindi", "Telugu", "French", "Sanskrit"],
                    style=minimalStyle,
                    instruction="\n",
                )
                .ask()
                .title()
            )


# ! Function to avoid getting an error on a wrong roll number input
def IsProperRollNum(RollNum):
    # ? Checks for an incorrect roll number between 0 and 60
    while True:
        try:
            if RollNum > 60 or RollNum <= 0:
                raise ValueError
            else:
                return RollNum
        except:
            RollNum = abs(
                int(
                    questionary.text(
                        "Enter a valid roll number: ", style=minimalStyle
                    ).ask()
                )
            )


# ! Function to clear the terminal screen depending on OS type
def ClearScreen():
    # ? Checks for OS type and then clears the terminal
    sleep(0.2)
    # ? Posix here is Macintosh and Linux, nt is Windows.
    system("clear" if OsName == "posix" else "cls")
    console.print(
        Panel.fit("[bold italic #77DDD4]Student Management System", padding=(0, 22))
    )
    print()


# ! Function to display a status bar
def StatBar(time: float, desc: str):
    progress_bar = Progress(
        TextColumn(f"{desc} "),
        BarColumn(),
        TextColumn("[progress.percentage]{task.percentage:>3.0f}%"),
    )
    with progress_bar as p:
        for i in p.track(range(100), description=desc):
            sleep(time / 100)
    sleep(0.5)


# endregion
#! --------------------------------------------------
#! --------------------------------------------------


#! --------------------------------------------------
#! ---------- Main Program
#! --------------------------------------------------
# region Main Program
########! Connecting to the server !########
# ! <-- Connecting to the server and creating necessary tables -->
def Backend():
    # ! <-- Globals for making life easier -->
    global db, con, cur, console, minimalStyle, fernet

    # ! <-- Encrypting password so people who think they're smart can't access it -->
    try:
        if OsName == "nt":
            chk = popen("cd %userprofile% && dir").read()
            CWD = popen("cd %userprofile% && chdir").read()
            CWD = CWD[:-1] + "\\"
            if "forpsd" in chk:
                with open(CWD + "forpsd", "rb") as keyFile:
                    key = keyFile.read()
            else:
                raise ValueError
        elif OsName == "posix":
            chk = popen("ls ~").read()
            CWD = popen("cd ~ && pwd").read()
            if "forpsd" in chk:
                with open(CWD[:-1] + "/forpsd", "rb") as keyFile:
                    key = keyFile.read()
            else:
                raise ValueError
    except:
        key = Fernet.generate_key()
        with open(CWD[:-1] + "/forpsd", "wb") as keyFile:
            keyFile.write(key)
    fernet = Fernet(key.decode("utf-8"))

    # ! <-- Colors -->
    minimalStyle = Style(
        [
            ("answer", "fg:#FFFFFF italic"),  # ? White
            ("question", "fg:#FFFFFF bold"),  # ? White
            ("pointer", "fg:#00FFFF bold"),  # ? Cyan
            ("highlighted", "fg:#FFFFFF"),  # ? White
            ("selected", "fg:#A9A9A9"),  # ? Grey
            ("qmark", "fg:#77DD77"),  # ? Green
        ]
    )

    # ? Connecting to the MySQL database
    con = connect("StudentDatabase.db")
    cur = con.cursor()

    db = "studentdatabase"

    # ! <-- Creating basic Databases and Tables -->
    cur.execute(
        f"create table if not exists teacherDB(user varchar(64) primary key, pass varchar(100))"
    )
    cur.execute(
        f"create table if not exists allstudents(AdmNum int primary key, name varchar(100), class int, section varchar(10))"
    )

    # ! <-- Creating class tables for MySQL -->
    # ** <-- CAT IS CATEGORY -->
    # ? Grade 1
    cur.execute(
        f"""CREATE TABLE if not exists catone(AdmNum int primary key, Name VARCHAR(50), Class INT, Section varchar(10), RollNumber INT, Lang2Name VARCHAR(50), English INT, Mathematics INT, Science INT, SocialSciences INT, Lang2 INT, Total INT, Average FLOAT)"""
    )

    # ? Grade 2 - Grade 4
    cur.execute(
        f"""CREATE TABLE if not exists cattwo(AdmNum int primary key, Name VARCHAR(50), Class INT, Section varchar(10), RollNumber INT, Lang2Name VARCHAR(50), English INT, Mathematics INT, Science INT, SocialSciences INT, Lang2 INT, Computers INT, Total INT, Average FLOAT)"""
    )

    # ? Grade 5 - Grade 8
    cur.execute(
        f"""CREATE TABLE if not exists catthree(AdmNum int primary key, Name VARCHAR(50), Class INT, Section varchar(10), RollNumber INT, Lang2Name VARCHAR(50), Lang3Name VARCHAR(50), English INT, Mathematics INT, Science INT, SocialSciences INT, Lang2 INT, Lang3 INT, Computers INT, Total INT, Average FLOAT)"""
    )

    # ? Grade 9-10
    cur.execute(
        f"""CREATE TABLE if not exists catfour(AdmNum int primary key, Name VARCHAR(50), Class INT, Section varchar(10), RollNumber INT, Lang2Name VARCHAR(50), English INT, Mathematics INT, Science INT, SocialSciences INT, Lang2 INT, Total INT, Average FLOAT)"""
    )

    # ? MPC
    cur.execute(
        f"""CREATE TABLE if not exists catfive(AdmNum int primary key, Name VARCHAR(50), Class INT, Section varchar(10), RollNumber INT, FcoreName VARCHAR(50), English INT, Mathematics INT, Physics INT, Chemistry INT, Fcore INT, Total INT, Average FLOAT)"""
    )

    # ? BiPC
    cur.execute(
        f"""CREATE TABLE if not exists catsix(AdmNum int primary key, Name VARCHAR(50), Class INT, Section varchar(10), RollNumber INT, FcoreName VARCHAR(50), English INT, Biology INT, Physics INT, Chemistry INT, Fcore INT, Total INT, Average FLOAT)"""
    )

    # ? Commerce
    cur.execute(
        f"""CREATE TABLE if not exists catseven(AdmNum int primary key, Name VARCHAR(50), Class INT, Section varchar(10), RollNumber INT, FcoreName VARCHAR(50), English INT, Accounts INT, BusinessStudies INT, Economics INT, Fcore INT, Total INT, Average FLOAT)"""
    )

    # ? Humanities
    cur.execute(
        f"""CREATE TABLE if not exists cateight(AdmNum int primary key, Name VARCHAR(50), Class INT, Section varchar(10), RollNumber INT, FcoreName VARCHAR(50), English INT, History INT, PoliticalSciences INT, Economics INT, Fcore INT, Total INT, Average FLOAT)"""
    )
    con.commit()


########! Related to Login !########
# ! <-- If register is called -->
def RegisterUser(User=None, Pass=None):
    # ? Clearing the screen
    ClearScreen()
    if User == None:
        while True:
            # ? Taking username incase not provided
            User = questionary.text("Enter the username: ", style=minimalStyle).ask()

            for i in User:
                if i in punctuation or i in digits:
                    print("Cannot contain symbols or digits")
                    continue
            if len(User) < 3:
                print("Length of the username must be greater than 3")
                continue
            if " " in User:
                print("Username cannot contain spaces")
                continue
            break
    if Pass == None:
        while True:
            # ? Taking password incase not provided
            Pass = questionary.password(
                "Enter your password: ", style=minimalStyle
            ).ask()
            if len(Pass) < 8:
                print("Length of the password must be greater than 8")
                continue
            Pass = fernet.encrypt(f"{Pass}".encode())
            break
    # ? Running the signup system
    cur.execute(f'select * from teacherDB where user="{User}"')
    userFetch = cur.fetchall()
    if len(userFetch) == 0:
        cur.execute(rf'insert into teacherDB values("{User}", "{Pass}")')
        con.commit()
        print("Successfully created user.")
        input("Press enter to continue ")
    else:
        ClearScreen()
        print("This user already exists!")
        LoginUser(
            User,
            questionary.password(
                "Enter the password for the user: ", style=minimalStyle
            ).ask(),
        )


# ! <-- If Login is called -->
def LoginUser(User=None, Pass=None):
    # ? Number of wrong passwords entered
    NPass = 0
    # ? Clearing the screen
    ClearScreen()
    # ? Taking username incase not provided
    if User == None:
        while True:
            User = questionary.text("Enter the username: ", style=minimalStyle).ask()
            for i in User:
                if i in punctuation or i in digits:
                    print("Cannot contain symbols or digits")
                    break
            else:
                break
    # ? Taking password incase not provided
    if Pass == None:
        Pass = questionary.password("Enter your password: ", style=minimalStyle).ask()
    # ? Running the login system
    cur.execute(f'select * from teacherDB where user="{User}"')
    userFetch = cur.fetchall()
    if len(userFetch) == 0:
        ClearScreen()
        print("Username doesn't exist!")
        register = questionary.confirm(
            "Would you like to create a new user? ", style=minimalStyle
        ).ask()
        if register == True:
            RegisterUser()
        else:
            ClearScreen()
            print("Exiting Program")
            exit()
    else:
        while True:
            userFetchPass = userFetch[0][1][2:-1]
            decPass = fernet.decrypt(userFetchPass).decode("utf-8")
            if decPass == rf"{Pass}":
                ClearScreen()
                print("Successful login!")
                Align.center(
                    StatBar(2, desc="[cyan]Loading Student Database"), vertical="middle"
                )
                break
            else:
                NPass += 1
                ClearScreen()
                if NPass == 3:
                    print("Wrong password entered too many times.")
                    exit()
                else:
                    print("Wrong Password, please try again.")
                    Pass = questionary.password(
                        "Enter your password: ", style=minimalStyle
                    ).ask()
                    continue


########! Related to student info !########
# ! <-- Adding students -->
def AddStudent():
    # ? Clearing Screen
    ClearScreen()
    # ? Name
    Name = IsProperName(
        questionary.text("Enter student's name: ", style=minimalStyle).ask()
    ).title()
    # ? Admission Number
    while True:
        try:
            AdmNum = abs(
                int(
                    questionary.text(
                        f"Enter {Name}'s admission number: ", style=minimalStyle
                    ).ask()
                )
            )
            if AdmNum == 0:
                raise ValueError
            break
        except:
            print("Please enter a valid admission number.")
    while True:
        cur.execute(f"select name from allstudents where AdmNum={AdmNum}")
        admNumFetch = cur.fetchall()
        try:
            if len(admNumFetch) == 0:
                ClearScreen()
                break
            else:
                raise ValueError
        except:
            print("This admission number already exists")
            AdmNum = abs(
                int(
                    questionary.text(
                        "Enter a valid admission number: ", style=minimalStyle
                    )
                )
            ).ask()
    # ? Asking for class
    while True:
        Class = IsProperClass(
            questionary.text(f"Enter {Name}'s class: ", style=minimalStyle).ask()
        )

        # ! Categorizing by classes
        if 1 <= Class <= 3:
            # ? Asking for 2nd language name without french
            Lang2Name = questionary.select(
                f"Choose {Name}'s 2nd language: ",
                choices=["Hindi", "Telugu"],
                style=minimalStyle,
                instruction="\n",
            ).ask()
        elif Class == 4:
            # ? Asking for 2nd language name with french
            Lang2Name = questionary.select(
                f"Choose {Name}'s 2nd language: ",
                choices=["Hindi", "Telugu", "French"],
                style=minimalStyle,
                instruction="\n",
            ).ask()
        elif 5 <= Class <= 8:
            # ? Asking for 2nd language name with french
            Lang2Name = questionary.select(
                f"Choose {Name}'s 2nd language: ",
                choices=["Hindi", "Telugu", "French"],
                style=minimalStyle,
                instruction="\n",
            ).ask()
            # ? Asking for 3rd language name
            Lang3Name = IsProperLang3(
                questionary.select(
                    f"Choose {Name}'s 3rd language: ",
                    choices=["Hindi", "Telugu", "French", "Sanskrit"],
                    style=minimalStyle,
                    instruction="\n",
                ).ask(),
                Lang2Name,
            )

        elif 9 <= Class <= 10:
            # ? Asking for 2nd language name with french
            Lang2Name = (
                questionary.select(
                    f"Choose {Name}'s 2nd language: ",
                    choices=["Hindi", "Telugu", "French"],
                    style=minimalStyle,
                    instruction="\n",
                )
                .ask()
                .lower()
            )
        elif Class in [11, 12]:
            # ! Categorizing by stream
            Stream = (
                questionary.select(
                    f"Choose {Name}'s stream: ",
                    choices=["MPC", "BiPC", "CEC", "Humanities"],
                    style=minimalStyle,
                    instruction="\n",
                )
                .ask()
                .lower()
            )
            # ? Asking for 5th core name
            FcoreName = IsProperFcore(
                questionary.select(
                    f"Choose {Name}'s 5th Core: ",
                    choices=[
                        "Mathematics",
                        "Informatics Practices",
                        "Psychology",
                        "Physical Education",
                        "Fine Arts",
                    ],
                    style=minimalStyle,
                    instruction="\n",
                ).ask(),
                Stream,
            )
        else:
            ClearScreen()
            print("Enter a valid class.")
            continue
        break
    # ? Clearing Screen
    ClearScreen()
    # ? Section
    Section = IsProperSection(f"Enter {Name}'s section: ")
    # ? Roll Number
    while True:
        try:
            RollNum = IsProperRollNum(
                abs(
                    int(
                        questionary.text(
                            f"Enter {Name}'s roll number: ", style=minimalStyle
                        ).ask()
                    )
                )
            )
            break
        except:
            print("Enter a valid roll number.")

    # ? Inserting data into a main table
    cur.execute(
        f"insert into allstudents values({AdmNum}, '{Name}', {Class}, '{Section}')"
    )
    # ? Grade one
    if Class == 1:
        cur.execute(
            f"insert into catone(AdmNum, Name, Class, Section, RollNumber, Lang2Name) values({AdmNum}, '{Name}', {Class}, '{Section}', {RollNum}, '{Lang2Name}')"
        )
    # ? Grade 2 - 4
    elif 2 <= Class <= 4:
        cur.execute(
            f"insert into cattwo(AdmNum, Name, Class, Section, RollNumber, Lang2Name) values({AdmNum}, '{Name}', {Class}, '{Section}', {RollNum}, '{Lang2Name}')"
        )
    # ? Grade 5 - 8
    elif 5 <= Class <= 8:
        cur.execute(
            f"insert into catthree(AdmNum, Name, Class, Section, RollNumber, Lang2Name, Lang3Name) values({AdmNum}, '{Name}', {Class}, '{Section}', {RollNum}, '{Lang2Name}', '{Lang3Name}')"
        )
    # ? Grade 9 - 10
    elif 9 <= Class <= 10:
        cur.execute(
            f"insert into catfour(AdmNum, Name, Class, Section, RollNumber, Lang2Name) values({AdmNum}, '{Name}', {Class}, '{Section}', {RollNum}, '{Lang2Name}')"
        )
    elif 11 <= Class <= 12:
        # ? Math, Physics, Chemistry
        if Stream.lower() == "mpc":
            cur.execute(
                f"insert into catfive(AdmNum, Name, Class, Section, RollNumber, FcoreName) values({AdmNum}, '{Name}', {Class}, '{Section}', {RollNum}, '{FcoreName}')"
            )
        # ? Biology, Physics, Chemistry
        elif Stream.lower() == "bipc":
            cur.execute(
                f"insert into catsix(AdmNum, Name, Class, Section, RollNumber, FcoreName) values({AdmNum}, '{Name}', {Class}, '{Section}', {RollNum}, '{FcoreName}')"
            )
        # ? Commerce
        elif Stream.lower() == "cec":
            cur.execute(
                f"insert into catseven(AdmNum, Name, Class, Section, RollNumber, FcoreName) values({AdmNum}, '{Name}', {Class}, '{Section}', {RollNum}, '{FcoreName}')"
            )
        # ? Humanities
        elif Stream.lower() == "humanities":
            cur.execute(
                f"insert into cateight(AdmNum, Name, Class, Section, RollNumber, FcoreName) values({AdmNum}, '{Name}', {Class}, '{Section}', {RollNum}, '{FcoreName}')"
            )
    con.commit()
    ClearScreen()
    print(f"{Name} has been successfully added.")
    input("Press enter to continue ")


# ! <-- Editing student information -->
def EditStudent():
    # ? Clearing Screen
    ClearScreen()
    # * Admission Number
    # ? Getting autocomplete for admission number
    cur.execute(f"select AdmNum from allstudents")
    a = cur.fetchall()
    adm = [str(a[i][0]) for i in range(len(a))]
    if len(adm) == 0:
        print("You have yet to add a student.")
        input("Press enter to continue ")
        return None
    # ? Getting the actual admission number
    while True:
        try:
            AdmNum = str(
                int(
                    questionary.autocomplete(
                        f"Enter admission number of the student: ",
                        adm,
                        style=minimalStyle,
                    ).ask()
                )
            )
            break
        except:
            print("Please enter a valid admission number.")
    while True:
        cur.execute(f"select class from allstudents where AdmNum={AdmNum}")
        admNumFetch = cur.fetchall()
        try:
            if len(admNumFetch) == 0:
                raise ValueError
            else:
                break
        except ValueError:
            print("This admission number does not exist.")
            while True:
                try:
                    AdmNum = str(
                        int(
                            questionary.autocomplete(
                                f"Enter admission number of the student: ",
                                adm,
                                style=minimalStyle,
                            ).ask()
                        )
                    )
                    break
                except:
                    print("Please enter a valid admission number")
    ClearScreen()
    # ? Name
    Name = IsProperName(
        questionary.text("Enter new student's name: ", style=minimalStyle).ask()
    ).title()

    # ? Old Class
    OldClass = admNumFetch[0][0]
    OldStream = None
    if OldClass in [11, 12]:
        # ? Mathematics, Physics, Chemistry
        cur.execute(f"select * from catfive where AdmNum={AdmNum}")
        streamFetch = cur.fetchall()
        if len(streamFetch) != 0:
            OldStream = "mpc"
        # ? Biology, Physics, Chemistry
        cur.execute(f"select * from catsix where AdmNum={AdmNum}")
        streamFetch = cur.fetchall()
        if len(streamFetch) != 0:
            OldStream = "bipc"
        # ? Commerce
        cur.execute(f"select * from catseven where AdmNum={AdmNum}")
        streamFetch = cur.fetchall()
        if len(streamFetch) != 0:
            OldStream = "cec"
        # ? Humanities
        cur.execute(f"select * from cateight where AdmNum={AdmNum}")
        streamFetch = cur.fetchall()
        if len(streamFetch) != 0:
            OldStream = "humanities"
    # ? New Class
    while True:
        try:
            NewClass = abs(
                int(
                    questionary.text(
                        f"Enter {Name}'s new class: ", style=minimalStyle
                    ).ask()
                )
            )
            if 1 > NewClass or NewClass > 12:
                ClearScreen()
                print("Enter a valid class.")
                continue
            break
        except:
            print("Please enter a valid class.")
    # ? Section
    Section = IsProperSection(f"Enter {Name}'s new section: ")
    # ? Roll Number
    while True:
        try:
            RollNum = IsProperRollNum(
                abs(
                    int(
                        questionary.text(
                            f"Enter {Name}'s new roll number: ", style=minimalStyle
                        ).ask()
                    )
                )
            )
            break
        except:
            print("Enter a valid roll number.")
    # ? Updating data in the main table
    cur.execute(
        f"update allstudents set Name='{Name}', Class={NewClass}, Section='{Section}' where AdmNum={AdmNum}"
    )
    # ? Clearing Screen
    ClearScreen()
    # ! Choosing new subjects
    if 1 <= NewClass <= 3:
        # ? Asking for 2nd language name without french
        Lang2Name = questionary.select(
            f"Choose {Name}'s new 2nd language: ",
            choices=["Hindi", "Telugu"],
            style=minimalStyle,
            instruction="\n",
        ).ask()
    elif NewClass == 4:
        # ? Asking for 2nd language name with french
        Lang2Name = questionary.select(
            f"Choose {Name}'s new 2nd language: ",
            choices=["Hindi", "Telugu", "French"],
            style=minimalStyle,
            instruction="\n",
        ).ask()
    elif 5 <= NewClass <= 8:
        # ? Asking for 2nd language name with french
        Lang2Name = questionary.select(
            f"Choose {Name}'s new 2nd language: ",
            choices=["Hindi", "Telugu", "French"],
            style=minimalStyle,
            instruction="\n",
        ).ask()
        # ? Asking for 3rd language name
        Lang3Name = IsProperLang3(
            questionary.select(
                f"Choose {Name}'s new 3rd language: ",
                choices=["Hindi", "Telugu", "French", "Sanskrit"],
                style=minimalStyle,
                instruction="\n",
            ).ask(),
            Lang2Name,
        )
    elif 9 <= NewClass <= 10:
        # ? Asking for 2nd language name with french
        Lang2Name = questionary.select(
            f"Choose {Name}'s new 2nd language: ",
            choices=["Hindi", "Telugu", "French"],
            style=minimalStyle,
            instruction="\n",
        ).ask()
    elif NewClass in [11, 12]:
        # ! Categorizing by stream
        NewStream = (
            questionary.select(
                f"Choose {Name}'s stream: ",
                choices=["MPC", "BiPC", "CEC", "Humanities"],
                style=minimalStyle,
                instruction="\n",
            )
            .ask()
            .lower()
        )
        # ? Asking for 5th core name
        FcoreName = IsProperFcore(
            questionary.select(
                f"Choose {Name}'s 5th Core: ",
                choices=[
                    "Mathematics",
                    "Informatics Practices",
                    "Psychology",
                    "Physical Education",
                    "Fine Arts",
                ],
                style=minimalStyle,
                instruction="\n",
            ).ask(),
            NewStream,
        )
    # ! If class hasn't changed, not deleting entry in particular category.
    if OldClass == NewClass:
        # ? Grade one
        if OldClass == 1:
            cur.execute(
                f"update catone set Name='{Name}', Class={OldClass}, Section='{Section}', RollNumber={RollNum}, Lang2Name='{Lang2Name}' where AdmNum={AdmNum};"
            )
        # ? Grade 2 - 4
        elif 2 <= OldClass <= 4:
            cur.execute(
                f"update cattwo set Name='{Name}', Class={OldClass}, Section='{Section}', RollNumber={RollNum}, Lang2Name='{Lang2Name}' where AdmNum={AdmNum};"
            )
        # ? Grade 5 - 8
        elif 5 <= OldClass <= 8:
            cur.execute(
                f"update catthree set Name='{Name}', Class={OldClass}, Section='{Section}', RollNumber={RollNum}, Lang2Name='{Lang2Name}', Lang3Name='{Lang3Name}' where AdmNum={AdmNum};"
            )
        # ? Grade 9 - 10
        elif 9 <= OldClass <= 10:
            cur.execute(
                f"update catfour set Name='{Name}', Class={OldClass}, Section='{Section}', RollNumber={RollNum}, Lang2Name='{Lang2Name}' where AdmNum={AdmNum};"
            )
        elif 11 <= OldClass <= 12:
            if NewStream.lower() == OldStream.lower():
                # ? Math, Physics, Chemistry
                if NewStream.lower() == "mpc":
                    cur.execute(
                        f"update catfive set Name='{Name}', Class={OldClass}, Section='{Section}', RollNumber={RollNum}, FcoreName='{FcoreName}' where AdmNum={AdmNum};"
                    )
                # ? Biology, Physics, Chemistry
                elif NewStream.lower() == "bipc":
                    cur.execute(
                        f"update catsix set Name='{Name}', Class={OldClass}, Section='{Section}', RollNumber={RollNum}, FcoreName='{FcoreName}' where AdmNum={AdmNum};"
                    )
                # ? Commerce
                elif NewStream.lower() == "cec":
                    cur.execute(
                        f"update catseven set Name='{Name}', Class={OldClass}, Section='{Section}', RollNumber={RollNum}, FcoreName='{FcoreName}' where AdmNum={AdmNum};"
                    )
                # ? Humanities
                elif NewStream.lower() == "humanities":
                    cur.execute(
                        f"update cateight set Name='{Name}', Class={OldClass}, Section='{Section}', RollNumber={RollNum}, FcoreName='{FcoreName}' where AdmNum={AdmNum};"
                    )
            else:
                cur.execute(f"delete from catfive where AdmNum={AdmNum}")
                cur.execute(f"delete from catsix where AdmNum={AdmNum}")
                cur.execute(f"delete from catseven where AdmNum={AdmNum}")
                cur.execute(f"delete from cateight where AdmNum={AdmNum}")
                if NewStream.lower() == "mpc":
                    cur.execute(
                        f"insert into catfive(AdmNum, Name, Class, Section, Rollnumber, FcoreName) values({AdmNum}, '{Name}', {NewClass}, '{Section}', {RollNum}, '{FcoreName}')"
                    )
                elif NewStream.lower() == "bipc":
                    cur.execute(
                        f"insert into catsix(AdmNum, Name, Class, Section, Rollnumber, FcoreName) values({AdmNum}, '{Name}', {NewClass}, '{Section}', {RollNum}, '{FcoreName}')"
                    )
                elif NewStream.lower() == "cec":
                    cur.execute(
                        f"insert into catseven(AdmNum, Name, Class, Section, Rollnumber, FcoreName) values({AdmNum}, '{Name}', {NewClass}, '{Section}', {RollNum}, '{FcoreName}')"
                    )
                elif NewStream.lower() == "humanities":
                    cur.execute(
                        f"insert into cateight(AdmNum, Name, Class, Section, Rollnumber, FcoreName) values({AdmNum}, '{Name}', {NewClass}, '{Section}', {RollNum}, '{FcoreName}')"
                    )
        # ! If classes are different, deleting entry and creating new entry in respective category.
    else:
        cur.execute(f"delete from catone where AdmNum={AdmNum}")
        cur.execute(f"delete from cattwo where AdmNum={AdmNum}")
        cur.execute(f"delete from catthree where AdmNum={AdmNum}")
        cur.execute(f"delete from catfour where AdmNum={AdmNum}")
        cur.execute(f"delete from catfive where AdmNum={AdmNum}")
        cur.execute(f"delete from catsix where AdmNum={AdmNum}")
        cur.execute(f"delete from catseven where AdmNum={AdmNum}")
        cur.execute(f"delete from cateight where AdmNum={AdmNum}")
        if NewClass == 1:
            cur.execute(
                f"insert into catone(AdmNum, Name, Class, Section, Rollnumber, Lang2Name) values({AdmNum}, '{Name}', {NewClass}, '{Section}', {RollNum} '{Lang2Name}')"
            )
        elif 2 <= NewClass <= 4:
            cur.execute(
                f"insert into cattwo(AdmNum, Name, Class, Section, Rollnumber, Lang2Name) values({AdmNum}, '{Name}', {NewClass}, '{Section}', {RollNum}, '{Lang2Name}')"
            )
        elif 5 <= NewClass <= 8:
            cur.execute(
                f"insert into catthree(AdmNum, Name, Class, Section, Rollnumber, Lang2Name, Lang3Name) values({AdmNum}, '{Name}', {NewClass}, '{Section}', {RollNum}, '{Lang2Name}', '{Lang3Name}')"
            )
        elif 9 <= NewClass <= 10:
            cur.execute(
                f"insert into catfour(AdmNum, Name, Class, Section, Rollnumber, Lang2Name) values({AdmNum}, '{Name}', {NewClass}, '{Section}', {RollNum}, '{Lang2Name}')"
            )
        elif 11 <= NewClass <= 12:
            if NewStream.lower() == "mpc":
                cur.execute(
                    f"insert into catfive(AdmNum, Name, Class, Section, Rollnumber, FcoreName) values({AdmNum}, '{Name}', {NewClass}, '{Section}', {RollNum}, '{FcoreName}')"
                )
            elif NewStream.lower() == "bipc":
                cur.execute(
                    f"insert into catsix(AdmNum, Name, Class, Section, Rollnumber, FcoreName) values({AdmNum}, '{Name}', {NewClass}, '{Section}', {RollNum}, '{FcoreName}')"
                )
            elif NewStream.lower() == "cec":
                cur.execute(
                    f"insert into catseven(AdmNum, Name, Class, Section, Rollnumber, FcoreName) values({AdmNum}, '{Name}', {NewClass}, '{Section}', {RollNum}, '{FcoreName}')"
                )
            elif NewStream.lower() == "humanities":
                cur.execute(
                    f"insert into cateight(AdmNum, Name, Class, Section, Rollnumber, FcoreName) values({AdmNum}, '{Name}', {NewClass}, '{Section}', {RollNum}, '{FcoreName}')"
                )
    con.commit()
    ClearScreen()
    print("Data has been successfully changed.")
    input("Press enter to continue ")


# ! <-- Removing the student -->
def RemoveStudent():
    # ? Clearing Screen
    ClearScreen()
    # * Admission Number
    # ? Getting autocomplete for admission number
    cur.execute(f"select AdmNum from allstudents")
    a = cur.fetchall()
    adm = [str(a[i][0]) for i in range(len(a))]
    if len(adm) == 0:
        print("You have yet to add a student.")
        input("Press enter to continue ")
        return None
    # ? Getting the actual admission number
    while True:
        try:
            AdmNum = str(
                int(
                    questionary.autocomplete(
                        f"Enter admission number of the student: ",
                        adm,
                        style=minimalStyle,
                    ).ask()
                )
            )
            break
        except:
            print("Please enter a valid admission number.")
    while True:
        cur.execute(f"select name from allstudents where AdmNum={AdmNum}")
        admNumFetch = cur.fetchall()
        try:
            if len(admNumFetch) == 0:
                raise ValueError
            else:
                Name = admNumFetch[0][0]
                break
        except ValueError:
            print("This admission number does not exist.")
            while True:
                try:
                    AdmNum = str(
                        int(
                            questionary.autocomplete(
                                f"Enter admission number of the student: ",
                                adm,
                                style=minimalStyle,
                            ).ask()
                        )
                    )
                    break
                except:
                    print("Please enter a valid admission number.")
    ClearScreen()
    AreYouSure = questionary.confirm(
        f"Are you sure you want to delete {Name}'s information? ", style=minimalStyle
    ).ask()
    if AreYouSure:
        cur.execute(f"delete from allstudents where AdmNum={AdmNum}")
        cur.execute(f"delete from catone where AdmNum={AdmNum}")
        cur.execute(f"delete from cattwo where AdmNum={AdmNum}")
        cur.execute(f"delete from catthree where AdmNum={AdmNum}")
        cur.execute(f"delete from catfour where AdmNum={AdmNum}")
        cur.execute(f"delete from catfive where AdmNum={AdmNum}")
        cur.execute(f"delete from catsix where AdmNum={AdmNum}")
        cur.execute(f"delete from catseven where AdmNum={AdmNum}")
        cur.execute(f"delete from cateight where AdmNum={AdmNum}")
        con.commit()
        ClearScreen()
        print(f"Successfully Deleted {Name}!")
        input("Press enter to continue ")
    else:
        ClearScreen()
        print("Action cancelled")
        input("Press enter to continue ")


########! Related to marks !########
# ! <-- Adding Marks -->
def AddMarks():
    # ? Clearing Screen
    ClearScreen()
    # * Admission Number
    # ? Getting autocomplete for admission number
    cur.execute(f"select AdmNum from allstudents")
    a = cur.fetchall()
    adm = [str(a[i][0]) for i in range(len(a))]
    if len(adm) == 0:
        print("You have yet to add a student.")
        input("Press enter to continue ")
        return None
    # ? Getting the actual admission number
    while True:
        try:
            AdmNum = str(
                int(
                    questionary.autocomplete(
                        f"Enter admission number of the student: ",
                        adm,
                        style=minimalStyle,
                    ).ask()
                )
            )
            break
        except:
            print("Please enter a valid admission number.")
    while True:
        cur.execute(f"select class from allstudents where AdmNum={AdmNum}")
        admNumFetch = cur.fetchall()
        try:
            if len(admNumFetch) == 0:
                raise ValueError
            else:
                break
        except ValueError:
            print("This admission number does not exist.")
            while True:
                try:
                    AdmNum = str(
                        int(
                            questionary.autocomplete(
                                f"Enter admission number of the student: ",
                                adm,
                                style=minimalStyle,
                            ).ask()
                        )
                    )
                    break
                except:
                    print("Please enter a valid admission number.")
    ClearScreen()
    Class = admNumFetch[0][0]
    if Class == 1:
        English = IsProperMarks("Enter marks for English: ")
        Math = IsProperMarks("Enter marks for Mathematics: ")
        Science = IsProperMarks("Enter marks for Science: ")
        SocialSciences = IsProperMarks("Enter marks for Social Science: ")
        Lang2 = IsProperMarks("Enter marks for 2nd language: ")
        Total = English + Math + Science + SocialSciences + Lang2
        Average = round((Total / 500) * 100, 2)
        cur.execute(
            f"update catone set English={English}, Mathematics={Math}, Science={Science}, SocialSciences={SocialSciences}, Lang2={Lang2}, Average={Average}, Total = {Total} where AdmNum={AdmNum}"
        )
    elif 2 <= Class <= 4:
        English = IsProperMarks("Enter marks for English: ")
        Math = IsProperMarks("Enter marks for Mathematics: ")
        Science = IsProperMarks("Enter marks for Science: ")
        SocialSciences = IsProperMarks("Enter marks for Social Science: ")
        Lang2 = IsProperMarks("Enter marks for 2nd language: ")
        Computers = IsProperMarks("Enter marks for Computers: ")
        Total = English + Math + Science + SocialSciences + Lang2 + Computers
        Average = round((Total / 600) * 100, 2)
        cur.execute(
            f"update cattwo set English={English}, Mathematics={Math}, Science={Science}, SocialSciences={SocialSciences}, Lang2={Lang2}, Computers={Computers}, Average={Average}, Total = {Total} where AdmNum={AdmNum}"
        )

    elif 5 <= Class <= 8:
        English = IsProperMarks("Enter marks for English: ")
        Math = IsProperMarks("Enter marks for Mathematics: ")
        Science = IsProperMarks("Enter marks for Science: ")
        SocialSciences = IsProperMarks(
            "Enter marks for Social Science: ",
        )
        Lang2 = IsProperMarks("Enter marks for 2nd language: ")
        Lang3 = IsProperMarks("Enter marks for 3nd language: ")
        Computers = IsProperMarks("Enter marks for Computers: ")
        Total = English + Math + Science + SocialSciences + Lang2 + Lang3 + Computers
        Average = round((Total / 700) * 100, 2)
        cur.execute(
            f"update catthree set English={English}, Mathematics={Math}, Science={Science}, SocialSciences={SocialSciences}, Lang2={Lang2}, Lang3={Lang3}, Computers={Computers}, Average={Average}, Total = {Total} where AdmNum={AdmNum}"
        )

    elif 9 <= Class <= 10:
        English = IsProperMarks("Enter marks for English: ")
        Math = IsProperMarks("Enter marks for Mathematics: ")
        Science = IsProperMarks("Enter marks for Science: ")
        SocialSciences = IsProperMarks("Enter marks for Social Science: ")
        Lang2 = IsProperMarks("Enter marks for 2nd language: ")
        Total = English + Math + Science + SocialSciences + Lang2
        Average = round((Total / 500) * 100, 2)
        cur.execute(
            f"update catfour set English={English}, Mathematics={Math}, Science={Science}, SocialSciences={SocialSciences}, Lang2={Lang2}, Average={Average}, Total = {Total} where AdmNum={AdmNum}"
        )

    elif 11 <= Class <= 12:
        # ? Mathematics, Physics, Chemistry
        cur.execute(f"select FcoreName from catfive where AdmNum={AdmNum}")
        MPCFetch = cur.fetchall()
        if len(MPCFetch) != 0:
            FcoreName = MPCFetch[0][0]
            English = IsProperMarks("Enter marks for English: ")
            Math = IsProperMarks("Enter marks for Mathematics: ")
            Physics = IsProperMarks("Enter marks for Physics: ")
            Chemistry = IsProperMarks("Enter marks for Chemistry: ")
            Fcore = IsProperMarks(f"Enter marks for {FcoreName}: ")
            Total = English + Math + Physics + Chemistry + Fcore
            Average = round((Total / 500) * 100, 2)
            cur.execute(
                f"update catfive set English={English}, Mathematics={Math}, Physics={Physics}, Chemistry={Chemistry}, Fcore={Fcore}, Average={Average}, Total = {Total} where AdmNum={AdmNum}"
            )

        # ? Biology, Physics, Chemistry
        cur.execute(f"select FcoreName from catsix where AdmNum={AdmNum}")
        BiPCFetch = cur.fetchall()
        if len(BiPCFetch) != 0:
            FcoreName = BiPCFetch[0][0]
            English = IsProperMarks("Enter marks for English: ")
            Biology = IsProperMarks("Enter marks for Biology: ")
            Physics = IsProperMarks("Enter marks for Physics: ")
            Chemistry = IsProperMarks("Enter marks for Chemistry: ")
            Fcore = IsProperMarks(f"Enter marks for {FcoreName}: ")
            Total = English + Biology + Physics + Chemistry + Fcore
            Average = round((Total / 500) * 100, 2)
            cur.execute(
                f"update catsix set English={English}, Biology={Biology}, Physics={Physics}, Chemistry={Chemistry}, Fcore={Fcore}, Average={Average}, Total = {Total} where AdmNum={AdmNum}"
            )

        # ? Commerce
        cur.execute(f"select FcoreName from catseven where AdmNum={AdmNum}")
        CECFetch = cur.fetchall()
        if len(CECFetch) != 0:
            FcoreName = CECFetch[0][0]
            English = IsProperMarks("Enter marks for English: ")
            Accounts = IsProperMarks("Enter marks for Accounts: ")
            BusinessStudies = IsProperMarks("Enter marks for Business Studies: ")
            Econ = IsProperMarks("Enter marks for Economics: ")
            Fcore = IsProperMarks(f"Enter marks for {FcoreName}: ")
            Total = English + Accounts + BusinessStudies + Econ + Fcore
            Average = round((Total / 500) * 100, 2)
            cur.execute(
                f"update catseven set English={English}, Accounts={Accounts}, BusinessStudies={BusinessStudies}, Economics={Econ}, Fcore={Fcore}, Average={Average}, Total = {Total} where AdmNum={AdmNum}"
            )

        # ? Humanities
        cur.execute(f"select FcoreName from cateight where AdmNum={AdmNum}")
        HumanitiesFetch = cur.fetchall()
        if len(HumanitiesFetch) != 0:
            FcoreName = HumanitiesFetch[0][0]
            English = IsProperMarks("Enter marks for English: ")
            History = IsProperMarks("Enter marks for History: ")
            PolSci = IsProperMarks("Enter marks for Political Sciences: ")
            Econ = IsProperMarks("Enter marks for Economics: ")
            Fcore = IsProperMarks(f"Enter marks for {FcoreName}: ")
            Total = English + History + PolSci + Econ + Fcore
            Average = round((Total / 500) * 100)
            cur.execute(
                f"update cateight set English={English}, History={History}, PoliticalSciences={PolSci}, Economics={Econ}, Fcore={Fcore}, Average={Average}, Total = {Total} where AdmNum={AdmNum}"
            )
    con.commit()
    ClearScreen()
    print(f"Marks have successfully been added.")
    input("Press enter to continue ")


# ! <-- Editing Marks -->
def EditMarks():
    # ? Clearing Screen
    ClearScreen()
    # * Admission Number
    # ? Getting autocomplete for admission number
    cur.execute(f"select AdmNum from allstudents")
    a = cur.fetchall()
    adm = [str(a[i][0]) for i in range(len(a))]
    if len(adm) == 0:
        print("You have yet to add a student.")
        input("Press enter to continue ")
        return None
    # ? Getting the actual admission number
    while True:
        try:
            AdmNum = str(
                int(
                    questionary.autocomplete(
                        f"Enter admission number of the student: ",
                        adm,
                        style=minimalStyle,
                    ).ask()
                )
            )
            break
        except:
            print("Please enter a valid admission number.")
    while True:
        cur.execute(f"select class from allstudents where AdmNum={AdmNum}")
        admNumFetch = cur.fetchall()
        try:
            if len(admNumFetch) == 0:
                raise ValueError
            else:
                break
        except ValueError:
            print("This admission number does not exist.")
            while True:
                try:
                    AdmNum = str(
                        int(
                            questionary.autocomplete(
                                f"Enter admission number of the student: ",
                                adm,
                                style=minimalStyle,
                            ).ask()
                        )
                    )
                    break
                except:
                    print("Please enter a valid admission number.")
    Class = admNumFetch[0][0]
    if Class == 1:
        English = IsProperMarks("Enter new marks for English: ")
        Math = IsProperMarks("Enter new marks for Mathematics: ")
        Science = IsProperMarks("Enter new marks for Science: ")
        SocialSciences = IsProperMarks("Enter new marks for Social Science: ")
        Lang2 = IsProperMarks("Enter new marks for 2nd language: ")
        Total = English + Math + Science + SocialSciences + Lang2
        Average = round((Total / 500) * 100, 2)
        cur.execute(
            f"update catone set English={English}, Mathematics={Math}, Science={Science}, SocialSciences={SocialSciences}, Lang2={Lang2}, Average={Average}, Total = {Total} where AdmNum={AdmNum}"
        )
    elif 2 <= Class <= 4:
        English = IsProperMarks("Enter new marks for English: ")
        Math = IsProperMarks("Enter new marks for Mathematics: ")
        Science = IsProperMarks("Enter new marks for Science: ")
        SocialSciences = IsProperMarks("Enter new marks for Social Science: ")
        Lang2 = IsProperMarks("Enter new marks for 2nd language: ")
        Computers = IsProperMarks("Enter new marks for Computers: ")
        Total = English + Math + Science + SocialSciences + Lang2 + Computers
        Average = round((Total / 600) * 100, 2)
        cur.execute(
            f"update cattwo set English={English}, Mathematics={Math}, Science={Science}, SocialSciences={SocialSciences}, Lang2={Lang2}, Computers={Computers}, Average={Average}, Total = {Total} where AdmNum={AdmNum}"
        )

    elif 5 <= Class <= 8:
        English = IsProperMarks("Enter new marks for English: ")
        Math = IsProperMarks("Enter new marks for Mathematics: ")
        Science = IsProperMarks("Enter new marks for Science: ")
        SocialSciences = IsProperMarks("Enter new marks for Social Science: ")
        Lang2 = IsProperMarks("Enter new marks for 2nd language: ")
        Lang3 = IsProperMarks("Enter new marks for 3nd language: ")
        Computers = IsProperMarks("Enter new marks for Computers: ")
        Total = English + Math + Science + SocialSciences + Lang2 + Lang3 + Computers
        Average = round((Total / 700) * 100, 2)
        cur.execute(
            f"update catthree set English={English}, Mathematics={Math}, Science={Science}, SocialSciences={SocialSciences}, Lang2={Lang2}, Lang3={Lang3}, Computers={Computers}, Average={Average}, Total = {Total} where AdmNum={AdmNum}"
        )

    elif 9 <= Class <= 10:
        English = IsProperMarks("Enter new marks for English: ")
        Math = IsProperMarks("Enter new marks for Mathematics: ")
        Science = IsProperMarks("Enter new marks for Science: ")
        SocialSciences = IsProperMarks("Enter new marks for Social Science: ")
        Lang2 = IsProperMarks("Enter new marks for 2nd language: ")
        Total = English + Math + Science + SocialSciences + Lang2
        Average = round((Total / 500) * 100, 2)
        cur.execute(
            f"update catfour set English={English}, Mathematics={Math}, Science={Science}, SocialSciences={SocialSciences}, Lang2={Lang2}, Average={Average}, Total = {Total} where AdmNum={AdmNum}"
        )

    elif 11 <= Class <= 12:
        # ? Mathematics, Physics, Chemistry
        cur.execute(f"select FcoreName from catfive where AdmNum={AdmNum}")
        MPCFetch = cur.fetchall()
        if len(MPCFetch) != 0:
            FcoreName = MPCFetch[0][0]
            English = IsProperMarks("Enter new marks for English: ")
            Math = IsProperMarks("Enter new marks for Mathematics: ")
            Physics = IsProperMarks("Enter new marks for Physics: ")
            Chemistry = IsProperMarks("Enter new marks for Chemistry: ")
            Fcore = IsProperMarks(f"Enter new marks for {FcoreName}: ")
            Total = English + Math + Physics + Chemistry + Fcore
            Average = round((Total / 500) * 100, 2)
            cur.execute(
                f"update catfive set English={English}, Mathematics={Math}, Physics={Physics}, Chemistry={Chemistry}, Fcore={Fcore}, Average={Average}, Total = {Total} where AdmNum={AdmNum}"
            )

        # ? Biology, Physics, Chemistry
        cur.execute(f"select FcoreName from catsix where AdmNum={AdmNum}")
        BiPCFetch = cur.fetchall()
        if len(BiPCFetch) != 0:
            FcoreName = BiPCFetch[0][0]
            English = IsProperMarks("Enter new marks for English: ")
            Biology = IsProperMarks("Enter new marks for Biology: ")
            Physics = IsProperMarks("Enter new marks for Physics: ")
            Chemistry = IsProperMarks("Enter new marks for Chemistry: ")
            Fcore = IsProperMarks(f"Enter new marks for {FcoreName}: ")
            Total = English + Biology + Physics + Chemistry + Fcore
            Average = round((Total / 500) * 100, 2)
            cur.execute(
                f"update catsix set English={English}, Biology={Biology}, Physics={Physics}, Chemistry={Chemistry}, Fcore={Fcore}, Average={Average}, Total = {Total} where AdmNum={AdmNum}"
            )

        # ? Commerce
        cur.execute(f"select FcoreName from catseven where AdmNum={AdmNum}")
        CECFetch = cur.fetchall()
        if len(CECFetch) != 0:
            FcoreName = CECFetch[0][0]
            English = IsProperMarks("Enter new marks for English: ")
            Accounts = IsProperMarks("Enter new marks for Accounts: ")
            BusinessStudies = IsProperMarks("Enter new marks for Business Studies: ")
            Econ = IsProperMarks("Enter new marks for Economics: ")
            Fcore = IsProperMarks(f"Enter new marks for {FcoreName}: ")
            Total = English + Accounts + BusinessStudies + Econ + Fcore
            Average = round((Total / 500) * 100, 2)
            cur.execute(
                f"update catseven set English={English}, Accounts={Accounts}, BusinessStudies={BusinessStudies}, Economics={Econ}, Fcore={Fcore}, Average={Average}, Total = {Total} where AdmNum={AdmNum}"
            )

        # ? Humanities
        cur.execute(f"select FcoreName from cateight where AdmNum={AdmNum}")
        HumanitiesFetch = cur.fetchall()
        if len(HumanitiesFetch) != 0:
            FcoreName = HumanitiesFetch[0][0]
            English = IsProperMarks("Enter new marks for English: ")
            History = IsProperMarks("Enter new marks for History: ")
            PolSci = IsProperMarks("Enter new marks for Political Sciences: ")
            Econ = IsProperMarks("Enter new marks for Economics: ")
            Fcore = IsProperMarks(f"Enter new marks for {FcoreName}: ")
            Total = English + History + PolSci + Econ + Fcore
            Average = round((Total / 500) * 100, 2)
            cur.execute(
                f"update cateight set English={English}, History={History}, PoliticalSciences={PolSci}, Economics={Econ}, Fcore={Fcore}, Average={Average}, Total = {Total} where AdmNum={AdmNum}"
            )
    con.commit()
    ClearScreen()
    print("Marks have been successfully changed.")


# ! <-- Removing Marks -->
def RemoveMarks():
    # ? Clearing Screen
    ClearScreen()
    # * Admission Number
    # ? Getting autocomplete for admission number
    cur.execute(f"select AdmNum from allstudents")
    a = cur.fetchall()
    adm = [str(a[i][0]) for i in range(len(a))]
    if len(adm) == 0:
        print("You have yet to add a student.")
        input("Press enter to continue ")
        return None
    # ? Getting the actual admission number
    while True:
        try:
            AdmNum = str(
                int(
                    questionary.autocomplete(
                        f"Enter admission number of the student: ",
                        adm,
                        style=minimalStyle,
                    ).ask()
                )
            )
            break
        except:
            print("Please enter a valid admission number.")
    while True:
        cur.execute(f"select name from allstudents where AdmNum={AdmNum}")
        admNumFetch = cur.fetchall()
        try:
            if len(admNumFetch) == 0:
                raise ValueError
            else:
                Name = admNumFetch[0][0]
                break
        except ValueError:
            print("This admission number does not exist.")
            while True:
                try:
                    AdmNum = str(
                        int(
                            questionary.autocomplete(
                                f"Enter admission number of the student: ",
                                adm,
                                style=minimalStyle,
                            ).ask()
                        )
                    )
                    break
                except:
                    print("Please enter a valid admission number.")
    ClearScreen()
    AreYouSure = questionary.confirm(
        f"Are you sure you want to delete the marks of {Name}?", style=minimalStyle
    ).ask()
    if AreYouSure:
        cur.execute(
            f"update catone set English=Null, Mathematics=Null, Science=Null, SocialSciences=Null, Lang2=Null, Average=Null, Total=Null where AdmNum={AdmNum}"
        )
        cur.execute(
            f"update cattwo set English=Null, Mathematics=Null, Science=Null, SocialSciences=Null, Lang2=Null, Computers=Null, Average=Null, Total=Null where AdmNum={AdmNum}"
        )
        cur.execute(
            f"update catthree set English=Null, Mathematics=Null, Science=Null, SocialSciences=Null, Lang2=Null, Lang3=Null, Computers=Null, Average=Null, Total=Null where AdmNum={AdmNum}"
        )
        cur.execute(
            f"update catfour set English=Null, Mathematics=Null, Science=Null, SocialSciences=Null, Lang2=Null, Average=Null, Total=Null where AdmNum={AdmNum}"
        )
        cur.execute(
            f"update catfive set English=Null, Mathematics=Null, Physics=Null, Chemistry=Null, Fcore=Null, Average=Null, Total=Null where AdmNum={AdmNum}"
        )
        cur.execute(
            f"update catsix set English=Null, Biology=Null, Physics=Null, Chemistry=Null, Fcore=Null, Average=Null, Total=Null where AdmNum={AdmNum}"
        )
        cur.execute(
            f"update catseven set English=Null, Accounts=Null, BusinessStudies=Null, Economics=Null, Fcore=Null, Average=Null, Total=Null where AdmNum={AdmNum}"
        )
        cur.execute(
            f"update cateight set English=Null, History=Null, PoliticalSciences=Null, Economics=Null, Fcore=Null, Average=Null, Total=Null where AdmNum={AdmNum}"
        )
        con.commit()
        ClearScreen()
        print("Successfully deleted!")
    else:
        ClearScreen()
        print("Action cancelled")


########! Related to viewing data !########
# ! <-- Showing graph for Marks and Subjects -->
def ShowGraph():
    # ? Clearing Screen
    ClearScreen()
    # * Admission Number
    # ? Getting autocomplete for admission number
    cur.execute(f"select AdmNum from allstudents")
    a = cur.fetchall()
    adm = [str(a[i][0]) for i in range(len(a))]
    if len(adm) == 0:
        print("You have yet to add a student.")
        input("Press enter to continue ")
        return None
    # ? Getting the actual admission number
    while True:
        try:
            AdmNum = str(
                int(
                    questionary.autocomplete(
                        f"Enter admission number of the student: ",
                        adm,
                        style=minimalStyle,
                    ).ask()
                )
            )
            break
        except:
            print("Please enter a valid admission number.")
    while True:
        cur.execute(f"select class from allstudents where AdmNum={AdmNum}")
        admNumFetch = cur.fetchall()
        try:
            if len(admNumFetch) == 0:
                raise ValueError
            else:
                break
        except ValueError:
            print("This admission number does not exist.")
            while True:
                try:
                    AdmNum = str(
                        int(
                            questionary.autocomplete(
                                f"Enter admission number of the student: ",
                                adm,
                                style=minimalStyle,
                            ).ask()
                        )
                    )
                    break
                except:
                    print("Please enter a valid admission number.")
    Class = admNumFetch[0][0]

    # ? Class 1

    if Class == 1:
        cur.execute(f"select * from catone where AdmNum={AdmNum}")
        result = cur.fetchall()[0]
        SubMarks = result[6:11]
        name = result[1]
        Subjects = [
            "English",
            "Mathematics",
            "Science",
            "Social Sciences",
            "2ndLang",
        ]

    # ? Class 2 - Class 4

    elif 2 <= Class <= 4:
        cur.execute(f"select * from cattwo where AdmNum={AdmNum}")
        result = cur.fetchall()[0]
        SubMarks = result[6:12]
        name = result[1]
        Subjects = [
            "English",
            "Mathematics",
            "Science",
            "Social Sciences",
            "2ndLang",
            "Computers",
        ]

    # ? Class 5 - Class 8

    elif 5 <= Class <= 8:
        cur.execute(f"select * from catthree where AdmNum={AdmNum}")
        result = cur.fetchall()[0]
        SubMarks = result[7:14]
        name = result[1]
        Subjects = [
            "English",
            "Mathematics",
            "Science",
            "Social Sciences",
            "2ndLang",
            "3rdLang",
            "Computers",
        ]

    # ? Class 9 to Class 10

    elif 9 <= Class <= 10:
        cur.execute(f"select * from catfour where AdmNum={AdmNum}")
        result = cur.fetchall()[0]
        SubMarks = result[6:11]
        name = result[1]
        Subjects = [
            "English",
            "Mathematics",
            "Science",
            "Social Sciences",
            "2ndLang",
        ]

    elif 11 <= Class <= 12:
        # ? Mathematics, Physics, Chemistry
        cur.execute(f"select * from catfive where AdmNum = {AdmNum}")
        MPCResult = cur.fetchall()
        if len(MPCResult) != 0:
            MPCResult = MPCResult[0]
            SubMarks = MPCResult[6:11]
            name = MPCResult[1]
            Subjects = [
                "English",
                "Mathematics",
                "Physics",
                "Chemistry",
                "5th Core",
            ]

        # ? Biology, Physics, Chemistry
        cur.execute(f"select * from catsix where AdmNum = {AdmNum}")
        BiPCResult = cur.fetchall()
        if len(BiPCResult) != 0:
            BiPCResult = BiPCResult[0]
            SubMarks = BiPCResult[6:11]
            name = BiPCResult[1]
            Subjects = ["English", "Biology", "Physics", "Chemistry", "5th Core"]

        # ? Commerce
        cur.execute(f"select * from catseven where AdmNum = {AdmNum}")
        CECResult = cur.fetchall()
        if len(CECResult) != 0:
            CECResult = CECResult[0]
            SubMarks = CECResult[6:11]
            name = CECResult[1]
            Subjects = [
                "English",
                "Accounts",
                "Business Studies",
                "Economics",
                "5th Core",
            ]

        # ? Humanities
        cur.execute(f"select * from cateight where AdmNum = {AdmNum}")
        HumanitiesResult = cur.fetchall()
        if len(HumanitiesResult) != 0:
            HumanitiesResult = HumanitiesResult[0]
            SubMarks = HumanitiesResult[6:11]
            name = HumanitiesResult[1]
            Subjects = [
                "English",
                "History",
                "Political Sciences",
                "Economics",
                "5th Core",
            ]
    try:
        title(f"Name: {name}    Admission Number: {AdmNum}")
        bar(Subjects, SubMarks)
        xlabel("Subjects")
        ylabel("Marks")
        StatBar(1.2, "[cyan] Loading Graph")
        show()
    except:
        print("Marks do not exist.")
        input("Press enter to continue ")


# ! <-- Displaying individual student records -->
def StudentRecords():
    ClearScreen()
    # * Admission Number
    # ? Getting autocomplete for admission number
    cur.execute(f"select AdmNum from allstudents")
    a = cur.fetchall()
    adm = [str(a[i][0]) for i in range(len(a))]
    if len(adm) == 0:
        print("You have yet to add a student.")
        input("Press enter to continue ")
        return None
    # ? Getting the actual admission number
    while True:
        try:
            AdmNum = str(
                int(
                    questionary.autocomplete(
                        f"Enter admission number of the student: ",
                        adm,
                        style=minimalStyle,
                    ).ask()
                )
            )
            break
        except:
            print("Please enter a valid admission number.")
    while True:
        cur.execute(f"select class from allstudents where AdmNum={AdmNum}")
        admNumFetch = cur.fetchall()
        try:
            if len(admNumFetch) == 0:
                raise ValueError
            else:
                break
        except ValueError:
            print("This admission number does not exist.")
            while True:
                try:
                    AdmNum = str(
                        int(
                            questionary.autocomplete(
                                f"Enter admission number of the student: ",
                                adm,
                                style=minimalStyle,
                            ).ask()
                        )
                    )
                    break
                except:
                    print("Please enter a valid admission number.")
    StatBar(1.2, "[cyan] Loading Records")
    ClearScreen()
    Class = admNumFetch[0][0]
    # ? Class 1
    if Class == 1:
        cur.execute(f"select * from catone where AdmNum={AdmNum}")
        res = cur.fetchall()[0]
        result = {
            "Admission Number": res[0],
            "Name": res[1],
            "Class": res[2],
            "Section": res[3],
            "Roll Number": res[4],
            "2nd Language": res[5],
            "English": res[6],
            "Mathematics": res[7],
            "Science": res[8],
            "Social Sciences": res[9],
            res[5]: res[10],
            "Total": res[11],
            "Average %": res[12],
        }

        table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
        table.add_column("Admission Number", style="green")
        table.add_column("Name", style="cyan")
        table.add_column("Class", style="cyan")
        table.add_column("Section", style="cyan")
        table.add_column("Roll Number", style="cyan")
        table.add_column("2nd Language", style="cyan")
        table.add_column("English", style="magenta")
        table.add_column("Mathematics", style="magenta")
        table.add_column("Science", style="magenta")
        table.add_column("Social Sciences", style="magenta")
        table.add_column(res[5], style="magenta")
        table.add_column("Total", style="red")
        table.add_column("Average %", style="red")
        table.add_row(
            str(res[0]),
            str(res[1]),
            str(res[2]),
            str(res[3]),
            str(res[4]),
            str(res[5]),
            str(res[6]),
            str(res[7]),
            str(res[8]),
            str(res[9]),
            str(res[10]),
            str(res[11]),
            str(res[12]),
        )

        if result["English"] == None:
            table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
            table.add_column("Admission Number", style="green")
            table.add_column("Name", style="cyan")
            table.add_column("Class", style="cyan")
            table.add_column("Section", style="cyan")
            table.add_column("Roll Number", style="cyan")
            table.add_column("2nd Language", style="cyan")
            table.add_row(
                str(res[0]),
                str(res[1]),
                str(res[2]),
                str(res[3]),
                str(res[4]),
                str(res[5]),
            )
            prompt = f"{res[1]}'s details: "
        else:
            prompt = f"{res[1]}'s report card: "

    # ? Class 2 - Class 4
    elif 2 <= Class <= 4:
        cur.execute(f"select * from cattwo where AdmNum={AdmNum}")
        res = cur.fetchall()[0]
        result = {
            "Admission Number": res[0],
            "Name": res[1],
            "Class": res[2],
            "Section": res[3],
            "Roll Number": res[4],
            "2nd Language": res[5],
            "English": res[6],
            "Mathematics": res[7],
            "Science": res[8],
            "Social Sciences": res[9],
            res[5]: res[10],
            "Computers": res[11],
            "Total": res[12],
            "Average %": res[13],
        }
        table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
        table.add_column("Admission Number", style="green")
        table.add_column("Name", style="cyan")
        table.add_column("Class", style="cyan")
        table.add_column("Section", style="cyan")
        table.add_column("Roll Number", style="cyan")
        table.add_column("2nd Language", style="cyan")
        table.add_column("English", style="magenta")
        table.add_column("Mathematics", style="magenta")
        table.add_column("Science", style="magenta")
        table.add_column("Social Sciences", style="magenta")
        table.add_column(res[5], style="magenta")
        table.add_column("Computers", style="magenta")
        table.add_column("Total", style="red")
        table.add_column("Average %", style="red")
        table.add_row(
            str(res[0]),
            str(res[1]),
            str(res[2]),
            str(res[3]),
            str(res[4]),
            str(res[5]),
            str(res[6]),
            str(res[7]),
            str(res[8]),
            str(res[9]),
            str(res[10]),
            str(res[11]),
            str(res[12]),
            str(res[13]),
        )

        if result["English"] == None:
            table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
            table.add_column("Admission Number", style="green")
            table.add_column("Name", style="cyan")
            table.add_column("Class", style="cyan")
            table.add_column("Section", style="cyan")
            table.add_column("Roll Number", style="cyan")
            table.add_column("2nd Language", style="cyan")
            table.add_row(
                str(res[0]),
                str(res[1]),
                str(res[2]),
                str(res[3]),
                str(res[4]),
                str(res[5]),
            )
            prompt = f"{res[1]}'s details: "
        else:
            prompt = f"{res[1]}'s report card: "
    # ? Class 5 - Class 8
    elif 5 <= Class <= 8:
        cur.execute(f"select * from catthree where AdmNum={AdmNum}")
        res = cur.fetchall()[0]
        result = {
            "Admission Number": res[0],
            "Name": res[1],
            "Class": res[2],
            "Section": res[3],
            "Roll Number": res[4],
            "2nd Language": res[5],
            "3rd Language": res[6],
            "English": res[7],
            "Mathematics": res[8],
            "Science": res[9],
            "Social Sciences": res[10],
            res[5]: res[11],
            res[6]: res[12],
            "Computers": res[13],
            "Total": res[14],
            "Average %": res[15],
        }
        table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
        table.add_column("Admission Number", style="green")
        table.add_column("Name", style="cyan")
        table.add_column("Class", style="cyan")
        table.add_column("Section", style="cyan")
        table.add_column("Roll Number", style="cyan")
        table.add_column("2nd Language", style="cyan")
        table.add_column("3rd Language", style="cyan")
        table.add_column("English", style="magenta")
        table.add_column("Mathematics", style="magenta")
        table.add_column("Science", style="magenta")
        table.add_column("Social Sciences", style="magenta")
        table.add_column(res[5], style="magenta")
        table.add_column(res[6], style="magenta")
        table.add_column("Computers", style="magenta")
        table.add_column("Total", style="red")
        table.add_column("Average %", style="red")
        table.add_row(
            str(res[0]),
            str(res[1]),
            str(res[2]),
            str(res[3]),
            str(res[4]),
            str(res[5]),
            str(res[6]),
            str(res[7]),
            str(res[8]),
            str(res[9]),
            str(res[10]),
            str(res[11]),
            str(res[12]),
            str(res[13]),
            str(res[14]),
        )
        if result["English"] == None:
            table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
            table.add_column("Admission Number", style="green")
            table.add_column("Name", style="cyan")
            table.add_column("Class", style="cyan")
            table.add_column("Section", style="cyan")
            table.add_column("Roll Number", style="cyan")
            table.add_column("2nd Language", style="cyan")
            table.add_row(
                str(res[0]),
                str(res[1]),
                str(res[2]),
                str(res[3]),
                str(res[4]),
                str(res[5]),
                str(res[6]),
            )
            prompt = f"{res[1]}'s details: "
        else:
            prompt = f"{res[1]}'s report card: "
    # ? Class 9 & 10
    elif 9 <= Class <= 10:
        cur.execute(f"select * from catfour where AdmNum={AdmNum}")
        res = cur.fetchall()[0]
        result = {
            "Admission Number": res[0],
            "Name": res[1],
            "Class": res[2],
            "Section": res[3],
            "Roll Number": res[4],
            "2nd Language": res[5],
            "English": res[6],
            "Mathematics": res[7],
            "Science": res[8],
            "Social Sciences": res[9],
            res[5]: res[10],
            "Total": res[11],
            "Average %": res[12],
        }
        table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
        table.add_column("Admission Number", style="green")
        table.add_column("Name", style="cyan")
        table.add_column("Class", style="cyan")
        table.add_column("Section", style="cyan")
        table.add_column("Roll Number", style="cyan")
        table.add_column("English", style="magenta")
        table.add_column("Mathematics", style="magenta")
        table.add_column("Science", style="magenta")
        table.add_column("Social Sciences", style="magenta")
        table.add_column(res[5], style="magenta")
        table.add_column("Total", style="red")
        table.add_column("Average %", style="red")
        table.add_row(
            str(res[0]),
            str(res[1]),
            str(res[2]),
            str(res[3]),
            str(res[4]),
            str(res[5]),
            str(res[6]),
            str(res[7]),
            str(res[8]),
            str(res[9]),
            str(res[10]),
            str(res[11]),
        )
        if result["English"] == None:
            table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
            table.add_column("Admission Number", style="green")
            table.add_column("Name", style="cyan")
            table.add_column("Class", style="cyan")
            table.add_column("Section", style="cyan")
            table.add_column("Roll Number", style="cyan")
            table.add_column("2nd Language", style="cyan")
            table.add_row(
                str(res[0]),
                str(res[1]),
                str(res[2]),
                str(res[3]),
                str(res[4]),
                str(res[5]),
            )
            prompt = f"{res[1]}'s details: "
        else:
            prompt = f"{res[1]}'s report card: "
    # ? Class 11 & 12
    elif 11 <= Class <= 12:
        # ? Mathematics, Physics, Chemistry
        cur.execute(f"select * from catfive where AdmNum={AdmNum}")
        res = cur.fetchall()
        if len(res) != 0:
            res = res[0]
            result = {
                "Admission Number": res[0],
                "Name": res[1],
                "Class": res[2],
                "Section": res[3],
                "Roll Number": res[4],
                "5th Core": res[5],
                "English": res[6],
                "Mathematics": res[7],
                "Physics": res[8],
                "Chemistry": res[9],
                res[5]: res[10],
                "Total": res[11],
                "Average %": res[12],
            }
            table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
            table.add_column("Admission Number", style="green")
            table.add_column("Name", style="cyan")
            table.add_column("Class", style="cyan")
            table.add_column("Section", style="cyan")
            table.add_column("Roll Number", style="cyan")
            table.add_column("5th Core", style="cyan")
            table.add_column("English", style="magenta")
            table.add_column("Mathematics", style="magenta")
            table.add_column("Science", style="magenta")
            table.add_column("Social Sciences", style="magenta")
            table.add_column(res[5], style="magenta")
            table.add_column("Total", style="red")
            table.add_column("Average %", style="red")
            table.add_row(
                str(res[0]),
                str(res[1]),
                str(res[2]),
                str(res[3]),
                str(res[4]),
                str(res[5]),
                str(res[6]),
                str(res[7]),
                str(res[8]),
                str(res[9]),
                str(res[10]),
                str(res[11]),
                str(res[12]),
            )
            if result["English"] == None:
                table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
                table.add_column("Admission Number", style="magenta")
                table.add_column("Name", style="cyan")
                table.add_column("Class", style="cyan")
                table.add_column("Section", style="cyan")
                table.add_column("Roll Number", style="cyan")
                table.add_column("5th Core", style="cyan")
                table.add_row(
                    str(res[0]),
                    str(res[1]),
                    str(res[2]),
                    str(res[3]),
                    str(res[4]),
                    str(res[5]),
                )
                prompt = f"{res[1]}'s details: "
            else:
                prompt = f"{res[1]}'s report card: "
        # ? Biology, Physics, Chemistry
        cur.execute(f"select * from catsix where AdmNum={AdmNum}")
        res = cur.fetchall()
        if len(res) != 0:
            res = res[0]
            result = {
                "Admission Number": res[0],
                "Name": res[1],
                "Class": res[2],
                "Section": res[3],
                "Roll Number": res[4],
                "5th Core": res[5],
                "English": res[6],
                "Biology": res[7],
                "Physics": res[8],
                "Chemistry": res[9],
                res[5]: res[10],
                "Total": res[11],
                "Average %": res[12],
            }
            table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
            table.add_column("Admission Number", style="green")
            table.add_column("Name", style="cyan")
            table.add_column("Class", style="cyan")
            table.add_column("Section", style="cyan")
            table.add_column("Roll Number", style="cyan")
            table.add_column("5th Core", style="cyan")
            table.add_column("English", style="magenta")
            table.add_column("Mathematics", style="magenta")
            table.add_column("Science", style="magenta")
            table.add_column("Social Sciences", style="magenta")
            table.add_column(res[5], style="magenta")
            table.add_column("Total", style="red")
            table.add_column("Average %", style="red")
            table.add_row(
                str(res[0]),
                str(res[1]),
                str(res[2]),
                str(res[3]),
                str(res[4]),
                str(res[5]),
                str(res[6]),
                str(res[7]),
                str(res[8]),
                str(res[9]),
                str(res[10]),
                str(res[11]),
                str(res[12]),
            )
            if result["English"] == None:
                table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
                table.add_column("Admission Number", style="green")
                table.add_column("Name", style="cyan")
                table.add_column("Class", style="cyan")
                table.add_column("Section", style="cyan")
                table.add_column("Roll Number", style="cyan")
                table.add_column("5th Core", style="cyan")
                table.add_row(
                    str(res[0]),
                    str(res[1]),
                    str(res[2]),
                    str(res[3]),
                    str(res[4]),
                    str(res[5]),
                )
                prompt = f"{res[1]}'s details: "
            else:
                prompt = f"{res[1]}'s report card: "
        # ? Commerce
        cur.execute(f"select * from catseven where AdmNum={AdmNum}")
        res = cur.fetchall()
        if len(res) != 0:
            res = res[0]
            result = {
                "Admission Number": res[0],
                "Name": res[1],
                "Class": res[2],
                "Section": res[3],
                "Roll Number": res[4],
                "5th Core": res[5],
                "English": res[6],
                "Accounts": res[7],
                "Business Studies": res[8],
                "Economics": res[9],
                res[5]: res[10],
                "Total": res[11],
                "Average %": res[12],
            }
            table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
            table.add_column("Admission Number", style="green")
            table.add_column("Name", style="cyan")
            table.add_column("Class", style="cyan")
            table.add_column("Section", style="cyan")
            table.add_column("Roll Number", style="cyan")
            table.add_column("5th Core", style="cyan")
            table.add_column("English", style="magenta")
            table.add_column("Mathematics", style="magenta")
            table.add_column("Science", style="magenta")
            table.add_column("Social Sciences", style="magenta")
            table.add_column(res[5], style="magenta")
            table.add_column("Total", style="red")
            table.add_column("Average %", style="red")
            table.add_row(
                str(res[0]),
                str(res[1]),
                str(res[2]),
                str(res[3]),
                str(res[4]),
                str(res[5]),
                str(res[6]),
                str(res[7]),
                str(res[8]),
                str(res[9]),
                str(res[10]),
                str(res[11]),
                str(res[12]),
            )
            if result["English"] == None:
                table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
                table.add_column("Admission Number", style="green")
                table.add_column("Name", style="cyan")
                table.add_column("Class", style="cyan")
                table.add_column("Section", style="cyan")
                table.add_column("Roll Number", style="cyan")
                table.add_column("5th Core", style="cyan")
                table.add_row(
                    str(res[0]),
                    str(res[1]),
                    str(res[2]),
                    str(res[3]),
                    str(res[4]),
                    str(res[5]),
                )
                prompt = f"{res[1]}'s details: "
            else:
                prompt = f"{res[1]}'s report card: "
        # ? Humanities
        cur.execute(f"select * from cateight where AdmNum={AdmNum}")
        res = cur.fetchall()
        if len(res) != 0:
            res = res[0]
            result = {
                "Admission Number": res[0],
                "Name": res[1],
                "Class": res[2],
                "Section": res[3],
                "Roll Number": res[4],
                "5th Core": res[5],
                "English": res[6],
                "History": res[7],
                "Political Sciences": res[8],
                "Economics": res[9],
                res[5]: res[10],
                "Total": res[11],
                "Average %": res[12],
            }
            table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
            table.add_column("Admission Number", style="green")
            table.add_column("Name", style="cyan")
            table.add_column("Class", style="cyan")
            table.add_column("Section", style="cyan")
            table.add_column("Roll Number", style="cyan")
            table.add_column("5th Core", style="cyan")
            table.add_column("English", style="magenta")
            table.add_column("Mathematics", style="magenta")
            table.add_column("Science", style="magenta")
            table.add_column("Social Sciences", style="magenta")
            table.add_column(res[5], style="magenta")
            table.add_column("Total", style="red")
            table.add_column("Average %", style="red")
            table.add_row(
                str(res[0]),
                str(res[1]),
                str(res[2]),
                str(res[3]),
                str(res[4]),
                str(res[5]),
                str(res[6]),
                str(res[7]),
                str(res[8]),
                str(res[9]),
                str(res[10]),
                str(res[11]),
                str(res[12]),
            )
            if result["English"] == None:
                table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
                table.add_column("Admission Number", style="green")
                table.add_column("Name", style="cyan")
                table.add_column("Class", style="cyan")
                table.add_column("Section", style="cyan")
                table.add_column("Roll Number", style="cyan")
                table.add_column("5th Core", style="cyan")
                table.add_row(
                    str(res[0]),
                    str(res[1]),
                    str(res[2]),
                    str(res[3]),
                    str(res[4]),
                    str(res[5]),
                )
                prompt = f"{res[1]}'s details: "
            else:
                prompt = f"{res[1]}'s report card: "

    # ! Displaying Records/Report Card
    print(prompt)
    console.print(table)

    print()
    input("Press enter to continue ")


# ! <-- Displaying one or more classes records -->
def ClassRecords(Class=None):
    ClearScreen()
    # ? Class for the records
    if Class == None:
        Class = questionary.checkbox(
            "What classes do you want records for?",
            choices=[str(x) for x in range(1, 13)],
            style=minimalStyle,
        ).ask()
    else:
        Class = str(Class)
    StatBar(1.2, "[cyan] Loading Records")
    ClearScreen()
    # ? Grade 1
    Grade = Class
    if "1" in Grade:
        Class = 1
        cur.execute(f"select * from catone where class={Class}")
        res = cur.fetchall()

        if len(res) != 0:
            res = [x for x in res]
            console.print(
                Panel.fit("[bold italic bright_yellow]Grade 1", padding=(0, 20))
            )
            table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
            table.add_column("Admission Number", style="green")
            table.add_column("Name", style="cyan")
            table.add_column("Class", style="cyan")
            table.add_column("Section", style="cyan")
            table.add_column("Roll Number", style="cyan")
            table.add_column("2nd Language Name", style="cyan")
            table.add_column("English", style="magenta")
            table.add_column("Mathematics", style="magenta")
            table.add_column("Science", style="magenta")
            table.add_column("Social Sciences", style="magenta")
            table.add_column("2nd Language", style="magenta")
            table.add_column("Total", style="red")
            table.add_column("Average %", style="red")
            for i in range(len(res)):
                table.add_row(
                    str(res[i][0]),
                    str(res[i][1]),
                    str(res[i][2]),
                    str(res[i][3]),
                    str(res[i][4]),
                    str(res[i][5]),
                    str(res[i][6]),
                    str(res[i][7]),
                    str(res[i][8]),
                    str(res[i][9]),
                    str(res[i][10]),
                    str(res[i][11]),
                    str(res[i][12]),
                )
            console.print(table)
            print()
        else:
            print(f"There are no students in Grade 1")
            print()

    # ? Grade 2 - Grade 4
    if "2" in Grade or "3" in Grade or "4" in Grade:
        if "2" in Grade:
            cur.execute(f"select * from cattwo where class=2")
            res = cur.fetchall()
            if len(res) != 0:
                res = [x for x in res]
                console.print(
                    Panel.fit("[bold italic bright_yellow]Grade 2", padding=(0, 20))
                )
                table = Table(
                    show_header=True,
                    header_style="bold",
                    box=box.ROUNDED,
                )
                table.add_column("Admission Number", style="green")
                table.add_column("Name", style="cyan")
                table.add_column("Class", style="cyan")
                table.add_column("Section", style="cyan")
                table.add_column("Roll Number", style="cyan")
                table.add_column("2nd Language Name", style="cyan")
                table.add_column("English", style="magenta")
                table.add_column("Mathematics", style="magenta")
                table.add_column("Science", style="magenta")
                table.add_column("Social Sciences", style="magenta")
                table.add_column("2nd Language", style="magenta")
                table.add_column("Computers", style="magenta")
                table.add_column("Total", style="red")
                table.add_column("Average %", style="red")
                for i in range(len(res)):
                    table.add_row(
                        str(res[i][0]),
                        str(res[i][1]),
                        str(res[i][2]),
                        str(res[i][3]),
                        str(res[i][4]),
                        str(res[i][5]),
                        str(res[i][6]),
                        str(res[i][7]),
                        str(res[i][8]),
                        str(res[i][9]),
                        str(res[i][10]),
                        str(res[i][11]),
                        str(res[i][12]),
                        str(res[i][13]),
                    )
                console.print(table)
                print()
            else:
                print(f"There are no students in Grade 2")
                print()
        if "3" in Grade:
            cur.execute(f"select * from cattwo where class=3")
            res = cur.fetchall()
            if len(res) != 0:
                res = [x for x in res]
                console.print(
                    Panel.fit("[bold italic bright_yellow]Grade 3", padding=(0, 20))
                )
                table = table(
                    show_header=True,
                    header_style="bold",
                    box=box.rounded,
                )
                table.add_column("admission number", style="green")
                table.add_column("name", style="cyan")
                table.add_column("class", style="cyan")
                table.add_column("section", style="cyan")
                table.add_column("roll number", style="cyan")
                table.add_column("2nd language name", style="cyan")
                table.add_column("english", style="magenta")
                table.add_column("mathematics", style="magenta")
                table.add_column("science", style="magenta")
                table.add_column("social sciences", style="magenta")
                table.add_column("2nd language", style="magenta")
                table.add_column("computers", style="magenta")
                table.add_column("total", style="red")
                table.add_column("average %", style="red")
                for i in range(len(res)):
                    table.add_row(
                        str(res[i][0]),
                        str(res[i][1]),
                        str(res[i][2]),
                        str(res[i][3]),
                        str(res[i][4]),
                        str(res[i][5]),
                        str(res[i][6]),
                        str(res[i][7]),
                        str(res[i][8]),
                        str(res[i][9]),
                        str(res[i][10]),
                        str(res[i][11]),
                        str(res[i][12]),
                        str(res[i][13]),
                    )
                console.print(table)
                print()
            else:
                print(f"There are no students in Grade 3")
                print()
        if "4" in Grade:
            cur.execute(f"select * from cattwo where class=4")
            res = cur.fetchall()
            if len(res) != 0:
                res = [x for x in res]
                console.print(
                    Panel.fit("[bold italic bright_yellow]Grade 4", padding=(0, 20))
                )
                table = table(show_header=True, header_style="bold", box=box.rounded)
                table.add_column("admission number", style="green")
                table.add_column("name", style="cyan")
                table.add_column("class", style="cyan")
                table.add_column("section", style="cyan")
                table.add_column("roll number", style="cyan")
                table.add_column("2nd language name", style="cyan")
                table.add_column("english", style="magenta")
                table.add_column("mathematics", style="magenta")
                table.add_column("science", style="magenta")
                table.add_column("social sciences", style="magenta")
                table.add_column("2nd language", style="magenta")
                table.add_column("computers", style="magenta")
                table.add_column("total", style="red")
                table.add_column("average %", style="red")
                for i in range(len(res)):
                    table.add_row(
                        str(res[i][0]),
                        str(res[i][1]),
                        str(res[i][2]),
                        str(res[i][3]),
                        str(res[i][4]),
                        str(res[i][5]),
                        str(res[i][6]),
                        str(res[i][7]),
                        str(res[i][8]),
                        str(res[i][9]),
                        str(res[i][10]),
                        str(res[i][11]),
                        str(res[i][12]),
                        str(res[i][13]),
                    )
                console.print(table)
                print()
            else:
                print(f"There are no students in Grade 4")
                print()

    # ? Grade 5 - Grade 8
    if "5" in Grade or "6" in Grade or "7" in Grade or "8" in Grade:
        if "5" in Grade:
            cur.execute(f"select * from catthree where class=5")
            res = cur.fetchall()
            if len(res) != 0:
                res = [x for x in res]
                console.print(
                    Panel.fit("[bold italic bright_yellow]Grade 5", padding=(0, 20))
                )
                table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
                table.add_column("Admission Number", style="green")
                table.add_column("Name", style="cyan")
                table.add_column("Class", style="cyan")
                table.add_column("Section", style="cyan")
                table.add_column("Roll Number", style="cyan")
                table.add_column("2nd Language Name", style="cyan")
                table.add_column("3rd Language Name", style="cyan")
                table.add_column("English", style="magenta")
                table.add_column("Mathematics", style="magenta")
                table.add_column("Science", style="magenta")
                table.add_column("Social Sciences", style="magenta")
                table.add_column("2nd Language", style="magenta")
                table.add_column("3rd Language", style="magenta")
                table.add_column("Computers", style="magenta")
                table.add_column("Total", style="red")
                table.add_column("Average %", style="red")
                for i in range(len(res)):
                    table.add_row(
                        str(res[i][0]),
                        str(res[i][1]),
                        str(res[i][2]),
                        str(res[i][3]),
                        str(res[i][4]),
                        str(res[i][5]),
                        str(res[i][6]),
                        str(res[i][7]),
                        str(res[i][8]),
                        str(res[i][9]),
                        str(res[i][10]),
                        str(res[i][11]),
                        str(res[i][12]),
                        str(res[i][13]),
                        str(res[i][14]),
                        str(res[i][15]),
                    )
                console.print(table)
                print()
            else:
                print(f"There are no students in Grade 5")
                print()
        if "6" in Grade:
            cur.execute(f"select * from catthree where class=6")
            res = cur.fetchall()
            if len(res) != 0:
                res = [x for x in res]
                console.print(
                    Panel.fit("[bold italic bright_yellow]Grade 6", padding=(0, 20))
                )
                table = Table(
                    show_header=True,
                    header_style="bold",
                    box=box.ROUNDED,
                )
                table.add_column("Admission Number", style="green")
                table.add_column("Name", style="cyan")
                table.add_column("Class", style="cyan")
                table.add_column("Section", style="cyan")
                table.add_column("Roll Number", style="cyan")
                table.add_column("2nd Language Name", style="cyan")
                table.add_column("3rd Language Name", style="cyan")
                table.add_column("English", style="magenta")
                table.add_column("Mathematics", style="magenta")
                table.add_column("Science", style="magenta")
                table.add_column("Social Sciences", style="magenta")
                table.add_column("2nd Language", style="magenta")
                table.add_column("3rd Language", style="magenta")
                table.add_column("Computers", style="magenta")
                table.add_column("Total", style="red")
                table.add_column("Average %", style="red")
                for i in range(len(res)):
                    table.add_row(
                        str(res[i][0]),
                        str(res[i][1]),
                        str(res[i][2]),
                        str(res[i][3]),
                        str(res[i][4]),
                        str(res[i][5]),
                        str(res[i][6]),
                        str(res[i][7]),
                        str(res[i][8]),
                        str(res[i][9]),
                        str(res[i][10]),
                        str(res[i][11]),
                        str(res[i][12]),
                        str(res[i][13]),
                        str(res[i][14]),
                        str(res[i][15]),
                    )
                console.print(table)
                print()
            else:
                print(f"There are no students in Grade 6")
                print()
        if "7" in Grade:
            cur.execute(f"select * from catthree where class=7")
            res = cur.fetchall()
            if len(res) != 0:
                res = [x for x in res]
                console.print(
                    Panel.fit("[bold italic bright_yellow]Grade 7", padding=(0, 20))
                )
                table = Table(
                    show_header=True,
                    header_style="bold",
                    box=box.ROUNDED,
                )
                table.add_column("Admission Number", style="green")
                table.add_column("Name", style="cyan")
                table.add_column("Class", style="cyan")
                table.add_column("Section", style="cyan")
                table.add_column("Roll Number", style="cyan")
                table.add_column("2nd Language Name", style="cyan")
                table.add_column("3rd Language Name", style="cyan")
                table.add_column("English", style="magenta")
                table.add_column("Mathematics", style="magenta")
                table.add_column("Science", style="magenta")
                table.add_column("Social Sciences", style="magenta")
                table.add_column("2nd Language", style="magenta")
                table.add_column("3rd Language", style="magenta")
                table.add_column("Computers", style="magenta")
                table.add_column("Total", style="red")
                table.add_column("Average %", style="red")
                for i in range(len(res)):
                    table.add_row(
                        str(res[i][0]),
                        str(res[i][1]),
                        str(res[i][2]),
                        str(res[i][3]),
                        str(res[i][4]),
                        str(res[i][5]),
                        str(res[i][6]),
                        str(res[i][7]),
                        str(res[i][8]),
                        str(res[i][9]),
                        str(res[i][10]),
                        str(res[i][11]),
                        str(res[i][12]),
                        str(res[i][13]),
                        str(res[i][14]),
                        str(res[i][15]),
                    )
                console.print(table)
                print()
            else:
                print(f"There are no students in Grade 7")
                print()
        if "8" in Grade:
            cur.execute(f"select * from catthree where class=8")
            res = cur.fetchall()
            if len(res) != 0:
                res = [x for x in res]
                console.print(
                    Panel.fit("[bold italic bright_yellow]Grade 8", padding=(0, 20))
                )
                table = Table(
                    show_header=True,
                    header_style="bold",
                    box=box.ROUNDED,
                )
                table.add_column("Admission Number", style="green")
                table.add_column("Name", style="cyan")
                table.add_column("Class", style="cyan")
                table.add_column("Section", style="cyan")
                table.add_column("Roll Number", style="cyan")
                table.add_column("2nd Language Name", style="cyan")
                table.add_column("3rd Language Name", style="cyan")
                table.add_column("English", style="magenta")
                table.add_column("Mathematics", style="magenta")
                table.add_column("Science", style="magenta")
                table.add_column("Social Sciences", style="magenta")
                table.add_column("2nd Language", style="magenta")
                table.add_column("3rd Language", style="magenta")
                table.add_column("Computers", style="magenta")
                table.add_column("Total", style="red")
                table.add_column("Average %", style="red")
                for i in range(len(res)):
                    table.add_row(
                        str(res[i][0]),
                        str(res[i][1]),
                        str(res[i][2]),
                        str(res[i][3]),
                        str(res[i][4]),
                        str(res[i][5]),
                        str(res[i][6]),
                        str(res[i][7]),
                        str(res[i][8]),
                        str(res[i][9]),
                        str(res[i][10]),
                        str(res[i][11]),
                        str(res[i][12]),
                        str(res[i][13]),
                        str(res[i][14]),
                        str(res[i][15]),
                    )
                console.print(table)
                print()
            else:
                print(f"There are no students in Grade 8")
                print()

    # ? Grade 9 - Grade 10
    if "9" in Grade or "10" in Grade:
        if "9" in Grade:
            cur.execute(f"select * from catfour where class=9")
            res = cur.fetchall()
            if len(res) != 0:
                res = [x for x in res]
                console.print(
                    Panel.fit("[bold italic bright_yellow]Grade 9", padding=(0, 20))
                )
                table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
                table.add_column("Admission Number", style="green")
                table.add_column("Name", style="cyan")
                table.add_column("Class", style="cyan")
                table.add_column("Section", style="cyan")
                table.add_column("Roll Number", style="cyan")
                table.add_column("2nd Language Name", style="cyan")
                table.add_column("English", style="magenta")
                table.add_column("Mathematics", style="magenta")
                table.add_column("Science", style="magenta")
                table.add_column("Social Sciences", style="magenta")
                table.add_column("2nd Language", style="magenta")
                table.add_column("Total", style="red")
                table.add_column("Average %", style="red")
                for i in range(len(res)):
                    table.add_row(
                        str(res[i][0]),
                        str(res[i][1]),
                        str(res[i][2]),
                        str(res[i][3]),
                        str(res[i][4]),
                        str(res[i][5]),
                        str(res[i][6]),
                        str(res[i][7]),
                        str(res[i][8]),
                        str(res[i][9]),
                        str(res[i][10]),
                        str(res[i][11]),
                        str(res[i][12]),
                    )
                console.print(table)
                print()
            else:
                print(f"There are no students in Grade 9")
                print()
        if "10" in Grade:
            cur.execute(f"select * from catfour where class=10")
            res = cur.fetchall()
            if len(res) != 0:
                res = [x for x in res]
                console.print(
                    Panel.fit("[bold italic bright_yellow]Grade 10", padding=(0, 20))
                )
                table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
                table.add_column("Admission Number", style="green")
                table.add_column("Name", style="cyan")
                table.add_column("Class", style="cyan")
                table.add_column("Section", style="cyan")
                table.add_column("Roll Number", style="cyan")
                table.add_column("2nd Language Name", style="cyan")
                table.add_column("English", style="magenta")
                table.add_column("Mathematics", style="magenta")
                table.add_column("Science", style="magenta")
                table.add_column("Social Sciences", style="magenta")
                table.add_column("2nd Language", style="magenta")
                table.add_column("Total", style="red")
                table.add_column("Average %", style="red")
                for i in range(len(res)):
                    table.add_row(
                        str(res[i][0]),
                        str(res[i][1]),
                        str(res[i][2]),
                        str(res[i][3]),
                        str(res[i][4]),
                        str(res[i][5]),
                        str(res[i][6]),
                        str(res[i][7]),
                        str(res[i][8]),
                        str(res[i][9]),
                        str(res[i][10]),
                        str(res[i][11]),
                        str(res[i][12]),
                    )
                console.print(table)
                print()
            else:
                print("There are no students in Grade 10")
                print()

    if "11" in Grade or "12" in Grade:
        if "11" in Grade:
            # ? Mathematics, Physics, Chemistry
            cur.execute("select * from catfive where class=11")
            res = cur.fetchall()
            if len(res) != 0:
                res = [x for x in res]
                console.print(
                    Panel.fit(
                        "[bold italic bright_yellow]Grade 11 MPC", padding=(0, 20)
                    )
                )
                table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
                table.add_column("Admission Number", style="green")
                table.add_column("Name", style="cyan")
                table.add_column("Class", style="cyan")
                table.add_column("Section", style="cyan")
                table.add_column("Roll Number", style="cyan")
                table.add_column("5th Core Name", style="yellow")
                table.add_column("English", style="magenta")
                table.add_column("Mathematics", style="magenta")
                table.add_column("Physics", style="magenta")
                table.add_column("Chemistry", style="magenta")
                table.add_column("5th Core", style="magenta")
                table.add_column("Total", style="red")
                table.add_column("Average %", style="red")
                for i in range(len(res)):
                    table.add_row(
                        str(res[i][0]),
                        str(res[i][1]),
                        str(res[i][2]),
                        str(res[i][3]),
                        str(res[i][4]),
                        str(res[i][5]),
                        str(res[i][6]),
                        str(res[i][7]),
                        str(res[i][8]),
                        str(res[i][9]),
                        str(res[i][10]),
                        str(res[i][11]),
                        str(res[i][12]),
                    )
                console.print(table)
                print()
            else:
                print()
                print("There are no students in Grade 11 MPC")

            # ? Biology, Physics, Chemistry
            cur.execute("select * from catsix where class=11")
            res = cur.fetchall()
            if len(res) != 0:
                res = [x for x in res]
                console.print(
                    Panel.fit(
                        "[bold italic bright_yellow]Grade 11 BiPC", padding=(0, 20)
                    )
                )
                table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
                table.add_column("Admission Number", style="green")
                table.add_column("Name", style="cyan")
                table.add_column("Class", style="cyan")
                table.add_column("Section", style="cyan")
                table.add_column("Roll Number", style="cyan")
                table.add_column("5th Core Name", style="yellow")
                table.add_column("English", style="magenta")
                table.add_column("Biology", style="magenta")
                table.add_column("Physics", style="magenta")
                table.add_column("Chemistry", style="magenta")
                table.add_column("5th Core", style="magenta")
                table.add_column("Total", style="red")
                table.add_column("Average %", style="red")
                for i in range(len(res)):
                    table.add_row(
                        str(res[i][0]),
                        str(res[i][1]),
                        str(res[i][2]),
                        str(res[i][3]),
                        str(res[i][4]),
                        str(res[i][5]),
                        str(res[i][6]),
                        str(res[i][7]),
                        str(res[i][8]),
                        str(res[i][9]),
                        str(res[i][10]),
                        str(res[i][11]),
                        str(res[i][12]),
                    )
                console.print(table)
                print()
            else:
                print()
                print("There are no students in Grade 11 BiPC")

            # ? Commerce
            cur.execute("select * from catseven where class=11")
            res = cur.fetchall()
            if len(res) != 0:
                res = [x for x in res]
                console.print(
                    Panel.fit(
                        "[bold italic bright_yellow]Grade 11 Commerce",
                        padding=(0, 20),
                    )
                )
                table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
                table.add_column("Admission Number", style="green")
                table.add_column("Name", style="cyan")
                table.add_column("Class", style="cyan")
                table.add_column("Section", style="cyan")
                table.add_column("Roll Number", style="cyan")
                table.add_column("5th Core Name", style="yellow")
                table.add_column("English", style="magenta")
                table.add_column("Accounts", style="magenta")
                table.add_column("Business Studies", style="magenta")
                table.add_column("Economics", style="magenta")
                table.add_column("5th Core", style="magenta")
                table.add_column("Total", style="red")
                table.add_column("Average %", style="red")
                for i in range(len(res)):
                    table.add_row(
                        str(res[i][0]),
                        str(res[i][1]),
                        str(res[i][2]),
                        str(res[i][3]),
                        str(res[i][4]),
                        str(res[i][5]),
                        str(res[i][6]),
                        str(res[i][7]),
                        str(res[i][8]),
                        str(res[i][9]),
                        str(res[i][10]),
                        str(res[i][11]),
                        str(res[i][12]),
                    )
                console.print(table)
                print()
            else:
                print()
                print("There are no students in Grade 11 CEC")

            # ? Humanities
            cur.execute("select * from cateight where class=11")
            res = cur.fetchall()
            if len(res) != 0:
                res = [x for x in res]
                console.print(
                    Panel.fit(
                        "[bold italic bright_yellow]Grade 11 Humanities",
                        padding=(0, 20),
                    )
                )
                table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
                table.add_column("Admission Number", style="green")
                table.add_column("Name", style="cyan")
                table.add_column("Class", style="cyan")
                table.add_column("Section", style="cyan")
                table.add_column("Roll Number", style="cyan")
                table.add_column("5th Core Name", style="yellow")
                table.add_column("English", style="magenta")
                table.add_column("History", style="magenta")
                table.add_column("Political Sciences", style="magenta")
                table.add_column("Economics", style="magenta")
                table.add_column("5th Core", style="magenta")
                table.add_column("Total", style="red")
                table.add_column("Average %", style="red")
                for i in range(len(res)):
                    table.add_row(
                        str(res[i][0]),
                        str(res[i][1]),
                        str(res[i][2]),
                        str(res[i][3]),
                        str(res[i][4]),
                        str(res[i][5]),
                        str(res[i][6]),
                        str(res[i][7]),
                        str(res[i][8]),
                        str(res[i][9]),
                        str(res[i][10]),
                        str(res[i][11]),
                        str(res[i][12]),
                    )
                console.print(table)
                print()
            else:
                print()
                print("There are no students in Grade 11 Humanities")
        if "12" in Grade:
            # ? Mathematics, Physics, Chemistry
            cur.execute("select * from catfive where class=12")
            res = cur.fetchall()
            if len(res) != 0:
                res = [x for x in res]
                console.print(
                    Panel.fit(
                        "[bold italic bright_yellow]Grade 12 MPC", padding=(0, 20)
                    )
                )
                table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
                table.add_column("Admission Number", style="green")
                table.add_column("Name", style="cyan")
                table.add_column("Class", style="cyan")
                table.add_column("Section", style="cyan")
                table.add_column("Roll Number", style="cyan")
                table.add_column("5th Core Name", style="yellow")
                table.add_column("English", style="magenta")
                table.add_column("Mathematics", style="magenta")
                table.add_column("Physics", style="magenta")
                table.add_column("Chemistry", style="magenta")
                table.add_column("5th Core", style="magenta")
                table.add_column("Total", style="red")
                table.add_column("Average %", style="red")
                for i in range(len(res)):
                    table.add_row(
                        str(res[i][0]),
                        str(res[i][1]),
                        str(res[i][2]),
                        str(res[i][3]),
                        str(res[i][4]),
                        str(res[i][5]),
                        str(res[i][6]),
                        str(res[i][7]),
                        str(res[i][8]),
                        str(res[i][9]),
                        str(res[i][10]),
                        str(res[i][11]),
                        str(res[i][12]),
                    )
                console.print(table)
                print()
            else:
                print()
                print("There are no students in Grade 12 MPC")

            # ? Biology, Physics, Chemistry
            cur.execute("select * from catsix where class=12")
            res = cur.fetchall()
            if len(res) != 0:
                res = [x for x in res]
                console.print(
                    Panel.fit(
                        "[bold italic bright_yellow]Grade 12 BiPC", padding=(0, 20)
                    )
                )
                table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
                table.add_column("Admission Number", style="green")
                table.add_column("Name", style="cyan")
                table.add_column("Class", style="cyan")
                table.add_column("Section", style="cyan")
                table.add_column("Roll Number", style="cyan")
                table.add_column("5th Core Name", style="yellow")
                table.add_column("English", style="magenta")
                table.add_column("Biology", style="magenta")
                table.add_column("Physics", style="magenta")
                table.add_column("Chemistry", style="magenta")
                table.add_column("5th Core", style="magenta")
                table.add_column("Total", style="red")
                table.add_column("Average %", style="red")
                for i in range(len(res)):
                    table.add_row(
                        str(res[i][0]),
                        str(res[i][1]),
                        str(res[i][2]),
                        str(res[i][3]),
                        str(res[i][4]),
                        str(res[i][5]),
                        str(res[i][6]),
                        str(res[i][7]),
                        str(res[i][8]),
                        str(res[i][9]),
                        str(res[i][10]),
                        str(res[i][11]),
                        str(res[i][12]),
                    )
                console.print(table)
                print()
            else:
                print()
                print("There are no students in Grade 12 BiPC")

            # ? Commerce
            cur.execute("select * from catseven where class=12")
            res = cur.fetchall()
            if len(res) != 0:
                res = [x for x in res]
                console.print(
                    Panel.fit(
                        "[bold italic bright_yellow]Grade 12 Commerce",
                        padding=(0, 20),
                    )
                )
                table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
                table.add_column("Admission Number", style="green")
                table.add_column("Name", style="cyan")
                table.add_column("Class", style="cyan")
                table.add_column("Section", style="cyan")
                table.add_column("Roll Number", style="cyan")
                table.add_column("5th Core Name", style="yellow")
                table.add_column("English", style="magenta")
                table.add_column("Accounts", style="magenta")
                table.add_column("Business Studies", style="magenta")
                table.add_column("Economics", style="magenta")
                table.add_column("5th Core", style="magenta")
                table.add_column("Total", style="red")
                table.add_column("Average %", style="red")
                for i in range(len(res)):
                    table.add_row(
                        str(res[i][0]),
                        str(res[i][1]),
                        str(res[i][2]),
                        str(res[i][3]),
                        str(res[i][4]),
                        str(res[i][5]),
                        str(res[i][6]),
                        str(res[i][7]),
                        str(res[i][8]),
                        str(res[i][9]),
                        str(res[i][10]),
                        str(res[i][11]),
                        str(res[i][12]),
                    )
                console.print(table)
                print()
            else:
                print()
                print("There are no students in Grade 12 CEC")

            # ? Humanities
            cur.execute("select * from cateight where class=12")
            res = cur.fetchall()
            if len(res) != 0:
                res = [x for x in res]
                console.print(
                    Panel.fit(
                        "[bold italic bright_yellow]Grade 12 Humanities",
                        padding=(0, 20),
                    )
                )
                table = Table(show_header=True, header_style="bold", box=box.ROUNDED)
                table.add_column("Admission Number", style="green")
                table.add_column("Name", style="cyan")
                table.add_column("Class", style="cyan")
                table.add_column("Section", style="cyan")
                table.add_column("Roll Number", style="cyan")
                table.add_column("5th Core Name", style="yellow")
                table.add_column("English", style="magenta")
                table.add_column("History", style="magenta")
                table.add_column("Political Sciences", style="magenta")
                table.add_column("Economics", style="magenta")
                table.add_column("5th Core", style="magenta")
                table.add_column("Total", style="red")
                table.add_column("Average %", style="red")
                for i in range(len(res)):
                    table.add_row(
                        str(res[i][0]),
                        str(res[i][1]),
                        str(res[i][2]),
                        str(res[i][3]),
                        str(res[i][4]),
                        str(res[i][5]),
                        str(res[i][6]),
                        str(res[i][7]),
                        str(res[i][8]),
                        str(res[i][9]),
                        str(res[i][10]),
                        str(res[i][11]),
                        str(res[i][12]),
                    )
                console.print(table)
                print()
            else:
                print()
                print("There are no students in Grade 12 Humanities")
    input("Press enter to continue ")
    ClearScreen()


# ! <-- Displaying all students in the school -->
def SchoolRecords():
    ClassRecords([str(x) for x in range(1, 13)])


# ! <-- Exporting all students to multiple *.csv files -->
def ExportCSV():
    # ? Clearing the screen
    ClearScreen()

    # ? Creating Exports folder if it does not exist
    CWD = getcwd()
    if not path.exists("Exports"):
        makedirs("Exports")
    if OsName == "nt":
        dir = CWD + "/Exports"
    elif OsName == "posix":
        dir = CWD + "/Exports"

    # ? Displaying status bar
    progress_bar = Progress(
        TextColumn("Exporting Data "),
        BarColumn(),
        TextColumn("[progress.percentage]{task.percentage:>3.0f}%"),
    )
    with progress_bar as p:
        # ? Displaying progress bar
        for i in p.track(range(100), description="Exporting Data"):
            sleep(1.2 / 100)

        # ? Disabling print
        DisablePrint()
        # ? Exporting the records
        class1Frame = pd.read_sql(f"select * from catone where class={1}", con)
        class1Frame.to_csv(f"{dir}/Class1.csv", index=False)

        class2Frame = pd.read_sql(f"select * from cattwo where class={2}", con)
        class2Frame.to_csv(f"{dir}/Class2.csv", index=False)

        class3Frame = pd.read_sql(f"select * from cattwo where class={3}", con)
        class3Frame.to_csv(f"{dir}/Class3.csv", index=False)

        class4Frame = pd.read_sql(f"select * from cattwo where class={4}", con)
        class4Frame.to_csv(f"{dir}/Class4.csv", index=False)

        class5Frame = pd.read_sql(f"select * from catthree where class={5}", con)
        class5Frame.to_csv(f"{dir}/Class5.csv", index=False)

        class6Frame = pd.read_sql(f"select * from catthree where class={6}", con)
        class6Frame.to_csv(f"{dir}/Class6.csv", index=False)

        class7Frame = pd.read_sql(f"select * from catthree where class={7}", con)
        class7Frame.to_csv(f"{dir}/Class7.csv", index=False)

        class8Frame = pd.read_sql(f"select * from catthree where class={8}", con)
        class8Frame.to_csv(f"{dir}/Class8.csv", index=False)

        class9Frame = pd.read_sql(f"select * from catfour where class={9}", con)
        class9Frame.to_csv(f"{dir}/Class9.csv", index=False)
        class10Frame = pd.read_sql(f"select * from catfour where class={10}", con)
        class10Frame.to_csv(f"{dir}/Class10.csv", index=False)

        class11MPCFrame = pd.read_sql(f"select * from catfive where class={11}", con)
        class11MPCFrame.to_csv(f"{dir}/Class11-MPC.csv", index=False)

        class11BiPCFrame = pd.read_sql(f"select * from catsix where class={11}", con)
        class11BiPCFrame.to_csv(f"{dir}/Class11-BiPC.csv", index=False)

        class11CommerceFrame = pd.read_sql(
            f"select * from catseven where class={11}", con
        )
        class11CommerceFrame.to_csv(f"{dir}/Class11-Commerce.csv", index=False)

        class11HumanitiesFrame = pd.read_sql(
            f"select * from cateight where class={11}", con
        )
        class11HumanitiesFrame.to_csv(f"{dir}/Class11-Humanities.csv", index=False)

        class12MPCFrame = pd.read_sql(f"select * from catfive where class={12}", con)
        class12MPCFrame.to_csv(f"{dir}/Class12-MPC.csv", index=False)

        class12BiPCFrame = pd.read_sql(f"select * from catsix where class={12}", con)
        class12BiPCFrame.to_csv(f"{dir}/Class12-BiPC.csv", index=False)

        class12CommerceFrame = pd.read_sql(
            f"select * from catseven where class={12}", con
        )
        class12CommerceFrame.to_csv(f"{dir}/Class12-Commerce.csv", index=False)

        class12HumanitiesFrame = pd.read_sql(
            f"select * from cateight where class={12}", con
        )
        class12HumanitiesFrame.to_csv(f"{dir}/Class12-Humanities.csv", index=False)

    sleep(0.5)
    # ? Enabling print again
    EnablePrint()
    # ? Clearing the screen
    ClearScreen()
    print(f"All CSVs have been exported to a folder: [cyan bold]{dir}[/cyan bold]")
    input("Press enter to continue ")


# endregion
#! --------------------------------------------------
#! --------------------------------------------------


#! --------------------------------------------------
#! ---------- Running the program
#! --------------------------------------------------
# region Running the program
########! Required for the script to work !########
# ? This runs basic functions such as creating required databases and tables as well as basic variables.
Backend()

########! Printing Options on the Screen !########
# ? Login, if username and password do not exist, it will ask if you want to create a user.
# ? Add attributes if you want to provide username and password
# ? For example: LoginUser("Username", "Password")
LoginUser()

while True:
    # ? Clearing the screen
    ClearScreen()
    # ? Printing the options

    choice = questionary.select(
        "What do you want to do?",
        choices=[
            "Student information",
            "Marks information",
            "Records",
            "Export All Data",
            "Quit",
        ],
        style=minimalStyle,
        instruction="\n",
    ).ask()

    ClearScreen()
    if choice == "Student information":
        studentInfoChoice = questionary.select(
            "What do you want to do?",
            choices=[
                "Add a student",
                "Edit a student",
                "Remove a student",
                "Back",
                "Quit",
            ],
            style=minimalStyle,
            instruction="\n",
        ).ask()

        if studentInfoChoice == "Add a student":
            AddStudent()
        elif studentInfoChoice == "Edit a student":
            EditStudent()
        elif studentInfoChoice == "Remove a student":
            RemoveStudent()
        elif studentInfoChoice == "Back":
            ClearScreen()
        else:
            # ? If quit is called
            exit()
    elif choice == "Marks information":
        marksInfoChoice = questionary.select(
            "What do you want to do?",
            choices=["Add marks", "Edit marks", "Remove marks", "Back", "Quit"],
            style=minimalStyle,
            instruction="\n",
        ).ask()
        if marksInfoChoice == "Add marks":
            AddMarks()
        elif marksInfoChoice == "Edit marks":
            EditMarks()
        elif marksInfoChoice == "Remove marks":
            RemoveMarks()
        elif marksInfoChoice == "Back":
            ClearScreen()
        else:
            # ? If quit is called
            exit()
    elif choice == "Records":
        recordsChoice = questionary.select(
            "What do you want to do?",
            choices=[
                "Student Records",
                "Class Records",
                "School Records",
                "Show Subject-Marks Graph",
                "Back",
                "Quit",
            ],
            style=minimalStyle,
            instruction="\n",
        ).ask()

        if recordsChoice == "Student Records":
            StudentRecords()
        elif recordsChoice == "Class Records":
            ClassRecords()
        elif recordsChoice == "School Records":
            SchoolRecords()
        elif recordsChoice == "Show Subject-Marks Graph":
            ShowGraph()
        elif recordsChoice == "Back":
            ClearScreen()
        else:
            # ? If quit is called
            exit()
    elif choice == "Export All Data":
        ExportCSV()
    elif choice == "Quit":
        exit()

# endregion
#! --------------------------------------------------
#! --------------------------------------------------
# Ending of the program
