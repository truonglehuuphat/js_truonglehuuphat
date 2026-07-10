import { Box, Button, MenuItem, Stack, TextField } from "@mui/material";
import { TaskContext } from "../contexts/TaskContext";
import { useContext, useState } from "react";



export default function TaskInput = (){
    const { addTask } = useContext(TaskContext);
    const [text, setText] = useState("");
    const [priority, setPriority] = useState([]);

    const handleAdd = (text: string, priority: string) => {
        if(text.trim()){
            addTask(text, priority);
            setText("");
        }

    }

    return (
        <Box sx={{ borderRadius: 2, bgcolor: "#f8f9fa", mb: 4, p: 2 }}>
            <Stack direction={{ sx: "column", md: "row" }} spacing={2}>
                <TextField
                    fullWidth
                    label="Nội dung công việc"
                    value={text}
                    onChange={(e) => setText(e.target.value)} />

                <TextField select
                    label="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    sx={{ minWidth: 120 }}>
                    {['Urgent', 'High', 'Medium', ' Low'].map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                </TextField>
                <Button variant="contained" onClick={handleAdd} sx={{ px: 4 }}>
                    Add
                </Button>
            </Stack>

        </Box>
    )
}
