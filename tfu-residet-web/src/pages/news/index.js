import {Card} from 'primereact/card';
import {useCallback, useEffect, useState} from "react";
import {Box} from "@mui/material";
import {InputText} from "primereact/inputtext";
import {Dropdown} from 'primereact/dropdown';
import {NotificationTypeList, statusTypeList} from "./NewsConstant";
import {Calendar} from "primereact/calendar";
import {Button} from 'primereact/button';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {useNavigate} from "react-router-dom";
import {GetNews} from "../../services/NewsService";
import Swal from "sweetalert2";
import {debounce as _debounce} from "lodash";
import {Paginator} from "primereact/paginator";

const News = () => {
    const initForm = {
        title: '',
        notificationType: '',
        applyDate: '',
        status: '',
        pageNumber: 1,
        pageSize: 10
    }
    const [filterNews, setFilterNews] = useState(initForm);
    const [listNews, setListNews] = useState([]);
    const navigate = useNavigate();
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [totalRecord, setTotalRecord] = useState(0)

    const onPageChange = (event) => {
        const {page, rows} = event;
        setFirst(event.first);
        setRows(event.rows);
        const updatedFilterNews = {
            ...filterNews,
            pageNumber: page + 1,
            pageSize: rows
        };
        fetchListNews(updatedFilterNews);
    };
    const handleChange = async (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        const updatedFilterNews = {
            ...filterNews,
            [name]: value,
        };
        setFilterNews(updatedFilterNews);
        await handleInput(updatedFilterNews);
    }
    const handleInput = useCallback(
        _debounce((updatedFilterNews) => {
            fetchListNews(updatedFilterNews);
        }, 1000),
        [] // Ensures it only creates once
    );
    const handleSelect = (event) => {
        event.preventDefault();
        const {name, value} = event?.target;
        const updatedFilterNews = {
            ...filterNews,
            [name]: value,
        };
        setFilterNews(updatedFilterNews);
        fetchListNews(updatedFilterNews);
    }
    useEffect(() => {
        fetchListNews(initForm);
    }, []);
    const fetchListNews = async (request) => {
        try {
            const response = await GetNews(request);
            setListNews(response.data.data);
            setTotalRecord(response.data.totalRecords);
        } catch (e) {
            Swal.fire('Lỗi', 'Không lấy được thông tin bản tin ', 'error');
        }
    }
    const resetForm = () => {
        setFilterNews(initForm);
        setFirst(0);
        setRows(10);
        fetchListNews(initForm);
    }
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
                <div className="col grid">
                    <div className="col-3">
                        <InputText value={filterNews.title} name="title" onChange={handleChange} className=""
                                   placeholder="Nhập tiêu đề"/>
                    </div>
                    <div className="col-3">
                        <Dropdown value={filterNews.notificationType} name="notificationType"
                                  onChange={(e) => handleSelect(e)}
                                  options={NotificationTypeList}
                                  placeholder="Chọn loại tin" className="w-full"
                        />
                    </div>
                    <div className="col-3">
                        <Calendar value={filterNews.applyDate} name="applyDate"
                                  onChange={handleChange} className=""
                                  dateFormat="dd/mm/yy" showIcon/></div>
                    <div className="col-2">
                        <Dropdown value={filterNews.status} name="status"
                                  onChange={(e) => handleSelect(e)}
                                  options={statusTypeList}
                                  placeholder="Chọn trạng thái" className=" w-full"
                        />
                    </div>
                    <div className="col-1">
                        <Button icon="pi pi-refresh" aria-label="Refresh" rounded outlined onClick={resetForm}/>
                    </div>
                </div>
            </Card>
            <Card title="Danh sách bản tin" className="mt-2">
                <Button label="Thêm bản tin" className="mb-2" onClick={() => navigate('/news/add')}></Button>
                <DataTable value={listNews} scrollable tableStyle={{minWidth: '100rem'}}
                           emptyMessage="Không có dữ liệu">
                    {columnTable.map((item) =>
                        <Column key={item.field} field={item.field} header={item.header}></Column>)}
                </DataTable>
                <div className="card">
                    {listNews?.length > 5 && <Paginator first={first} rows={rows} totalRecords={totalRecord}
                                                        rowsPerPageOptions={[10, 20, 30]}
                                                        onPageChange={onPageChange}/>}
                </div>
            </Card>
        </Box>

    );
}
export default News;