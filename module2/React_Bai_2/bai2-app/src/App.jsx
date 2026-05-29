import { useState } from "react"
import './index.css'

function App(){
  const[color, setColor] = useState("red");
  const handleChangColer = () => {
    console.log("Color: ", color);
    setColor(color === "red" ? "blue" : "red");
  }

  return(
    <div>
      <div style={{
        backgroundColor: color,
        width: 50,
        height: 50,
      }} />
        <button onClick= {handleChangColer}>
          Change color to Blue
         </button>
    </div>
  );
}

export default App