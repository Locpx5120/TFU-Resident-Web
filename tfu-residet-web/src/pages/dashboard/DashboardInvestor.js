import {Card} from "primereact/card";
import PayAndTransfer from "./PayAndTransfer";
import RecentTransaction from "./RecentTransaction";
import PostNews from "../news/PostNews";

const DashboardInvestor =  () => {
    return (
        <>
        <Card className="content h-auto">
            <div className="col">
                <PostNews/>
            </div>
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