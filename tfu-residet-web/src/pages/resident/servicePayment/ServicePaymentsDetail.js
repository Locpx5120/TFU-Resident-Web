import React, {useState, useEffect, useMemo} from 'react';
import {
    Box,
    TablePagination,
    Select,
    MenuItem,
    Typography,
    Button,
} from '@mui/material';
import TableCustom from '../../../components/Table';
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import {Link, useParams} from 'react-router-dom';
import QRCodeModal from '../../../common/ModalQRCode';
import {getDetailServiceUnpaids} from '../../../services/apartmentService';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import dayjs from "dayjs";
import {Card} from 'primereact/card';
import {sumBy} from 'lodash';

const ServicePaymentsDetail = () => {
    const {id, status, year, month} = useParams();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [roomsData, setRoomsData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const paymeted = (data) => data.paymentStatus !== 'Đã thanh toán';
    const buildingID = Cookies.get("buildingID");
    const [selectedProducts, setSelectedProducts] = useState(null);
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await getDetailServiceUnpaids({
                    apartmentId: id,
                    serviceType: "",
                    year, month
                });
                console.log(response)
                response.services.map((items) => {
                    items.unitPriceconvert = items?.unitPrice?.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    });
                    items.totalPriceConvent = items?.totalPrice?.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    });
                    items.paymentDate = items?.paymentDate ? dayjs(items?.paymentDate).format('DD/MM/YYYY : HH:mm:ss') : '';
                })
                setRoomsData(response);
                console.log(roomsData)
            } catch (error) {
                Swal.fire('Thất bại', 'Xóa thất bại!', 'error');
            }
        }
        fetchRooms();
    }, [])

    const handleSelected = (item) => {
        const total = sumBy(item.value, 'totalPrice');
        setTotalAmount(total);
    }

    const paginatedRows = useMemo(() => {
        return roomsData.services;
    }, [page, rowsPerPage, roomsData,]);

    const transferData = {
        data: selectedProducts?.map((items) => items.invoiceId),
        bankAccountName: "HOANG TUAN KIET",
        bankAccountNumber: "1690120007777",
        bankName: "MB BANK",
        amount: totalAmount || 0,
        transactionContent: "Thanh toán dịch vụ"
    };

    return (
        <section className="content service">
            <QRCodeModal isOpen={modalIsOpen} onRequestClose={closeModal} transferData={transferData}/>
            <Box>
                <Typography variant="h6">Chi tiết thanh toán dịch vụ phòng</Typography>
            </Box>
            <Card sx={{marginTop: "30px"}} title="Dịch vụ chưa thanh toán">
                <DataTable value={roomsData.services?.filter(item => paymeted(item))}
                           selection={selectedProducts}
                           onSelectionChange={(e) => {
                               setSelectedProducts(e.value);
                               handleSelected(e)
                           }} dataKey="invoiceId"
                           emptyMessage="Không có dữ liệu"
                           tableStyle={{minWidth: '50rem', height: 'auto'}}
                           paginator={roomsData.services?.filter(item => paymeted(item)).length > 5} rows={5}
                           rowsPerPageOptions={[5, 10, 25, 50]}>

                    <Column
                        selectionMode="multiple"
                    ></Column>
                    {columnData.map(item =>
                        <Column field={item.esName} header={item.name}></Column>)
                    }
                </DataTable>

                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                    <h1>Tổng tiền cần thanh toán: {totalAmount.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    })}</h1>
                    {totalAmount > 0 &&
                        <Button variant="primary" onClick={openModal}>Thanh toán QR code</Button>}
                </div>
            </Card>
            <Card className="mt-2" title="Dịch vụ đã thanh toán">
                <DataTable value={roomsData.services?.filter(item => !paymeted(item))}
                           emptyMessageTemplate={<h1 className="text-center">Không có dữ liệu</h1>} tableStyle={{minWidth: '50rem', height: 'auto'}}
                           paginator={roomsData.services?.filter(item => !paymeted(item)).length > 5} rows={5}
                           rowsPerPageOptions={[5, 10, 25, 50]}>
                    {columnData.map(item =>
                        <Column field={item.esName} header={item.name}></Column>)
                    }
                </DataTable>
            </Card>
        </section>
    );
};

const columnData = [
    {name: "Tên dịch vụ", align: "left", esName: "serviceName"},
    {name: "Số lượng/m2", align: "left", esName: "quantityOrArea"},
    {name: "Giá tiền", align: "left", esName: "unitPriceconvert"},
    {name: "Tổng tiền", align: "left", esName: "totalPriceConvent"},
    {name: "Trạng thái", align: "left", esName: "paymentStatus"},
    {name: "Ngày bắt đầu", align: "left", esName: "paymentDate"},
];

export default ServicePaymentsDetail;
