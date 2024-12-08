import {Card} from "primereact/card";
import PayAndTransfer from "./PayAndTransfer";
import RecentTransaction from "./RecentTransaction";

const DashboardInvestor =  () => {
    return (
        <>
        <Card className="content">
            <div className="col">
                <PayAndTransfer/>
            </div>
       <div className="col">
                <RecentTransaction/>

       </div>
        </Card>
        </>
    )
}
export default DashboardInvestor;