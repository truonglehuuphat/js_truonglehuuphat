import { Checkbox, Chip, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

const TaskItem = React.memo(({ task, toggle, onDelete }) => {

    console.log(`=> Render TaskItem: ${task.text}`)
    const colorPriority = (p) => {
        switch (p) {
            case "Urgent":
                return "error";
            case "Hight":
                return "warning";
            case "medium":
                return "primary";
            default:
                return "default";
        }
    };
    return (
        <Paper sx={{ p: 2, mb: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }} >
            <Stack sx={{ direction:"row", spacing:2, alignItems:"center"}} >
                <Checkbox checked={task.completed} onChange={() => toggle(task.id)} />
                <Typography sx={{ textDecoration: task.complete ? "line-through" : "none", fontWeight: 500 }}>
                    {task.title}
                </Typography>
                <Chip label={task.priority} size="small" color={colorPriority(task.priority)} sx={{ mt: 0.5 }}> </Chip>
            </Stack>
            <IconButton onClick={() => onDelete(task.id)} color="error">
                <DeleteIcon />
            </IconButton>
        </Paper>
    )
})

export default TaskItem