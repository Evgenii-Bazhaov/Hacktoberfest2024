import tkinter as tk
from tkinter import *
from math import sqrt, pi

calc = Tk()
calc.title("Calculator")
calc.geometry('550x700')
calc["background"] = "#323338"

#____COLOURS_____
black = "#323338"
peach = "#E8C898"
matte_blue = "#275C8D"
cool_white = "#CBD9ED"
space_grey = "#888888"
grey = "#555555"
matte_green = "#93B488"
matte_red = "#AC4545"
matte_orange = "#B16C39"
text_colour = "#D18845"


#____EXIT BUTTON_____
def exit():
    calc.destroy()




#_____________MAIN SCREEN________________
def options_screen():
    def destruction():          #To clear the basic, area and unit buttons
        basic_button.destroy()
        area_button.destroy()
        unit_con_button.destroy()
        volume_button.destroy()
        exit_button_Op.destroy()

    def basic_end():    #Destroy Basic button and open basic calculator
        destruction()
        basic_calc()
    def area_end():     #Destroy Area button and open area calculator
        destruction()
        area_calc()
    def unit_end():     #Destroy Unit button and give unit converter
        destruction()
        unit_calc()
    def vol_end():
        destruction()
        volume_calc()

    #__________Basic, Area, Unit Buttons_________________
    basic_button =  Button(calc, text="Basic Calculator", activebackground=matte_green, bg=grey, borderwidth=2, bd=4, command=basic_end, font=("Helvatica 25 bold"), activeforeground=matte_blue, foreground="white")
    basic_button.place(x=100, y=59, width=350, height=100)

    area_button =  Button(calc, text="Area Calculator", activebackground=matte_green, bg=grey, borderwidth=2, bd=4, command=area_end, font=("Helvatica 25 bold"), activeforeground=matte_blue, foreground="white") 
    area_button.place(x=100, y=211, width=350, height=100)

    volume_button =  Button(calc, text="Volume Calculator", activebackground=matte_green, bg=grey, borderwidth=2, bd=4, command=vol_end, font=("Helvatica 20 bold"), activeforeground=matte_blue, foreground="white")
    volume_button.place(x=100, y=363, width=350, height=100)

    unit_con_button = Button(calc, text="Unit Converter", activebackground=matte_green, bg=grey, borderwidth=2, bd=4, command=unit_end, font=("Helvatica 25 bold"), activeforeground=matte_blue, foreground="white")
    unit_con_button.place(x=100,y=515, width=350, height=100) 

    exit_button_Op = Button(calc, text="EXIT", command=exit, bg=matte_red, foreground="white", bd=4, activebackground="red")
    exit_button_Op.place(x=475, y=655, height=40, width=60)

    calc.geometry("550x700")


#_______BASIC CALCULATOR_________
def basic_calc():
    numbers = ['C','(',')','sqrt',
               '7','8','9','x²',
               '4','5','6','/',
               '1','2','3','*',
               '0','.','-','+',
               '=']

 
    result_var = tk.StringVar()
    result_entry = tk.Entry(calc, textvariable=result_var, justify='right', font=("Arial 22 bold"), bd=7, insertwidth=10, width=25, bg=cool_white)
    result_entry.grid(row=1, column=2, columnspan=5)

    def on_click(button_text):
        current_text = result_var.get()

        if button_text == "=":
            try:
                result_var.set(eval(current_text))
            except Exception as e:
                result_var.set("Error")
        elif button_text == "C":
            result_var.set("")
        elif button_text == "sqrt":
            try:
                result_var.set(sqrt(float(current_text)))
            except ValueError:
                result_var.set("Error")
        elif button_text == "x²":
            try:
                result_var.set(float(current_text)**2)
            except ValueError:
                result_var.set("Error")
        else:
            result_var.set(current_text + button_text)
        
    row_val = 2
    col_val = 3
    back_numbers = []
    for button_text in numbers:
        basic_buttons = Button(calc, text=button_text, width=7, height=4, command=lambda text=button_text: on_click(text), bd=5, bg=grey, activebackground=space_grey, foreground='white', activeforeground=peach, font=("Arial 13 bold"), justify='right')
        basic_buttons.grid(row=row_val, column=col_val, padx=3, pady=3, sticky=tk.S)
        col_val += 1
        if col_val > 6:
            col_val = 3
            row_val += 1
        back_numbers.append(basic_buttons)

    #_____EXIT BUTTON______
    exit_button_b_clc = Button(calc, text="EXIT", command=exit, bg=matte_red, foreground="white", bd=4, activebackground="red")
    exit_button_b_clc.place(x=350, y=655, height=40, width=60)

    
    #_______BACK BUTTON TO OPTIONS SCREEN_______
    def back_b_clc():
        result_entry.destroy()
        exit_button_b_clc.destroy()
        for i in back_numbers:
            i.destroy()
        back_button_b_clc.destroy()
        options_screen()

    #_____BACK BUTTON_______
    global back_button_b_clc
    back_button_b_clc = Button(calc, text="BACK", command=back_b_clc, bg=matte_orange, foreground="white", bd=4, activebackground="orange")
    back_button_b_clc.place(x=250, y=655, height=40, width=60)
    

    calc.geometry("450x700")







