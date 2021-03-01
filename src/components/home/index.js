import style from "./index.module.scss";
import DownloadButton from "../download";
import React, { useState } from "react";

export default function Home() {

  //this is the themeName listener, that changes on input keyup
  const [themeName, setThemeName] = useState("default");

  function themeNameListener(e) {
    setThemeName(e.target.value);
  }

  return (
    <div className={style.heroContainer}>
      <h1>generateTheme<span className={style.pink}>( )</span></h1>
      <input type="text" placeholder={"Enter theme name"} autoComplete="none" onChange={themeNameListener}></input>
      <DownloadButton themeNameProp={themeName}/>
    </div>
  );
}