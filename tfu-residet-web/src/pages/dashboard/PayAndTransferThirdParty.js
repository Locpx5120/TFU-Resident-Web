/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import '../../styles/Dashboard.css';
import { formatCurrency } from "../../utils/calculatePrice";
import { getTransactionThird } from "../../services/PaymentService";
import { GetBuildingsForNews } from "../../services/NewsService";
import { getApartmentByBuilding } from "../../services/buildingService";
import { Dropdown } from "primereact/dropdown";
// import { getTotalPrice } from "../../services/totalPrice";
import { Button } from "antd";

const paymentStyle = {
    background: "blue",
    width: "50%",
    height: '20px',
    borderRadius: '16px 0 0 16px'
}
const transferStyle = {
    background: "green",
    width: "50%",
    height: '20px',
    borderRadius: '0 16px 16px 0'
}
const noData = {
    background: "#8080802b",
    width: "100%",
    height: '20px',
    borderRadius: '16px'
}
const PayAndTransferThirdParty = ({ transactionHistories, setType, type, haveHouseFilter = true }) => {
    const [dates, setDates] = useState(new Date());
    const [building, setBuilding] = useState('');
    const [apartment, setApartment] = useState('');
    const [payAndTransferInfo, setPayAndTransferInfo] = useState({});
    const [buildingList, setBuildingList] = useState([]);
    const [apartmentList, setApartmentList] = useState([]);
    const [request, setRequest] = useState({})
    useEffect(() => {
        fetchTransaction({ to: null, from: null, buildingId: null, apartmentId: null })
        fetchBuildingList();
    }, [paymentStyle, transferStyle]);

    const fetchTransaction = async (req) => {
        try {
            const res = await getTransactionThird(req);
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
        if (!event.value) {
            setDates(new Date())
            const request = {
                from: null,
                to: null
            }
            setRequest(request);
            fetchTransaction(request);
            return;
        }
        const { value } = event;
        const startDate = new Date(value.getFullYear(), value.getMonth(), 1);
        const endDate = new Date(value.getFullYear(), value.getMonth() + 1, 0);
        setDates(value);
        const request = {
            from: startDate,
            to: endDate
        }
        setRequest(request);
        fetchTransaction(request);
    }
    const handleChangeInput = (event) => {
        const { name, value } = event?.target;
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

    const handleChange = (type) => {
        if (type === 'A') {
            setType('A');
            transactionHistories(payAndTransferInfo.transactionHistories);
        } else {
            setType('B');
            transactionHistories(payAndTransferInfo.transactionTransferResponseDtos);
        }
    }
    return (
        <>
            <div className="col-12 flex p-0">
                {/* <div className="col flex align-items-center">
                    <label htmlFor="">Tổng thu chi</label>
                    <label htmlFor=""
                        className="ml-2 text-2xl font-semibold"> {formatCurrency(payAndTransferInfo?.total)}</label>
                </div> */}
                <div className="col flex gap-4">
                    <Calendar value={dates} onChange={handleDateChange} selectionMode="single" readOnlyInput
                        onClearButtonClick={handleDateChange} showIcon className="w-full" dateFormat="mm/yy" view="month" />
                    <Dropdown className="w-full" value={building} name="buildingId"
                        onChange={handleChangeInput} options={buildingList} optionValue="id"
                        optionLabel="buildingName" placeholder="Chọn toà nhà" />
                    {haveHouseFilter && <Dropdown className="w-full" value={apartment} name="apartmentId"
                        onChange={handleChangeInput} options={apartmentList} optionValue="id"
                        optionLabel="roomNumber" placeholder="Chọn căn hộ" />}
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
            <div className="col-12 px-0">Chọn tab thu hoặc chi để xem theo từng loại</div>
            <div className="col-12 px-0 flex justify-content-between">
                <div onClick={() => handleChange('A')} className="flex align-items-center px-4" style={{ background: type === 'A' ? 'blue' : 'transparent', color: type === 'A' ? '#fff' : '#000', borderRadius: '16px', cursor: 'pointer' }}>
                    <p className="dot-chart  transfer-color"></p>
                    <label htmlFor="">Tổng tiền thu: <span className="text-lg font-semibold">{formatCurrency(payAndTransferInfo?.pay)}</span></label>
                </div>
                <div onClick={() => handleChange('B')} className="flex align-items-center px-4" style={{ background: type === 'B' ? 'green' : 'transparent', color: type === 'B' ? '#fff' : '#000', borderRadius: '16px', cursor: 'pointer' }}>
                    <p className="dot-chart payment-color"></p>
                    <label htmlFor="">Tổng tiền chi: <span className="text-lg font-semibold">{formatCurrency(payAndTransferInfo?.transfer)}</span></label>
                </div>
                <div>
                    {/* <Button onc>xem</Button> */}
                </div>
            </div>
        </>
    )
}
export default PayAndTransferThirdParty;