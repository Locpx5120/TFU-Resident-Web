export const PENDING_REQUEST = 0;
export const APPROVE_REQUEST = 1;
export const REJECT_REQUEST = 2;
export const ASSIGNMENT = 3;
export const APPROVE_ASSIGN_STAFF = 4; // cu dan xac nhan 
export const REJECT_ASSIGN_STAFF = 5; // cu dan tu choi
export const STAFF_PENDING = 6; // nhan vien xac nhan dang xu ly
export const STAFF_DONE = 7; // nhan vien xu ly xong

export const getStatusLabel = (statusCode) => {
    const status = Number(statusCode);
    
    switch (status) {
      case 0:
        return "Đang xử lý";
      case 1:
        return "Đã hoàn thành đơn";
      case 2:
        return "Đã từ chối";
      case 3:
        return "Đã phân công";
      case 4:
        return "Cư dân đã xác nhận";
      case 5:
        return "Cư dân đã từ chối";
      case 6:
        return "Kỹ thuật đang xử lý";
      case 7:
        return "Kỹ thuật xác nhận hoàn thành";
      default:
        return "Không xác định";
    }
  };

export const statusArray = [
  {
    value: 0,
    label: "Đang xử lý"
  },
  {
    value: 1,
    label: "Đã hoàn thành đơn"
  },
  {
    value: 2,
    label: "Đã từ chối"
  },
  {
    value: 3,
    label: "Đã phân công"
  },
  {
    value: 4,
    label: "Cư dân đã xác nhận"
  },
  {
    value: 5,
    label: "Cư dân đã từ chối"
  },
  {
    value: 6,
    label: "Kỹ thuật đang xử lý"
  },
  {
    value: 7,
    label: "Kỹ thuật xác nhận hoàn thành"
  }
];