import { useState } from 'react'
import { useForm } from "react-hook-form"
import * as yup from "yup"
import './App.css'
import { yupResolver } from "@hookform/resolvers/yup";

const registerSchema = yup.object({
  username: yup.string().required("bat buoc nhap username"),
  password: yup.string().min(6,"it nhat 6 ky tu")
});

function App() {
  const [count, setCount] = useState(0)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: {errors, isSubmitting},
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(registerSchema)
  })

  const handleOnSubmit = (data) => {
    console.log("data: ",data);
    reset()
  }

  console.log("error: ", errors)
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div>
        <input type="text" placeholder="Nhap UserName" {...register("username")}/>
        {
          errors.username?.message !== undefined && <p style={{color:'red'}}>
            {errors.username?.message}
          </p>
        }
        <div>
          <input type="password" placeholder="Nhap password" {...register("password")}/>
         {
          errors.password?.message !== undefined && <p style={{color:'red'}}>
            {errors.password?.message}
          </p>
         } 
        </div>
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Dang ky thanh cong" : "Gui"}</button>
      </div>
    </form>
  )
}

export default App
