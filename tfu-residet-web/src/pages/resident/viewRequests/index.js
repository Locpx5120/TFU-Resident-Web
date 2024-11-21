import React, { useEffect, useState } from 'react';
import { Card, TablePagination, Typography, Button } from '@mui/material';
import TableCustom from '../../../components/Table';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import {getDetailVehicle} from "../../../services/vehicleService";
import { getBuilding } from '../../../services/residentService';

const ViewRequests = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [requests, setRequests] = useState([]);
    const residentId = Cookies.get("residentId");
    const buildingID = Cookies.get("buildingID");

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const data = await getBuilding(residentId, buildingID);
                const apartmentIds = data?.data || [];
    
                const responses = await Promise.all(
                    apartmentIds.map(item => getDetailVehicle(item.apartmentId))
                );
                
                const allItems = responses
                .flatMap(response => response?.data || []);
                
                setRequests(allItems);
            } catch (error) {
                console.error(error);
            }
        };
        
        fetchRequests();
    }, [residentId, buildingID]);
    
    // const requests = [
    //     { serviceName: 'Gửi xe ô tô', submissionDate: '2024-11-01', room: '101', status: 'Đang xử lý', details: 'Chi tiết đơn 1' },
    //     { serviceName: 'Gửi xe máy', submissionDate: '2024-10-28', room: '102', status: 'Hoàn thành', details: 'Chi tiết đơn 2' },
    //     { serviceName: 'Gửi xe đạp', submissionDate: '2024-10-25', room: '103', status: 'Đã hủy', details: 'Chi tiết đơn 3' },
    //     { serviceName: 'Thêm thành viên', submissionDate: '2024-10-20', room: '201', status: 'Đang xử lý', details: 'Chi tiết đơn 4' },
    //     { serviceName: 'Báo cáo sửa chữa', submissionDate: '2024-11-02', room: '202', status: 'Đang xử lý', details: 'Chi tiết đơn 5' },
    //     { serviceName: 'Gửi xe ô tô', submissionDate: '2024-11-01', room: '101', status: 'Đang xử lý', details: 'Chi tiết đơn 6' },
    //     { serviceName: 'Gửi xe máy', submissionDate: '2024-10-28', room: '102', status: 'Hoàn thành', details: 'Chi tiết đơn 7' },
    // ];

    const columns = [
        { esName: 'apartment', name: 'Tên căn hộ' },
        { esName: 'building', name: 'Tòa nhà' },
        { esName: 'createdDate', name: 'Ngày tạo' },
        { esName: 'note', name: 'Ghi chú' },
        { esName: 'processedDate', name: 'Ngày xử lý' },
        { esName: 'purpose', name: 'Mục đích' },
        { esName: 'quantityOrArea', name: 'Số lượng/Diện tích' },
        { esName: 'serviceName', name: 'Tên dịch vụ' },
        { esName: 'status', name: 'Trạng thái' },
        { esName: 'unitPrice', name: 'Đơn giá' },
        { esName: 'details', name: 'Chi tiết' },
    ];

    const paginatedRows = requests && requests.length > 0 ? requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((request) => ({
       ...request,
        details: (
          <Button variant="outlined" onClick={() => navigate(`/xem-chi-tiet-don/${request.serviceContractId}&purpose=${request.purpose}`, { state: { request } })}>
              Xem
          </Button>
      ),
    })) : [];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Card className='content' sx={{ maxHeight: "800px", marginTop: "30px" }}>
            <Typography variant="h5" sx={{ padding: '16px' }}>
                Xem Đơn
            </Typography>
            <TableCustom
                columns={columns}
                rows={paginatedRows}
                onRowClick={(row) => console.log(row)}
            />
            <TablePagination
                component="div"
                count={requests.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

export default ViewRequests;
