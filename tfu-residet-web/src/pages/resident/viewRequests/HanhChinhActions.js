import React from "react";
import { Box, Button } from "@mui/material";
import Cookies from "js-cookie";
import { 
  APPROVE_REQUEST, 
  REJECT_REQUEST, 
  ASSIGNMENT, 
  APPROVE_ASSIGN_STAFF,
  STAFF_DONE
} from "../../../constants/ApproveConstant";
import Swal from "sweetalert2";

const HanhChinhActions = ({ requestInfo, handleSubmit, navigate, Purpose }) => {
  if (Cookies.get("role") !== "HanhChinh") return null;

  const validateRequiredFields = () => {
    const requiredFields = {
      'Kỹ thuật viên': requestInfo.staffId,
    //   'Ghi chú của hành chính': requestInfo.noteFeedbackHanhChinh,
      'Thời gian sửa chữa': requestInfo.startDate,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Thiếu thông tin',
        text: `Vui lòng nhập đầy đủ: ${missingFields.join(', ')}`
      });
      return false;
    }

    return true;
  };

  const handleAssignment = () => {
    if (validateRequiredFields()) {
      handleSubmit(ASSIGNMENT);
    }
  };

  const renderButtons = () => {
    // Nếu status là 7, chỉ hiện nút Phân công
    if (requestInfo.status === STAFF_DONE) {
      return (
        <>
         <Button
            onClick={() => handleSubmit(APPROVE_REQUEST)}
            variant="contained"
            color="success"
          >
            Hoàn thành
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/xem-don")}
            sx={{ margin: "10px" }}
          >
            Đóng
          </Button>
        </>
      );
    }

    if (requestInfo.status !== APPROVE_REQUEST && requestInfo.status !== REJECT_REQUEST && requestInfo.status !== APPROVE_ASSIGN_STAFF && requestInfo.status < 3) {
      if (Purpose === "Dịch vụ sửa điện nước" || Purpose === "Sửa vấn đề khác") {
        return (
          <>
            {/* <Button
              onClick={() => handleSubmit(APPROVE_REQUEST)}
              variant="contained"
              color="success"
            >
              Hoàn thành
            </Button> */}
            <Button
              onClick={handleAssignment}
              variant="contained"
              color="primary"
              sx={{ margin: "10px" }}
            >
              Phân công
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/xem-don")}
              sx={{ margin: "10px" }}
            >
              Đóng
            </Button>
            <Button
              onClick={() => handleSubmit(REJECT_REQUEST)}
              variant="contained"
              color="error"
            >
              Từ chối
            </Button>
          </>
        );
      }else {
        return (
          <>
            <Button
              onClick={() => handleSubmit(APPROVE_REQUEST)}
              variant="contained"
              color="success"
            >
              Xác nhận
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/xem-don")}
              sx={{ margin: "10px" }}
            >
              Đóng
            </Button>
            <Button
              onClick={() => handleSubmit(REJECT_REQUEST)}
              variant="contained"
              color="error"
            >
              Từ chối
            </Button>
          </>
        );
      }
    }

    // Trường hợp còn lại chỉ hiện nút Đóng
    return (
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/xem-don")}
        sx={{ margin: "10px" }}
      >
        Đóng
      </Button>
    );
  };

  return (
    <Box sx={{ textAlign: "center", marginTop: "20px", width: "100%" }}>
      {renderButtons()}
    </Box>
  );
}

export default HanhChinhActions;