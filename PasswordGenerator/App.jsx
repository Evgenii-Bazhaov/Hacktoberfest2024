import { useState , useCallback ,useEffect,useRef} from 'react'



function App() {

  const [length,setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password,setPAssword] = useState("");

  //reff hook

  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numberAllowed) 
    str += "0123456789"

    if(charAllowed) 
    str+= "!@$%^&*()_+=-"

    for (let i = 1; i <= length; i++) {
     let char = Math.floor(Math.random() * str.length +1)
      pass+= str.charAt(char);
    }


setPAssword(pass);


  },[length, numberAllowed,charAllowed,setPAssword])


  useEffect(() => {
    passwordGenerator();
  }, [length,numberAllowed,charAllowed,passwordGenerator])

  const copyPassToClip = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])


  return (
    <>
     <h1 className=' mt-4 text-4xl text-center text-white ' >Password generator</h1>
    <div className=" flex-wrap flex justify-center mt-10 w-[450px] h-[155px] rounded-md bg-gray-300 ">

    <InputBox 
    ref={passwordRef}
    placeholder='Password' 
    readOnly 
    value={password} 
    type="text"
     className=' px-2 mx-auto my-auto rounded-md w-[350px] h-[45px] ' />
    <button 
    onClick={copyPassToClip}
    className=' text-white bg-blue-500 mx-auto my-auto items-center px-2 py-2 rounded-md ' >copy</button>
    
    <div className=" w-full mx-auto h-[50px] flex items-center gap-4 ">

    <InputBox
    onChange={(e) => setLength(e.target.value)}
    value={length} min={6} max={100} type="range" />
    <label className='' >Length({length})</label>
    <InputBox
    defaultChecked={numberAllowed}
    id='numberInputBox'
    onChange={() => {setNumberAllowed((prev) => !prev)}}
     type="checkbox"/>
    <label className=' '>Numbers</label>

    <InputBox 
    defaultChecked={charAllowed}
    onChange={() => setCharAllowed((prev) => !prev)}

    type="checkbox" />
    <label className=' '>characters</label>
    

    </div>
  
 
    </div>
    
    
    
    
    
    </>
  )
}

export default App