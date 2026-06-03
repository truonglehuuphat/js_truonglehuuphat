import { useEffect, useState } from 'react'

function App() {
  const [second, setSecond] = useState(10)
  const [isCounting, setIsCounting] = useState(true)

  useEffect(() => {
    alert(" Chương trình flash sale bất đầu")
  }, []);

  useEffect(() => {
    if(isCounting === false){

      return;
    }

    if (second === 0) {
      document.title = "Het gio san sale";

      return;
    }

    const intevalId = setInterval(() => {
      setSecond((pre) => pre - 1);
    }, 1000);

    return () => {
      clearInterval(intevalId);
    }
  }, [second, isCounting]);

  return (
    <>
      <h1 style={{ color: "red" }}>Bắt đầu săn deal:</h1>
      <p>Chuong trinh ket thuc sau</p>
      <p>{second} giay</p>
      {
        second > 0 ? <button onClick={() => (setIsCounting(!isCounting))}>Đóng/mở deal</button> : <button  onClick={() => {setSecond(10); document.title = "bai_3-app"}}>reset</button>
      }
      
      
    </>
  )
}

export default App
