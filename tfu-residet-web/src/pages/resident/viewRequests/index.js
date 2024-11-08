import React, { useEffect, useState } from 'react';
import { Card, TablePagination, Typography, Button } from '@mui/material';
import TableCustom from '../../../components/Table';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const ViewRequests = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [requests, setRequests] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch(`https://localhost:7082/api/apartment-services/unpaid-details/vehicle-service-details/`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`,
                        'content-type': 'application/json',
                        'buildingPermalink': Cookies.get('buildingID'),
                    },
                    body: JSON.stringify({
                        serviceContractId: id,                   
                    })
                });
                const data = await response.json();
                setRequests(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRequests();
    }, []);
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
        { esName: 'serviceName', name: 'Tên dịch vụ' },
        { esName: 'submissionDate', name: 'Ngày gửi' },
        { esName: 'room', name: 'Phòng' },
        { esName: 'status', name: 'Trạng thái' },
        { esName: 'details', name: 'Chi tiết' },
    ];

    const paginatedRows = requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((request) => ({
        serviceName: request.serviceName,
        submissionDate: new Date(request.submissionDate).toLocaleDateString(),
        room: request.room,
        status: request.status,
        details: (
          <Button variant="outlined" onClick={() => navigate(`/xem-chi-tiet-don/${request.room}`, { state: { request } })}>
              Xem
          </Button>
      ),
    }));

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
