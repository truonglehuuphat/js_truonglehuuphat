import { useState } from 'react';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import './App.css'

function App() {
  const [search, SetSearch] = useState("");
  const [levelPriority, SetLevelPriority] = useState("");
  const handleChangeSearch = (e) => {
    SetSearch(e.target.value)
  }

  const handleChange = (e) => {
    SetLevelPriority(e.target.value);
  }
  return (
    <>
      <Container >
        <Box>
          <Typography variant="h2" color="primary" sx={{ fontWeight: 700 }} >
            TASK MASTER PRO
          </Typography>
        </Box>
        <Box sx={{m: 1.2, p: 1.2, alignItems:"center"}}  backGroundColor="primary.main" >
          <Grid container spacing={2} >
            <Grid size={8}>
              <TextField label="Nội dung công việc" fullWidth onChange={handleChangeSearch} />
            </Grid>
            <Grid size={2}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel variant="standard">
                    Priority
                  </InputLabel>
                  <Select value={levelPriority} onChange={handleChange}>
                    <MenuItem value={10}>Urgent</MenuItem>
                    <MenuItem value={20}>High</MenuItem>
                    <MenuItem value={30}>Medium</MenuItem>
                    <MenuItem value={40}>Low</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid>
              <Button variant="contained" sx={{ minWidth: 100, minHeight: 54}}>
                Add
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
        <Box>
          <Typography fontWeight={700}>
            Status:
          </Typography>
          <Button>
            All
          </Button>
          <Button>
            NOT YET
          </Button>
          <Button>
            DONE
          </Button>
        </Box>
        <Box>
          <Typography fontWeight={700}>
            Priority
          </Typography>
          <Button>
            URGENT
          </Button>
          <Button>
            HIGH
          </Button>
          <Button>
            MEDIUM
          </Button>
          <Button>
            LOW
          </Button>          
        </Box>        

    </>
  )
}

export default App
