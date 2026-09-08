import { Box, Button, Container, FormGroup, Grid, Input, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { getLogin } from '../../services/authSerivce';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async()  => {
        if (!username || !password) {
            setError('Please fill in both fields.');
            return;
        }

        try {
            const result = await getLogin({ userName: username, password: password });
            console.log("Token:", result.token);
            console.log("RefreshToken:", result.refreshToken);

            // Lưu token vào localStorage / Cookie và chuyển hướng trang
            localStorage.setItem("token", result.token);
            
        } catch (err: any) {
            if (err.code === "P101") {
                setError(err.message); // Hiển thị thông báo: Tên đăng nhập hoặc mật khẩu không chính xác
            }
        }

    };

    return (
        <Container>
            <Grid style={{ maxWidth: "300px", margin: "50px auto", borderRadius: 20, boxShadow: '1px 2px 9px #4C4C4E' }}>
                <Typography align='center' variant='h4' sx={{ position: "relative", fontWeight: '800', pt: '50px' }}>
                    Login
                </Typography>

                {/* Chuyển sang dùng form chuẩn của MUI */}
                <Box component="form" onSubmit={handleSubmit} sx={{ px: '20px', pt: '20px' }}>
                    <Input
                        type="text"
                        placeholder="Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        sx={{ boxShadow: '1px 2px 9px #4C4C4E', borderRadius: 5, p: 1.5, mb: 2 }}
                        disableUnderline
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        sx={{ boxShadow: '1px 2px 9px #4C4C4E', borderRadius: 5, p: 1.5, mb: 2 }}
                        disableUnderline
                    />

                    {error && (
                        <Typography color="error" align="center" variant="body2" sx={{ mb: 2 }}>
                            {error}
                        </Typography>
                    )}

                    <Stack spacing={2} sx={{ pb: '30px',alignItems:"center"  }}>
                        <Button variant="contained" type="submit" sx={{ borderRadius: 10, width: '100%' }}>
                            Log In
                        </Button>

                        <Typography variant="body2">
                            If you don't have account{' '}
                            <Box
                                component={Link}
                                to="/register"
                                sx={{ textDecoration: 'none', color: 'primary.main', fontWeight: 'bold' }}
                            >
                                sign up
                            </Box>
                        </Typography>
                    </Stack>
                </Box>
            </Grid>
        </Container>
    );
}

export default LoginPage;