import React from "react";

const BasicInfo = ({ requestInfo, Purpose }) => {
  return (
    <div className="row">
      <div className="grid">
        <div className="col-6 flex">
          <div className="col-6 font-semibold">Toà nhà</div>
          <div className="col-6">{requestInfo.buildingName ?? ""}</div>
        </div>
        <div className="col-6 flex">
          <div className="col-6 font-semibold">Mục đích</div>
          <div className="col-6">{Purpose}</div>
        </div>
        <div className="col-6 flex">
          <div className="col-6 font-semibold">Số căn hộ</div>
          <div className="col-6">{requestInfo.apartmentNumber ?? ""}</div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;