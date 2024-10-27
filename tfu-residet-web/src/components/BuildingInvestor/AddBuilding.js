import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Swal from 'sweetalert2';

const AddBuilding = ({ open, onClose, onSubmit, projects }) => {
  const [newBuilding, setNewBuilding] = useState({
    projectId: '',
    name: '',
    permalink: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBuilding(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!newBuilding.projectId || !newBuilding.name || !newBuilding.permalink) {
      Swal.fire('Lỗi', 'Vui lòng điền đầy đủ thông tin', 'error');
      return;
    }
    onSubmit(newBuilding);
    setNewBuilding({ projectId: '', name: '', permalink: '' }); // Reset form
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thêm tòa nhà mới</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Dự án</InputLabel>
          <Select
            name="projectId"
            value={newBuilding.projectId}
            onChange={handleInputChange}
            required
          >
            {projects.map((project) => (
              <MenuItem key={project.projectId} value={project.projectId}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label="Tên tòa nhà"
          name="name"
          value={newBuilding.name}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Permalink"
          name="permalink"
          value={newBuilding.permalink}
          onChange={handleInputChange}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Thêm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBuilding;