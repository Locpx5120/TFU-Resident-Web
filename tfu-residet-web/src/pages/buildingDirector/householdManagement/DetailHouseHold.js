import React, { useEffect, useMemo, useState } from "react";
import { 
  Box, 
  Button, 
  Card, 
  TextField, 
  TablePagination, 
  Typography 
} from "@mui/material";
import TableCustom from "../../../components/Table";
import CustomModal from "../../../common/CustomModal";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const DetailHouseHold = () => {
  const { id } = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [reload, setReload] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [buildings, setBuildings] = useState({});
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();
  const [modalMode, setModalMode] = useState({
    mode: 'add',
    title: `Thêm thành viên căn hộ: ${buildings?.roomNumber || 0}`,
  });
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await fetch(`https://localhost:7082/api/ceo/GetOwnerShipById/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            'content-type': 'application/json',
          }
        });
        const data = await response.json();
        setBuildings(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBuildings();
  }, []);
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch(`https://localhost:7082/api/ceo/GetByOwnershipId`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            ownershipId: id,
            pageSize: rowsPerPage,  
            pageNumber: page + 1,
            name: searchCriteria,
          })
        });
        const data = await response.json();
        setAgents(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAgents();
  }, [reload, page, rowsPerPage, id, searchCriteria]);
  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria(value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddMember = () => {
    setModalMode({
        mode: 'add',
        title: `Thêm thành viên căn hộ: ${buildings.roomNumber}`
    });
    setSelectedMember(null);
    setModalOpen(true);
  };

  const handleEditMember = (member) => {
    setModalMode({
        mode: 'edit',
        title: `Cập nhật thông tin thành viên căn hộ: ${buildings.roomNumber}`
    });
    setSelectedMember(member);
    setModalOpen(true);
  };

  const handleDeleteMember = async(member) => {
    console.log('Deleting member:', member);
    try {
      const response = await fetch("https://localhost:7082/api/ceo/deleteResident", {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          residentId: member.id
        })
      });
      if (data.error) {
        Swal.fire('Thất bại', 'Xóa thất bại!', 'error');
      } else {
        Swal.fire('Thành công', 'Đã xóa thành công!', 'success');
      }
    } catch (error) {
      Swal.fire('Thất bại', 'Xóa thất bại!', 'error');
    }
    setReload(!reload);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveMember = async (memberData) => {
    if (modalMode.mode === 'add') {
      console.log(memberData);
      
      try {
        const response = await fetch("https://localhost:7082/api/ceo/addResident", {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            Phone: memberData.phoneNumber,
            name: memberData.name,
            email: memberData.email,
            ownerShipId: buildings.id,
          })
        });
        const data = await response.json();
        if (data.success) {
          Swal.fire('Thành công', 'Đã thêm thành công!', 'success');
        } else {
          Swal.fire('Thất bại', 'Thêm thất bại!', 'error');
        }
      } catch (error) {
        Swal.fire('Thất bại', 'Thêm thất bại!', 'error');
        console.error('Error fetching projects:', error);
      }
    } else {
      try {
        const response = await fetch("https://localhost:7082/api/ceo/updateResident", {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            Phone: memberData.phoneNumber,
            name: memberData.name,
            email: memberData.email,
            id: selectedMember.id
          })
        });
        const data = await response.json();
        if (data.success) {
          Swal.fire('Thành công', 'Đã cập nhật thành công!', 'success');
        } else {
          Swal.fire('Thất bại', 'Cập nhật thất bại!', 'error');
        }
      } catch (error) {
        Swal.fire('Thất bại', 'Cập nhật thất bại!', 'error');
        console.error('Error updating household:', error);
      }
    }
    setReload(!reload);
    handleCloseModal();
  };

  const modalFields = [
    <TextField fullWidth label="Tên thành viên" name="name" />,
    <TextField fullWidth label="Điện thoại" name="phoneNumber" />,
    <TextField fullWidth label="Email" name="email" />,
  ];

  const columnData = [
    { name: "Tên thành viên", align: "left", esName: "name" },
    { name: "Điện thoại", align: "left", esName: "phoneNumber" },
    { name: "Email", align: "left", esName: "email" },
    { name: "Tùy chọn", align: "left", esName: "action" }
  ];

  const data = useMemo(() => agents?.residents || [], [agents]);

  const fakeRows = data.map((item) => (
    { 
      id: 1, 
      name: item.name, 
      phoneNumber: item.phone, 
      email: item.email,
      action: (
        <Box>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={() => handleEditMember(item)} 
            sx={{ mr: 1 }}
          >
            Sửa
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            onClick={() => handleDeleteMember(item)}
          >
            Xóa
          </Button>
        </Box>
      )
    }
  ));

  return (
    <section className="content">
      <Typography variant="h5" gutterBottom>
       <span style={{color: 'blue', cursor: 'pointer'}} onClick={() => navigate(-1)}>Trở về</span> Danh sách thành viên trong căn hộ: {buildings.roomNumber}
      </Typography>
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
          label="Tên thành viên"
          name="name"
          variant="outlined"
          value={searchCriteria.tenThanhVien}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1, maxWidth: "200px" }}
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleAddMember}
          sx={{ height: "40px" }}
        >
          Thêm thành viên
        </Button>
      </Box>
      <Card sx={{ maxHeight: "700px" }}>
        <TableCustom 
          columns={columnData} 
          rows={fakeRows}
          onRowClick={() => {}}
        />
        <TablePagination
          component="div"
          count={fakeRows.length}
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
        data={selectedMember}
        handleSave={handleSaveMember}
        mode={modalMode.mode}
        title={modalMode.title}
        fields={modalFields}
      />
    </section>
  );
};

export default DetailHouseHold;