import { Box, Button, Container, FormGroup, Grid, Input, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!username || !password) {
            setError('Please fill in both fields.');
            return;
        }

        // Simulated login validation
        console.log("user ", username);
        console.log(" password ", password);
        if (username === 'user' && password === 'password') {
            setError('');
            alert('Login Successful!');
        } else {
            setError('Invalid username or password.');
        }
    };

    return (
        <Container >
            <Grid style={{ maxWidth: "300px", margin: "50px auto", borderRadius: 20, boxShadow: '1px 2px 9px #4C4C4E' }}>
                <Typography align='center' variant='h4' sx={{ position: "relative", fontHeight: '800', pt: '50px' }} >Login</Typography>
                <FormGroup onSubmit={handleSubmit} sx={{ px: '5px', margin: '5px' }}>
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        sx={{ boxShadow: '1px 2px 9px #4C4C4E', borderRadius: 5, p: 1.5 }}
                        disableUnderline
                    />
                    <br /><br />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        sx={{ boxShadow: '1px 2px 9px #4C4C4E', borderRadius: 5, p: 1.5 }}
                        disableUnderline
                    />
                    <br /><br />
                </FormGroup>
                {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
                <Stack sx={{ direction: "row", alignItems: "center", justifyContent: "space-between", pb: '50px' }} >
                    <Button variant="contained" type="submit" sx={{ borderRadius: 10 }} >Log In</Button>
                    <Typography>If you don't have account </Typography>c
                    <Box
                        component={Link}
                        to="/register"
                        sx={{ textDecoration: 'none' }}
                    >
                        sign up
                    </Box>
                </Stack>
            </Grid>
        </Container>

    );
}

export default LoginPage;