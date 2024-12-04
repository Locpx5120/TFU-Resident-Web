export const NotificationType = {
    FEE: 'FEE',
    MANAGEMENT: 'MANAGEMENT',
    CONTRACTOR_ACTIVITY: 'CONTRACTOR_ACTIVITY',
    COMPANY: 'COMPANY'
};
export const NotificationTypeList = [
    {label: 'Phí', value: NotificationType.FEE},
    {label: 'Ban quản lý', value: NotificationType.MANAGEMENT},
    {label: 'Hoạt động nhà thầu', value: NotificationType.CONTRACTOR_ACTIVITY},
    {label: 'Cơ quan tổ chức', value: NotificationType.COMPANY},
];
export const statusType = {
    PENDING_APPROVAL: "PENDING_APPROVAL",
    APPLYING: "APPLYING",
    PENDING_APPLY: "PENDING_APPLY",
    REJECT: "REJECT",
    DRAFT: "DRAFT",
    EXPIRE: "EXPIRE"
}

export const statusTypeList = [
    {label: "Chờ phê duyệt", value: statusType.PENDING_APPROVAL},
    {label: "Đang áp dụng", value: statusType.APPLYING},
    {label: "Chưa áp dụng", value: statusType.PENDING_APPLY},
    {label: "Từ chối", value: statusType.REJECT},
    {label: "Lưu nháp", value: statusType.DRAFT},
    {label: "Hết hạn", value: statusType.EXPIRE}
]

export const Role = {
    Resident: 'Resident',
    BanQuanLy: 'BanQuanLy',
    KeToan: 'KeToan',
    KyThuat: 'KyThuat',
    HanhChinh: 'HanhChinh',
    BenThuBa: 'BenThuBa',

}
export const RoleList = [
    {label: 'Tất cả', value: 'ALL'},
    {label: 'Ban quản lý', value: Role.BanQuanLy},
    {label: 'Kế toán', value: Role.KeToan},
    {label: 'Kỹ thuật', value: Role.KyThuat},
    {label: 'Hành chính', value: Role.HanhChinh},
    {label: 'Bên thứ ba', value: Role.BenThuBa},
]


