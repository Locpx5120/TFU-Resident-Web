import { useEffect, useState } from "react";
import { DatePicker, Form, Input, message, Modal, Row, Col } from "antd";
import moment from "moment";
import { getUserLogin, updateUserLogin } from "../services/userService";

const PersonalInfoModal = ({ data, isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  // Fetch user data
  const fetchUser = async () => {
    try {
      const response = await getUserLogin();
      setUserData(response.data);
    } catch (e) {
      message.error("Không lấy được thông tin người dùng", "error");
    }
  };

  // Trigger fetch when modal is opened
  useEffect(() => {
    if (isModalOpen) {
      fetchUser();
    }
  }, [isModalOpen]);

  // Update form when userData is available
  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        fullName: userData.fullName || "",
        birthday: userData.birthday ? moment(userData.birthday) : null,
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
      });
    }
  }, [userData, form]);

  // Handle form submission
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // Send the form data to the postUser API
      await updateUserLogin({
        birthday: values.birthday,
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
      });

      message.success("Thông tin cá nhân đã được cập nhật!");
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
      message.error("Lỗi khi lưu thông tin!");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title="Thông tin cá nhân"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Lưu"
      cancelText="Hủy"
      confirmLoading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        name="personalInfoForm"
        initialValues={{
          fullName: "",
          dateOfBirth: null,
          email: "",
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ngày sinh"
              name="birthday"
              rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
            >
              <DatePicker
                placeholder="Chọn ngày sinh"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                {
                  type: "email",
                  message: "Vui lòng nhập địa chỉ email hợp lệ!",
                },
                {
                  validator: async (_, value) => {
                    if (!value && !form.getFieldValue("email")) {
                      return Promise.resolve();
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                placeholder="Nhập email"
                disabled={true} // Disable the email field
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
                {
                  pattern: /^[0-9]{10,11}$/,
                  message: "Vui lòng nhập số điện thoại hợp lệ!",
                },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default PersonalInfoModal;
