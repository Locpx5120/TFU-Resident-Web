// investors
import Dashboard from "../components/Dashboard";
import Project from "../components/ProjectInvestor/Project";
import Building from "../components/BuildingInvestor/Building";
//residents
import ServiceManage from '../pages/resident/serviceManage';
import ServiceDetail from '../pages/resident/serviceManage/serviceDetail';
import ServicePayments from '../pages/resident/servicePayment';
import ServicePaymentsDetail from '../pages/resident/servicePayment/ServicePaymentsDetail';
import ServicePaymentsBill from '../pages/resident/servicePayment/ServicePayments';
import SendRequest from "../pages/resident/sendRequest";
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
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
//building director
import DirectorPage from "../pages/buildingDirector/dashboard";
import SalaryListPage from "../pages/buildingDirector/agent";
import HouseHold from "../pages/buildingDirector/householdManagement";
import DetailHouseHold from "../pages/buildingDirector/householdManagement/DetailHouseHold";
import PaymentHistory from "../pages/buildingDirector/paymentHistory";
import Notification from "../pages/buildingDirector/notification";

export const routeArray = [
  {
    route: "/",
    routeName: "Trang chính",
    component: <Dashboard />,
    icon: <WidgetsIcon />,
  },
  {
    route: "/du-an",
    routeName: "Dự án",
    component: <Project />,
    icon: <BusinessIcon />,
  },
  {
    route: "/toa-nha",
    routeName: "Tòa nhà",
    component: <Building />,
    icon: <ApartmentIcon />,
  },
  {
    route: "/thanh-vien",
    routeName: "Thành viên",
    component: <>Chua Co</>,
    icon: <PersonIcon />,
  },
  {
    route: "/cai-dat",
    routeName: "Cài đặt",
    component: <>Chua Co</>,
    icon: <SettingsIcon />,
  },
];

export const routeOwner = [
  {
    route: "/",
    routeName: "Trang chính",
    component: <DashboardOwner />,
    icon: <WidgetsIcon />,
  },
  {
    route: "/thanh-vien",
    routeName: "Thành viên",
    component: <Agent />,
    icon: <PersonIcon />,
  },
  {
    route: "/bao-cao",
    routeName: "Báo cáo",
    component: <ReportInvestor />,
    icon: <DescriptionIcon />,
  },
  {
    route: "/lich-su",
    routeName: "Lịch sử",
    component: <HistoryOnwer />,
    icon: <HistoryIcon />,
  },
  {
    route: "/cai-dat",
    routeName: "Cài đặt",
    component: <>Chua Co</>,
    icon: <SettingsIcon />,
  },
];

export const routeResident = [
  {
    route: "/trang-chu",
    routeName: "Trang chủ",
    component: <>Chua Co</>,
    icon: <SettingsIcon />,
  },
  {
    route: "/quan-ly-thanh-vien",
    routeName: "Quản lý thành viên",
    component: <>Chua Co</>,
    icon: <SettingsIcon />,
  },
  {
    route: "/thanh-toan-dich-vu",
    routeName: "Thanh toán dịch vụ",
    component: <ServicePayments />,
    icon: <SettingsIcon />,
  },
  {
    route: "/thanh-toan-dich-vu/:id",
    routeName: "Thanh toán dịch vụ",
    component: <ServicePaymentsDetail />,
    icon: <SettingsIcon />,
    hidden: true,
  },
  {
    route: "/thanh-toan-dich-vu/:id",
    routeName: "Thanh toán dịch vụ",
    component: <ServicePaymentsDetail />,
    icon: <SettingsIcon />,
    hidden: true,
  },
  {
    route: "/thanh-toan-dich-vu-hoa-don",
    routeName: "Thanh toán dịch vụ",
    component: <ServicePaymentsBill />,
    icon: <SettingsIcon />,
    hidden: true,
  },
  {
    route: "/quan-ly-dich-vu",
    routeName: "Quản lý dịch vụ",
    component: <ServiceManage />,
    icon: <SettingsIcon />,
  },
  {
    route: "/quan-ly-dich-vu/:id",
    routeName: "Quản lý dịch vụ",
    component: <ServiceDetail />,
    icon: <SettingsIcon />,
    hidden: true,
  },
  {
    route: "/lich-su-thanh-toan",
    routeName: "Lịch sử thanh toán",
    component: <>Chua Co</>,
    icon: <SettingsIcon />,
  },
  {
    route: "/xem-don",
    routeName: "Xem đơn",
    component: <>Chua Co</>,
    icon: <SettingsIcon />,
  },
  {
    route: "/gui-don",
    routeName: "Gửi đơn",
    component: <SendRequest />,
    icon: <SettingsIcon />,
  },
];

export const routeDirector = [
  {
    route: "/",
    routeName: "Trang chính",
    component: <DirectorPage />,
    icon: <WidgetsIcon />,
  },
  {
    route: "/thanh-vien",
    routeName: "Quản lý thành viên",
    component: <SalaryListPage />,
    icon: <PersonIcon />,
  },
  {
    route: "/cu-dan",
    routeName: "Quản lý cư dân",
    component: <HouseHold />,
    icon: <PersonIcon />,
  },
  {
    route: "/cu-dan/:id",
    routeName: "Chi tiết cư dân",
    component: <DetailHouseHold />,
    hidden: true,
  },
  {
    route: "/thong-bao",
    routeName: "Thông báo",
    component: <Notification />,
    icon: <NotificationsIcon />,
  },
  {
    route: "/lich-su-thanh-toan",
    routeName: "Lịch sử thanh toán",
    component: <PaymentHistory />,
    icon: <HistoryIcon />,
  },
];