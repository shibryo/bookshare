import React, { useEffect, useMemo, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios, { Axios } from "axios";

function App() {
  const [checkQuery, setCheckQuery] = useState<number>(4834000826);
  const checkQueryRef = useRef<number>();
  checkQueryRef.current = checkQuery;
  const inputEventCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: number = Number(event.target.value);
    setCheckQuery(value);
  };
  const [check, setCheck] = useState<Object>("");

  const onClickCheck = () => {
    console.log("button", checkQueryRef.current);

    axios
      .get(
        "/api/cail/" + // it set the proxy with vite.config.ts
          `check?appkey={あなたのアプリキー}&isbn=${checkQueryRef.current}&systemid=Aomori_Pref&format=json`
      )
      .then((results) => {
        console.log(typeof results);
        console.log(results.data);
        setCheck(results.data);
      })
      .catch((error: any) => console.log(error));
  };

  const [libraryQuery, setLibraryQuery] = useState<string>("埼玉県");
  const libraryQueryRef = useRef<string>();
  libraryQueryRef.current = libraryQuery;
  const inputEventLibrary = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = String(event.target.value);
    setLibraryQuery(value);
  };
  const [library, setLibrary] = useState<Object>("");
  const onClickLibrary = () => {
    axios
      .get(
        "/api/cail/" +
          `library?appkey={あなたのアプリキー}&pref=${libraryQueryRef.current}`
      )
      .then((results) => {
        console.log(typeof results);
        console.log(results.data);
        setLibrary(results.data);
      })
      .catch((error: any) => console.log(error));
  };

  return (
    <div className="App">
      <p>plase type isbn</p>
      <input defaultValue="4834000826" onChange={inputEventCheck} />
      <button onClick={onClickCheck}>蔵書検索</button>
      <p>{String(check)}</p>
      <input defaultValue="埼玉県" onChange={inputEventLibrary} />
      <button onClick={onClickLibrary}>図書館検索</button>
      <p>{String(library)}</p>
    </div>
  );
}

export default App;
