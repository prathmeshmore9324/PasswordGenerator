/* {}eslint-disable react-hooks/exhaustive-deps */
/* {}eslint-disable no-unused-vars */

import { useState, useCallback,useEffect,useRef} from "react";


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef Hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*-_=+[]{}~`";
    }

    for (let i = 0; i < length; i++) { // Corrected the loop condition
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char); // Append character instead of replacing
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed , setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    //it provide selection range 
    // passwordRef.current?.setSelectionRange(0, 49);
    window.navigator.clipboard.writeText(password)
  } ,[password])

  useEffect(() => {passwordGenerator()} , [length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3">Passwrord Generator</h1>
        <div className="flex shadow rounded-lg p-3 overflow-hidden mb-4">
          <input type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="password"
          readOnly     
          ref={passwordRef}     
          />
          <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-4 py-0.5 shrink-0 ">
            Copy
          </button>
       </div>
       <div className="flex text-sm gap-x-1">
        <div className="flex items-center gap-x-1">
          <input
           type="range"
           min={6}
           max={50}
           value={length}
           className="cursor-pointer"
           onChange={(e) => {setLength(e.target.value)}}
           />
           <label >Length : {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
           type="checkbox"
           defaultChecked={numberAllowed}
           id="numberInput"
           onChange={() => {
            setNumberAllowed((prev) => !prev);
           }}
           />
           <label htmlFor="numberINput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
           type="checkbox"
           defaultChecked={numberAllowed}
           id="charInput"
           onChange={() => {
            setCharAllowed((prev) => !prev);
           }}
           />
           <label htmlFor="charINput">Characters</label>
        </div>
        </div>
      </div>
       
      
       
     
    </>
  );
}

export default App;
