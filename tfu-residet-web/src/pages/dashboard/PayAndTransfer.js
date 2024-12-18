import {useEffect, useState} from "react";
import {Calendar} from "primereact/calendar";
import '../../styles/Dashboard.css';
import {formatCurrency} from "../../utils/calculatePrice";
import {CSSProperties} from "react";
import {getTransaction} from "../../services/PaymentService";
import {GetBuildingsForNews} from "../../services/NewsService";
import {getApartmentByBuilding} from "../../services/buildingService";
import {Dropdown} from "primereact/dropdown";

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
    const [building, setBuilding] = useState('');
    const [apartment, setApartment] = useState('');
    const [payAndTransferInfo, setPayAndTransferInfo] = useState({});
    const [buildingList, setBuildingList] = useState([]);
    const [apartmentList, setApartmentList] = useState([]);
    const [request, setRequest] = useState({})
    useEffect(() => {
        fetchTransaction({to: null, from: null, buildingId: null, apartmentId: null})
        fetchBuildingList();
    }, [paymentStyle, transferStyle]);
    const fetchTransaction = async (req) => {
        try {
            const res = await getTransaction(req);
            setPayAndTransferInfo(res.data)
            transactionHistories(res.data.transactionHistories);
            paymentStyle.width = Math.round((res.data.pay / res.data.total) * 100) + '%';
            if (paymentStyle.width === '100%') {
                paymentStyle.borderRadius = '16px';
            }
            transferStyle.width = Math.round((res.data.transfer / res.data.total) * 100) + '%';
            if (transferStyle.width === '100%') {
                transferStyle.borderRadius = '16px';
            }
        } catch (e) {

        }
    }
    const fetchApartmentList = async (id) => {
        try {
            const building = await getApartmentByBuilding(id);
            setApartmentList(building.data);
        } catch (e) {

        }

    }
    const fetchBuildingList = async () => {
        try {
            const building = await GetBuildingsForNews();
            setBuildingList(building.data);
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
        setRequest(request);
        fetchTransaction(request);
    }
    const handleChangeInput = (event) => {
        const {name, value} = event?.target;
        const requestForm = {
            ...request,
            [name]: value
        }
        setRequest(requestForm)
        if (name === 'buildingId') {
            setBuilding(value);
            fetchApartmentList(value);
        }
        else setApartment(value);
        fetchTransaction(requestForm);

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
                    <Dropdown className="w-full my-2" value={building} name="buildingId"
                              onChange={handleChangeInput} options={buildingList} optionValue="id"
                              optionLabel="buildingName" placeholder="Chọn toà nhà" />
                    <Dropdown className="w-full" value={apartment} name="apartmentId"
                              onChange={handleChangeInput} options={apartmentList} optionValue="id"
                              optionLabel="roomNumber" placeholder="Chọn căn hộ" />
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