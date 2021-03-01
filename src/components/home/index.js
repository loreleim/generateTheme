import style from "./index.module.scss";

export default function Home() {

  function generateZip() {
    console.log("test")
  }

  return (
    <div className={style.heroContainer}>
      <h1>generateTheme<span className={style.pink}>( )</span></h1>
      <button onClick={()=> generateZip()}>Download Theme</button>
    </div>
  );
}