import React, { useState } from 'react';
import { TextField, MenuItem, ToggleButton, ToggleButtonGroup, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
    '&.Mui-selected, &.Mui-selected:hover': {
      color: theme.palette.common.white,
      backgroundColor: '#4caf50',
    },
  }));

function SelectSummary() {
  const [selectedValue, setSelectedValue] = useState('');
  const [mode, setMode] = useState('month');

  const months = [
    { value: '01', label: 'Tháng 1' },
    { value: '02', label: 'Tháng 2' },
    { value: '03', label: 'Tháng 3' },
    { value: '04', label: 'Tháng 4' },
    { value: '05', label: 'Tháng 5' },
    { value: '06', label: 'Tháng 6' },
    { value: '07', label: 'Tháng 7' },
    { value: '08', label: 'Tháng 8' },
    { value: '09', label: 'Tháng 9' },
    { value: '10', label: 'Tháng 10' },
    { value: '11', label: 'Tháng 11' },
    { value: '12', label: 'Tháng 12' },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear - index);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleModeChange = (event, newMode) => {
    if (newMode !== null) {
      setMode(newMode);
      setSelectedValue('');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, maxWidth: 250 }}>
      <StyledToggleButtonGroup
        size="small"
        value={mode}
        exclusive
        onChange={handleModeChange}
        aria-label="select mode"
      >
       <StyledToggleButton value="month" aria-label="month">
          Tháng
        </StyledToggleButton>
        <StyledToggleButton value="year" aria-label="year">
          Năm
        </StyledToggleButton>
      </StyledToggleButtonGroup>

      <TextField
        select
        fullWidth
        size="small"
        label={mode === 'month' ? 'Chọn tháng' : 'Chọn năm'}
        value={selectedValue}
        onChange={handleChange}
      >
        {mode === 'month'
          ? months.map((month) => (
              <MenuItem key={month.value} value={month.value}>
                {month.label}
              </MenuItem>
            ))
          : years.map((year) => (
              <MenuItem key={year} value={year.toString()}>
                {year}
              </MenuItem>
            ))}
      </TextField>
    </Box>
  );
}

export default SelectSummary;