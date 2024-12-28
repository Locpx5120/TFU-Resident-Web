import {Card} from "primereact/card";
import PayAndTransfer from "./PayAndTransfer";
import RecentTransaction from "./RecentTransaction";
import PostNews from "../news/PostNews";
import {useState} from "react";

const DashboardInvestor = () => {
    const [transactionHistories, setTransactionHistories] = useState([]);
    const [type, setType] = useState("A");
    // Hàm nhận dữ liệu từ component con
    const handleReceiveData = (data) => {
        data = data.map((items, index) => ({
                ...items,
                amount: items.amount?.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                }),
            index: index + 1
            })
        )
        setTransactionHistories(data);
    };
    console.log(transactionHistories);
    

    const columnTable = type === 'A' ? [
        {field: 'index', header: 'STT'},
        {field: 'buildingName', header: 'Tòa nhà'},
        {field: 'apartmentFloorNumber', header: 'Tầng'},
        {field: 'apartmentRoomNumber', header: 'Phòng'},
        {field: 'service', header: 'Dịch vụ'},
        {field: 'amount', header: 'Số tiền'},
        {field: 'sentUser', header: 'Người gửi'},
        {field: 'reciveUser', header: 'Người nhận'},
        {field: 'createAt', header: 'Ngày tạo'},
        {field: 'status', header: 'Trạng thái'},
    ] : [
        {field: 'index', header: 'STT'},
        { field: 'buildingName', header: 'Tòa nhà' },
        {field: 'apartmentFloorNumber', header: 'Tầng'},
        {field: 'apartmentRoomNumber', header: 'Phòng'},
        {field: 'type', header: 'Kiểu hợp đồng'},
        {field: 'price', header: 'Giá'},
        {field: 'nameService', header: 'Tên dịch vụ'},
    ]

    return (
        <>
            <Card className="content h-auto">
                <div className="col">
                    <PostNews/>
                </div>
                <div className="col">
                    <PayAndTransfer transactionHistories={handleReceiveData} setType={setType} type={type}/>
                </div>
                <div className="col">
                    <RecentTransaction transactionRecived={transactionHistories} columnTable={columnTable} />
                </div>
            </Card>
        </>
    )
}
export default DashboardInvestor;