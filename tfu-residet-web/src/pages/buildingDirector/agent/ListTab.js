import React, { useEffect, useState } from "react";
import { Box, Button, Card, TextField, TablePagination, MenuItem } from "@mui/material";
import TableCustom from "../../../components/Table";
import CustomModal from "../../../common/CustomModal";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { Delete } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { getRole } from "../../../services/RoleService";
import { createStaff, deleteStaff, getStaff, updateStaff } from "../../../services/staffService";
import * as yup from 'yup'

// Validation functions
const validateFullName = (name) => /^[^\d]*$/.test(name);
const validatePhoneNumber = (phoneNumber) => /^\d+$/.test(phoneNumber);
const validateEmail = (email) => email.includes('@') && email.endsWith('.com') || email.endsWith('.vn');

const ListTab = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchCriteria, setSearchCriteria] = useState({
    fullName: "",
    department: "",
    email: "",
    phoneNumber: ""
  });
  const [roles, setRoles] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState({
    mode: 'add',
    title: 'Thêm nhân viên tòa nhà'
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
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    if (roles.length > 0 && !roles.some(role => role.name === "Bên thứ ba")) {
      setRoles((prevRoles) => [...prevRoles, { id: "third-party", name: "Bên thứ ba" }]);
    }
  }, [roles]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getStaff();
        setEmployees(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();
  }, [page, rowsPerPage, searchCriteria, reload]);

  useEffect(() => {
    const filtered = employees.filter((employee) =>
      (employee.fullName || "").toLowerCase().includes(searchCriteria.fullName.toLowerCase()) &&
      (searchCriteria.department === "" || employee.roleId === searchCriteria.department ||
        (searchCriteria.department === "third-party" && !roles.some((role) => role.id === employee.roleId)))
    );
    setFilteredEmployees(filtered);
  }, [employees, searchCriteria, roles]);

  const departments = roles.map((role) => ({
    value: role.id || `role-${role.name}`,
    label: role.name || "Unknown Role"
  }));


  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria((prevState) => ({
      ...prevState,
      [name]: value
    }));
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
    setSelectedEmployee({
      ...employee,
      name: employee.fullName,
      phoneNumber: employee.phoneNumber,
      isActive: true
    });
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
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveEmployee = async (employeeData) => {
    let updatedEmployeeData = { ...employeeData };

    if (modalMode.mode === 'add') {
      const validFullName = validateFullName(employeeData.fullName) ? employeeData.fullName : "N/A";
      const validPhoneNumber = validatePhoneNumber(employeeData.phoneNumber) ? employeeData.phoneNumber : "N/A";
      const validEmail = validateEmail(employeeData.email) ? employeeData.email : "N/A";

      updatedEmployeeData = {
        ...updatedEmployeeData,
        fullName: validFullName,
        phoneNumber: validPhoneNumber,
        email: validEmail,
        isActive: true,
        staffId: selectedEmployee?.id
      };

      try {
        const data = await createStaff(updatedEmployeeData);
        if (data.success) {
          Swal.fire('Thành công', 'Đã thêm thành công!', 'success');
        } else {
          Swal.fire('Thất bại', data.message, 'error');
        }
      } catch (error) {
        Swal.fire('Thất bại', 'Thêm thất bại!', 'error');
      }
    } else {
      updatedEmployeeData = {
        ...updatedEmployeeData,
        isActive: true,
        staffId: selectedEmployee?.id
      };

      try {
        const data = await updateStaff(updatedEmployeeData);
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

  const rows = filteredEmployees.map((employee) => {
    const validFullName = validateFullName(employee.fullName) ? employee.fullName : "N/A";
    const validPhoneNumber = validatePhoneNumber(employee.phoneNumber) ? employee.phoneNumber : "N/A";
    const validEmail = validateEmail(employee.email) ? employee.email : "N/A";

    return {
      ...employee,
      fullName: validFullName,
      roleName: roles.find((role) => role.id === employee.roleId)?.name || "Bên thứ ba",
      email: validEmail,
      phoneNumber: validPhoneNumber,
      hireDate: employee.hireDate ? new Date(employee.hireDate).toLocaleDateString() : "N/A",
      action: (
        <>
          <Button onClick={() => handleEditAgent(employee)}>
            <EditIcon />
          </Button>
          <Button onClick={() => handleDelete(employee)}>
            <Delete />
          </Button>
        </>
      )
    };
  });
  const schema = yup.object({
    roleId: yup.string().trim().required("Vui lòng chọn bộ phận"),
    email: yup.string().trim().required("Vui lòng nhập email").email("Email không hợp lệ"),
    name: yup.string().trim().required("Vui lòng nhập họ tên").matches(/^[^\d]*$/, "Họ tên không hợp lệ"),
    phoneNumber: yup.string()
      .trim()
      .required("Vui lòng nhập số điện thoại")
      .test("validPhone", "Số điện thoại không hợp lệ", (value) => {
        if(!value) return true;
        const vietnamPhoneNumberRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
        return vietnamPhoneNumberRegex.test(value);
      })
  });
  const modalFields = [
    <TextField
      key="roleId"
      select
      label="Bộ phận"
      name="roleId"
      defaultValue={selectedEmployee?.roleId || ''}
    >
      {departments.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>,
    <TextField key="email" label="Email" name="email" defaultValue={selectedEmployee?.email || ''} disabled={modalMode.mode === 'edit'} />,
    <TextField key="name" label="Họ và tên" name="name" defaultValue={selectedEmployee?.name || ''} />,
    <TextField key="phoneNumber" label="Số điện thoại" name="phoneNumber" defaultValue={selectedEmployee?.phoneNumber || ''} />
  ];

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
          name="fullName"
          variant="outlined"
          value={searchCriteria.fullName}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1, maxWidth: "200px" }}
        />
        <TextField
          select
          size="small"
          label="Bộ phận"
          name="department"
          variant="outlined"
          value={searchCriteria.department}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1, maxWidth: "200px" }}
        >
          <MenuItem value="">Tất cả</MenuItem>
          {departments.filter(x => x.label !== 'Bên thứ ba').map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
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
          onRowClick={() => { }}
        />
        <TablePagination
          component="div"
          count={filteredEmployees.length}
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
        validateSchema={schema}
      />
    </section>
  );
};

const columnData = [
  { name: "Tên nhân viên", align: "left", esName: "fullName" },
  { name: "Bộ phận", align: "left", esName: "roleName" },
  { name: "Email", align: "left", esName: "email" },
  { name: "Điện thoại", align: "left", esName: "phoneNumber" },
  { name: "Ngày thuê", align: "left", esName: "hireDate" },
  { name: "Tùy chọn", align: "left", esName: "action" },
];

export default ListTab;