#________AREA CALCULATOR_________
def area_calc():

    def dropdown():
        # Create and place a label for shape selection
        global shape_label
        shape_label = tk.Label(calc, text="Select Shape:", bg=black, foreground=text_colour, font=("Arial 12 bold"))
        shape_label.place(x=32, y=138, height=42, width=112)

        # Create a dropdown menu for shape selection
        shapes = ["Circle", "Rectangle", "Triangle"]
        global shape_var
        shape_var = tk.StringVar()
        shape_var.set("Choose a shape")  # Default selection
        global shape_menu
        shape_menu = tk.OptionMenu(calc, shape_var, *shapes)
        shape_menu.place(x=174, y=138, height=42, width=260)

        # OK Button
        global ok_button
        ok_button = Button(calc, text="OK", command=OK_button, bg=matte_green, foreground="white", activebackground="green", bd=4)
        ok_button.place(x=459, y=199, height=37, width=60)

        #_____EXIT BUTTON______
        global exit_button_A
        exit_button_A = Button(calc, text="EXIT", command=exit, bg=matte_red, foreground="white", bd=4, activebackground="red")
        exit_button_A.place(x=455, y=318, height=27, width=87)

        #_____BACK BUTTON_______
        global back_button_ar_sc
        back_button_ar_sc = Button(calc, text="BACK", command=back_Op_A, bg=matte_orange, foreground="white", bd=4, activebackground="orange")
        back_button_ar_sc.place(x=100, y=318, height=27, width=87)

    #_______BACK BUTTON TO OPTIONS SCREEN_______
    def back_Op_A():
        shape_label.destroy()
        shape_menu.destroy()
        ok_button.destroy()
        back_button_ar_sc.destroy()
        exit_button_A.destroy()
        calc.geometry("550x700")
        options_screen()


    #________OK BUTTON____________
    def OK_button():

        shape = shape_var.get()

        if shape == "Circle":
            shape_menu.destroy()
            shape_label.destroy()
            ok_button.destroy()
            back_button_ar_sc.destroy()
            exit_button_A.destroy()
            circle()
            
        elif shape == "Rectangle":
            shape_menu.destroy()
            shape_label.destroy()
            ok_button.destroy()
            back_button_ar_sc.destroy()
            exit_button_A.destroy()
            rectangle()
            
        elif shape == "Triangle":
            shape_menu.destroy()
            shape_label.destroy()
            ok_button.destroy()
            back_button_ar_sc.destroy()
            exit_button_A.destroy()
            triangle()
        else:
            area = 0  # Default value for unknown shape
     

    # Create and place entry fields for shape parameters
    #_______CIRCLE_______
    def circle():
        Radius_label = tk.Label(calc, text="Radius: ")
        Radius_label.place(x=100, y=100)

        Radius_textbox = tk.Entry(calc)
        Radius_textbox.insert(END, 0)
        Radius_textbox.place(x=170, y=100)

        #________CALCULATE BUTTON_______ 
        Calculate_button = tk.Button(calc, text="Calculate", command= lambda: C_Calculate(Radius_textbox.get()), activebackground="green", bd=3, bg=matte_green, foreground="white")
        Calculate_button.place(x=100, y=150)

        #___________Calculate Function__________
        def C_Calculate(input):
            try:
                area = float(input)
            except ValueError:
                ShowResult_Error()
            if(area > 0): 
                result = pi * area ** 2
                ShowResult(result)   

        #_____EXIT BUTTON______
        exit_button_Cr = Button(calc, text="EXIT", command=exit, bg=matte_red, foreground="white", bd=4, activebackground="red")
        exit_button_Cr.place(x=455, y=318, height=27, width=87)

        #_______BACK BUTTON TO OPTIONS SCREEN_______
        def back_Cr():
            Radius_label.destroy()
            Radius_textbox.destroy()
            Calculate_button.destroy()
            back_button_Cr.destroy()
            exit_button_Cr.destroy()
            lblResult.config(text="", bg=black, borderwidth=0, highlightthickness=0)

            dropdown()
        
        #_____BACK BUTTON_______
        global back_button_Cr
        back_button_Cr = Button(calc, text="BACK", command=back_Cr, bg=matte_orange, foreground="white", bd=4, activebackground="orange")
        back_button_Cr.place(x=100, y=318, height=27, width=87)


        

    #_______RECTANGLE_______
    def rectangle():
        Length_label = tk.Label(calc, text="Length: ")
        Length_label.place(x=100, y=100)

        Length_textbox = tk.Entry(calc)
        Length_textbox.insert(END, 0)
        Length_textbox.place(x=170, y=100)

        Width_label = tk.Label(calc, text="Breadth: ")
        Width_label.place(x=100, y=150)

        Width_textbox = tk.Entry(calc)
        Width_textbox.insert(END, 0)
        Width_textbox.place(x=170, y=150)

        #________CALCULATE BUTTON_______
        Calculate_button = tk.Button(calc, text="Calculate", command= lambda: R_Calculate(Length_textbox.get(), Width_textbox.get()), activebackground="green", bd=3, bg=matte_green, foreground="white")
        Calculate_button.place(x=100, y=200)

        #___________Calculate Function_______________
        def R_Calculate(L,B):
            try:
                Length = float(L)
                Breadth = float(B)
            except ValueError:
                ShowResult_Error()
            if(Length, Breadth > 0): 
                result = Length * Breadth
                ShowResult(result)   

        #_____EXIT BUTTON______
        exit_button_R = Button(calc, text="EXIT", command=exit, bg=matte_red, foreground="white", bd=4, activebackground="red")
        exit_button_R.place(x=455, y=318, height=27, width=87)

        #_______BACK BUTTON TO OPTIONS SCREEN_______
        def back_R():
            Length_label.destroy()
            Length_textbox.destroy()
            Width_label.destroy()
            Width_textbox.destroy()
            Calculate_button.destroy()
            back_button_R.destroy()
            exit_button_R.destroy()
            lblResult.config(text="", bg=black, borderwidth=0, highlightthickness=0)

            dropdown()
        
        #_____BACK BUTTON_______
        global back_button_R
        back_button_R = Button(calc, text="BACK", command=back_R, bg=matte_orange, foreground="white", bd=4, activebackground="orange")
        back_button_R.place(x=100, y=318, height=27, width=87)



    #________TRIANGLE________
    def triangle():
        Base_label = tk.Label(calc, text="Base: ")
        Base_label.place(x=100, y=100)

        Base_textbox = tk.Entry(calc)
        Base_textbox.insert(END, 0)
        Base_textbox.place(x=170, y=100)

        Height_label = tk.Label(calc, text="Height: ")
        Height_label.place(x=100, y=150)

        Height_textbox = tk.Entry(calc)
        Height_textbox.insert(END, 0)
        Height_textbox.place(x=170, y=150)

        #________CALCULATE BUTTON_______
        Calculate_button = tk.Button(calc, text="Calculate", command= lambda: T_Calculate(Base_textbox.get(), Height_textbox.get()), activebackground="green", bd=3, bg=matte_green, foreground="white")
        Calculate_button.place(x=100, y=200)

        #___________Calculate Function_______________
        def T_Calculate(B,H):
            try:
                Base = float(B)
                Height = float(H)
            except ValueError:
                ShowResult_Error()
            if(Base, Height > 0): 
                result = 0.5 * Base * Height
                ShowResult(result)  

        #_____EXIT BUTTON______
        exit_button_T = Button(calc, text="EXIT", command=exit, bg=matte_red, foreground="white", bd=4, activebackground="red")
        exit_button_T.place(x=455, y=318, height=27, width=87)

        #_______BACK BUTTON TO OPTIONS SCREEN_______
        def back_T():
            Height_label.destroy()
            Height_textbox.destroy()
            Base_label.destroy()
            Base_textbox.destroy()
            Calculate_button.destroy()
            back_button_T.destroy()
            exit_button_T.destroy()
            lblResult.config(text="", bg=black, borderwidth=0, highlightthickness=0)
            dropdown()
        
        #_____BACK BUTTON_______
        global back_button_T
        back_button_T = Button(calc, text="BACK", command=back_T, bg=matte_orange, foreground="white", bd=4, activebackground="orange")
        back_button_T.place(x=100, y=318, height=27, width=87)

    dropdown()
    calc.geometry("558x359")








