// investors
import Dashboard from "../components/Dashboard";
import Project from "../components/ProjectInvestor/Project";
import Building from "../components/BuildingInvestor/Building";
import History from "../components/History";
//residents
import ServiceManage from '../pages/resident/serviceManage';
import ServicDetail from '../pages/resident/serviceManage/serviceDetail';
import ServicePayments from '../pages/resident/servicePayment';
import ServicePaymentsDetail from '../pages/resident/servicePayment/ServicePaymentsDetail';
import ServicePaymentsBill from '../pages/resident/servicePayment/ServicePayments';
import SendRequest from "../pages/resident/sendRequest";

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
    route: "/lich-su",
    routeName: "Lịch sử",
    component: <History />,
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
    component: <ServicDetail />,
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