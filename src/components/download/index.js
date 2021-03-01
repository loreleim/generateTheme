import React from 'react';
import style from "./index.module.scss";
import Database from "../../database";

export default function DownloadButton(props) {

  function generateZip() {
    console.log(props.themeNameProp)
  }

  return (
    <React.Fragment>
      <button className={style.downloadButton} onClick={()=> generateZip()}>Download Theme</button>
    </React.Fragment>
  );
}