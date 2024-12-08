import {useEffect, useState} from "react";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {useNavigate, useParams} from "react-router-dom";
import {getDetail} from "../../services/NewsService";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import {mapNotificationName, mapNotificationTypeName} from "./BussinessNews";
import {statusType} from "./NewsConstant";

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
    useEffect(() => {
        fetchData(id)
    }, [id]);
    const fetchData = async (id) => {
        try {
            const response = await getDetail(id);
            setData(pipeData(response?.data))
        } catch (e) {
            Swal.fire('Lỗi', 'Không lấy được chi tiết bản tin ', 'error');

        }
    }
    const pipeData = (data) => {
        return {
            ...data,
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
            <Card className="content" header={header}>
                <div className="col-12">
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
                    <div className="grid my-5">
                        <div className="col-3">Ảnh minh hoạ</div>
                        <div className="col-9">{data.image}</div>
                    </div>
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
                        {data.status === statusType.DRAFT && <Button label="Từ chối" severity="danger"></Button>}
                        <Button label="Quay lại" outlined className="mx-3" onClick={() => navigate('/news')}></Button>
                         {data.status === statusType.DRAFT && <Button label="Duyệt" severity="primary"></Button>}
                    </div>
                </div>
            </Card>
        </>
    )
}
export default DetailNews;