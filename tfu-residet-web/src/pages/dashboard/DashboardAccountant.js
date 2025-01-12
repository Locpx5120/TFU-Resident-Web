import {Card} from "primereact/card";
import PayAndTransfer from "./PayAndTransfer";
import RecentTransaction from "./RecentTransaction";
import PostNews from "../news/PostNews";
import { format } from "date-fns";
import {useState} from "react";
import { create } from "lodash";

const DashboardAccountant = () => {

    return (
        <>
            <Card className="content h-auto">
                <div className="col">
                    <PostNews/>
                </div>
            </Card>
        </>
    )
}
export default DashboardAccountant;