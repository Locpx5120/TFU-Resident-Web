import React from "react";
import { Box, MenuItem, TextField } from "@mui/material";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import Cookies from 'js-cookie';
import {
  APPROVE_ASSIGN_STAFF,
  APPROVE_REQUEST,
  ASSIGNMENT,
  PENDING_REQUEST,
  REJECT_REQUEST
} from "../../../constants/ApproveConstant";

const RepairServiceForm = ({ requestInfo, handleChange, kyThuats }) => {
  // Helper function để kiểm tra trạng thái disable
  const isDisabled = (includeAssignment = true) => {
    const baseCondition = requestInfo.status === APPROVE_REQUEST ||
      requestInfo.status === PENDING_REQUEST ||
      requestInfo.status === REJECT_REQUEST;
    return includeAssignment ? baseCondition || requestInfo.status === ASSIGNMENT : baseCondition;
  };

  // Style chung cho các TextField
  const textFieldStyle = {
    mt: 0,
    backgroundColor: 'white',
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '12px',
      mt: 3
    }}>
      {/* Thông tin kỹ thuật viên và thời gian */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        {requestInfo.staffName ? <TextField
          type="number"
          fullWidth
          placeholder={requestInfo.staffName}
          sx={textFieldStyle}
        /> : <TextField
          label="Tên kỹ thuật viên"
          fullWidth
          select
          //   disabled={isDisabled()}
          value={requestInfo.staffId || ''}
          onChange={(e) => handleChange("staffId", e.target.value)}
          sx={textFieldStyle}
        >
          {kyThuats.map((kyThuat) => (
            <MenuItem key={kyThuat.id} value={kyThuat.id}>
              {kyThuat.fullName}
            </MenuItem>
          ))}
        </TextField>
        }

        {requestInfo.startDate ? <TextField placeholder={requestInfo.startDate} readonly /> :
          (<DatePicker
            placeholder="Thời gian sửa chữa"
            //   disabled={isDisabled()}
            value={requestInfo.startDate ? dayjs(requestInfo.startDate, 'YYYY/MM/DD') : null}
            onChange={(date, dateString) => handleChange("startDate", dateString)}
            sx={textFieldStyle}
          />)}
      </Box>

      {/* Giá tiền */}
      <TextField
        label="Giá tiền"
        type="number"
        fullWidth
        // disabled={isDisabled(false)}
        value={requestInfo.servicePrice || ""}
        onChange={(e) => handleChange("servicePrice", e.target.value)}
        sx={textFieldStyle}
      />

      {/* Các trường ghi chú */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Ghi chú"
          multiline
          rows={3}
          fullWidth
          //   disabled={isDisabled(false)}
          value={requestInfo.note || ""}
          onChange={(e) => handleChange("note", e.target.value)}
          sx={textFieldStyle}
        />

        <TextField
          label="Ghi chú của chủ căn hộ"
          multiline
          rows={3}
          fullWidth
          disabled={isDisabled() || requestInfo.status === APPROVE_ASSIGN_STAFF || !Cookies.get('Resident')}
          value={requestInfo.noteFeedbackCuDan || ""}
          onChange={(e) => handleChange("noteFeedbackCuDan", e.target.value)}
          sx={textFieldStyle}
        />

        <TextField
          label="Ghi chú chi tiết "
          multiline
          rows={3}
          fullWidth
          //   disabled={isDisabled(false)}
          value={requestInfo.noteDetail || ""}
          onChange={(e) => handleChange("noteDetail", e.target.value)}
          sx={textFieldStyle}
        />

        <TextField
          label="Ghi chú của kỹ thuật viên"
          fullWidth
          multiline
          rows={3}
          disabled
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

        <TextField
          label="Ghi chú của hành chính"
          multiline
          rows={3}
          fullWidth
          disabled={requestInfo.status < 6}
          value={requestInfo.noteFeedbackHanhChinh || ""}
          onChange={(e) => handleChange("noteFeedbackHanhChinh", e.target.value)}
          sx={textFieldStyle}
        />
      </Box>
    </Box>
  );
};

export default RepairServiceForm;