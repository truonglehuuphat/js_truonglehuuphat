import { useContext, useState, useMemo } from 'react';
import { Box, Container, Divider, Typography } from "@mui/material";
import { TaskContext, TaskProvider } from './contexts/TaskContext';
import TaskInput from './components/TaskInput';
import TaskFilter from './components/TaskFilter';
import TaskItem from './components/TaskItem';

function TaskApp() {
  const { tasks, toggleTask, deleteTask } = useContext(TaskContext);

  const [filter, setFilter] = useState("");
  const [priorityFilter, setPriority] = useState("Medium");
  const filteredTasks = useMemo(() => {
     const safeTasks = Array.isArray(tasks) ? tasks : [];
    return safeTasks.filter((task) => {
     
        const matchStatus = filter === "all"? true: filter === "completed"? task.completed : !task.completed;
        const matchPriorityFilter = priorityFilter.length === 0? true : priorityFilter.includes(task.priority);
        return matchStatus && matchPriorityFilter; 
    })
  }, [tasks, toggleTask, deleteTask])
  return (
    <>
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 800, color: '#1976d2' }}>
          TASK MASTER PRO
        </Typography>

        <TaskInput />

        <TaskFilter filter={filter} setFilter={setFilter}
          priorityFilter={priorityFilter} setPriorityFilter={setPriority} />

        <Divider sx={{ md: 3 }} />
        
        <Box>
          <Typography variant="subtitle2" sx ={{ mb:2 , color: 'text.secondary'}}>
            Danh sách: {filteredTasks.length} công việc
          </Typography>
          {
            filteredTasks.length > 0 ? filteredTasks.map(task => (
              <TaskItem key={task.id} task={task} toggle={toggleTask} onDelete={deleteTask}/>
            )) :  (
              <Typography align="center" sx={{mt:4 , color:"text.disable"}}>
                Không tìm thấy công việc nào phù hợp
              </Typography>
            )
          }
        </Box>
      </Container>
    </>
  )
}

export default function App() {
  return (
    <TaskProvider>
      <TaskApp />
    </TaskProvider>
  )
}
