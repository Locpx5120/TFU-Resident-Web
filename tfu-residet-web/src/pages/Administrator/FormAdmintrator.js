import React, {useEffect, useState} from "react";
import {GetBuildings, viewManager} from "../../services/buildingService";
import Swal from "sweetalert2";
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    FormControl, FormControlLabel, FormLabel,
    InputLabel,
    MenuItem, Radio, RadioGroup,
    Select,
    TextField
} from "@mui/material";
import moment from "moment";
import {DatePicker} from "antd";
import {createAdmin, updateAdmin} from "../../services/AdminService";
import {updateUser} from "../../services/userService";

const initialAdmin = {
    name: '',
    dob: new Date(),
    gender: 'Male',
    phone: '',
    email: ''
}
const FormAdministrator = ({isOpen, onClose, isUpdate, item}) => {
    const [admin, setAdmin] = useState(initialAdmin)
    useEffect(() => {
        setFormInit();
    }, [isUpdate, item]);
    const setFormInit = () => {
        if (isUpdate) {
            setAdmin({
                name: item.userName,
                dob: item.dob,
                gender: item.genders,
                phone: item.phone,
                email: item.email
            })
        } else {
            setAdmin(initialAdmin)
        }
    }
    const handleInputChange = (event) => {
        const {name, value} = event?.target ?? event;
        if (!name && !value) {
            return
        }
        setAdmin((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    }
    // const handleChange = (index, field, value) => {
    //     console.log(alue)
    //    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // Add form submission logic here (e.g., send to API)
        if (isUpdate) {
            update();
        } else {
            create();
        }
    };
    const create = async () => {
        try {
            const response = await createAdmin(admin);
            if (response.code === 200) {
                Swal.fire(
                    'Đã thêm mới!',
                    'Quản trị viên đã được thêm mới.',
                    'success'
                );
            }
        } catch (e) {
            Swal.fire({
                icon: "error",
                title: "Có lỗi xảy ra!",
                text: "Không thể tạo mới quản trị viên",
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6",
            });
        }
        onClose();
    }
    const update = async () => {
        try {
            const response = await updateAdmin(admin);
            if (response.code === 200) {
                Swal.fire(
                    'Đã cập nhật!',
                    'Quản trị viên đã được cập nhật.',
                    'success'
                );
            }
        } catch (e) {
            Swal.fire({
                icon: "error",
                title: "Có lỗi xảy ra!",
                text: "Không thể cập nhật quản trị viên",
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6",
            });
        }
        onClose();
    }
    return (
        <>
            <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>{!isUpdate ? 'Thêm' : 'Sửa'} quản trị viên</DialogTitle>
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
                        <DatePicker
                            fullWidth
                            placeholder="Ngày sinh"
                            name="dob"
                            value={admin.dob ? moment(admin.dob) : null}
                            onChange={(date, dateString) => handleInputChange({name: 'dob', value: dateString})}
                            required
                            style={{width: '100%', margin: '8px 0', flex: '1 1 0'}}
                        />
                        <FormControl row>
                            <FormLabel id="demo-controlled-radio-buttons-group">Giới tính </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="gender"
                                value={admin.gender}
                                onChange={handleInputChange}
                            >
                                <FormControlLabel value="Male" control={<Radio/>} label="Nam"/>
                                <FormControlLabel value="Female" control={<Radio/>} label="Nữ"/>
                            </RadioGroup>
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
                                {!isUpdate ? 'Thêm' : 'Sửa'}
                            </Button>
                        </DialogActions>
                    </form>

                </div>

            </Dialog>
        </>
    );
}
export default FormAdministrator;

