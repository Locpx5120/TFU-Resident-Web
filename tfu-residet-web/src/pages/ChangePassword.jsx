import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import {postData} from "../services/api";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

  const handleSubmit = async (event) => {
      event.preventDefault();
      const payload = {
          password: newPassword,
          newPassword: confirmPassword,
      };
      const res = await postData('/auth/changePassword', payload)
      const result = await res.json();
      if (result.code === 200) {
        Swal.fire({
            icon: 'success',
            title: 'Đổi mật khẩu thành công!',
            showConfirmButton: true,
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
            timer: 1500
        });
        localStorage.removeItem('isNew');
        navigate('/');
      } else {
        Swal.fire({
            icon: 'error',
            title: 'Đổi mật khẩu that bai!',
            showConfirmButton: true,
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
            timer: 1500
        });
      }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Đổi mật khẩu
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Mật khẩu hiện tại"
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Mật khẩu mới"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Đổi mật khẩu
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ChangePassword