import React from "react";
import { Box, TextField } from "@mui/material";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import Cookies from "js-cookie";

const TechnicianForm = ({ requestInfo, handleChange }) => {
  if (Cookies.get("role") !== "KiThuat") return null;

  // Style chung cho các TextField
  const textFieldStyle = {
    backgroundColor: 'white',
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      padding: '24px',
      backgroundColor: '#f5f5f5',
      borderRadius: '12px',
      mt: 3
    }}>
      {/* Thông tin cơ bản */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Tên kỹ thuật viên"
          fullWidth
          value={requestInfo.technicianName || ""}
          disabled
          sx={textFieldStyle}
        />

        {/* Thời gian và giá tiền */}
        {requestInfo.startDate ? <TextField placeholder={requestInfo.startDate} readonly /> :
          (<DatePicker
            placeholder="Thời gian sửa chữa"
            disabled
            value={requestInfo.startDate ? dayjs(requestInfo.startDate, 'YYYY/MM/DD') : null}
            sx={textFieldStyle}
          />)}
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Giá tiền"
          fullWidth
          type="number"
          disabled
          value={requestInfo.servicePrice || ""}
          sx={textFieldStyle}
        />
      </Box>

      {/* Các trường ghi chú */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Ghi chú"
          fullWidth
          multiline
          rows={3}
          disabled
          value={requestInfo.note || ""}
          sx={textFieldStyle}
        />

        <TextField
          label="Ghi chú chi tiết"
          multiline
          rows={3}
          fullWidth
          disabled
          value={requestInfo.noteDetail || ""}
          onChange={(e) => handleChange("noteDetail", e.target.value)}
          sx={textFieldStyle}
        />

        <TextField
          label="Ghi chú của chủ căn hộ"
          fullWidth
          multiline
          rows={3}
          disabled
          value={requestInfo.noteFeedbackCuDan || ""}
          sx={textFieldStyle}
        />

        <TextField
          label="Ghi chú của hành chính"
          fullWidth
          multiline
          rows={3}
          disabled
          value={requestInfo.noteFeedbackHanhChinh || ""}
          sx={textFieldStyle}
        />

        {/* Trường ghi chú có thể chỉnh sửa */}
        <TextField
          label="Ghi chú của kỹ thuật viên"
          fullWidth
          multiline
          rows={3}
          value={requestInfo.noteKyThuat || ""}
          onChange={(e) => handleChange("noteKyThuat", e.target.value)}
          sx={{
            ...textFieldStyle,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              borderColor: '#1976d2',
              '&:hover': {
                borderColor: '#1976d2',
              }
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default TechnicianForm;