# import tkinter module
from tkinter import *

# import other necessary module
import random

# Vigenere cipher for encryption and decryption
import base64

# creating root object
root= Tk()

# defining size window
root.geometry("1200x6000")

# setting up the title of window
root.title("Message Encryption and Decryption")

Tops= Frame(root,width=1600, relief=SUNKEN)
Tops.pack(side=TOP)

f1=Frame(root, width=800, relief=SUNKEN)
f1.pack(side=LEFT)

# ==================================================================


lblInfo=Label(Tops, font=('helvetica',50,'bold'), text="SECRET MESSAGING \n Vigenere Cipher", fg="BLACK",bd=10,anchor='w')


lblInfo.grid(row=0,column=0)



# installing variables
Msg= StringVar()
key= StringVar()
mode= StringVar()
Result= StringVar()


# labels for the message
lblMsg=Label(f1, font=('arial',16,'bold'), text="MESSAGE", bd=16, anchor="w")


lblMsg.grid(row=1,column=0)
# Entry box for the message
txtMsg=Entry(f1, font=('arial',16,'bold'), textvariable=Msg, bd=10, insertwidth=4, bg="powder blue", justify='right')




txtMsg.grid(row=1, column=1)
# labels for the keys
lblkey= Label(f1, font=('arial',16,'bold'), text="KEY (Only Integer)", bd=16, anchor="w")


lblkey.grid(row=2, column=0)


# Entry for the box key
txtkey= Entry(f1, font=('arial',16,'bold'), textvariable=key, bd=10, insertwidth=4, bg="powder blue", justify='right')



txtkey.grid(row=2, column=1)

# labels for the mode
lblmode=Label(f1, font=('arial',16,'bold'), text="MODE(e for encrpt, d for decrypt)", bd=16, anchor="w")



lblmode.grid(row=3, column=0)
# Entry box for the mode
txtmode= Entry(f1, font=('arial',16,'bold'), textvariable=mode, bd=10, insertwidth=4, bg="powder blue", justify='right')



txtmode.grid(row=3, column=1)

# labels for the result
lblResult=Label(f1, font=('arial',16,'bold'), text=" The Result-",bd=16, anchor="w")


lblResult.grid(row=2, column=2)

# Entry box for the result
txtResult=Entry(f1, font=('arial',16,'bold'), textvariable=Result, bd=10, insertwidth=4, bg="powder blue", justify='right')



txtResult.grid(row=2, column=3)

# Vigenere cipher

# Function to encode


def encode(key, msg):
    enc=[]

    for i in range(len(msg)):
        key_c=key[i % len(key)]
        enc_c=chr((ord(msg[i])+ord(key_c))% 256)
        enc.append(enc_c)
        print("enc:", enc)
    return base64.urlsafe_b64encode("".join(enc).encode()).decode()


# Function to decode



def decode(key, enc):
    dec=[]

    enc= base64.urlsafe_b64decode(enc).decode()
    for i in range(len(enc)):
        key_c=key[i% len(key)]
        dec_c=chr((256+ord(enc[i])-ord(key_c))% 256)


        dec.append(dec_c)
        print("dec:",dec)
    return"".join(dec)


def Results():
    print=("Message= ",(Msg.get()))

    msg= Msg.get()
    k=key.get()
    m=mode.get()

    if (m =='e'):
        Result.set(encode(k, msg))
    else:
        Result.set(decode(k, msg))

# exit function


def qExit():
    root.destroy()

# Function to reset the window


def Reset():

    Msg.set("")
    key.set("")
    mode.set("")
    Result.set("")


# Show message button
btnTotal=Button(f1, padx=16, pady=8, bd=16, fg="black", font=('arial',16,'bold'), width=10, text="Show Message", bg="powder blue", command=Results).grid(row=7,column=1)




# Reset button
btnReset=Button(f1, padx=16, pady=8, bd=16, fg="black", font=('arial', 16, 'bold'), width=10, text="Reset", bg="green", command=Reset).grid(row=7, column=2)




# Exit button
btnExit= Button(f1, padx=16, pady=8, bd=16, fg="black", font=('arial', 16, 'bold'), width=10, text="Exit", bg="red", command=qExit).grid(row=7, column=3)





# keeps window alive
root.mainloop()