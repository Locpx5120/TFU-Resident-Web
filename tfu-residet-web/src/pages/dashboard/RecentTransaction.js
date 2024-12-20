import {Card} from "primereact/card";
import {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const RecentTransaction = ({transactionRecived}) => {
    const [transaction, setTransaction] = useState([])
    useEffect(() => {
        setTransaction(transactionRecived)
    }, [transactionRecived]);
    const columnTable = [
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
    ]
    return (
        <>
            <DataTable value={transaction} scrollable paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
                       emptyMessage="Không có dữ liệu">
                {columnTable.map((item) =>
                    <Column key={item.field} field={item.field} header={item.header}></Column>)}
            </DataTable>
        </>
    )
}
export default RecentTransaction;