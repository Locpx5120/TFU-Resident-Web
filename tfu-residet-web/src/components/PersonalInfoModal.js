import { useEffect } from "react";
import { DatePicker, Form, Input, message, Modal, Select, Row, Col } from "antd";
import moment from "moment";

const PersonalInfoModal = ({ data, isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!data) return;
    form.setFieldsValue({
      ...data,
      dateOfBirth: data.dateOfBirth ? moment(data.dateOfBirth) : null,
    });
  }, [data]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        message.success("Thông tin cá nhân đã được cập nhật!");
        setIsModalOpen(false);
        form.resetFields();
      })
      .catch((error) => {
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Modal
        title="Thông tin cá nhân"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          name="personalInfoForm"
          initialValues={{
            fullName: "",
            dateOfBirth: null,
            gender: "",
            email: "",
            hometown: "",
            building: "",
            floor: "",
            apartment: "",
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
                name="dateOfBirth"
                rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
              >
                <DatePicker placeholder="Chọn ngày sinh" style={{ width: "100%", height: '30px' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Giới tính"
                name="gender"
                rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
              >
                <Select placeholder="Chọn giới tính">
                  <Select.Option value="male">Nam</Select.Option>
                  <Select.Option value="female">Nữ</Select.Option>
                  <Select.Option value="other">Khác</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Vui lòng nhập địa chỉ email hợp lệ!" },
                ]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Quê quán"
                name="hometown"
                rules={[{ required: true, message: "Vui lòng nhập quê quán!" }]}
              >
                <Input placeholder="Nhập quê quán" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tòa nhà"
                name="building"
                rules={[{ required: true, message: "Vui lòng nhập tòa nhà!" }]}
              >
                <Input placeholder="Nhập tên tòa nhà" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Số tầng"
                name="floor"
                rules={[{ required: true, message: "Vui lòng nhập số tầng!" }]}
              >
                <Input placeholder="Nhập số tầng" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Số căn hộ"
                name="apartment"
                rules={[{ required: true, message: "Vui lòng nhập số căn hộ!" }]}
              >
                <Input placeholder="Nhập số căn hộ" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default PersonalInfoModal;
