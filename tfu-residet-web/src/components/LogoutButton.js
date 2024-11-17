import React, { useState } from 'react';
import { Button, Dropdown, Space }  from "antd";
import Cookies from 'js-cookie';
import { Box } from '@mui/material';
import BadgeAvatars from './Avatar';
import ChangePasswordModal from './ChangePasswordModal';
import PersonalInfoModal from './PersonalInfoModal';

const LogoutButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const handleLogout = () => {
     Cookies.remove('accessToken');
    window.location.href = '/login';
  };

  const items = [
    {
      label: (<Button variant='filled' color='primary' onClick={() => setIsOpenUser(true)}>
      Thông tin cá nhân
    </Button>),
    key: "0",
    },
    {
      label: (<Button variant='filled' color='primary' onClick={() => setIsModalOpen(true)}>
      Đổi mật khẩu
    </Button>),
    key: "0",
    },
    {
      label: (<Button variant='filled' color='danger' onClick={handleLogout}>
      Đăng xuất
    </Button>),
    key: "0",
    },
  ]

  return (
    <>
    <Dropdown
    menu={{
      items,
    }}
    trigger={['click']}
  >
    <a style={{
          position: 'absolute',
          right: 30,
          top: 30,
          cursor: 'pointer'
    }} onClick={(e) => e.preventDefault()}>
      <Space>
      <Box className="profile-img">
          <BadgeAvatars src="https://avatar-ex-swe.nixcdn.com/song/2020/08/06/6/0/8/0/1596682420038.jpg" />
      </Box>
      </Space>
    </a>
  </Dropdown>
  <ChangePasswordModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
  <PersonalInfoModal isModalOpen={isOpenUser} setIsModalOpen={setIsOpenUser} />
</>
  );
};

export default LogoutButton;