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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { addMemberInApartment, deleteMemberResident, deleteResident, getMemberInApartment, updateMemberResident } from "../../../services/residentService";
import { themThanhVien } from "../../../constants";

const DetailHouseHoldResident = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roomNumber = queryParams.get("roomNumber");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [reload, setReload] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [agents, setAgents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState({
    mode: 'add',
    title: `Thêm thành viên căn hộ: ${roomNumber || 0}`,
  });
  const [selectedMember, setSelectedMember] = useState(null);
 
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        if(!id) {
          setAgents([]);
          return;
        }
        const response = await getMemberInApartment(id);
        const data = response;
        setAgents(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAgents();
  }, [reload, page, rowsPerPage, id]);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchCriteria(value);
  };
  const handleSearch = async () => {
    const data = await getMemberInApartment(id, searchCriteria);
    setAgents(data);
  };

  const handleRefresh = async () => {
    const data = await getMemberInApartment(id);
    setAgents(data);
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
        title: `Thêm thành viên căn hộ`
    });
    setSelectedMember(null);
    setModalOpen(true);
  };

  const handleEditMember = (member) => {
    setModalMode({
        mode: 'edit',
        title: `Cập nhật thông tin thành viên căn hộ`
    });
    setSelectedMember(member);
    setModalOpen(true);
  };

  const handleDeleteMember = async(member) => {
    try {
      const response = await deleteMemberResident(member.id);
      if (response.success) {
        Swal.fire('Thành công', 'Đã xóa thành công!', 'success');
      } else {
        Swal.fire('Thất bại', 'Xóa thất bại!', 'error');
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
      
      try {
        const response = await addMemberInApartment({
            phoneNumber: memberData.phoneNumber,
            memberName: memberData.memberName,
            email: memberData.email,
            apartmentId: id,
          });
        if (response.success) {
          Swal.fire('Thành công', 'Đã thêm thành công!', 'success');
        } else {
          Swal.fire('Thất bại', 'Thêm thất bại!', 'error');
        }
      } catch (error) {
        Swal.fire('Thất bại', 'Thêm thất bại!', 'error');
        console.error('Error fetching projects:', error);
      }
    } 
    else {
      try {
        const response = await updateMemberResident({
            phone: memberData.phoneNumber,
            name: memberData.memberName,
            email: memberData.email,
            id: memberData.id
          });
        if (response.success) {
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
    <TextField fullWidth label="Tên thành viên" name="memberName" />,
    <TextField fullWidth label="Điện thoại" name="phoneNumber" />,
    <TextField fullWidth label="Email" name="email" />,
  ];

  const columnData = [
    { name: "STT", align: "left", esName: "stt" },
    { name: "Tên thành viên", align: "left", esName: "memberName" },
    // { name: "Quyền", align: "left", esName: "role" },
    { name: "Điện thoại", align: "left", esName: "phoneNumber" },
    { name: "Email", align: "left", esName: "email" },
    { name: "Tùy chọn", align: "left", esName: "action" }
  ];

  const data = useMemo(() => agents?.data || [], [agents]);

  const fakeRows = data.map((item) => (
    { 
      ...item,
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
       Danh sách thành viên trong căn hộ {roomNumber}
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
          color="primary"
          onClick={handleSearch}
          sx={{ height: "40px" }}
        >
          Tìm kiếm
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={handleRefresh}
          sx={{ height: "40px" }}
        >
          Làm mới
        </Button>
        {/* <Button
          variant="contained"
          color="success"
          onClick={handleAddMember}
          sx={{ height: "40px" }}
        >
          Thêm thành viên
        </Button> */}
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate('/gui-don?agentType='+themThanhVien)}
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

export default DetailHouseHoldResident;