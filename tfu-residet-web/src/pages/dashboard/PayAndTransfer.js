import {useEffect, useState} from "react";
import {Calendar} from "primereact/calendar";
import '../../styles/Dashboard.css';
import {formatCurrency} from "../../utils/calculatePrice";
import {CSSProperties} from "react";
import {getTransaction} from "../../services/PaymentService";

const paymentStyle: CSSProperties = {
    background: "blue",
    width: "50%",
    height: '20px',
    borderRadius: '16px 0 0 16px'
}
const transferStyle: CSSProperties = {
    background: "green",
    width: "50%",
    height: '20px',
    borderRadius: '0 16px 16px 0'
}
const noData: CSSProperties = {
    background: "#8080802b",
    width: "100%",
    height: '20px',
    borderRadius: '16px'
}
const PayAndTransfer = ({transactionHistories}) => {
    const [dates, setDates] = useState([]);
    const [payAndTransferInfo, setPayAndTransferInfo] = useState()
    useEffect(() => {
        fetchTransaction({to: null, from: null})
    }, [paymentStyle, transferStyle]);
    const fetchTransaction = async (req) => {
        try {
            const res = await getTransaction(req);
            setPayAndTransferInfo(res.data)
            transactionHistories(res.data.transactionHistories);
            paymentStyle.width = Math.round((res.data.pay /res.data.total) * 100) + '%';
            if (paymentStyle.width === '100%')  {
                paymentStyle.borderRadius = '16px';
            }
            transferStyle.width = Math.round((res.data.transfer /res.data.total) * 100)  + '%';
            if (transferStyle.width === '100%')  {
                transferStyle.borderRadius = '16px';
            }
        } catch (e) {

        }
    }
    const handleDateChange = (event) => {
        const {value} = event;
        setDates(value);
        const request = {
            from: value[0],
            to: value[1]
        }
        fetchTransaction(request);
    }
    return (
        <>
            <div className="col-12 flex p-0">
                <div className="col flex align-items-center">
                    <label htmlFor="">Tổng thu chi</label>
                    <label htmlFor=""
                           className="ml-2 text-2xl font-semibold"> {formatCurrency(payAndTransferInfo?.total)}</label>
                </div>
                <div className="col">
                    <Calendar value={dates} onChange={handleDateChange} selectionMode="range" readOnlyInput
                              hideOnRangeSelection showIcon className="w-full" dateFormat="dd/mm/yy"/>
                </div>
            </div>
            <div className="col-12 flex px-0">
                {payAndTransferInfo?.total > 0 ?
                    (
                        <div className="col-12 flex px-0">
                            <div className="" style={paymentStyle}></div>
                            <div className="" style={transferStyle}></div>
                        </div>
                    ) : (
                        <div className="" style={noData}></div>
                    )}

            </div>
            <div className="col-12 px-0 flex justify-content-between">
                <div className="col  flex align-items-center">
                    <p className="dot-chart  transfer-color"></p>
                    <label htmlFor="">Tổng tiền thu</label>
                    <label htmlFor=""
                           className="ml-2 text-lg font-semibold"> {formatCurrency(payAndTransferInfo?.pay)}</label>
                </div>
                <div className="col flex justify-content-end align-items-center ">
                    <p className="dot-chart payment-color"></p>
                    <label htmlFor="">Tổng tiền chi</label>
                    <label htmlFor=""
                           className="ml-2 text-lg font-semibold"> {formatCurrency(payAndTransferInfo?.transfer)}</label>

                </div>
            </div>
        </>
    )
}
export default PayAndTransfer;