#______VOLUME CALCULATOR______
def volume_calc():
    def dropdown():
        # Create and place a label for shape selection
        global shape_label
        shape_label = tk.Label(calc, text="Select Shape:", bg=black, foreground=text_colour, font=("Arial 12 bold"))
        shape_label.place(x=32, y=138, height=42, width=112)

        # Create a dropdown menu for shape selection
        shapes = ["Sphere", "Cylinder", "Cone", "Cuboid"]
        global shape_var
        shape_var = tk.StringVar()
        shape_var.set("Choose a shape")  # Default selection
        global shape_menu
        shape_menu = tk.OptionMenu(calc, shape_var, *shapes)
        shape_menu.place(x=174, y=138, height=42, width=260)

        # OK Button
        global ok_button
        ok_button = Button(calc, text="OK", command=OK_button, bg=matte_green, activebackground="green", bd=4)
        ok_button.place(x=459, y=199, height=37, width=60)

        #_____EXIT BUTTON______
        global exit_button_V
        exit_button_V = Button(calc, text="EXIT", command=exit, bg=matte_red, foreground="white", bd=4, activebackground="red")
        exit_button_V.place(x=455, y=318, height=27, width=87)

        #_____BACK BUTTON_______
        global back_button_Op_V
        back_button_Op_V = Button(calc, text="BACK", command=back_Op_V, bg=matte_orange, foreground="white", bd=4, activebackground="orange")
        back_button_Op_V.place(x=100, y=318, height=27, width=87)

    #_______BACK BUTTON TO OPTIONS SCREEN_______
    def back_Op_V():
        shape_label.destroy()
        shape_menu.destroy()
        ok_button.destroy()
        back_button_Op_V.destroy()
        exit_button_V.destroy()
        calc.geometry("550x700")
        options_screen()


    #________OK BUTTON____________
    def OK_button():

        shape = shape_var.get()

        if shape == "Sphere":
            shape_menu.destroy()
            shape_label.destroy()
            ok_button.destroy()
            back_button_Op_V.destroy()
            exit_button_V.destroy()
            sphere()
            
        elif shape == "Cylinder":
            shape_menu.destroy()
            shape_label.destroy()
            ok_button.destroy()
            back_button_Op_V.destroy()
            exit_button_V.destroy()
            cylinder()
            
        elif shape == "Cone":
            shape_menu.destroy()
            shape_label.destroy()
            ok_button.destroy()
            back_button_Op_V.destroy()
            exit_button_V.destroy()
            cone()
        
        elif shape == "Cuboid":
            shape_menu.destroy()
            shape_label.destroy()
            ok_button.destroy()
            back_button_Op_V.destroy()
            exit_button_V.destroy()
            cuboid()
        else:
            area = 0  # Default value for unknown shape
     

    # Create and place entry fields for shape parameters
    #_______SPHERE_______
    def sphere():
        Radius_label = tk.Label(calc, text="Radius: ")
        Radius_label.place(x=100, y=100)

        Radius_textbox = tk.Entry(calc)
        Radius_textbox.insert(END, 0)
        Radius_textbox.place(x=170, y=100)

        #________CALCULATE BUTTON_______ 
        Calculate_button = tk.Button(calc, text="Calculate", command= lambda: Sp_Calculate(Radius_textbox.get()), activebackground="green", bd=3, bg=matte_green, foreground="white")
        Calculate_button.place(x=100, y=150)

        #___________Calculate Function__________
        def Sp_Calculate(input):
            try:
                area = float(input)
            except ValueError:
                ShowResult_Error()
            if(area > 0): 
                result = 1.34 * pi * area ** 2
                ShowResult_V(result)   

        #_____EXIT BUTTON______
        global exit_button_Sp
        exit_button_Sp = Button(calc, text="EXIT", command=exit, bg=matte_red, foreground="white", bd=4, activebackground="red")
        exit_button_Sp.place(x=455, y=318, height=27, width=87)

        #_______BACK BUTTON TO OPTIONS SCREEN_______
        def back_Sp():
            Radius_label.destroy()
            Radius_textbox.destroy()
            Calculate_button.destroy()
            back_button_Sp.destroy()
            exit_button_Sp.destroy()
            lblResult.config(text="", bg=black, borderwidth=0, highlightthickness=0)

            dropdown()
        
        #_____BACK BUTTON_______
        global back_button_Sp
        back_button_Sp = Button(calc, text="BACK", command=back_Sp, bg=matte_orange, foreground="white", bd=4, activebackground="orange")
        back_button_Sp.place(x=100, y=318, height=27, width=87)

        

    #_______CUBOID_______
    def cuboid():
        Length_label = tk.Label(calc, text="Length: ")
        Length_label.place(x=100, y=100)

        Length_textbox = tk.Entry(calc)
        Length_textbox.insert(END, 0)
        Length_textbox.place(x=170, y=100)

        Width_label = tk.Label(calc, text="Breadth: ")
        Width_label.place(x=100, y=150)

        Width_textbox = tk.Entry(calc)
        Width_textbox.insert(END, 0)
        Width_textbox.place(x=170, y=150)

        Height_label = tk.Label(calc, text="Height: ")
        Height_label.place(x=100, y=200)

        Height_textbox = tk.Entry(calc)
        Height_textbox.insert(END, 0)
        Height_textbox.place(x=170, y=200)

        #________CALCULATE BUTTON_______
        Calculate_button = tk.Button(calc, text="Calculate", command= lambda: Cb_Calculate(Length_textbox.get(), Width_textbox.get(), Height_textbox.get()), activebackground="green", bd=3, bg=matte_green, foreground="white")
        Calculate_button.place(x=100, y=280)

        #___________Calculate Function_______________
        def Cb_Calculate(L,B,H):
            try:
                Length = float(L)
                Breadth = float(B)
                Height = float(H)
            except:
                ShowResult_Error()
            if(Length, Breadth > 0): 
                result = Length * Breadth * Height
                ShowResult_V(result)   

        #_____EXIT BUTTON______
        exit_button_Cb = Button(calc, text="EXIT", command=exit, bg=matte_red, foreground="white", bd=4, activebackground="red")
        exit_button_Cb.place(x=455, y=318, height=27, width=87)

        #_______BACK BUTTON TO OPTIONS SCREEN_______
        def back_Cb():
            Length_label.destroy()
            Length_textbox.destroy()
            Width_label.destroy()
            Width_textbox.destroy()
            Height_label.destroy()
            Height_textbox.destroy()
            Calculate_button.destroy()
            back_button_Cb.destroy()
            exit_button_Cb.destroy()
            lblResult.config(text="", bg=black, borderwidth=0, highlightthickness=0)

            dropdown()
        
        #_____BACK BUTTON_______
        global back_button_Cb
        back_button_Cb = Button(calc, text="BACK", command=back_Cb, bg=matte_orange, foreground="white", bd=4, activebackground="orange")
        back_button_Cb.place(x=10, y=318, height=27, width=87)



    #________CONE________
    def cone():
        Radius_label = tk.Label(calc, text="Base: ")
        Radius_label.place(x=100, y=100)

        Radius_textbox = tk.Entry(calc)
        Radius_textbox.insert(END, 0)
        Radius_textbox.place(x=170, y=100)

        Height_label = tk.Label(calc, text="Height: ")
        Height_label.place(x=100, y=150)

        Height_textbox = tk.Entry(calc)
        Height_textbox.insert(END, 0)
        Height_textbox.place(x=170, y=150)

        #________CALCULATE BUTTON_______
        Calculate_button = tk.Button(calc, text="Calculate", command= lambda: Co_Calculate(Radius_textbox.get(), Height_textbox.get()), activebackground="green", bd=3, bg=matte_green, foreground="white")
        Calculate_button.place(x=100, y=200)

        #___________Calculate Function_______________
        def Co_Calculate(R,H):
            try:
                Radius = float(R)
                Height = float(H)
            except ValueError:
                ShowResult_Error()
            if(Radius, Height > 0): 
                result = 0.34 * pi * Height * (Radius ** 2) 
                ShowResult_V(result)  

        #_____EXIT BUTTON______
        exit_button_Co = Button(calc, text="EXIT", command=exit, bg=matte_red, foreground="white", bd=4, activebackground="red")
        exit_button_Co.place(x=455, y=318, height=27, width=87)

        #_______BACK BUTTON TO OPTIONS SCREEN_______
        def back_Co():
            Height_label.destroy()
            Height_textbox.destroy()
            Radius_label.destroy()
            Radius_textbox.destroy()
            Calculate_button.destroy()
            back_button_Co.destroy()
            exit_button_Co.destroy()
            lblResult.config(text="", bg=black, borderwidth=0, highlightthickness=0)

            dropdown()
        
        #_____BACK BUTTON_______
        global back_button_Co
        back_button_Co = Button(calc, text="BACK", command=back_Co, bg=matte_orange, foreground="white", bd=4, activebackground="orange")
        back_button_Co.place(x=100, y=318, height=27, width=87)
 
    #________CYLINDER________
    def cylinder():
        Radius_label = tk.Label(calc, text="Base: ")
        Radius_label.place(x=100, y=100)

        Radius_textbox = tk.Entry(calc)
        Radius_textbox.insert(END, 0)
        Radius_textbox.place(x=170, y=100)

        Height_label = tk.Label(calc, text="Height: ")
        Height_label.place(x=100, y=150)

        Height_textbox = tk.Entry(calc)
        Height_textbox.insert(END, 0)
        Height_textbox.place(x=170, y=150)

        #________CALCULATE BUTTON_______
        Calculate_button = tk.Button(calc, text="Calculate", command= lambda: Cy_Calculate(Radius_textbox.get(), Height_textbox.get()), activebackground="green", bd=3, bg=matte_green, foreground="white")
        Calculate_button.place(x=100, y=200)

        #___________Calculate Function_______________
        def Cy_Calculate(R,H):
            try:
                Radius = float(R)
                Height = float(H)
            except ValueError:
                ShowResult_Error()
            if(Radius, Height > 0): 
                result = pi * Height * (Radius ** 2) 
                ShowResult_V(result)  

        #_____EXIT BUTTON______
        exit_button_Cy = Button(calc, text="EXIT", command=exit, bg=matte_red, foreground="white", bd=4, activebackground="red")
        exit_button_Cy.place(x=455, y=318, height=27, width=87)

        #_______BACK BUTTON TO OPTIONS SCREEN_______
        def back_Co():
            Height_label.destroy()
            Height_textbox.destroy()
            Radius_label.destroy()
            Radius_textbox.destroy()
            Calculate_button.destroy()
            back_button_Cy.destroy()
            exit_button_Cy.destroy()
            lblResult.config(text="", bg=black, borderwidth=0, highlightthickness=0)

            dropdown()
        
        #_____BACK BUTTON_______
        global back_button_Cy
        back_button_Cy = Button(calc, text="BACK", command=back_Co, bg=matte_orange, foreground="white", bd=4, activebackground="orange")
        back_button_Cy.place(x=100, y=318, height=27, width=87)

    dropdown()
    calc.geometry("558x359")





