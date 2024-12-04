import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    memeberServiceDetail,
    updateVehicle,
    vehicleServiceDetail,
} from "../../../services/vehicleService";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { APPROVE_REQUEST, REJECT_REQUEST } from "../../../constants/ApproveConstant";
import { DatePicker } from 'antd';
import moment from 'moment';

const RequestDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const paramSplit = location.pathname?.split("&");
    const Purpose = decodeURIComponent(paramSplit[1]?.slice(8));
    const { request } = location.state || {};
    const [status, setStatus] = useState(request?.status || "");
    const [purpose, setPurpose] = useState("");
    const [notes, setNotes] = useState("");
    const [requestInfo, setRequestInfo] = useState({
        buildingName: '',
        apartmentNumber: '',
        serviceName: '',
        memberName: '',
        dateOfBirth: '',
        email: '',
        phoneNumber: '',
        note: '',
        package: '',
        licensePlate: '',
        startDate: '',
        endDate: '',
        vehicleType: '',
        status: request?.status,
        ownerName: '',
        ownerPhone: '',
        ownerEmail: '',
        technicianName: '',
        technicianPhone: '',
        cost: '',
    });

    const handleChange = (field, value) => {
        setRequestInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (statusCode) => {
        const id = paramSplit[0]?.split("/")[2];
        const body = {
            serviceContractId: id,
            status: statusCode,
            note: notes,
        };
        callUpdate(body);
    };

    useEffect(() => {
        fetchRequest();
    }, [params.id]);

    const fetchRequest = async () => {
        try {
            let response = null;
            const id = paramSplit[0]?.split("/")[2];
            if (Purpose === "Add member") {
                response = await memeberServiceDetail(id);
            } else {
                response = await vehicleServiceDetail(id);
            }
            const data = response.data;
            setRequestInfo(data);
            setPurpose(data?.purpose || "");
            setNotes(data?.note || "");
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: '',
                text: 'Có lỗi xảy ra hoặc không tìm thấy đơn',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/xem-don');
                }
            });
        }
    };

    const callUpdate = async (body) => {
        try {
            const res = await updateVehicle(body);
            if (res.success) {
                Swal.fire('Thành công!', res.message, 'success');
                fetchRequest();
            }
        } catch (e) {
            console.error(e);
            Swal.fire({
                icon: 'error',
                title: '',
                text: 'Có lỗi xảy ra',
            });
        }
    };

    return (
        <Box className="content" sx={{ padding: "20px" }}>
            <Typography variant="h5" gutterBottom>
                Chi tiết Đơn
            </Typography>
            {requestInfo && (
                <>
                    <div className="row">
                        <div className="grid">
                            <div className="col-6 flex">
                                <div className="col-6 font-semibold">Toà nhà</div>
                                <div className="col-6">{requestInfo.buildingName ?? ''}</div>
                            </div>
                            <div className="col-6 flex">
                                <div className="col-6 font-semibold">Mục đích</div>
                                <div className="col-6">{Purpose}</div>
                            </div>
                            <div className="col-6 flex">
                                <div className="col-6 font-semibold">Số căn hộ</div>
                                <div className="col-6">{requestInfo.apartmentNumber ?? ''}</div>
                            </div>
                        </div>
                        {Purpose !== "Dịch vụ sửa chữa" && <>
                        <div className="grid">
                            <div className="col-6 flex">
                                <div className="col-6 font-semibold">Tên dịch vụ</div>
                                <div className="col-6">{requestInfo.serviceName ?? ''}</div>
                            </div>
                        </div>
                        </>}
                        {Purpose !== "Dịch vụ sửa chữa" && (
                            <>
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
                                            <div className="col-6">{dayjs(requestInfo.dateOfBirth).format('DD/MM/YYYY')}</div>
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
                                            <div className="col-6">{dayjs(requestInfo.startDate).format('DD/MM/YYYY')}</div>
                                        </div>
                                        <div className="col-6 flex">
                                            <div className="col-6 font-semibold">Ngày kết thúc</div>
                                            <div className="col-6">{dayjs(requestInfo.endDate).format('DD/MM/YYYY')}</div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                        {Purpose !== "Dịch vụ sửa chữa" && ( <div className="grid">
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
                        </div>)}
                    </div>

                    {Purpose === "Dịch vụ sửa chữa" && (
                        <>
                            <Box sx={{ display: "flex", gap: 2, mt: 5 }}>
                                <TextField
                                    label="Tên chủ căn hộ"
                                    fullWidth
                                    value={requestInfo.ownerName || ""}
                                    disabled
                                    onChange={(e) => handleChange("ownerName", e.target.value)}
                                />
                                <TextField
                                    label="Số điện thoại"
                                    fullWidth
                                    disabled
                                    value={requestInfo.ownerPhone || ""}
                                    onChange={(e) => handleChange("ownerPhone", e.target.value)}
                                />
                                <TextField
                                    label="Email"
                                    fullWidth
                                    disabled
                                    value={requestInfo.ownerEmail || ""}
                                    onChange={(e) => handleChange("ownerEmail", e.target.value)}
                                />
                            </Box>

                            <Box sx={{ display: "flex", gap: 2, mt: 5 }}>
                                <TextField
                                    label="Tên kỹ thuật viên"
                                    fullWidth
                                    select
                                    value={requestInfo.technicianName || ""}
                                    onChange={(e) => handleChange("technicianName", e.target.value)}
                                />
                                {/* <TextField
                                    label="Số điện thoại kỹ thuật viên"
                                    fullWidth
                                    value={requestInfo.technicianPhone || ""}
                                    onChange={(e) => handleChange("technicianPhone", e.target.value)}
                                /> */}
                            </Box>

                            <Box sx={{ display: "flex", gap: 2, mt: 5, ml: 2 }}>
                                <DatePicker
                                    fullWidth
                                    placeholder="Thời gian sửa chữa"
                                    value={requestInfo.startDate ? moment(requestInfo.startDate) : null}
                                    onChange={(date, dateString) => handleChange("startDate", dateString)}
                                    required
                                    style={{ width: "100%" }}
                                />
                                <TextField
                                    label="Giá tiền"
                                    fullWidth
                                    type="number"
                                    value={requestInfo.cost || ""}
                                    onChange={(e) => handleChange("cost", e.target.value)}
                                />
                            </Box>

                            <TextField
                                label="Ghi chú của chủ căn hộ"
                                fullWidth
                                multiline
                                rows={3}
                                sx={{ mt: 5 }}
                                value={requestInfo.note || ""}
                                onChange={(e) => handleChange("note", e.target.value)}
                            />
                        </>
                    )}

                    <Box sx={{ textAlign: "center", marginTop: "20px", width: "100%" }}>
                        {(requestInfo.status !== APPROVE_REQUEST && requestInfo.status !== REJECT_REQUEST && Cookies.get('role') === 'HanhChinh') && (
                            <Button onClick={() => handleSubmit(APPROVE_REQUEST)} variant="contained" color="primary">
                                Duyệt
                            </Button>
                        )}

                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => navigate("/xem-don")}
                            sx={{ margin: "10px" }}
                        >
                            Đóng
                        </Button>

                        {(requestInfo.status !== APPROVE_REQUEST && requestInfo.status !== REJECT_REQUEST && Cookies.get('role') === 'HanhChinh') && (
                            <Button onClick={() => handleSubmit(REJECT_REQUEST)} variant="contained" color="error">
                                Từ chối
                            </Button>
                        )}
                    </Box>
                </>
            )}
        </Box>
    );
};

export default RequestDetail;
