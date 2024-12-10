import {Card} from "primereact/card";
import {useNavigate, useParams} from "react-router-dom";

import {InputText} from 'primereact/inputtext';
import {Dropdown} from "primereact/dropdown";
import {Editor} from "primereact/editor";
import {FileUpload} from "primereact/fileupload";
import {Calendar} from "primereact/calendar";
import {useEffect, useRef, useState} from "react";
import {NotificationType, NotificationTypeList, RoleList, statusType} from "./NewsConstant";
import {Button} from "primereact/button";
import {convertObjectToFormData, convertNewObj, getDetailImage} from "./BussinessNews";
import {GetBuildingsForNews, getDetail, NewsCreate, NewsUpdate} from "../../services/NewsService";
import Swal from "sweetalert2";
import {getRole} from "../../services/RoleService";

const FormNews = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const createValidTime = 10 * 60 * 1000;
    const fileUploadRef = useRef(null)
    const imageUploadConfig = {
        empty: (<p className="m-0">Kéo thả ảnh tại đây .</p>),
        size: 1000000
    }
    const [newsFormInput, setNewsFormInput] = useState({
        notificationType: NotificationType.MANAGEMENT,
        building: '',
        role: '',
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
    let [listRole, setListRole] = useState([])
    useEffect(() => {
        fetchBuildingData();
    }, []);
    const fetchBuildingData = async () => {
        try {
            const response = {
                building: await GetBuildingsForNews(),
                role: await getRole()
            };
            setListBuilding(response.building.data);
            const responseRole: [] = response.role.data;
            responseRole.unshift({id: '',  name: 'Tất cả'});
            setListRole(responseRole);
            if (id) {
                await handleUpdateData();
            }
        } catch (e) {

        }
    }
    const handleUpdateData = async () => {
        try {
            const response = await getDetail(id);
            const inputForm = response?.data;
            const imageConvert = await getDetailImage(inputForm.imgBaseId, 'file');
            customBase64Uploader([imageConvert])
            if (fileUploadRef.current) {
                fileUploadRef.current.setUploadedFiles([imageConvert]);
            }
            const applyTimeConvert = new Date(inputForm.time).toString() === "Invalid Date"
            ? new Date() : new Date(inputForm.time);
            setNewsFormInput({
                ...inputForm,
                building: inputForm.buildingId,
                role: inputForm.roleId,
                content: inputForm.shortContent,
                detailContent: inputForm.longContent,
                applyTime: applyTimeConvert,
                image: imageConvert

            });
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
    const submitForm = async (isDraft: boolean) => {
        if (!checkValidForm()) {
            const request = {
                ...newsFormInput,
                status: isDraft ? statusType.DRAFT : statusType.PENDING_APPROVAL
            }
            let formData = convertObjectToFormData(convertNewObj(request));
            try {
                const response = id ? await NewsUpdate(formData) : await NewsCreate(formData);
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Bản tin đã được tạo mới",
                        showConfirmButton: true,
                        confirmButtonText: "OK",
                        confirmButtonColor: "#3085d6",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/news');
                        }
                    })
                }
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
                return isInvalid = true;
            } else {
                setNullForm(f)
                isInvalid = false;
            }
        }
        return isInvalid;
    }
    const customBase64Uploader = async (event) => {
        // convert file to base64 encoded
        try {
            const file = event.files ? event.files[0] : event;
            const reader = new FileReader();
            let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
                const base64data = reader.result;
            };
            setNewsFormInput((prevState) => ({...prevState, image: file}))
        } catch (e) {
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
                                  options={listRole} optionLabel="name" optionValue="id"/>
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
                        <FileUpload ref={fileUploadRef} name="demo[]" accept="image/*" onSelect={customBase64Uploader}
                                    mode="advanced" auto maxFileSize={imageUploadConfig.size}
                                    emptyTemplate={imageUploadConfig.empty}/>
                    </div>
                </div>
                <h3>Đặt lịch</h3>
                <div className="col-12 grid">
                    <div className="field col-12">
                        <label form="firstname1">Thời gian áp dụng</label>
                        <Calendar showTime hourFormat="24" className="w-full" value={newsFormInput.applyTime} showIcon
                                  name="applyTime" onChange={handleChangeInput} dateFormat="dd/mm/yy"
                                  onBlur={(e) => {
                                      validateBlurRequired('applyTime');
                                      validateCurrentDate(e)
                                  }}/>
                        <small className="text-red-500">{errorForm.applyTime}</small>
                    </div>
                </div>
                <div className="col-12 grid justify-content-center">
                    <Button label="Quay lại" outlined onClick={() => navigate('/news')}></Button>
                    <Button label='Tạo mới' className="mx-2"
                            onClick={() => submitForm(false)}></Button>
                    <Button label={id ? 'Cập nhật' : 'Lưu nháp'} onClick={() => submitForm(true)}></Button>
                </div>
            </Card>
        </>
    );
}
export default FormNews;
