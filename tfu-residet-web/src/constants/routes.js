// investors
import Dashboard from "../components/Dashboard";
import Project from "../components/ProjectInvestor/Project";
import Building from "../components/BuildingInvestor/Building";
//residents
import ServiceManage from '../pages/resident/serviceManage';
import ServiceDetail from '../pages/resident/serviceManage/serviceDetail';
import ServicePayments from '../pages/resident/servicePayment';
import ServicePaymentsDetail from '../pages/resident/servicePayment/ServicePaymentsDetail';
import ServicePaymentsBill from '../pages/resident/servicePayment/ServicePaymentsBill';
import SendRequest from "../pages/resident/sendRequest";
import HouseHoldResident from "../pages/resident/householdManagement/index";
import ThirdParty from "../pages/resident/thirdParty";
import DetailHouseHoldResident from "../pages/resident/householdManagement/DetailHouseHoldResident";
// owners
import DashboardOwner from "../components/owner/dashboard";
import Agent from "../components/owner/agent";
import ReportInvestor from "../components/owner/report";
import HistoryOnwer from "../components/owner/history";
// icons  
import WidgetsIcon from "@mui/icons-material/Widgets";
import BusinessIcon from "@mui/icons-material/Business";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import DescriptionIcon from "@mui/icons-material/Description";
import HistoryIcon from "@mui/icons-material/History";
import NotificationsIcon from '@mui/icons-material/Notifications';
import {ThermostatAutoOutlined, ThirtyFpsOutlined} from "@mui/icons-material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
//building director
import DirectorPage from "../pages/buildingDirector/dashboard";
import DirectorHomepage from "../pages/buildingDirector/homepage";
import SalaryListPage from "../pages/buildingDirector/agent";
import HouseHold from "../pages/buildingDirector/householdManagement";
import DetailHouseHold from "../pages/buildingDirector/householdManagement/DetailHouseHold";
import PaymentHistory from "../pages/buildingDirector/paymentHistory";
import Notification from "../pages/buildingDirector/notification";
import ViewRequests from "../pages/resident/viewRequests";
import RequestDetail from "../pages/resident/viewRequests/RequestDetail";

//receptionist
import Receptionist from "../pages/receptionist";
import HistoryPay from "../pages/receptionist/historyPay";
import AccountantPage from "../pages/accountant/AccountantPage";
import Adminitrative from "../pages/administrative";
// import Administrator from "../components/Administrator/Administrator";


export const routeArray = [
    {
        route: "/",
        routeName: "Trang chính",
        component: <Dashboard/>,
        icon: <WidgetsIcon/>,
    },
    {
        route: "/du-an",
        routeName: "Dự án",
        component: <Project/>,
        icon: <BusinessIcon/>,
    },
    {
        route: "/toa-nha",
        routeName: "Tòa nhà",
        component: <Building/>,
        icon: <ApartmentIcon/>,
    },
    {
        route: "/thanh-vien",
        routeName: "Thành viên",
        component: <>Chua Co</>,
        icon: <PersonIcon/>,
    },
    {
        route: "/cai-dat",
        routeName: "Cài đặt",
        component: <>Chua Co</>,
        icon: <SettingsIcon/>,
    },
];

export const routeOwner = [
    {
        route: "/",
        routeName: "Trang chính",
        component: <DashboardOwner/>,
        icon: <WidgetsIcon/>,
    },
    {
        route: "/thanh-vien",
        routeName: "Thành viên",
        component: <Agent/>,
        icon: <PersonIcon/>,
    },
    {
        route: "/bao-cao",
        routeName: "Báo cáo",
        component: <ReportInvestor/>,
        icon: <DescriptionIcon/>,
    },
    {
        route: "/lich-su",
        routeName: "Lịch sử",
        component: <HistoryOnwer/>,
        icon: <HistoryIcon/>,
    },
    {
        route: "/cai-dat",
        routeName: "Cài đặt",
        component: <>Chua Co</>,
        icon: <SettingsIcon/>,
    },
];

