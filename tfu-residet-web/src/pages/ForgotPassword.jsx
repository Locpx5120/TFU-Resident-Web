import React, {useState} from 'react';
import {Container, Row, Col, Form, FormGroup, Button} from 'react-bootstrap';
import '../styles/ForgotPass.css';
import {useNavigate} from 'react-router-dom';
import {forgotPasswordApi} from "../services/authService";

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: '',
        newPassword: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = e => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const result = await forgotPasswordApi(formData).json();
            if (response.ok) {
                setMessage(result.message);
                navigate(`/otp/${result.data.userId}`);
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg='8' className='m-auto'>
                        <div className="forgotpass_container d-flex justify-content-between">
                            <div className="forgotpass_form">
                                <h2>Đặt lại mật khẩu</h2>
                                <p>Vui lòng nhập email của bạn để tiến hành thay đổi mật khẩu</p>
                                {message && <p className="text-danger">{message}</p>}
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </FormGroup>
                                    <Button className='btn secondary__btn auth__btn' type='submit'>Gửi yêu cầu</Button>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ForgotPassword;
 