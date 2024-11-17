import React from 'react';
import { Modal, Form, Input, message } from 'antd';

const ChangePasswordModal = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();
  console.log(isModalOpen);
  

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        if (values.newPassword !== values.confirmPassword) {
          message.error("Mật khẩu mới và xác nhận mật khẩu không khớp!");
        } else {
          message.success("Đổi mật khẩu thành công!");
          setIsModalOpen(false);
          form.resetFields();
        }
      })
      .catch(info => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Modal
        title="Đổi mật khẩu"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          name="changePasswordForm"
          initialValues={{
            newPassword: '',
            confirmPassword: '',
          }}
        >
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu mới" />
          </Form.Item>
          <Form.Item
            label="Nhập lại mật khẩu mới"
            name="confirmPassword"
            rules={[
              { required: true, message: 'Vui lòng nhập lại mật khẩu mới!' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu mới" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
