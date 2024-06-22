import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as studentAction from "../redux/auth/authActions";
import * as forumAction from "../redux/forum/forumActions";


const AddForumPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(studentAction.getStudentList()); 
    }, [dispatch]);

    const { AllStudent } = useSelector(
        state => ({
            AllStudent: state.auth.studentList,
        }),
        shallowEqual
    );

    useEffect(() => {
      console.log("AllStudent: ",AllStudent);
    }, [AllStudent])
    

    const [checkedUsers, setCheckedUsers] = useState([]);

    const handleCheckboxChange = (userId) => {
        const updatedCheckedUsers = [...checkedUsers];
        const index = updatedCheckedUsers.indexOf(userId);
        if (index === -1) {
            updatedCheckedUsers.push(userId);
        } else {
            updatedCheckedUsers.splice(index, 1);
        }
        setCheckedUsers(updatedCheckedUsers);
    };

    const initialValues = {
        title: '',
        description: ''
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Başlık gereklidir'),
        description: Yup.string().required('Açıklama gereklidir')
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        const forumData = {
            ...values,
            forumParticipant: checkedUsers.map(userId => ({ userId }))
        };

        // Simulate API call
        console.log('Forum oluşturuldu:', forumData);
        dispatch(forumAction.CreateForum(forumData));
        setSubmitting(false);
        resetForm();
        setCheckedUsers([]);
    };

    return (
        <Container className="mt-4 p-4" style={{ backgroundColor: 'white' }}>
            <h2 className="text-center mb-4">Forum Oluştur</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched }) => (
                    <FormikForm>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formTitle">
                                    <Form.Label>Başlık</Form.Label>
                                    <Field
                                        name="title"
                                        type="text"
                                        className={`form-control ${touched.title && errors.title ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="title" component="div" className="text-danger" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formDescription">
                                    <Form.Label>Açıklama</Form.Label>
                                    <Field
                                        name="description"
                                        type="text"
                                        className={`form-control ${touched.description && errors.description ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="description" component="div" className="text-danger" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <h4>Kullanıcılar</h4>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Ad</th>
                                    <th>Soyad</th>
                                    <th>Email</th>
                                    <th>Foruma Ekle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {AllStudent.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.surname}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Form.Check
                                                type="checkbox"
                                                checked={checkedUsers.includes(user.id)}
                                                onChange={() => handleCheckboxChange(user.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Button type="submit" disabled={isSubmitting} className="mt-3">Forumu Oluştur</Button>
                    </FormikForm>
                )}
            </Formik>
        </Container>
    );
};

export default AddForumPage;
