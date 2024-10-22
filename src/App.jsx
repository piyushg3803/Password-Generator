import React from "react";

import { useState, useCallback, useRef, useEffect } from "react";

function Password() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(0);
  const [allowNum, setallowNum] = useState(false);
  const [allowChar, setallowChar] = useState(false);

  let generatePass = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (allowNum) {
      str += "1234567890";
    }

    if (allowChar) {
      str += "!@#$%^&*()_+{}[]?<>|~";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [password, allowChar, allowNum, length]);

  let copyPass = useRef(null);

  let copyPassword = () => {
    copyPass.current?.select();
    copyPass.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  };

  return (
    <div className="bg-blue-300 w-full h-screen flex justify-center items-center">
      <div className="m-auto bg-white w-[40%] p-5 rounded-3xl">
        <h1 className="text-center text-3xl mb-5 font-semibold">
          Password Generator
        </h1>
        <div className="flex justify-between align-items-center">
          <input
            type="text"
            className=" p-2 border-2 border-blue-200 rounded-3xl w-[70%] text-xl"
            placeholder="Password"
            value={password}
            readOnly
            ref={copyPass}
          />

          <button
            className="bg-blue-500 text-white p-3 w-[25%] rounded-3xl"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>

        <div className="flex justify-between pt-5">
          <label className="text-lg">Password Length ({length})</label>
          <input
            className="w-[40%]"
            type="range"
            max={20}
            min={0}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
        </div>

        <div className="flex justify-between pt-5">
          <label className="text-lg">Include Numbers</label>
          <input
            // className="width-52"
            type="checkbox"
            defaultChecked={allowNum}
            onChange={() => setallowNum((prev) => !prev)}
          />
        </div>

        <div className="flex justify-between pt-5">
          <label className="text-lg"> Characters </label>
          <input
            className="p-2"
            type="checkbox"
            defaultChecked={allowChar}
            onChange={() => setallowChar((prev) => !prev)}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="text-center bg-blue-500 text-white p-3 w-[50%] rounded-3xl mt-5 mx-auto"
            onClick={generatePass}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}

export default Password;
