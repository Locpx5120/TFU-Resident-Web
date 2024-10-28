import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormHelperText } from '@mui/material';

const CustomSelect = ({
  label,
  options,
  value,
  onChange,
  size = 'small',
  minWidth = 120,
  required = false,
  disabled = false,
  fullWidth = false,
  error = false,
  helperText = '',
}) => {
  return (
    <FormControl 
      sx={{ m: 1, minWidth: minWidth }} 
      size={size}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      error={error}
    >
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-label`}
        id={`${label}-select`}
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomSelect;