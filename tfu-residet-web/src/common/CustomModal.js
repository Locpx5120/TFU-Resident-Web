import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const CustomModal = ({ open, handleClose, data, handleSave, title, mode, fields }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSave = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" mb={2}>
          {title}
        </Typography>
        {fields.map((field) => (
          React.cloneElement(field, {
            key: field.props.name,
            value: formData[field.props?.name] || '',
            onChange: handleChange,
            fullWidth: true,
            margin: "normal"
          })
        ))}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose} sx={{ mr: 1 }}>Hủy</Button>
          <Button variant="contained" onClick={onSave}>{mode === 'add' ? 'Thêm' : 'Cập nhật'}</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;