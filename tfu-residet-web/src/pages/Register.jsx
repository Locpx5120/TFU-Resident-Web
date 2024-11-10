import React, {useState, useContext} from 'react';
import {Container, Row, Col, Form, FormGroup, Button} from 'react-bootstrap';
import '../styles/register.css';
import {Link, useNavigate} from 'react-router-dom';
import {authService} from '../services/authService';
import Swal from "sweetalert2";
import {postData} from "../services/api";

const Register = () => {
    const [credentials, setCredentials] = useState({
        // username: '',
        // fullname: '',
        // address: '',
        companyName: '',
        phone: '',
        email: '',
        // password: '',
        // avatar: null,
        // Thay đổi từ string thành null để xử lý file
    });

    const {dispatch} = useContext(authService);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {id, value, files} = e.target;
        if (id === 'avatar') {
            setCredentials((prev) => ({...prev, avatar: files[0]}));
        } else {
            setCredentials((prev) => ({...prev, [id]: value}));
        }
    };

    const handleClick = async (e) => {
        Swal.fire({
            icon: 'success',
            title: 'Đăng ký thành công',
            showConfirmButton: true,
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
            timer: 1500
        })
        e.preventDefault();

        const formData = new FormData();
        for (const key in credentials) {
            formData.append(key, credentials[key]);
        }

        try {
            const res = await postData('/auth/register', credentials)
            const result = await res.json();
            if (!res.ok) {
                alert(result.message);
            } else {
                dispatch({type: 'REGISTER_SUCCESS'});
                navigate('/login');
            }
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <section className="register_section">
            <Container>
                <Row>
                    <Col lg="10" className="m-auto">
                        <div className="register_container d-flex justify-content-between">

                            <div className="register_form">
                                <h2>Đăng ký</h2>

                                <Form onSubmit={handleClick}>
                                    <FormGroup>
                                        <input
                                            type="text"
                                            placeholder="Tên công ty"
                                            id="companyName"
                                            onChange={handleChange}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <input
                                            type="text"
                                            placeholder="Số điện thoại"
                                            id="phone"
                                            onChange={handleChange}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            id="email"
                                            onChange={handleChange}
                                            required
                                        />
                                    </FormGroup>
                                    <Button className="btn secondary__btn auth__btn" type="submit">
                                        Đăng ký
                                    </Button>
                                </Form>
                                <p>
                                    Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Register;