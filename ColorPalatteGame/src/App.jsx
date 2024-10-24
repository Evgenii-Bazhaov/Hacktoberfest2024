import { gridRow } from "../contants/constants";
import GridSection from "./Grid";
import { useEffect } from "react";
export default function App() {
  useEffect(() => {
    setTimeout(() => {
      for (let i = 0; i < gridRow; i++) {
        for (let j = 0; j < 4; j++) {
          document.getElementById(`${i}-${j}`).style.backgroundColor =
            "#FFFFFF";
          document.getElementById(`${i}-${j}`).style.transition = "all 0.5s";
        }
      }
    }, 6000);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <div className="text-4xl">Color Game</div>
      <div className="text-2xl">
        Portfolio :{" "}
        <a className="text-inherit underline" href="https://anujsingh.net">
          anujsingh.net
        </a>
      </div>
      <div className="h-[80%] mt-12">
        <GridSection rowCount={gridRow} />
      </div>
    </div>
  );
}
