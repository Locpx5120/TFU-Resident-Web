import React from "react";
import { Box, Button } from "@mui/material";
import Cookies from "js-cookie";
import { STAFF_DONE, STAFF_PENDING, APPROVE_REQUEST } from "../../../constants/ApproveConstant";
import Swal from "sweetalert2";

const TechnicianActions = ({ requestInfo, handleSubmit, navigate }) => {
  if (Cookies.get("role") !== "KiThuat") return null;

  const validateNote = () => {
    // if (!requestInfo.noteKyThuat?.trim()) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Thiếu thông tin',
    //     text: 'Vui lòng nhập ghi chú của kỹ thuật viên'
    //   });
    //   return false;
    // }
    return true;
  };

  const handleConfirm = () => {
    if (validateNote()) {
    if(requestInfo.status === STAFF_PENDING) {
        handleSubmit(STAFF_DONE);
    }else {
        handleSubmit(STAFF_PENDING);
    }
    }
  };

  return (
    <Box sx={{ textAlign: "center", marginTop: "20px", width: "100%" }}>
     {requestInfo.status !== STAFF_DONE && requestInfo.status !== APPROVE_REQUEST &&  <Button
        onClick={handleConfirm}
        variant="contained"
        color="primary"
        sx={{ marginRight: "10px" }}
      >
        {requestInfo.status ===  STAFF_PENDING ? "Hoàn thành" : "Đang xử lý"}
      </Button>} 
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/xem-don")}
      >
        Đóng
      </Button>
    </Box>
  );
};

export default TechnicianActions;