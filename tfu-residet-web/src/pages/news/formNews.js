import {Card} from "primereact/card";
import {useNavigate, useParams} from "react-router-dom";

import {InputText} from 'primereact/inputtext';
import {Dropdown} from "primereact/dropdown";
import {Editor} from "primereact/editor";
import {FileUpload} from "primereact/fileupload";
import {Calendar} from "primereact/calendar";
import {useEffect, useState} from "react";
import {GetBuildingsByUser} from "../../services/buildingService";
import {NotificationType, NotificationTypeList, RoleList, statusType} from "./NewsConstant";
import {Button} from "primereact/button";
import {convertObjectToFormData, convertNewObj} from "./BussinessNews";
import {getDetail, NewsCreate} from "../../services/NewsService";
import Swal from "sweetalert2";

const FormNews = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const createValidTime = 10 * 60 * 1000;

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
            if (id) {
                await handleUpdateData();
            }
        } catch (e) {

        }
    }
    const handleUpdateData = async () => {
        try {
            const response = await getDetail(id);
            console.log(response)
            setNewsFormInput(response?.data);
        } catch (e) {
            Swal.fire('Lỗi', 'Không lấy được thông tin bản tin ', 'error');
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
    const validateCurrentDate = (event) => {
        const {name, value} = event.target;
        if (new Date(value).getTime() - new Date().getTime() < createValidTime) {
            setErrorForm((prevState) => ({
                ...prevState,
                [name]: 'Thời gian tối thiểu là 10 phút'
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
    const submitForm = (isDraft: boolean) => {
        // console.log(checkValidForm());
        if (!checkValidForm()) {
            setNewsFormInput((prevState) => ({
                ...prevState,
                status: isDraft ? statusType.DRAFT : statusType.PENDING_APPROVAL
            }))
            let formData = convertObjectToFormData(convertNewObj(newsFormInput));
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
            } else if (f === 'applyTime' && new Date(newsFormInput['applyTime']).getTime() - new Date().getTime() < createValidTime) {
                setErrorForm((prevState) => ({
                    ...prevState,
                    applyTime: 'Thời gian tối thiểu là 10 phút'
                }))
                isInvalid = true;
            } else {
                setNullForm(f)
                isInvalid = false;
            }
        }
        return isInvalid;
    }
    const customBase64Uploader = async (event) => {
        // convert file to base64 encoded
      try  {
            const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            const base64data = reader.result;
        };
        setNewsFormInput((prevState) => ({...prevState, image: blob}))
      }catch (e) {
          console.log(e)
      }

    };
    return (
        <>
            <Card className="content p-0 h-auto" title={id ? 'Sửa bản tin' : ' Tạo bản tin'}>
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
                        <FileUpload name="demo[]" url="/api/upload" accept="image/*" onSelect={customBase64Uploader}
                                    mode="advanced" auto maxFileSize={imageUploadConfig.size}
                                    emptyTemplate={imageUploadConfig.empty}/>
                    </div>
                </div>
                <h3>Đặt lịch</h3>
                <div className="col-12 grid">
                    <div className="field col-12">
                        <label form="firstname1">Thời gian áp dụng</label>
                        <Calendar showTime hourFormat="24" className="w-full" value={newsFormInput.applyTime} showIcon
                                  name="applyTime" onChange={handleChangeInput}
                                  onBlur={(e) => {
                                      validateBlurRequired('applyTime');
                                      validateCurrentDate(e)
                                  }}/>
                        <small className="text-red-500">{errorForm.applyTime}</small>
                    </div>
                </div>
                <div className="col-12 grid justify-content-center">
                    <Button label="Quay lại" outlined onClick={() => navigate('/news')}></Button>
                    <Button label={id ? 'Cập nhật' : 'Tạo mới'} className="mx-2"
                            onClick={() => submitForm(false)}></Button>
                    <Button label="Lưu nháp" onClick={() => submitForm(true)}></Button>
                </div>
            </Card>
        </>
    );
}
export default FormNews;
