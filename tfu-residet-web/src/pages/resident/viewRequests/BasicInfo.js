import React from "react";
import {getStatusLabel} from "../../../constants/ApproveConstant";

const BasicInfo = ({ requestInfo, Purpose }) => {
  return (
    <div className="row">
      <div className="grid">
        <div className="col-6 flex">
          <div className="col-6 font-semibold">Toà nhà:</div>
          <div className="col-6">{requestInfo.buildingName ?? ""}</div>
        </div>
        <div className="col-6 flex">
          <div className="col-6 font-semibold">Tên dịch vụ:</div>
          <div className="col-6">{Purpose}</div>
        </div>
        <div className="col-6 flex">
          <div className="col-6 font-semibold">Số căn hộ:</div>
          <div className="col-6">{requestInfo.apartmentNumber ?? ""}</div>
        </div><div className="col-6 flex">
          <div className="col-6 font-semibold">Trạng thái đơn hiện tại:</div>
          <div className="col-6">
            <span style={{padding: '5px 20px', background: 'green', color: '#fff', borderRadius: '15px', fontWeight: 600}}>{getStatusLabel(requestInfo.status)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;