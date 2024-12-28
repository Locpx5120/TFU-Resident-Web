import {Card} from "primereact/card";
import {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const RecentTransaction = ({transactionRecived, columnTable}) => {
    const [transaction, setTransaction] = useState([])
    useEffect(() => {
        setTransaction(transactionRecived)
    }, [transactionRecived]);

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