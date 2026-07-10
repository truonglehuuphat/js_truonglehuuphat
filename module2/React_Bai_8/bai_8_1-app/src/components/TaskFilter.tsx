import { Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";


export default function TaskFilter({ filter, setFilter, priorityFilter, setPriorityFilter }) {
    return (
        <Stack  spacing={2} sx={{ mb: 3 }}>
            <Typography  variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>Status:</Typography>
            <ToggleButtonGroup
                color="primary"
                value={filter}
                exclusive
                onChange={(e, val) => val !== null && setFilter(val)}
            >
                <ToggleButton value="All">
                    All
                </ToggleButton>
                <ToggleButton value="Not Yet">
                    Not Yet
                </ToggleButton>
                <ToggleButton value="Done">
                    Done
                </ToggleButton>
            </ToggleButtonGroup>
            <Typography  variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>Priority:</Typography>
            <ToggleButtonGroup
                size="small"
                value={priorityFilter}
                onChange={(e, val) => val !== null && setPriorityFilter(val)}
            >
                <ToggleButton value="Urgent">
                    Urgent
                </ToggleButton>
                <ToggleButton value="High">
                    High
                </ToggleButton>
                <ToggleButton value="Medium">
                    Medium
                </ToggleButton>
                <ToggleButton value="Low">
                    Low
                </ToggleButton>                
            </ToggleButtonGroup>
        </Stack>
    )
}