import React, {useContext, useState} from "react";
import {Container, Row, Col, Form, FormGroup, Button} from "react-bootstrap";
import '../styles/login.css';
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {authService, loginApi} from "../services/authService";
import Cookies from "js-cookie";

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const {dispatch} = useContext(authService);
    const navigate = useNavigate();

    // Hàm thay đổi giá trị input
    const handleChange = e => {
        setCredentials(prev => ({...prev, [e.target.id]: e.target.value}));
    };

    // Hàm xử lý đăng nhập
    const handleClick = async e => {
        e.preventDefault();
        dispatch({type: 'LOGIN_START'});
        // debugger
        try {
            const res = await loginApi(credentials)
            if (!res.ok) alert(res.message)
            if (res.data && res.data .token) {
                Cookies.set('accessToken', res.data.token, {expires: 1});

                const isNew = localStorage.getItem('isNew') || false;

                if (isNew === 'true') {
                    navigate('/change-password');
                    return;
                }
                dispatch({type: "LOGIN_SUCCESS", payload: res.data.user});

                Swal.fire({
                    icon: 'success',
                    title: 'Đăng nhập thành công',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#3085d6',
                    timer: 1500
                });

                navigate('/');
            }
        } catch (error) {
            dispatch({type: "LOGIN_FAILURE", payload: error.response?.data?.message || error.message});
            console.log('aaa', error)
            Swal.fire({
                icon: 'error',
                title: 'Đăng nhập thất bại',
                text: error.response?.data?.message || error.message,
                confirmButtonColor: '#3085d6',
            });
        }
    };


    return (
        <section className="login-section">
            <Container>
                <Row>
                    <Col lg='8' className='m-auto'>
                        <div className="login-container d-flex justify-content-between">

                            <div className="login-form">
                                <h2>Đăng nhập</h2>

                                <Form onSubmit={handleClick}>
                                    <FormGroup>
                                        <input type="email" placeholder='Email' id='email' onChange={handleChange}
                                               required/>
                                    </FormGroup>
                                    <FormGroup>
                                        <input type="password" placeholder='Mật khẩu' id='password'
                                               onChange={handleChange} required/>
                                    </FormGroup>
                                    <Button className='btn primary-btn' type='submit'>Đăng nhập</Button>
                                </Form>
                                <p><Link to='/forgot-password'>Quên mật khẩu?</Link></p>
                                <p>Bạn chưa có tài khoản? <Link to='/register'>Đăng ký</Link></p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Login;
