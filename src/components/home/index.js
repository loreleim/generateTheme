import style from "./index.module.scss";
import DownloadButton from "../download";
import React, { useState } from "react";

export default function Home() {

  //this is the themeName listener, that changes on input keyup
  const [themeName, setThemeName] = useState("generateTheme-default");
  const [description, setDescription] = useState("a basic generateTheme()");
  const [author, setAuthor] = useState("AuthorName");


  function themeNameListener(e) {
    setThemeName(e.target.value);
  }

  function descriptionListener(e) {
    setDescription(e.target.value)
  }

  function authorListener(e) {
    setAuthor(e.target.value)
  }

  return (
    <div className={style.heroContainer}>
      <div className={style.heroText}>
        <h1>generateTheme<span className={style.pink}>( )</span></h1>
        <input type="text" placeholder={"Enter theme name"} autoComplete="none" onChange={themeNameListener}></input>
        <input type="text" placeholder={"Theme description"} autoComplete="none" onChange={descriptionListener}></input>
        <input type="text" placeholder={"Theme author"} autoComplete="none" onChange={authorListener}></input>
        <DownloadButton themeNameProp={themeName} descriptionProp={description} authorProp={author}/>
      </div>
    </div>
  );
}