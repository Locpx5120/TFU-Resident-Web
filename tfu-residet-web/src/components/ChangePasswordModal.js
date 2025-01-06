import React from "react";
import { Modal, Form, Input, message } from "antd";
import { updateUserPass } from "../services/userService";

const ChangePasswordModal = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      // Send the form data to the postUser API
      var res = await updateUserPass({
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
        oldPassword: values.oldPassword,
      });

      if(res == undefined || res.success == false){
        message.error("Đổi mật khẩu thất bại!");
      }else{
        message.success("Đổi mật khẩu thành công!");
        setIsModalOpen(false);
        form.resetFields();
      }

     
    } catch (error) {
      console.error("Validation failed:", error);
      message.error("Lỗi khi lưu thông tin!");
    } finally {
    
    }
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
            newPassword: "",
            confirmPassword: "",
          }}
        >
          <Form.Item
            label="Mật khẩu cũ"
            name="oldPassword"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu cũ!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu mới" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu mới" />
          </Form.Item>
          <Form.Item
            label="Nhập lại mật khẩu mới"
            name="confirmPassword"
            rules={[
              { required: true, message: "Vui lòng nhập lại mật khẩu mới!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
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