export const routeResident = [
    {
        route: "/trang-chu",
        routeName: "Trang chủ",
        component: <>Chua Co</>,
        icon: <SettingsIcon/>,
    },
    {
        route: "/cu-dan",
        routeName: "Quản lý thành viên",
        component: <HouseHoldResident />,
        icon: <PersonIcon/>,
    },
    {
        route: "/cu-dan/:id",
        routeName: "Chi tiết cư dân",
        component: <DetailHouseHoldResident />,
        hidden: true,
    },
    {
        route: "/thanh-toan-dich-vu",
        routeName: "Thanh toán dịch vụ",
        component: <ServicePayments/>,
        icon: <SettingsIcon/>,
    },
    {
        route: "/thanh-toan-dich-vu/:id",
        routeName: "Thanh toán dịch vụ",
        component: <ServicePaymentsDetail/>,
        icon: <SettingsIcon/>,
        hidden: true,
    },
    {
        route: "/thanh-toan-dich-vu-hoa-don/:id",
        routeName: "Thanh toán dịch vụ",
        component: <ServicePaymentsBill />,
        icon: <SettingsIcon/>,
        hidden: true,
    },
    {
        route: "/quan-ly-dich-vu",
        routeName: "Quản lý dịch vụ",
        component: <ServiceManage/>,
        icon: <SettingsIcon/>,
    },
    {
        route: "/quan-ly-dich-vu/:id",
        routeName: "Quản lý dịch vụ",
        component: <ServiceDetail/>,
        icon: <SettingsIcon/>,
        hidden: true,
    },
    // {
    //     route: "/lich-su-thanh-toan",
    //     routeName: "Lịch sử thanh toán",
    //     component: <>Chua Co</>,
    //     icon: <SettingsIcon/>,
    // },
    {
        route: "/xem-don",
        routeName: "Xem đơn",
        component: <ViewRequests/>,
        icon: <SettingsIcon/>,
    },
    {
        route: "/xem-chi-tiet-don/:id",
        routeName: "Xem đơn",
        component: <RequestDetail/>,
        icon: <SettingsIcon/>,
        hidden: true,
    },
    {
        route: "/gui-don",
        routeName: "Gửi đơn",
        component: <SendRequest/>,
        icon: <SettingsIcon/>,
    },
    {
        route: "/ben-thu-ba",
        routeName: "Quản lí bên thứ ba",
        component: <ThirdParty />,
        icon: <ThirtyFpsOutlined />,
    },
    {
        route: "/administrator",
        routeName: "Thành viên quản trị",
        // component: <Administrator />,
        icon: <ThermostatAutoOutlined />,
    },
];

export const routeDirector = [
    {
        route: "/",
        routeName: "Trang chính",
        component: <DirectorHomepage/>,
        icon: <WidgetsIcon/>,
    },
    {
        route: "/",
        routeName: "Dashboard",
        component: <DirectorPage/>,
        icon: <WidgetsIcon/>,
    },
    {
        route: "/thanh-vien",
        routeName: "Quản lý thành viên",
        component: <SalaryListPage/>,
        icon: <PersonIcon/>,
    },
    {
        route: "/cu-dan",
        routeName: "Quản lý cư dân",
        component: <HouseHold/>,
        icon: <PersonIcon/>,
    },
    {
        route: "/cu-dan/:id",
        routeName: "Chi tiết cư dân",
        component: <DetailHouseHold/>,
        hidden: true,
    },
    {
        route: "/thong-bao",
        routeName: "Thông báo",
        component: <Notification/>,
        icon: <NotificationsIcon/>,
    },
    {
        route: "/lich-su-thanh-toan",
        routeName: "Lịch sử thanh toán",
        component: <PaymentHistory/>,
        icon: <HistoryIcon/>,
    },
];

export const routeReceptionist = [
    {
        route: "/lich-su-gui-don",
        routeName: "Lịch sử gửi đơn",
        component: <Receptionist/>,
        icon: <SettingsIcon/>,
    },
    {
        route: "/lich-su-thanh-toan-2",
        routeName: "Lịch sử thanh toán 2",
        component: <HistoryPay/>,
        icon: <SettingsIcon/>,
    },
];

export const routeAccountant = [
    {
        route: "/xem-thanh-toan",
        routeName: "Xem thanh toán",
        component: <AccountantPage/>,
        icon: <HistoryIcon/>,
    },
];

export const routeAdmin = [
    {
        route: "/xu-ly-don-them-dich-vu",
        routeName: "Xử lý đơn thêm dịch vụ",
        component: <Adminitrative/>,
        icon: <SettingsIcon/>,
    },
];
