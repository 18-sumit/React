import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [Password, setPassword] = useState("");


  // useRef Hook

  const passwordRef = useRef(null); // iska reference kahi toh dena h isliye input field me diya h

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select() // select hua password highlight krne ke liye
    passwordRef.current?.setSelectionRange(0) // given range tak hee character select honge
    window.navigator.clipboard.writeText(Password)
  }, [Password])

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()-_+=[]{}`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
    // yaha setpassword dena jaruri nahi h , par hum chahte h ki setpassword bhi optimize ho aur isko bhi cache me rakho (memory)
  }, [length, numberAllowed, charAllowed, setPassword]);

  // yaha dependencies (array) me setPassword q ..?? , q ki password denge toh wo use har bar change hee krta jayega (optimize hee krta chala jayega )or infinite loop me fas jayenge
  // setPassword diya q ki wo check kr sake ki kitna optimization possible ho sake kr do 

  // useEffect se yaha hamara passwordgenerator wala function run ho raha h na ki useCallback se 
  // useCallback se hum use memory me rakh rahe h aur optimize kr rahe h

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={Password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef} // reference yaha diya h useRef ka 
          />
          <button onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setnumberAllowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setcharAllowed((prev) => !prev)
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )

}

export default App
