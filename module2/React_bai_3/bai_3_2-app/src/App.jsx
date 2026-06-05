import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [note, setNote] = useState(()=> {
    const savedNote = localStorage.getItem('userNote');
    return savedNote ? savedNote : "";
  });
  const handleNote = (e) => {
    setNote(e.target.value)
  }
  useEffect(()=>{
    const delayDebouneceFn = setTimeout(()=>{
      localStorage.setItem('userNote', note);
      console.log("Đã tự động lưu vào localStorage!");
    },5000);
    
    return () => {
      clearTimeout(delayDebouneceFn);
    }
  },[note]);

  return (
    <>
    <div >
      <h2>Ghi chú tự động</h2>
      <textarea  rows="10" cols="50" value={note} onChange={handleNote}/>
    </div>
    
    </>
  )
}

export default App
