import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import CustomSelect from '../../../common/CustomSelect';

const SearchAgent = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const nameOptions = [
    { value: '', label: 'Tất cả' },
    { value: 'nguyen-van-a', label: 'Nguyễn Văn A' },
    { value: 'tran-thi-b', label: 'Trần Thị B' },
    { value: 'le-van-c', label: 'Lê Văn C' },
  ];

  const positionOptions = [
    { value: '', label: 'Tất cả' },
    { value: 'manager', label: 'Quản lý' },
    { value: 'developer', label: 'Lập trình viên' },
    { value: 'designer', label: 'Thiết kế' },
    { value: 'tester', label: 'Kiểm thử' },
  ];

  const handleSearch = () => {
    console.log('Tìm kiếm với:', { name, position });
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <CustomSelect
        label="Họ tên"
        options={nameOptions}
        value={name}
        onChange={handleNameChange}
        minWidth={200}
      />
      <CustomSelect
        label="Chức vụ"
        options={positionOptions}
        value={position}
        onChange={handlePositionChange}
        minWidth={150}
      />
      <Button variant="outlined" color="success" onClick={handleSearch}>
        Tìm kiếm
      </Button>
    </Box>
  );
};

export default SearchAgent;