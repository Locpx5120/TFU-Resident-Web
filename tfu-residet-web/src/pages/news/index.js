import {Card} from 'primereact/card';
import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {InputText} from "primereact/inputtext";
import {Dropdown} from 'primereact/dropdown';
import {NotificationTypeList, statusTypeList} from "./NewsConstant";
import {Calendar} from "primereact/calendar";
import {Button} from 'primereact/button';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {useNavigate} from "react-router-dom";

const News = () => {
    const [filterNews, setFilterNews] = useState({
        title: '',
        notificationType: '',
        applyDate: '',
        status: ''
    });
    const [listNews, setListNews] = useState([]);
    const navigate = useNavigate();
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFilterNews((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const handleSelect = (event) => {
        const {name, value} = event?.target;
        setFilterNews((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    useEffect(() => {
        setListNews([
            {
                building: '',
                notificationType: '',
                title: '',
                role: '',
                applyDate: '',
                createdBy: '',
                approvalBy: '',
                status: '',
            }
        ])
    }, []);
    const mapActionForData = (data: []) => {
        data.map((item) => ({
            ...item, action:
                (
                    <>
                        <Button label="Xoá" severity="danger"></Button>
                        <Button label="Chi tiết" severity="info"></Button>
                    </>
                )
        }))
    }
    const columnTable = [
        {field: 'index', header: 'STT'},
        {field: 'building', header: 'Toà nhà'},
        {field: 'notificationType', header: 'Loại thông báo'},
        {field: 'title', header: 'Tiêu đề'},
        {field: 'role', header: 'Chức vụ'},
        {field: 'applyDate', header: 'Ngày áp dụng'},
        {field: 'createdBy', header: 'Người tạo'},
        {field: 'approvalBy', header: 'Người duyệt'},
        {field: 'status', header: 'Trạng thái'},
        {field: 'action', header: 'Hành động '},
    ]
    return (
        <Box className="content">
            <Card title="Quản lý bản tin">
                <InputText value={filterNews.title} name="title" onChange={handleChange} className="mx-2" placeholder="Nhập tiêu đề"/>
                <Dropdown value={filterNews.notificationType} name="notificationType" onChange={(e) => handleSelect(e)}
                          options={NotificationTypeList}
                          placeholder="Chọn loại tin" width={75} className="mx-2"
                />
                <Calendar value={filterNews.applyDate} name="applyDate" className="mx-2" onChange={handleChange}
                          dateFormat="dd/mm/yy" showIcon/>
                <Dropdown value={filterNews.status} name="status" onChange={(e) => handleSelect(e)}
                          options={statusTypeList}
                          placeholder="Chọn trạng thái" width={75} className="mx-2"
                />
            </Card>
            <Card title="Danh sách bản tin" className="mt-2">
                <Button label="Thêm bản tin" className="mb-2" onClick={() => navigate('/news/add')}></Button>
                <DataTable value={listNews} scrollable tableStyle={{minWidth: '100rem'}}
                           emptyMessage="Không có dữ liệu">
                    {columnTable.map((item) =>
                        <Column key={item.field} field={item.field} header={item.header}></Column>)}
                </DataTable>
            </Card>
        </Box>

    );
}
export default News;