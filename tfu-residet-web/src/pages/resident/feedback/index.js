import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Rating, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { getApartmentByBuilding, GetBuildingsByUser } from '../../../services/buildingService';

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(-1);
  const [buildings, setBuildings] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [building, setBuilding] = useState('');
  const [apartment, setApartment] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const buildingData = await GetBuildingsByUser();
        setBuildings(buildingData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!building) return;
    const fetchData = async () => {
        const res = await getApartmentByBuilding(building);
        setApartments(res?.data || []);
    };
    fetchData();
}, [building]);

  const handleChangeBuilding = (event) => {
    setBuilding(event.target.value);
  };

  const handleChangeApartment = (event) => {
    console.log(event.target.value);
    
    setApartment(event.target.value);
  };

  return (
    <Box className="content" sx={{ maxWidth: 600, margin: 'auto', padding: 3, border: '1px solid #ccc', borderRadius: 2 }}>
           {/* Hàng 1: Dropdown Tòa nhà và Căn hộ */}
           <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
        <FormControl fullWidth margin="normal" sx={{ width: '50%' }}>
          <InputLabel id="building-label">Tòa nhà</InputLabel>
          <Select
            labelId="building-label"
            value={building}
            onChange={handleChangeBuilding}
            required
          >
            {buildings.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.buildingName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" sx={{ width: '45%' }}>
          <InputLabel id="apartment-label">Căn hộ</InputLabel>
          <Select
            labelId="apartment-label"
            value={apartment || ''}
            onChange={handleChangeApartment}
            required
          >
            {apartments.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.roomNumber}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Hàng 2: Tên nhiệm vụ và Kỹ thuật viên */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
        <TextField label="Tên nhiệm vụ" fullWidth />
        <TextField label="Kỹ thuật viên" fullWidth />
      </Box>

      {/* Hàng 3: Đánh giá dịch vụ */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography component="legend">Đánh giá dịch vụ</Typography>
        <Rating
          name="service-rating"
          value={rating}
          max={10}
          precision={1}
          onChange={(event, newValue) => setRating(newValue)}
          onChangeActive={(event, newHover) => setHoverRating(newHover)}
          sx={{
            fontSize: '3rem',
            '& .MuiRating-icon': { marginRight: '8px' },
            '& .MuiRating-iconFilled': { color: '#ff6d75' },
            '& .MuiRating-iconHover': { color: '#ff3d47' },
          }}
        />
        <Box>{hoverRating !== -1 ? hoverRating : rating} / 10</Box>
      </Box>

      {/* Hàng 4: Nhận xét chung */}
      <Box sx={{ marginBottom: 3 }}>
        <TextField label="Nhận xét chung" multiline rows={4} fullWidth />
      </Box>

      {/* Nút gửi */}
      <Button variant="contained" color="primary" fullWidth>
        Gửi đánh giá
      </Button>
    </Box>
  );
};

export default FeedbackPage;