#_________UNIT CONVERTER_________
def unit_calc():

    def dropdown():
        # Create and place a label for shape selection
        global unit_label
        unit_label = tk.Label(calc, text="Select Conversion:", bg=black, foreground=text_colour, font=("Arial 9 bold"))
        unit_label.place(x=32, y=138, height=42, width=112)

        # Create a dropdown menu for shape selection
        unit = ["Feet to Meters", "Meters to Feet", "Pounds to Kilograms", "KGs to Pounds"]
        global unit_var
        unit_var = tk.StringVar()
        unit_var.set("Choose a conversion")  # Default selection
        global unit_menu
        unit_menu = tk.OptionMenu(calc, unit_var, *unit)
        unit_menu.place(x=174, y=138, height=42, width=260)

        # OK Button
        global ok_button
        ok_button = Button(calc, text="OK", command=OK_button, bg=matte_green, foreground="white", activebackground="green", bd=4)
        ok_button.place(x=459, y=199, height=37, width=60)

        #_____EXIT BUTTON______
        global exit_button_U
        exit_button_U = Button(calc, text="EXIT", command=exit, bg=matte_red, foreground="white", bd=4, activebackground="red")
        exit_button_U.place(x=455, y=318, height=27, width=87)

        #_____BACK BUTTON_______
        global back_button_un_cv_sc
        back_button_un_cv_sc = Button(calc, text="BACK", command=back_Op_U, bg=matte_orange, foreground="white", bd=4, activebackground="orange")
        back_button_un_cv_sc.place(x=100, y=318, height=27, width=87)

    #_______BACK BUTTON TO OPTIONS SCREEN_______
    def back_Op_U():
        unit_label.destroy()
        unit_menu.destroy()
        ok_button.destroy()
        back_button_un_cv_sc.destroy()
        exit_button_U.destroy()
        calc.geometry("550x700")
        options_screen()


    #________OK BUTTON____________
    def OK_button():

        unit = unit_var.get()

        if unit == "Feet to Meters":
            unit_menu.destroy()
            unit_label.destroy()
            ok_button.destroy()
            back_button_un_cv_sc.destroy()
            exit_button_U.destroy()
            Ft_Mt()
            
        elif unit == "Meters to Feet":
            unit_menu.destroy()
            unit_label.destroy()
            ok_button.destroy()
            back_button_un_cv_sc.destroy()
            exit_button_U.destroy()
            Mt_Ft()

        elif unit == "Pounds to Kilograms":
            unit_menu.destroy()
            unit_label.destroy()
            ok_button.destroy()
            back_button_un_cv_sc.destroy()
            exit_button_U.destroy()
            Pd_Kg()

        elif unit == "KGs to Pounds":
            unit_menu.destroy()
            unit_label.destroy()
            ok_button.destroy()
            back_button_un_cv_sc.destroy()
            exit_button_U.destroy()
            Kg_Pd()

        else:
            area = 0  # Default value for unknown unit
     

    # Create and place entry fields for unit parameters
    #_______FEET TO METERS_______
    def Ft_Mt():
        Feet_label = tk.Label(calc, text="Enter value in Feet: ")
        Feet_label.place(x=100, y=100)

        Feet_textbox = tk.Entry(calc)
        Feet_textbox.insert(END, 0)
        Feet_textbox.place(x=240, y=100)

        #________CALCULATE BUTTON_______ 
        Calculate_button = tk.Button(calc, text="Calculate", command= lambda: Ft_Mt_Calculate(Feet_textbox.get()), activebackground="green", bd=3, bg=matte_green, foreground="white")
        Calculate_button.place(x=100, y=150)

        global M 
        M = "Meters"

        #___________Calculate Function__________
        def Ft_Mt_Calculate(input):
            try:
                area = float(input)
            except ValueError:
                ShowResult_Error()
            if(area > 0): 
                result = area / 3.281
                ShowResult_Ft_Mt(result)   

        #_____EXIT BUTTON______
        exit_button_Ft_Mt = Button(calc, text="EXIT", command=exit, bg=matte_red, foreground="white", bd=4, activebackground="red")
        exit_button_Ft_Mt.place(x=455, y=318, height=27, width=87)

        #_______BACK BUTTON TO OPTIONS SCREEN_______
        def back_Ft_Mt():
            Feet_label.destroy()
            Feet_textbox.destroy()
            Calculate_button.destroy()
            back_button_Ft_Mt.destroy()
            exit_button_Ft_Mt.destroy()
            lblResult.config(text="", bg=black, borderwidth=0, highlightthickness=0)

            dropdown()
        
        #_____BACK BUTTON_______
        global back_button_Ft_Mt
        back_button_Ft_Mt = Button(calc, text="BACK", command=back_Ft_Mt, bg=matte_orange, foreground="white", bd=4, activebackground="orange")
        back_button_Ft_Mt.place(x=100, y=318, height=27, width=87)

    

    #_______METERS TO FEET_______
    def Mt_Ft():
        Meters_label = tk.Label(calc, text="Enter value in Meters: ")
        Meters_label.place(x=100, y=100)

        Meters_textbox = tk.Entry(calc)
        Meters_textbox.insert(END, 0)
        Meters_textbox.place(x=260, y=100)

        #________CALCULATE BUTTON_______ 
        Calculate_button = tk.Button(calc, text="Calculate", command= lambda: Mt_Ft_Calculate(Meters_textbox.get()), activebackground="green", bd=3, bg=matte_green, foreground="white")
        Calculate_button.place(x=100, y=150)

        global M 
        M = "Feet"

        #___________Calculate Function__________
        def Mt_Ft_Calculate(input):
            try:
                area = float(input)
            except ValueError:
                ShowResult_Error()
            if(area > 0): 
                result = area * 3.281
                ShowResult_Mt_Ft(result)   

        #_____EXIT BUTTON______
        exit_button_Mt_Ft = Button(calc, text="EXIT", command=exit, bg=matte_red, foreground="white", bd=4, activebackground="red")
        exit_button_Mt_Ft.place(x=455, y=318, height=27, width=87)

        #_______BACK BUTTON TO OPTIONS SCREEN_______
        def back_Mt_Ft():
            Meters_label.destroy()
            Meters_textbox.destroy()
            Calculate_button.destroy()
            back_button_Mt_Ft.destroy()
            exit_button_Mt_Ft.destroy()
            lblResult.config(text="", bg=black, borderwidth=0, highlightthickness=0)

            dropdown()
        
        #_____BACK BUTTON_______
        global back_button_Mt_Ft
        back_button_Mt_Ft = Button(calc, text="BACK", command=back_Mt_Ft, bg=matte_orange, foreground="white", bd=4, activebackground="orange")
        back_button_Mt_Ft.place(x=100, y=318, height=27, width=87)


    #_______POUNDS TO KILOGRAMS_______
    def Pd_Kg():
        Pounds_label = tk.Label(calc, text="Enter value in Pounds: ")
        Pounds_label.place(x=100, y=100)

        Pounds_textbox = tk.Entry(calc)
        Pounds_textbox.insert(END, 0)
        Pounds_textbox.place(x=260, y=100)

        #________CALCULATE BUTTON_______ 
        Calculate_button = tk.Button(calc, text="Calculate", command= lambda: Pd_Kg_Calculate(Pounds_textbox.get()), activebackground="green", bd=3, bg=matte_green, foreground="white")
        Calculate_button.place(x=100, y=150)

        global M 
        M = "KGs"

        #___________Calculate Function__________
        def Pd_Kg_Calculate(input):
            try:
                area = float(input)
            except ValueError:
                ShowResult_Error()
            if(area > 0): 
                result = area / 2.205
                ShowResult_Pd_Kg(result)   

        #_____EXIT BUTTON______
        exit_button_Pd_Kg = Button(calc, text="EXIT", command=exit, bg=matte_red, foreground="white", bd=4, activebackground="red")
        exit_button_Pd_Kg.place(x=455, y=318, height=27, width=87)

        #_______BACK BUTTON TO OPTIONS SCREEN_______
        def back_Pd_Kg():
            Pounds_label.destroy()
            Pounds_textbox.destroy()
            Calculate_button.destroy()
            back_button_Pd_Kg.destroy()
            exit_button_Pd_Kg.destroy()
            lblResult.config(text="", bg=black, borderwidth=0, highlightthickness=0)

            dropdown()
        
        #_____BACK BUTTON_______
        global back_button_Pd_Kg
        back_button_Pd_Kg = Button(calc, text="BACK", command=back_Pd_Kg, bg=matte_orange, foreground="white", bd=4, activebackground="orange")
        back_button_Pd_Kg.place(x=100, y=318, height=27, width=87)
        

    #_______KILOGRAMS TO POUNDS_______
    def Kg_Pd():
        Kilograms_label = tk.Label(calc, text="Enter value in Kilograms: ")
        Kilograms_label.place(x=100, y=100)

        Kilograms_textbox = tk.Entry(calc)
        Kilograms_textbox.insert(END, 0)
        Kilograms_textbox.place(x=275, y=100)

        #________CALCULATE BUTTON_______ 
        Calculate_button = tk.Button(calc, text="Calculate", command= lambda: Kg_Pd_Calculate(Kilograms_textbox.get()), activebackground="green", bd=3, bg=matte_green, foreground="white")
        Calculate_button.place(x=100, y=150)

        global M 
        M = "Pounds"

        #___________Calculate Function__________
        def Kg_Pd_Calculate(input):
            try:
                area = float(input)
            except ValueError:
                ShowResult_Error()
            if(area > 0): 
                result = area * 2.205
                ShowResult_Kg_Pd(result)   

        #_____EXIT BUTTON______
        exit_button_Kg_Pd = Button(calc, text="EXIT", command=exit, bg=matte_red, foreground="white", bd=4, activebackground="red")
        exit_button_Kg_Pd.place(x=455, y=318, height=27, width=87)

        #_______BACK BUTTON TO OPTIONS SCREEN_______
        def back_Kg_Pd():
            Kilograms_label.destroy()
            Kilograms_textbox.destroy()
            Calculate_button.destroy()
            back_button_Kg_Pd.destroy()
            exit_button_Kg_Pd.destroy()
            lblResult.config(text="", bg=black, borderwidth=0, highlightthickness=0)

            dropdown()
        
        #_____BACK BUTTON_______
        global back_button_Kg_Pd
        back_button_Kg_Pd = Button(calc, text="BACK", command=back_Kg_Pd, bg=matte_orange, foreground="white", bd=4, activebackground="orange")
        back_button_Kg_Pd.place(x=100, y=318, height=27, width=87)

    dropdown()
    calc.geometry("558x359")


#____SHOW RESULT FUNCTION______
def ShowResult(result):
    lblResult.config(text=f"Area ={str(result)} sq.units", background=cool_white)

def ShowResult_V(result):
    lblResult.config(text=f"Volume ={str(result)} cubic.units", background=cool_white)

def ShowResult_Ft_Mt(result):
    lblResult.config(text=f"{str(result)} Meters", background=cool_white)

def ShowResult_Mt_Ft(result):
    lblResult.config(text=f"{str(result)} Feet", background=cool_white)

def ShowResult_Pd_Kg(result):
    lblResult.config(text=f"{str(result)} KGs", background=cool_white)

def ShowResult_Kg_Pd(result):
    lblResult.config(text=f"{str(result)} Pounds", background=cool_white)

def ShowResult_Error():
    lblResult.config(text="Please Enter an integer value", background=cool_white)



#_______RESULT LABEL_______
lblResult = tk.Label(calc, background=black)
lblResult.place(x=100, y=250)
    
options_screen()
calc.mainloop()
