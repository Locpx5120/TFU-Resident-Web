import React from "react";
import { Box, Button } from "@mui/material";
import Cookies from "js-cookie";
import { APPROVE_ASSIGN_STAFF, REJECT_ASSIGN_STAFF } from "../../../constants/ApproveConstant";

const ResidentActions = ({ requestInfo, handleSubmit, navigate }) => {
  if (Cookies.get("role") !== "Resident") return null;

  const shouldShowActionButtons = () => {
    const status = parseInt(requestInfo.status);
    return status < 3 && status === 1 || status === 2;
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

      {!shouldShowActionButtons() && (
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