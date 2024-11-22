import {useEffect, useState} from "react";
import {GetBuildings, viewManager} from "../../services/buildingService";
import Swal from "sweetalert2";
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";

const initialAdmin = {
    name: '',
    projectId: '',
    buildingId: '',
    phone: '',
    email: ''
}
const FormAdministrator = ({isOpen, onClose, isUpdate, item}) => {
    const [buildings, setBuilding] = useState([]);
    const [projects, setProject] = useState([]);
    const [adminEdit, setAdminEdit] = useState();
    const [admin, setAdmin] = useState(initialAdmin)
    useEffect(() => {
        fetchBuilding();
        fetchProject();
        setFormInit();
    }, [ isUpdate, item]);
    const setFormInit = () => {
        if (isUpdate) {
        setAdmin({name: item.name, projectsId: item.project, buildingId: item.building, phone: item.phone, email: item.email })
        }else {
            setAdmin(initialAdmin)
        }
    }
    const fetchBuilding = async () => {
        try {
            const response = await GetBuildings();
            setBuilding(response.data);
        } catch (e) {
            Swal.fire('Lỗi', 'Lấy danh sách toà nhà thất bại', 'error');

        }
    }
    const fetchProject = async () => {
        try {
            const response = await viewManager("projects");
            setProject(response.data)
        } catch (e) {
            Swal.fire('Lỗi', 'Lấy danh sách dự án thất bại', 'error');

        }
    }
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setAdmin((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data Submitted:', admin);
        // Add form submission logic here (e.g., send to API)
        if (isUpdate) {
            update();
        }else {
            create();
        }
    };
    const create = async () => {
        try {
            console.log('create');
            onClose();
        }catch (e) {

        }
    }
    const update = async () => {
        try {
            console.log('update')
            onClose();
        }catch (e) {

        }
    }
    return (
        <>
            <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>Thêm quản trị viên</DialogTitle>
                <div style={{padding: '1rem'}}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Tên thành viên "
                            type="text"
                            fullWidth
                            variant="outlined"
                            name="name"
                            value={admin.name}
                            onChange={handleInputChange}
                            required
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Dự án</InputLabel>
                            <Select
                                name="projectId"
                                value={admin.projectId}
                                onChange={handleInputChange}
                                // required
                            >
                                {projects.map((project) => (
                                    <MenuItem key={project.id} value={project.id}>
                                        {project.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Toà nhà </InputLabel>
                            <Select
                                name="buildingId"
                                value={admin.buildingId}
                                onChange={handleInputChange}
                                required
                            >
                                {buildings.map((building) => (
                                    <MenuItem key={building.id} value={building.id}>
                                        {building.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            autoFocus
                            name="phone"
                            margin="dense"
                            label="Số điện thoại"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={admin.phone}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="email"
                            label="Email"
                            type="text"
                            fullWidth
                            value={admin.email}
                            variant="outlined"
                            onChange={handleInputChange}
                            required
                        />
                        <DialogActions>
                            <Button onClick={onClose}>Hủy</Button>
                            <Button type="submit" variant="contained" color="primary">
                                Thêm
                            </Button>
                        </DialogActions>
                    </form>

                </div>

            </Dialog>
        </>
    );
}
export default FormAdministrator;

