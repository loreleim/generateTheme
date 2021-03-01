import style from "./index.module.scss";

export default function Home() {

  function generateZip() {
    console.log("test")
  }

  return (
    <div className={style.zippysContainer}>
      <h1>Home</h1>
      <button onClick={()=> generateZip()}>Generate Theme</button>
    </div>
  );
}