import React, { useState } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  Paper
} from '@mui/material';
import ThirdPartyLent from './ThirdPartyLent';
import ThirdPartyRent from './ThirdPartyRent';

function ThirdPartyList() {
  const [tab, setTab] = useState(0);
 

  const handleTabChange = (_, newValue) => {
    setTab(newValue);
  };


  return (
    <Box className="content">
      <Paper elevation={3} sx={{ p: 3 }}>
        <Tabs value={tab} onChange={handleTabChange} aria-label="thirdparty tabs">
          <Tab label="Cho thuê" />
          <Tab label="Bên thuê" />
        </Tabs>
        
        <Box sx={{ mt: 3 }}>
          {tab === 0 ? (
            <ThirdPartyRent />
        ) : (
            <ThirdPartyLent />
          )}
        </Box>

      </Paper>
    </Box>
  );
}

export default ThirdPartyList;