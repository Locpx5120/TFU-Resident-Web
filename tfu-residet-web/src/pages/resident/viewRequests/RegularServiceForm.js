import React from "react";
import { TextField } from "@mui/material";
import dayjs from "dayjs";

const RegularServiceForm = ({ requestInfo, Purpose, notes, setNotes }) => {
  if (Purpose === "Dịch vụ sửa điện nước" || Purpose === "Sửa vấn đề khác") {
    return null;
  }

  return (
    <>
      <div className="grid">
        <div className="col-6 flex">
          <div className="col-6 font-semibold">Tên dịch vụ</div>
          <div className="col-6">{requestInfo.serviceName ?? ""}</div>
        </div>
      </div>

      {Purpose === "Add member" ? (
        <div className="grid">
          <div className="col-6 flex">
            <div className="col-6 font-semibold">Thành viên</div>
            <div className="col-6">{requestInfo.memberName}</div>
          </div>
          <div className="col-6 flex">
            <div className="col-6 font-semibold">Email</div>
            <div className="col-6">{requestInfo.email}</div>
          </div>
          <div className="col-6 flex">
            <div className="col-6 font-semibold">Ngày sinh</div>
            <div className="col-6">
              {dayjs(requestInfo.dateOfBirth).format("DD/MM/YYYY")}
            </div>
          </div>
          <div className="col-6 flex">
            <div className="col-6 font-semibold">Số điện thoại</div>
            <div className="col-6">{requestInfo.phoneNumber}</div>
          </div>
        </div>
      ) : (
        <div className="grid">
          <div className="col-6 flex">
            <div className="col-6 font-semibold">Gói</div>
            <div className="col-6">{requestInfo.package}</div>
          </div>
          <div className="col-6 flex">
            <div className="col-6 font-semibold">Loại xe</div>
            <div className="col-6">{requestInfo.vehicleType}</div>
          </div>
          <div className="col-6 flex">
            <div className="col-6 font-semibold">Biển số</div>
            <div className="col-6">{requestInfo.licensePlate}</div>
          </div>
          <div className="col-6 flex">
            <div className="col-6 font-semibold">Ngày bắt đầu</div>
            <div className="col-6">
              {dayjs(requestInfo.startDate).format("DD/MM/YYYY")}
            </div>
          </div>
          <div className="col-6 flex">
            <div className="col-6 font-semibold">Ngày kết thúc</div>
            <div className="col-6">
              {dayjs(requestInfo.endDate).format("DD/MM/YYYY")}
            </div>
          </div>
        </div>
      )}

      <div className="grid">
        <div className="col-6 flex">
          <div className="col-6 font-semibold">Trạng thái</div>
          <div className="col-6">{requestInfo.status}</div>
        </div>
        <div className="col-6 flex">
          <div className="col-6 font-semibold">chú thích</div>
          <div className="col-6">
            <TextField
              fullWidth
              margin="normal"
              value={notes}
              sx={{ margin: 0 }}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegularServiceForm;