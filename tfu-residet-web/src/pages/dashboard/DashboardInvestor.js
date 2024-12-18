import {Card} from "primereact/card";
import PayAndTransfer from "./PayAndTransfer";
import RecentTransaction from "./RecentTransaction";
import PostNews from "../news/PostNews";
import {useState} from "react";

const DashboardInvestor = () => {
    const [transactionHistories, setTransactionHistories] = useState([]);

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

    return (
        <>
            <Card className="content h-auto">
                <div className="col">
                    <PostNews/>
                </div>
                <div className="col">
                    <PayAndTransfer transactionHistories={handleReceiveData}/>
                </div>
                <div className="col">
                    <RecentTransaction transactionRecived={transactionHistories}/>

                </div>
            </Card>
        </>
    )
}
export default DashboardInvestor;