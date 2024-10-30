import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
} from '@mui/material';
import { DatePicker, ConfigProvider } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import moment from 'moment';
import { StyleProvider } from '@ant-design/cssinjs';
import './index.css';

const initialFormData = {
  email: '',
  phone: '',
  fullName: '',
  genders: '',
  dateOfBirth: null,
  numberCccd: '',
};

const AgentModal = ({ open, handleClose, member, handleSave }) => {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (member) {
      setFormData({
        ...member,
        dateOfBirth: member.dateOfBirth ? moment(member.dateOfBirth) : null
      });
    } else {
      setFormData(initialFormData);
    }
  }, [member]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date, dateString) => {
    setFormData(prevData => ({
      ...prevData,
      dateOfBirth: date,
    }));
  };

  const handleSubmit = () => {
    const submittedData = {
      ...formData,
      dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth.format('YYYY-MM-DD') : null
    };
    handleSave(submittedData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{ style: { borderRadius: 15 } }}>
      <DialogTitle>
        <Typography variant="h5" component="div" style={{ fontWeight: 'bold', color: '#1976d2' }}>
          {member ? 'Sửa thành viên' : 'Thêm thành viên mới'}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Số điện thoại"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Họ tên"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyleProvider hashPriority="high">
              <ConfigProvider locale={viVN}>
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder="Chọn ngày sinh"
                  format="DD/MM/YYYY"
                  value={formData.dateOfBirth}
                  onChange={handleDateChange}
                />
              </ConfigProvider>
            </StyleProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Giới tính</InputLabel>
              <Select
                name="genders"
                value={formData.genders}
                onChange={handleChange}
                label="Giới tính"
              >
                <MenuItem value="Male">Nam</MenuItem>
                <MenuItem value="Female">Nữ</MenuItem>
                <MenuItem value="Other">Khác</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Số CCCD"
              name="numberCccd"
              value={formData.numberCccd}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{ padding: '16px 24px' }}>
        <Button onClick={handleClose} variant="outlined" color="primary" style={{ minWidth: '100px' }}>
          Hủy
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" style={{ minWidth: '100px' }}>
          {member ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgentModal;
