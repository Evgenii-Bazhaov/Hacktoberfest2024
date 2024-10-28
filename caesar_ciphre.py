print("Welcome Buddy , Lets make your message Secret!!")
should_continue = True
while should_continue:

  alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  direction = input("Type 'encode' to encrypt , type 'decode' to decrypt:\n ").lower()
  text = input('Type your message:\n').lower()
  shift = int(input('Type the shift number: '))


  def encrypt(original_text , shift_count):
    cipher_text = ""
    for letter in original_text:
      if letter not in alphabet:  # what happens when the user enter space/symbol/number ?
        cipher_text += letter
      else:
        shifted_position = alphabet.index(letter) + shift_count
        shifted_position = shifted_position % len(alphabet)  # 0-25
        cipher_text += alphabet[shifted_position]

    print(f"Here is the encoded result :{cipher_text}\n")

  def decrypt(text_to_decode,shift_count):
    normal_text = ""
    for letter in text_to_decode:
      if letter not in alphabet:
        normal_text += letter
      else:
        shifted_position = alphabet.index(letter) - shift_count
        shifted_position = shifted_position % len(alphabet)
        normal_text += alphabet[shifted_position]

    print(f"Here is the decoded resulf : {normal_text}\n")

  if direction == 'encode':
    encrypt(text,shift)
  else:
    decrypt(text,shift)

  restart = input('Type "yes" to continue or "no" to stop \n').lower()
  if restart == 'no':
    print('GoodBye')
    should_continue = False