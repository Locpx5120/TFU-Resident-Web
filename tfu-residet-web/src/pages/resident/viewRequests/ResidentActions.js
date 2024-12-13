import React from "react";
import { Box, Button } from "@mui/material";
import Cookies from "js-cookie";
import { APPROVE_ASSIGN_STAFF, APPROVE_REQUEST, REJECT_ASSIGN_STAFF, STAFF_PENDING } from "../../../constants/ApproveConstant";

const ResidentActions = ({ requestInfo, handleSubmit, navigate }) => {
  if (Cookies.get("role") !== "Resident") return null;
  const status = requestInfo.status;

  const shouldShowActionButtons = () => {
    return  status === 3;
  };

  const isRepairCompleted = () => {
    return status === 7;
  };

  return (
    <Box sx={{ textAlign: "center", marginTop: "20px", width: "100%" }}>
      {shouldShowActionButtons() && (
        <>
          <Button
            onClick={() => handleSubmit(APPROVE_ASSIGN_STAFF)}
            variant="contained"
            color="primary"
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
            onClick={() => handleSubmit(REJECT_ASSIGN_STAFF)}
            variant="contained"
            color="error"
          >
            Từ chối
          </Button>
        </>
      )}

      {isRepairCompleted() && (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleSubmit(APPROVE_REQUEST)}
            sx={{ margin: "10px" }}
          >
            Kỹ thuật đã hoàn thành sửa chữa
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleSubmit(STAFF_PENDING)}
            sx={{ margin: "10px" }}
          >
            Yêu cầu sửa chữa lại
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
      )}

      {!shouldShowActionButtons() && !isRepairCompleted() && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/xem-don")}
          sx={{ margin: "10px" }}
        >
          Đóng
        </Button>
      )}
    </Box>
  );
};

export default ResidentActions;
