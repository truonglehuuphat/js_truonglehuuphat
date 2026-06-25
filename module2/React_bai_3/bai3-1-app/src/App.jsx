import { useEffect, useState } from 'react'

function App() {
  const [name, setName] = useState("")

  useEffect(() => { alert("Chào mừng bạn đến với lớp học React") }, []);
  useEffect(() => {
    if (name.trim() !== "") {
      document.title = `Đang chat với: ${name}`;
    } else {
      document.title = "Lớp học React";
    }
  }, [name]);

  const handleSetName = (e) => {
    setName(e.target.value)
  }

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Đăng nhập</h2>
          <h1>Bài 1 Lời chào thân thiện</h1>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <input type="text" placeholder='Nhập tên' onChange={handleSetName} />
          </div>
          {
            name !== "" ? <p>Bạn đang nhập: {name}</p> : <></>
          }
        </div>
      </div>
    </>
  )
}

export default App
