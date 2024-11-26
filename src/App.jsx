import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");

    //useRef hook

    const passwordref = useRef(null)


    const copyPasswordToClipboard = useCallback(()=>{
      passwordref.current?.select()
      window.navigator.clipboard.writeText(password)
    }, [password])


  const passwordGenerator = useCallback(() => {
    let pass = ""; //we will add the generated passwords in this `pass` variable and using setPassword method we'll store the password into state variable `password`
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+{}:~`/|<>.,[]";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(()=>{
    passwordGenerator()
  },[numberAllowed, charAllowed, length, passwordGenerator])

  return (
    <>
      <div className="w-full mx-auto max-w-md shadow-md rounded-lg px-4 py-3 my-8 text-neutral-200 bg-gray-700">
        <p className="text-white text-center my-2">Password generator</p>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 text-lime-800 font-bold"
            placeholder="Password"
            readOnly
            ref={passwordref}
          />
          <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
              type="range"
            />
            <label>length : {length}</label>
          </div>

          <div className="flex items-center gap-x-1 ">
            <input
              className="cursor-pointer"
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setnumberAllowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>

          <input
            type="checkbox"
            className="cursor-pointer"
            onChange={() => {
              setcharAllowed((prev) => !prev);
            }}
          />
          <label>Charector</label>
        </div>
      </div>
    </>
  );
}

export default App;
