import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return <>
    <div>
      <h1 style={{
        marginRight: 10
      }}> Counter: {count}</h1>
      <button role="button" onClick={() => setCount(count + 1)}>Click Me</button>
    </div>
  </>
}

export default App
