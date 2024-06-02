import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Button, Alert, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import * as actions from "../../redux/auth/authActions"
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Geçerli bir email adresi giriniz').required('Email alanı zorunludur'),
    password: Yup.string().required('Şifre alanı zorunludur'),
});



const LoginForm = () => {
    const dispatch = useDispatch();
    const [loginError, setLoginError] = useState(null);
    const history = useHistory();



    const { isAuthorized } = useSelector((state) => ({
        isAuthorized: state.auth.isAuth,
      }));




  
    
  



    const handleLogin = async (values) => {
        try {
            CreateToken(values);
            debugger;
            history.push('/'); 
        } catch (error) {
            setLoginError("E-Posta veya Şifreniz yanlış. Lütfen tekrar deneyiniz.");
        }
        console.log("values: ", values);
    };
    



    

    const CreateToken = (values) => {
        dispatch(actions.CreateToken(values));
    }

    

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="w-50">
                <h1 className="mb-4 text-center">UZAK KAMPÜS</h1>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => handleLogin(values)}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Row className="mb-3">
                                <Col>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        className={`form-control${errors.email && touched.email ? ' is-invalid' : ''}`}
                                    />
                                    {errors.email && touched.email && <div className="invalid-feedback">{errors.email}</div>}
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Şifre"
                                        className={`form-control${errors.password && touched.password ? ' is-invalid' : ''}`}
                                    />
                                    {errors.password && touched.password && <div className="invalid-feedback">{errors.password}</div>}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button variant="primary" type="submit" className="w-100">Giriş Yap</Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
                {loginError && (
                    <Alert variant="danger" dismissible onClose={() => setLoginError(null)} className="position-fixed top-0 end-0 m-4">
                        {loginError}
                    </Alert>
                )}
            </div>
        </Container>
    );
};

export default LoginForm;
