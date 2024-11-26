import React, { useState, useEffect, useMemo } from 'react';
import {
    Box,
    Button,
    Card,
    TablePagination,
    MenuItem,
    Select,
    InputLabel,
    FormControl
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import TableCustom from '../../../components/Table';
import { getSummary } from "../../../services/roomService";
import { GetBuildingsByUser, getApartmentByBuilding } from "../../../services/buildingService";

const ServiceManage = () => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [services, setServices] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [apartments, setApartments] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState("");
    const [selectedApartment, setSelectedApartment] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const data = await getSummary(rowsPerPage, page);
                setServices(data.data);
                console.log(data.data)
            } catch (error) {

    useEffect(() => {
        if (!selectedBuilding) return;
        const fetchApartments = async () => {
            const res = await getApartmentByBuilding(selectedBuilding);
            setApartments(res?.data || []);
        };
        fetchApartments();
    }, [selectedBuilding]);

    useEffect(() => {
        const fetchRooms = async () => {
            const data = await getSummary(rowsPerPage, page);
            setServices(data?.data?.data || []);
        };
        fetchRooms();
    }, [page, rowsPerPage]);

    const filteredRows = useMemo(() => {
        return (services.length > 0 ? services : [])
            ?.filter(service =>
                (!selectedBuilding || service.buildingId === selectedBuilding) &&
                (!selectedApartment || service.apartmentId === selectedApartment)
            )
            ?.map((item, index) => ({
                STT: index + 1,
                toaNha: item.buildingName,
                canHo: item.roomNumber,
                tongDichVu: item.totalServices,
                chiTiet: <Button variant="contained" onClick={() => navigate(`/quan-ly-dich-vu/${item.apartmentId}`)}>Chi tiết</Button>,
                action: <Button variant="contained" onClick={() => navigate(`/gui-don`)}>Thêm dịch vụ</Button>
            }));
    }, [services, selectedBuilding, selectedApartment]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleResetFilters = () => {
        setSelectedBuilding("");
        setSelectedApartment("");
    };

    return (
        <section className="content service">
            <Typography sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontWeight: 'bold',
                margin: '10px 0',
                fontSize: '22px',
            }}>
               Danh sách dịch vụ căn hộ
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label=""
                        color="success"
                        placeholder="Tên"
                        sx={{
                            "#outlined-multiline-flexible": {
                                padding: "7px !important",
                            },
                        }}
                    >
                        {buildings.map((building) => (
                            <MenuItem key={building.id} value={building.id}>
                                {building.buildingName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                <FormControl sx={{ minWidth: 150 }} disabled={!selectedBuilding}>
                    <InputLabel>Căn hộ</InputLabel>
                    <Select
                        value={selectedApartment}
                        label="Căn hộ"
                        onChange={(e) => setSelectedApartment(e.target.value)}
                    >
                        {apartments.map((apartment) => (
                            <MenuItem key={apartment.id} value={apartment.id}>
                                {apartment.roomNumber}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button variant="outlined" color="primary" onClick={handleResetFilters}>
                    Reset
                </Button>
            </Box>

            <Card sx={{ maxHeight: "800px" }}>
                <TableCustom
                    columns={columnData}
                    rows={filteredRows}
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                />
                <TablePagination
                    component="div"
                    count={filteredRows.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Card>
        </section>
    );
};

const columnData = [
    { name: "STT", align: "left", esName: "STT", sortable: true },
    { name: "Tòa nhà", align: "left", esName: "toaNha", sortable: true },
    { name: "Căn hộ", align: "left", esName: "canHo", sortable: true },
    { name: "Tổng dịch vụ", align: "left", esName: "tongDichVu" },
    { name: "Chi tiết", align: "left", esName: "chiTiet" },
    { name: "Tùy chọn", align: "left", esName: "action" },
];

export default ServiceManage;
