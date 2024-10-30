import { Box, Button, Card, TablePagination, TextField } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import TableCustom from "../Table";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DeleteIcon from "@mui/icons-material/Delete";
import Cookies from "js-cookie";
import AddProject from "./AddProject";
import Swal from "sweetalert2";
import EditProject from "./EditProject";

const Project = () => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [data, setData] = useState([]);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const header ={
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
      "content-type": "application/json", 
    };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5045/api/project/viewManager", {
        headers: header,
        method: "POST",
        body: JSON.stringify({ name: "project"}),
      });
      console.log(response);
      
      const data = await response.json();
      setData(data.data);
    };
    fetchData();
  }, [page, rowsPerPage, isOpenCreate, isOpenEdit]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortColumn(column);
  };

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setIsOpenEdit(true);
  };

  const handleDeleteClick = (project) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Bạn không thể hoàn tác hành động này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý, xóa!",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteProject(project.id);
      }
    });
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const res = await fetch('http://localhost:5045/api/project/delete', {
        method: "POST",
        headers: header,
        body: JSON.stringify({ id: projectId }),
      });

      const result = await res.json();
      if (result.code === 200) {
        Swal.fire("Đã xóa!", "Dự án đã được xóa thành công.", "success");
      } else {
        Swal.fire("Lỗi!", result.message || "Không thể xóa dự án.", "error");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      Swal.fire("Lỗi!", "Không thể kết nối đến server.", "error");
    }
  };

  const handleEditProject = async (projectData) => {
    try {
      const res = await fetch('http://localhost:5045/api/project/update', {
        method: "POST",
        headers: header,
        body: JSON.stringify(projectData),
      });

      const result = await res.json();
      if (result.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Cập nhật thành công!",
          showConfirmButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
          timer: 1500,
        });
        setIsOpenEdit(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Có lỗi xảy ra!",
          text: result.message || "Không thể cập nhật project",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (error) {
      console.error("Error updating project:", error);
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra!",
        text: "Không thể kết nối đến server",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  const handleCreateProject = async (projectData) => {
    try {
      const res = await fetch("http://localhost:5045/api/project/create", {
        method: "POST",
        headers: header,
        body: JSON.stringify(projectData),
      });

      const result = await res.json();
      if (result.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Tạo mới thành công!",
          showConfirmButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
          timer: 1500,
        });
        setIsOpenCreate(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Có lỗi xảy ra!",
          text: result.message || "Không thể tạo mới project",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (error) {
      console.error("Error creating project:", error);
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra!",
        text: "Không thể kết nối đến server",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  const fakeRows = data.map((item) => ({
    maDuAn: item.id,
    tenDuAn: item.name,
    diaChi: item.address,
    hanhDong: (
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
        <AutoFixHighIcon
          onClick={() => handleEditClick(item)}
          style={{ cursor: "pointer" }}
        />
        <DeleteIcon
          onClick={() => handleDeleteClick(item)}
          style={{ cursor: "pointer", color: "red" }}
        />
      </Box>
    ),
  }));
  const sortedRows = useMemo(() => {
    if (!sortColumn) return fakeRows;

    return [...fakeRows].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn])
        return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn])
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [fakeRows, sortColumn, sortDirection]);

  const paginatedRows = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return sortedRows.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedRows, page, rowsPerPage]);

  return (
    <section className="content project">
      <AddProject
        open={isOpenCreate}
        onClose={() => setIsOpenCreate(false)}
        onSubmit={handleCreateProject}
      />
      <EditProject
        open={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        onSubmit={handleEditProject}
        projectData={selectedProject}
      />
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
          />
          <Button variant="outlined" color="success">
            Tìm kiếm
          </Button>
        </Box>
        <Button
          variant="contained"
          sx={{ background: "#2ca8a2" }}
          onClick={() => setIsOpenCreate(true)}
        >
          Thêm mới
        </Button>
      </Box>
      <Card sx={{ maxHeight: "800px", marginTop: "30px" }}>
        <TableCustom
          columns={columnData}
          rows={paginatedRows}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
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
    </section>
  );
};

const columnData = [
  // { name: "Mã dự án", align: "left", esName: "maDuAn", sortable: true },
  { name: "Tên dự án", align: "left", esName: "tenDuAn", sortable: true },
  { name: "Địa chỉ", align: "left", esName: "diaChi", sortable: true },
  { name: "Tòa nhà", align: "left", esName: "toaNha" },
  { name: "Căn hộ", align: "left", esName: "canHo" },
  { name: "Cư dân", align: "left", esName: "cuDan" },
  { name: "Hành động", align: "left", esName: "hanhDong" },
];

export default Project;
