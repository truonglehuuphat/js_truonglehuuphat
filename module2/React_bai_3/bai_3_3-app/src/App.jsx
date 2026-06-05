import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [width, setWidth] = useState(window.innerWidth)
  
  useEffect (() => {
    // 2 cap nhat lai size khi thay doi
    const handeResize = () => {
      setWidth(window.innerWidth);
      console.log("da thay doi kich co man hinh " + window.innerWidth);
    };
    //3 dang ky su kien resize cua trinh duyet
    window.addEventListener('resize', handeResize);

    //4 huy dang ky khi component bi tat
    return () => {
      window.removeEventListener('resize', handeResize);
    }
  },[]);
  

  return (
    <>
     <h1>Kich co man hinh</h1>
     <p>{width} px</p>
    </>
  )
}

export default App
