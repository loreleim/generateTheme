import style from "./index.module.scss";
import DownloadButton from "../download";

export default function Home() {

  return (
    <div className={style.heroContainer}>
      <h1>generateTheme<span className={style.pink}>( )</span></h1>
      <DownloadButton themeNameProp={"hi"}/>
    </div>
  );
}