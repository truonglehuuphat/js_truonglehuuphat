import { useState } from 'react'
import { useForm } from "react-hook-form"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: "onBlur"
  })

  const handleOnSubmit = (data) => {
    console.log("data: ",data);
  }

  console.log("error: ", errors)
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div>
        <input type="text" placeholder="Nhap UserName" {...register("username",{
          required: "Ban phai nhap username"
        })}/>
        {
          errors.username?.message !== undefined && <p style={{color:'red'}}>
            {errors.username?.message}
          </p>
        }
        <div>
          <input type="text" placeholder="Nhap password" {...register("password" ,{
            validate: (value) => value.length >= 8 || "Toi thieu 8 ki tu"
          })}/>
         {
          errors.password?.message !== undefined && <p style={{color:'red'}}>
            {errors.password?.message}
          </p>
         } 
        </div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

export default App
