import { useState } from 'react'
import './App.css'
import axios from "axios";
import type {Employee, EmployeeFormInput, EmployeeStatus} from "./types/employee";

const API_URL = "https://jsonplaceholder.typicode.com/users";

interface UserApi {id: number; name: string; email: string;}

export const employeeService = {
  getAll: async (): Promise<Employee[]> => {
    const { data } = await axios.get<UserApi[]>(API_URL);
    return data.map(user => ({
      id: user.id,
      fullName: user.name,
      email: user.email,
      position: "Developer",
      status: "Active" as EmployeeStatus,
    }));
  },
  create: async (data: EmployeeFormInput): Promise<Employee> => {
    const res = await axios.post<Employee>(API_URL, data);
    return {...res.data, id: Math.floor(Math.random() *1000)};
  }
}

function App() {
  const [count, setCount] = useState(0)
  const data =  employeeService.getAll()

  return (
    <>
      <p>DashBoard Nhan su</p>
      <p>Them ten nhan vien</p>
      <form action="">
        <input type="text" placeholder='Ho ten' />
        <input type="text" placeholder='Email'/>
        <input type="text" placeholder='active'/>
        <button>Them</button>
      </form>
      <table>
        <th>ID</th>
        <th>Ho va ten</th>
        <th>Email</th>
        <th>Trang thai</th>
      </table>
    </>
  )
}

export default App
