import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TableChartIcon from '@mui/icons-material/TableChart';

function DownloadMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleDownload = (fileType) => {
    // if (fileType === 'SVG') {
    //   // tải xuống file SVG
    // } else if (fileType === 'PNG') {
    //   // tải xuống file PNG
    // } else if (fileType === 'CSV') {
    //   // tải xuống file CSV
    // }
    handleClose();
  };

  const downloadOptions = [
    { type: 'SVG', icon: <PictureAsPdfIcon />, label: 'Tải xuống SVG' },
    { type: 'PNG', icon: <InsertDriveFileIcon />, label: 'Tải xuống PNG' },
    { type: 'CSV', icon: <TableChartIcon />, label: 'Tải xuống CSV' },
  ];

  return (
    <div>
      <IconButton
        aria-controls={open ? 'download-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="download-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'download-button',
        }}
      >
        {downloadOptions.map((option) => (
          <MenuItem key={option.type} onClick={() => handleDownload(option.type)}>
            <ListItemIcon>
              {option.icon}
            </ListItemIcon>
            <ListItemText>{option.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default DownloadMenu;