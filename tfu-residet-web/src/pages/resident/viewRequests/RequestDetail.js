import React from "react";
import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BasicInfo from "./BasicInfo";
import RepairServiceForm from "./RepairServiceForm";
import RegularServiceForm from "./RegularServiceForm";
import ResidentActions from "./ResidentActions";
import Cookies from "js-cookie";
import { useRequestDetail } from "../../../hooks/useRequestDetail";
import TechnicianForm from "./TechnicianForm";
import TechnicianActions from "./TechnicianActions";
import HanhChinhActions from "./HanhChinhActions";

const RequestDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const paramSplit = location.pathname?.split("&");
  const Purpose = decodeURIComponent(paramSplit[1]?.slice(8));

  const {
    requestInfo,
    notes,
    kyThuats,
    handleChange,
    setNotes,
    handleSubmit,
    fetchRequest,
  } = useRequestDetail(Purpose, paramSplit, navigate);

  React.useEffect(() => {
    fetchRequest();
  }, [params.id]);

  return (
    <Box className="content" sx={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Chi tiết Đơn
      </Typography>
      {requestInfo && (
        <>
          <BasicInfo requestInfo={requestInfo} Purpose={Purpose} />
          
          {Cookies.get("role") === "KiThuat" ? (
             <>
             <TechnicianForm 
               requestInfo={requestInfo}
               handleChange={handleChange}
             />
             <TechnicianActions
               requestInfo={requestInfo}
               handleSubmit={handleSubmit}
               navigate={navigate}
             />
           </>
          ) : (Purpose === "Dịch vụ sửa điện nước" || Purpose === "Sửa vấn đề khác") ? (
            <RepairServiceForm 
              requestInfo={requestInfo}
              handleChange={handleChange}
              kyThuats={kyThuats}
            />
          ) : (
            <RegularServiceForm 
              requestInfo={requestInfo}
              Purpose={Purpose}
              notes={notes}
              setNotes={setNotes}
            />
          )}

          <HanhChinhActions 
            requestInfo={requestInfo}
            handleSubmit={handleSubmit}
            navigate={navigate}
          />
          
          <ResidentActions 
            requestInfo={requestInfo}
            handleSubmit={handleSubmit}
            navigate={navigate}
          />
        </>
      )}
    </Box>
  );
};

export default RequestDetail;