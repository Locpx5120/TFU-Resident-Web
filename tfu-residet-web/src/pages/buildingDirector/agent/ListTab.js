import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Card, TextField, TablePagination, MenuItem } from "@mui/material";
import TableCustom from "../../../components/Table";
import CustomModal from "../../../common/CustomModal";import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { Delete } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import {getRole} from "../../../services/RoleService";
import {createStaff, deleteStaff, getStaff, updateStaff} from "../../../services/staffService";


const ListTab = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchCriteria, setSearchCriteria] = useState({
    employeeName: "",
    department: "",
    email: "",
    phone: ""
  });
  const [roles, setRoles] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState({
    mode: 'add',
    title: 'Thêm nhân viên tòa nhà',
  });
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRole();
        setRoles(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRoles();
  }, [])

  //https://localhost:7082/api/staff/listEmployee
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getStaff();
        setEmployees(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchEmployees();
  }, [page, rowsPerPage, searchCriteria, reload]);

  const departments = roles.map(role => ({
    value: role.id,
    label: role.name,
  }));

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria(value);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchCriteria);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateAgent = () => {
    setModalMode({
        mode: 'add',
        title: 'Thêm nhân viên tòa nhà'
    });
    setSelectedEmployee(null);
    setModalOpen(true);
  };

  const handleEditAgent = (employee) => {
    setModalMode({
        mode: 'edit',
        title: 'Cập nhật nhân viên tòa nhà'
    });
    setSelectedEmployee(employee);
    setModalOpen(true);
  };

  const handleDelete = async (employee) => {
    try {
      const data = await deleteStaff(employee.id);
      if (data.success) {
        setReload(!reload);
        Swal.fire('Thành công', 'Đã xóa thành công!', 'success');
      } else {
        Swal.fire('Thất bại', 'Xóa thất bại!', 'error');
      }
    } catch (error) {
      Swal.fire('Thất bại', 'Xóa thất bại!', 'error');
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveEmployee = async (employeeData) => {    
    if (modalMode.mode === 'add') {
      try {
        const data = await createStaff(employeeData);
        if (data.success) {
          Swal.fire('Thành công', 'Đã thêm thành công!', 'success');
        } else {
          Swal.fire('Thất bại', 'Thêm thất bại!', 'error');
        }
      } catch (error) {
        Swal.fire('Thất bại', 'Thêm thất bại!', 'error');
      }
    } else {
      console.log(employeeData, selectedEmployee);
      
      try {
        const data = await updateStaff({
            staffId: selectedEmployee.id,
            roleId: employeeData.roleId,
          });
        if (data.success) {
          Swal.fire('Thành công', 'Đã cập nhật thành công!', 'success');
        } else {
          Swal.fire('Thất bại', 'Cập nhật thất bại!', 'error');
        }
      } catch (error) {
        Swal.fire('Thất bại', 'Cập nhật thất bại!', 'error');
      }
    }
    setReload(!reload);
  };

  const employeeDatas = useMemo(() => {
    return employees;
  },[employees])

  const modalFields = [
    <TextField
      select
      label="Bộ phận"
      name="roleId"
    >
      {departments.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>,
    <TextField label="Email" name="email" disabled={modalMode.mode === 'edit'} />,
  ];

  const rows = employeeDatas.map((employee) => ({
    ...employee,
    action: (
      <>
          <Button onClick={() => handleEditAgent(employee)}>
            <EditIcon />
          </Button>
          <Button onClick={() => handleDelete(employee)}>
            <Delete />
          </Button>
      </>
    ),
  }));
  
  return (
    <section>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: 'flex-end',
          mb: 2
        }}
      >
        <TextField
          size="small"
          label="Tên nhân viên"
          name="employeeName"
          variant="outlined"
          value={searchCriteria.employeeName}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1, maxWidth: "200px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ height: "40px" }}
        >
          Tìm kiếm
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleCreateAgent}
          sx={{ height: "40px" }}
        >
          Thêm thành viên
        </Button>
      </Box>
      <Card sx={{ maxHeight: "700px" }}>
        <TableCustom 
          columns={columnData} 
          rows={rows} 
          onEdit={handleEditAgent}
          onRowClick={() => {}}
        />
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <CustomModal
        open={modalOpen}
        handleClose={handleCloseModal}
        employee={selectedEmployee}
        handleSave={handleSaveEmployee}
        mode={modalMode.mode}
        title={modalMode.title}
        fields={modalFields}
      />
    </section>
  );
};

const columnData = [
  { name: "Tên nhân viên", align: "left", esName: "fullName" },
  { name: "Bộ phận", align: "left", esName: "department" },
  { name: "Email", align: "left", esName: "email" },
  { name: "Điện thoại", align: "left", esName: "phone" },
  { name: "Ngày thuê", align: "left", esName: "hireDate" },
  { name: "Tùy chọn", align: "left", esName: "action" },
];

export default ListTab;