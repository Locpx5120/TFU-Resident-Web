import {useEffect, useState} from "react";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {useNavigate, useParams} from "react-router-dom";
import {actionNoti, getDetail} from "../../services/NewsService";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import {getDetailImage, mapNotificationName, mapNotificationTypeName} from "./BussinessNews";
import {statusType} from "./NewsConstant";
import Cookies from "js-cookie";

const DetailNews = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        building: '',
        role: '',
        notificationType: '',
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
    let [isValidRole, setInvalidRole] = useState(false);
    useEffect(() => {
        fetchData(id);
        setInvalidRole(Cookies.get('role') === 'BanQuanLy');
        console.log(isValidRole)
    }, [id, isValidRole]);
    const fetchData = async (id) => {
        try {
            const response = await getDetail(id);
            response.data.image = await getDetailImage(response?.data.imgBaseId, 'base64');
            isValidRole = Cookies.get('role') === 'BanQuanLy';
            setData(pipeData(response?.data))
            console.log(data)
        } catch (e) {
            Swal.fire('Lỗi', 'Không lấy được chi tiết bản tin ', 'error');

        }
    }

    const doActionNoti = async (isApprove) => {
        Swal.fire({
            icon: "question",
            title: `Bạn có muốn ${isApprove ? 'duyệt' : 'từ chối'} bản tin`,
            showConfirmButton: true,
            showDenyButton: true,
            confirmButtonText: "Đồng ý",
            denyButtonText: "Huỷ",
            confirmButtonColor: "#3085d6",
        }).then(async result => {
            if (result.isConfirmed) {
                await action(isApprove)
            }
        })
    }
    const action = async (isApprove) => {
        try {
            const response = await actionNoti(data.id, isApprove);
            console.log(response)
            if (response.success) {
                Swal.fire({
                    icon: "success",
                    title: `Bản tin đã được ${isApprove ? 'duyệt' : 'từ chối'} thành công`,
                    showConfirmButton: true,
                    confirmButtonText: "OK",
                    confirmButtonColor: "#3085d6",
                })
            }
            fetchData(data.id)
        } catch (e) {
            console.log(e)
              Swal.fire({
                    icon: "error",
                    title: `Có lỗi xảy ra`,
                    showConfirmButton: true,
                    confirmButtonText: "OK",
                    confirmButtonColor: "#3085d6",
                })
        }
    }
    const pipeData = (data) => {
        // const imageConvert = await getDetailImage(data.imgBaseId, 'base64');
        // // console.log(imageConvert);
        return {
            ...data,
            longContent: <div dangerouslySetInnerHTML={{__html: data?.longContent}}/>,
            statusName: mapNotificationTypeName(data.status),
            notificationName: mapNotificationName(data.notificationType),
            applyDate: dayjs(data.time).format('DD/MM/YYYY'),
            applyTime: dayjs(data.time).format('HH:mm:ss'),
        }
    }
    const header = (
        <p className="text-center">
            <h1>Chi tiết bản tin</h1>
        </p>
    );
    return (
        <>
            <Card className="content h-auto" header={header}>
                {data && <div className="col-12">
                    <div className="grid my-5">
                        <div className="col-3">Loại thông báo</div>
                        <div className="col-9">{data.notificationName}</div>
                    </div>
                    <div className="grid my-5">
                        <div className="col-3">Role</div>
                        <div className="col-9">{data.roleName}</div>
                    </div>
                    <div className="grid my-5">
                        <div className="col-3">Toà nhà</div>
                        <div className="col-9">{data.buildingName}</div>
                    </div>
                    <div className="grid my-5">
                        <div className="col-3">Tiêu đề</div>
                        <div className="col-9">{data.title}</div>
                    </div>
                    <div className="grid my-5">
                        <div className="col-3">Nội dung rút gọn</div>
                        <div className="col-9">{data.shortContent}</div>
                    </div>
                    <div className="grid my-5">
                        <div className="col-3">Nội dung chi tiết</div>
                        <div className="col-9">{data.longContent}</div>
                    </div>
                    {data.image && <div className="grid my-5">
                        <div className="col-3">Ảnh minh hoạ</div>
                        <div className="col-9">
                            <img src={data.image} alt="" height={200} width={200}/>
                        </div>
                    </div>}
                    <div className="grid my-5">
                        <div className="col-3">Ngày áp dụng</div>
                        <div className="col-9">{data.applyDate}</div>
                    </div>
                    <div className="grid my-5">
                        <div className="col-3">Giờ áp dụng</div>
                        <div className="col-9">{data.applyTime}</div>
                    </div>
                    <div className="grid my-5">
                        <div className="col-3">Người tạo</div>
                        <div className="col-9">{data.createdBy}</div>
                    </div>
                    <div className="grid my-5">
                        <div className="col-3">Người duyệt</div>
                        <div className="col-9">{data.approvalBy}</div>
                    </div>
                    <div className="grid my-5">
                        <div className="col-3">Trạng thái</div>
                        <div className="col-9">{data.statusName}</div>
                    </div>
                    <div className="grid col justify-content-center">
                        {(data.status === statusType.PENDING_APPROVAL && isValidRole) &&
                            <Button label="Từ chối" severity="danger" onClick={() => doActionNoti(false)}></Button>}
                        <Button label="Quay lại" outlined className="mx-3" onClick={() => navigate('/news')}></Button>
                        {(data.status === statusType.PENDING_APPROVAL && isValidRole) &&
                            <Button label="Duyệt" severity="primary" onClick={() => doActionNoti(true)}></Button>}
                    </div>
                </div>}
            </Card>
        </>
    )
}
export default DetailNews;