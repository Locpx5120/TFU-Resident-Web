import {Card} from "primereact/card";
import {useNavigate} from "react-router-dom";

import {InputText} from 'primereact/inputtext';
import {Dropdown} from "primereact/dropdown";
import {Editor} from "primereact/editor";
import {FileUpload} from "primereact/fileupload";
import {Calendar} from "primereact/calendar";
import {useEffect, useState} from "react";
import {GetBuildings} from "../../services/buildingService";
import {statusTypeList} from "./NewsConstant";

const FormNews = () => {
    const navigate = useNavigate();
    const params = navigate.params;
    const imageUploadConfig = {
        empty: (<p className="m-0">Kéo thả ảnh tại đây .</p>),
        size: 1000000
    }
    const [newsFormInput, setNewsFormInput] = useState({
        notificationType: '',
        building: '',
        role: '',
        title: '',
        content: '',
        detailContent: '',
        image: '',
        applyDate: '',
        applyTime: '',
        createdBy: '',
        approvalBy: '',
        status: ''
    });
    const [listBuilding, setListBuilding] = useState([]);
    useEffect(() => {
        fetchBuildingData();
    }, []);
    const fetchBuildingData = async () => {
        try {
            const response = await GetBuildings();
            console.log(response)
        }catch (e){

        }
    }
    return (
        <>
            <Card className="content" title={params ? 'Sửa bản tin' : ' Tạo bản tin'}>
                <h3>Cài đặt bản tin</h3>
                <div className="col-12 grid">
                    <div className="field col-4">
                        <label form="firstname1">Loại thông báo</label>
                        <Dropdown className="w-full" options={statusTypeList}/>
                    </div>
                    <div className="field col-4">
                        <label form="firstname1">Toà nhà</label>
                        <Dropdown className="w-full"/>
                    </div>
                    <div className="field col-4">
                        <label form="firstname1">Role</label>
                        <Dropdown className="w-full"/>
                    </div>
                </div>
                <h3>Nội dung bản tin</h3>
                <div className="col-12 grid">
                    <div className="field col-6">
                        <label form="firstname1">Tiêu đề</label>
                        <InputText className="w-full"/>
                    </div>
                    <div className="field col-6">
                        <label form="firstname1">Nội dung rút gọn</label>
                        <InputText className="w-full"/>
                    </div>
                    <div className="field col-12">
                        <label form="firstname1">Nội dung chi tiết</label>
                        <Editor className="w-full h-10rem"/>
                    </div>
                    <div className="field col-12 mt-5">
                        <label form="firstname1">Ảnh minh hoạ</label>
                        <FileUpload name="demo[]" url={'/api/upload'} accept="image/*"
                                    maxFileSize={imageUploadConfig.size} emptyTemplate={imageUploadConfig.empty}/>
                    </div>
                </div>
                <h3>Đặt lịch</h3>
                <div className="col-12 grid">
                    <div className="field col-12">
                        <label form="firstname1">Thời gian áp dụng</label>
                        <Calendar showTime hourFormat="24" className="w-full" showIcon/>
                    </div>
                </div>
            </Card>
        </>
    );
}
export default FormNews;
