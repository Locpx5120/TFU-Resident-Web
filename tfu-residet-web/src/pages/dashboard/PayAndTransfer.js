import {useEffect, useState} from "react";
import {Calendar} from "primereact/calendar";
import '../../styles/Dashboard.css';
import {formatCurrency} from "../../utils/calculatePrice";
import {CSSProperties} from "react";

const PayAndTransfer = () => {
    const [dates, setDates] = useState([new Date(), new Date()]);
    const [payAndTransferInfo, setPayAndTransferInfo] = useState({
        total: 111110,
        pay: 500000,
        transfer: 500000
    })
    useEffect(() => {

    }, [payAndTransferInfo]);
    const handleDateChange = (event) => {
        const {value} = event;
        setDates(value);
        const request = {
            startDate: value[0],
            endDate: value[1]
        }
        console.log(request)
    }
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
    return (
        <>
            <div className="col-12 flex p-0">
                <div className="col flex align-items-center">
                    <label htmlFor="">Tổng thu chi</label>
                    <label htmlFor=""
                           className="ml-2 text-2xl font-semibold"> {formatCurrency(payAndTransferInfo.total)}</label>
                </div>
                <div className="col">
                    <Calendar value={dates} onChange={handleDateChange} selectionMode="range" readOnlyInput
                              hideOnRangeSelection showIcon className="w-full" dateFormat="dd/mm/yy"/>
                </div>
            </div>
            <div className="col-12 flex px-0">
                {payAndTransferInfo.total  > 0?
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
                           className="ml-2 text-lg font-semibold"> {formatCurrency(payAndTransferInfo.pay)}</label>
                </div>
                <div className="col flex justify-content-end align-items-center ">
                    <p className="dot-chart payment-color"></p>
                    <label htmlFor="">Tổng tiền chi</label>
                    <label htmlFor=""
                           className="ml-2 text-lg font-semibold"> {formatCurrency(payAndTransferInfo.transfer)}</label>

                </div>
            </div>
        </>
    )
}
export default PayAndTransfer;