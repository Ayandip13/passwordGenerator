import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  // State variables to manage password settings and the generated password
  const [length, setLength] = useState(8); // Password length
  const [numberAllowed, setnumberAllowed] = useState(false); // Allow numbers in the password
  const [charAllowed, setcharAllowed] = useState(false); // Allow special characters in the password
  const [password, setPassword] = useState(""); // The generated password

  // useRef to reference the password input field for copying
  const passwordref = useRef(null);

  // Function to copy the generated password to the clipboard
  const copyPasswordToClipboard = useCallback(() => {
    passwordref.current?.select(); // Select the password input field
    window.navigator.clipboard.writeText(password); // Write the password to the clipboard
  }, [password]);

  // Function to generate a random password based on the current settings
  const passwordGenerator = useCallback(() => {
    let pass = ""; // Initialize the password variable
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // Base character set

    // Add numbers and special characters to the character set if allowed
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+{}:~`/|<>.,[]";

    // Generate the password by randomly picking characters from the character set
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length); // Random index
      pass += str.charAt(char); // Append the character at the random index
    }

    setPassword(pass); // Update the password state
  }, [length, numberAllowed, charAllowed]);

  // Automatically generate a password when dependencies change
  useEffect(() => {
    passwordGenerator();
  }, [numberAllowed, charAllowed, length, passwordGenerator]);

  return (
    <>
      <div className="w-full mx-auto max-w-md shadow-md rounded-lg px-4 py-3 my-8 text-neutral-200 bg-gray-700">
        {/* Header for the password generator */}
        <p className="text-white text-center my-2">Password generator</p>

        {/* Input field to display the generated password with a copy button */}
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 text-lime-800 font-bold"
            placeholder="Password"
            readOnly
            ref={passwordref} // Reference to the input field
          />

          <button
            onClick={copyPasswordToClipboard} // Trigger clipboard copy
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>

        {/* Controls for password customization */}
        <div className="flex text-sm gap-x-2">
          {/* Slider to set password length */}
          <div className="flex items-center gap-x-1">
            <input
              min={6} // Minimum length
              max={100} // Maximum length
              value={length} // Current length value
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value); // Update length state
              }}
              type="range" // Range slider
            />
            <label>length : {length}</label>
          </div>

          {/* Checkbox to allow/disallow numbers in the password */}
          <div className="flex items-center gap-x-1 ">
            <input
              className="cursor-pointer"
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setnumberAllowed((prev) => !prev); // Toggle number allowance
              }}
            />
            <label>Numbers</label>
          </div>

          {/* Checkbox to allow/disallow special characters in the password */}
          <input
            type="checkbox"
            className="cursor-pointer"
            onChange={() => {
              setcharAllowed((prev) => !prev); // Toggle special character allowance
            }}
          />
          <label>Charector</label>
        </div>
      </div>
    </>
  );
}

export default App;
