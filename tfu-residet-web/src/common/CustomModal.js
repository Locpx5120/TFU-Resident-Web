import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { debounce as _debounce } from "lodash";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: 830, // Thiết lập chiều cao tối đa là 200px
  overflowY: 'auto', // Thêm thanh cuộn dọc nếu nội dung vượt quá chiều cao
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,

};

const CustomModal = ({ open, handleClose, employee, handleSave, title, mode, fields, validateSchema }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (employee) {
      const initialData = {};
      fields.forEach(field => {
        const fieldName = field.props.name;
        initialData[fieldName] = employee[fieldName] || '';
      });
      setFormData(initialData);
    } else {
      setFormData({});
    }
  }, [employee, fields]);


  const handleChange = (e) => {
    validateForm({ ...formData, [e.target.name]: e.target.value }, e.target.name);
    setFormData(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const [fieldErrors, setFieldErrors] = useState({})
  const validateForm = async (formData, fieldName) => {
    if (!validateSchema) return true;
    try {
      if (fieldName) {
        if(!Object.keys(validateSchema.fields).some(x => x === fieldName)){
          setFieldErrors(prev => ({
            ...prev,
            [fieldName]: undefined
          }))
          return;
        }
        await validateSchema.validateAt(fieldName, formData, { abortEarly: false, disableStackTrace: true });
        setFieldErrors(prev => ({
          ...prev,
          [fieldName]: undefined
        }))
      } else {
        await validateSchema.validate(formData, { abortEarly: false, disableStackTrace: true });
        setFieldErrors({})
      }

      return true;
    } catch (error) {
      setFieldErrors(JSON.parse(JSON.stringify(error.inner)).reduce((prev, nxt) => {
        if (nxt.message) {
          prev[nxt.path] = nxt.message;

        }
        return prev;
      }, {}))
      return false;

    }
  }

  const onSave = async () => {
    try {

      if (!await validateForm(formData)) return;
      await handleSave(formData);
      await onClose();

    } catch (error) {
      console.log(error);
    }
  };

  const onClose = async () => {
    setFieldErrors({})
    await handleClose();
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" mb={2}>
          {title}
        </Typography>
        {fields.map((field) => {
          if (!field) return null; // Kiểm tra nếu field là null hoặc undefined
          return React.cloneElement(field, {
            key: field.props.name,
            value: formData[field.props.name] || '',
            onChange: handleChange,
            fullWidth: true,
            error: fieldErrors[field.props.name],
            helperText: fieldErrors[field.props.name],
            margin: "normal"
          });
        })}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>Hủy</Button>
          <Button variant="contained" onClick={onSave}>{mode === 'add' ? 'Thêm' : 'Cập nhật'}</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
