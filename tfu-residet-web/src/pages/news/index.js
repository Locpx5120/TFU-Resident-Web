import {Card} from 'primereact/card';
import {useState} from "react";
import {Box} from "@mui/material";
import {InputText} from "primereact/inputtext";
import {Dropdown} from 'primereact/dropdown';
import {NotificationTypeList, statusTypeList} from "./NewsConstant";
import {Calendar} from "primereact/calendar";

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

const News = () => {
    const [filterNews, setFilterNews] = useState({
        title: '',
        notificationType: '',
        applyDate: '',
        status: ''
    });
    const [listNews, setListNews] = useState([]);
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
    return (
        <Box className="content">
            <Card title="Quản lý bản tin">
                <InputText value={filterNews.title} name="title" onChange={handleChange} className="mx-2"/>
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
            <Card title="Danh sách bản tin">
                <DataTable value={listNews} tableStyle={{minWidth: '50rem'}}>
                    <Column field="code" header="Code"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="category" header="Category"></Column>
                    <Column field="quantity" header="Quantity"></Column>
                </DataTable>
            </Card>
        </Box>

    );
}
export default News;