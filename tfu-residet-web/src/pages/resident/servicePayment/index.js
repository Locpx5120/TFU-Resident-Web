import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { paymentSummary } from "../../../services/roomService";

const ServicePayments = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [services, setServices] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await paymentSummary(rowsPerPage, page);
        setServices(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRooms();
  }, [page, rowsPerPage, reload]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelecteds = services?.data
        .filter((n) => n.paymentStatus !== "Đã thanh toán")
        .map((n) => n.apartmentId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleSelect = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const paginatedRows = useMemo(() => {
    if (!services?.data) return [];
    return services.data;
  }, [page, rowsPerPage, services]);
  const handleDetailClick = (id, status, year, month) => {
    navigate(`/thanh-toan-dich-vu/${id}/${status}/${year}/${month}`);
  };

  return (
    <Box className="content">
      <Typography variant="h6">Danh sách thanh toán dịch vụ</Typography>
      <Table>
        <TableHead>
          <TableRow>
            {/*<TableCell align="left">*/}
            {/*  <Checkbox*/}
            {/*    indeterminate={*/}
            {/*      selected.length > 0 &&*/}
            {/*      selected.length <*/}
            {/*        services?.data?.filter(*/}
            {/*          (n) => n.paymentStatus !== "Đã thanh toán"*/}
            {/*        ).length*/}
            {/*    }*/}
            {/*    checked={*/}
            {/*      services?.data?.filter(*/}
            {/*        (n) => n.paymentStatus !== "Đã thanh toán"*/}
            {/*      ).length > 0 &&*/}
            {/*      selected.length ===*/}
            {/*        services?.data?.filter(*/}
            {/*          (n) => n.paymentStatus !== "Đã thanh toán"*/}
            {/*        ).length*/}
            {/*    }*/}
            {/*    onChange={handleSelectAll}*/}
            {/*  />{" "}*/}
            {/*</TableCell>*/}
            <TableCell>STT</TableCell>
            <TableCell>Toà nhà</TableCell>
            <TableCell>Căn hộ</TableCell>
            <TableCell>Tổng dịch vụ</TableCell>
            <TableCell>Tháng</TableCell>
            <TableCell>Năm</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell>Xem chi tiết</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRows.map((service, index) => (
            <TableRow key={service.apartmentId}>
              {/*<TableCell>*/}
              {/*  {service.paymentStatus !== "Đã thanh toán" && (*/}
              {/*    <Checkbox*/}
              {/*      checked={selected.indexOf(service.apartmentId) !== -1}*/}
              {/*      onChange={() => handleSelect(service.apartmentId)}*/}
              {/*    />*/}
              {/*  )}*/}
              {/*</TableCell>*/}
              <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
            <TableCell>{service.buildingName}</TableCell>
              <TableCell>{service.roomNumber}</TableCell>
              <TableCell>{service.totalServices}</TableCell>
              <TableCell>{service.month}</TableCell>
              <TableCell>{service.year}</TableCell>
              <TableCell>{service.paymentStatus}</TableCell>
              <TableCell>
                <Button
                  style={{ fontSize: 12, textTransform: "lowercase" }}
                  variant="contained"
                  color="primary"
                  onClick={() => handleDetailClick(service.apartmentId, service.paymentStatus, service.year ,service.month)}
                >
                  Xem chi tiết
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={services.totalRecords}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          if (selected.length > 0) {
            const selectedIds = selected.join("&");
            navigate(`/thanh-toan-dich-vu-hoa-don/${selectedIds}`);
          } else {
            Swal.fire({
              icon: "warning",
              title: "Chưa chọn dịch vụ nào!",
              text: "Vui lòng chọn ít nhất một dịch vụ để thanh toán.",
            });
          }
        }}
      >
        Thanh toán
      </Button>
    </Box>
  );
};

export default ServicePayments;
