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
import Swal from "sweetalert2";
import { getMemberInApartment, updateMemberResident, deleteMemberResident } from "../../../services/residentService";

const DetailHouseHoldManager = () => {
  const { id } = useParams();
  const roomNumber = id.split("&")[1].split("=")[1];
  const apartmentId = id.split("&")[0];
  
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [reload, setReload] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [agents, setAgents] = useState({ data: [], totalCount: 0 });
    const navigate = useNavigate();
    const [modalMode, setModalMode] = useState({
        mode: 'edit',
        title: `Cập nhật thông tin thành viên căn hộ: ${roomNumber}`,
    });
    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const data = await getMemberInApartment(apartmentId);
                setAgents(data);
            } catch (error) {
                console.error("Error fetching agents:", error);
            }
        }
        fetchAgents();
    }, [apartmentId, reload]);

    const handleSearchChange = (event) => {
        setSearchCriteria(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // const handleEditMember = (member) => {
    //     setModalMode({
    //         mode: 'edit',
    //         title: `Cập nhật thông tin thành viên căn hộ: ${roomNumber}`
    //     });
    //     setSelectedMember(member);
    //     setModalOpen(true);
    // };

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
        try {
            const response = await updateMemberResident({
                phone: memberData.phoneNumber,
                name: memberData.memberName,
                email: memberData.email,
                id: memberData.id
            });
            if (response.success) {
                setReload(!reload);
                Swal.fire('Thành công', 'Đã cập nhật thành công!', 'success');
            } else {
                Swal.fire('Thất bại', 'Cập nhật thất bại!', 'error');
            }
        } catch (error) {
            Swal.fire('Thất bại', 'Cập nhật thất bại!', 'error');
            console.error('Error updating household:', error);
        }
    };

    const handleResetAttachment = () => {
        setSearchCriteria('');
    };

    const modalFields = [
        <TextField fullWidth label="Tên thành viên" name="memberName" />,
        <TextField fullWidth label="Điện thoại" name="phoneNumber" />,
        <TextField fullWidth label="Email" name="email" />,
    ];

    const columnData = [
        { name: "Tên thành viên", align: "left", esName: "memberName" },
        { name: "Điện thoại", align: "left", esName: "phoneNumber" },
        { name: "Email", align: "left", esName: "email" },
        { name: "Tùy chọn", align: "left", esName: "action" }
    ];

    const data = useMemo(() => agents?.data || [], [agents]);

    const rows = data
        .filter(item => item?.memberName?.toLowerCase()?.includes(searchCriteria?.toLowerCase()))
        .map((item) => ({
            id: item.id,
            memberName: item.memberName,
            phoneNumber: item.phoneNumber,
            email: item.email,
            action: (
                <Box>
                    {/* <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEditMember(item)}
                        sx={{ mr: 1 }}
                    >
                        Sửa
                    </Button> */}
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteMember(item)}
                    >
                        Xóa
                    </Button>
                </Box>
            )
        }));

    return (
        <section className="content">
            <Typography variant="h5" gutterBottom>
                <span style={{color: 'blue', cursor: 'pointer'}} onClick={() => navigate(-1)}>Trở về</span> Danh sách thành viên trong căn hộ {roomNumber} :
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: 'flex-end', mb: 2 }}>
                <TextField
                    size="small"
                    label="Tên thành viên"
                    variant="outlined"
                    value={searchCriteria}
                    onChange={handleSearchChange}
                    sx={{ flexGrow: 1, maxWidth: "200px" }}
                />
                <Button
                    variant="contained"
                    color="info"
                    onClick={handleResetAttachment}
                >
                    Bỏ lọc
                </Button>
            </Box>
            <Card sx={{ maxHeight: "700px" }}>
                <TableCustom
                    columns={columnData}
                    rows={rows}
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
                employee={selectedMember}
                handleSave={handleSaveMember}
                mode={modalMode.mode}
                title={modalMode.title}
                fields={modalFields}
            />
        </section>
    );
};

export default DetailHouseHoldManager;
