import React, { useState } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  TextField, 
  MenuItem, 
  ToggleButton, 
  ToggleButtonGroup,
  Typography,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SalaryTab from './SalaryTab';
import ListTab from './ListTab';

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

function SalaryListPage() {
  const [tab, setTab] = useState(0);
 

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };


  return (
    <Box className="content">
      <Paper elevation={3} sx={{ p: 3 }}>
        <Tabs value={tab} onChange={handleTabChange} aria-label="salary tabs">
          <Tab label="Danh sách" />
          <Tab label="Lương" />
        </Tabs>
        
        <Box sx={{ mt: 3 }}>
          {tab === 0 ? (
            <ListTab />
        ) : (
            <SalaryTab />
          )}
        </Box>

      </Paper>
    </Box>
  );
}

export default SalaryListPage;