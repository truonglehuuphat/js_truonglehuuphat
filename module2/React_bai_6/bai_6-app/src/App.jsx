import { useState } from 'react'
import './App.css'
import { Box, Grid, Container } from '@mui/material';

import { Button } from '@mui/material';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Container maxWidth="lg">
        <Grid container>
          <Grid size={{ md: 6, xs: 12 }}>
            <Box >
              item 1
            </Box>
          </Grid>

          <Grid size={{ md: 6, xs: 12 }}>
            <Box>
              item 2
            </Box>
          </Grid>

          <Grid size={{ md: 6, xs: 12 }}>
            <Box >
              item 3
            </Box>
          </Grid>

          <Grid size={{ md: 6, xs: 12 }}>
            <Box >
              item 4
            </Box>
          </Grid>
        </Grid>
      </Container>


    </>
  )
}

export default App
