import {Card} from "primereact/card";
import {useNavigate} from "react-router-dom";

import {InputText} from 'primereact/inputtext';
import {Dropdown} from "primereact/dropdown";
import {Editor} from "primereact/editor";
import {FileUpload} from "primereact/fileupload";
import {Calendar} from "primereact/calendar";
import {useEffect, useState} from "react";
import {GetBuildings, GetBuildingsByUser} from "../../services/buildingService";
import {NotificationType, NotificationTypeList, RoleList} from "./NewsConstant";
import {Button} from "primereact/button";
import convertObjectToFormData from "./BussinessNews";
import {NewsCreate} from "../../services/NewsService";

const FormNews = () => {
    const navigate = useNavigate();
    const params = navigate.params;
    const imageUploadConfig = {
        empty: (<p className="m-0">Kéo thả ảnh tại đây .</p>),
        size: 1000000
    }
    const [newsFormInput, setNewsFormInput] = useState({
        notificationType: NotificationType.MANAGEMENT,
        building: '',
        role: 'ALL',
        title: '',
        content: '',
        detailContent: '',
        // image: '',
        // applyDate: '',
        applyTime: '',
    });
    const [errorForm, setErrorForm] = useState({
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
        approvalBy: ''
    });
    const [listBuilding, setListBuilding] = useState([]);

    useEffect(() => {
        fetchBuildingData();
    }, []);
    const fetchBuildingData = async () => {
        try {
            const data = await GetBuildingsByUser();
            setListBuilding(data.data);
        } catch (e) {

        }
    }
    const handleChangeInput = (event) => {
        const {name, value} = event?.target;
        validateInputRequired(event);
        setNewsFormInput((prevState) => ({...prevState, [name]: value}));
    }
    const handleQuillChange = (event) => {
        const {textValue, htmlValue} = event;
        setNewsFormInput((prevState) => ({...prevState, detailContent: htmlValue}));
        if (!textValue || textValue.length === 0 || !htmlValue
        ) {
            setErrorForm((prevState) => ({
                ...prevState,
                detailContent: 'Không được để trống'
            }))
        } else {
            setNullForm("detailContent")
        }
    }
    const validateBlurRequired = (name) => {
        if (!newsFormInput[name] || newsFormInput[name] === "") {
            setErrorForm((prevState) => ({
                ...prevState,
                [name]: 'Không được để trống'
            }))
        } else {
            setNullForm(name)
        }
    }
    const validateInputRequired = (e) => {
        const {name, value} = e.target;
        if (!value || value.length === 0) {
            setErrorForm((prevState) => ({
                ...prevState, [name]: "Không được để trống"
            }))
        } else {
            setNullForm(name)
        }
    }
    const setNullForm = (name) => {
        setErrorForm((prevState) => ({
            ...prevState,
            [name]: ''
        }))
    }
    const submitForm = () => {
        // console.log(checkValidForm());
        if (!checkValidForm()) {
            let formData = convertObjectToFormData(newsFormInput);
            try {
                const response = NewsCreate(formData);
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        }
    }
    const checkValidForm = () => {
        const field = Object.keys(newsFormInput);
        let isInvalid = false;
        for (const f of field) {
            if (!newsFormInput[f] || newsFormInput[f] === '') {
                setErrorForm((prevState) => ({
                    ...prevState,
                    [f]: 'Không được để trống'
                }))
                isInvalid = true;
                // console.log(f)
            } else {
                isInvalid = false;
            }
        }
        return isInvalid;
    }
    return (
        <>
            <Card className="content p-0" title={params ? 'Sửa bản tin' : ' Tạo bản tin'}>
                <h3>Cài đặt bản tin</h3>
                <div className="col-12 grid">
                    <div className="field col-4">
                        <label form="firstname1">Loại thông báo</label>
                        <Dropdown value={newsFormInput.notificationType} className="w-full"
                                  options={NotificationTypeList} name="notificationType" onChange={handleChangeInput}/>
                    </div>
                    <div className="field col-4">
                        <label form="firstname1">Toà nhà</label>
                        <Dropdown className="w-full" value={newsFormInput.building} name="building"
                                  onBlur={(event) => validateBlurRequired(event.target.name)}
                                  onChange={handleChangeInput} options={listBuilding} optionValue="id"
                                  optionLabel="buildingName"/>
                        <small className="text-red-500">{errorForm.building}</small>
                    </div>
                    <div className="field col-4">
                        <label form="firstname1">Role</label>
                        <Dropdown className="w-full" value={newsFormInput.role} name="role" onChange={handleChangeInput}
                                  options={RoleList}/>
                    </div>
                </div>
                <h3>Nội dung bản tin</h3>
                <div className="col-12 grid">
                    <div className="field col-6">
                        <label form="firstname1">Tiêu đề</label>
                        <InputText className="w-full" name="title" value={newsFormInput.title}
                                   onChange={handleChangeInput}/>
                        <small className="text-red-500">{errorForm.title}</small>

                    </div>
                    <div className="field col-6">
                        <label form="firstname1">Nội dung rút gọn</label>
                        <InputText className="w-full" name="content" value={newsFormInput.content}
                                   onChange={handleChangeInput}/>
                        <small className="text-red-500">{errorForm.content}</small>
                    </div>
                    <div className="field col-12">
                        <label form="firstname1">Nội dung chi tiết</label>
                        <Editor className="w-full h-10rem" value={newsFormInput.detailContent} name="detailContent"
                                onTextChange={handleQuillChange}/>
                        <small className="text-red-500">{errorForm.detailContent}</small>
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
                        <Calendar showTime hourFormat="24" className="w-full" value={newsFormInput.applyTime} showIcon
                                  name="applyTime" onChange={handleChangeInput}
                                  onBlur={() => validateBlurRequired('applyTime')}/>
                        <small className="text-red-500">{errorForm.applyTime}</small>
                    </div>
                </div>
                <div className="col-12 grid justify-content-center">
                    <Button label="Quay lại" className="mr-2" outlined onClick={() => navigate('/news')}></Button>
                    <Button label={params ? 'Cập nhật' : 'Tạo mới'} onClick={submitForm}></Button>
                </div>
            </Card>
        </>
    );
}
export default FormNews;
