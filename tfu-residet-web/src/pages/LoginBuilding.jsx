import React, {useContext, useEffect, useState} from "react";
import {Container, Row, Col, Form, FormGroup, Button} from "react-bootstrap";
import '../styles/login.css';
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import {authService, loginBuildingApi} from "../services/authService";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import PostNews from "./news/PostNews";

const LoginBuilding = () => {
    const location = useLocation();
    const currentPath = location.pathname.split('/')[2]?.split('&');
    const buildingId = 'daa830ab-d653-48ca-a82b-03c0d6f4ee5c';

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        buildingId
    });

    const {dispatch} = useContext(authService);
    const navigate = useNavigate();

    useEffect(() => {
                Cookies.set('buildingID', buildingId, {expires: 1});
    }, []);
    // Hàm thay đổi giá trị input
    const handleChange = e => {
        setCredentials(prev => ({...prev, [e.target.id]: e.target.value}));
    };

    // Hàm xử lý đăng nhập
    const handleClick = async e => {
        e.preventDefault();
        dispatch({type: 'LOGIN_START'});

        try {
            const result = await loginBuildingApi(credentials, buildingId);
            if (!result.success) {
                Swal.fire('Thất bại', 'Sai tài khoản hoặc mật khẩu!', 'error');
            }
            if (result.data && result.data.token) {
                const decoded = jwtDecode(result.data.token);                
                Cookies.set('role', decoded?.role, {expires: 1});
                Cookies.set('accessToken', result.data.token, {expires: 1});
                // Cookies.set('buildingID', buildingId, {expires: 1});
                Cookies.set('residentId', decoded.nameid, {expires: 1});
                Cookies.set('user', decoded.email, {expires: 1});

                dispatch({type: "LOGIN_SUCCESS", payload: decoded.role });

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
            <div className="col-6">
                <PostNews deepClass="h-full"/>
            </div>
            <div className="col-6">
                        <div className="login-container d-flex justify-content-between">

                            <div className="login-form">
                                <h2>Đăng nhập</h2>

                                <Form onSubmit={handleClick}>
                                    <FormGroup>
                                        <input type="email" placeholder='Email' id='email' onChange={handleChange} className="w-full"
                                               required/>
                                    </FormGroup>
                                    <FormGroup>
                                        <input type="password" placeholder='Mật khẩu' id='password' className="w-full"
                                               onChange={handleChange} required/>
                                    </FormGroup>
                                    <Button className='btn primary-btn' type='submit'>Đăng nhập</Button>
                                </Form>
                                <p><Link to='/forgot-password'>Quên mật khẩu?</Link></p>
                            </div>
                        </div>

            </div>
        </section>
    );
};

export default LoginBuilding;
