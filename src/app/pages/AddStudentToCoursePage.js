import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as courseAction from '../redux/course/courseActions';

const AddStudentToCoursePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(courseAction.GetAllCourseFetch());
    }, [dispatch]);

    const { AllCourse, getNotStudentCourse } = useSelector(
        state => ({
            AllCourse: state.course.AllCourse,
            getNotStudentCourse: state.course.getNotStudentCourse
        }),
        shallowEqual
    );

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [checkedStudents, setCheckedStudents] = useState([]);

    useEffect(() => {
        if (selectedCourse !== null) {
            dispatch(courseAction.GetNotStudentCourseFetch(selectedCourse.id));
        }
    }, [dispatch, selectedCourse]);

    const handleCourseSelect = (e) => {
        const courseId = e.target.value;
        const course = AllCourse.find(course => course.id === parseInt(courseId));
        setSelectedCourse(course);
        setCheckedStudents([]);
    };

    const handleCheckboxChange = (studentId) => {
        const updatedCheckedStudents = [...checkedStudents];
        const index = updatedCheckedStudents.indexOf(studentId);
        if (index === -1) {
            updatedCheckedStudents.push(studentId);
        } else {
            updatedCheckedStudents.splice(index, 1);
        }
        setCheckedStudents(updatedCheckedStudents);
    };

    const addStudentsToCourse = () => {
        if (!selectedCourse) return;
        
        dispatch(courseAction.AddStudentsToCourse(selectedCourse.id,checkedStudents))
        dispatch(courseAction.GetNotStudentCourseFetch(selectedCourse.id));

    };

    return (
        <Container className="mt-4 p-4" style={{ backgroundColor: 'white' }}>
            <h2 className="text-center mb-4">Kursa Öğrenci Ekle</h2>
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group controlId="courseSelect">
                        <Form.Label>Ders Seçin</Form.Label>
                        <Form.Control as="select" onChange={handleCourseSelect}>
                            <option value="">Ders Seçiniz</option>
                            {AllCourse.map(course => (
                                <option key={course.id} value={course.id}>{course.courseName}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            {selectedCourse && (
                <div>
                    <h4>Seçilen Ders: {selectedCourse.courseName}</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Ad</th>
                                <th>Soyad</th>
                                <th>Email</th>
                                <th>Kursa Ekle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getNotStudentCourse.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.surname}</td>
                                    <td>{student.email}</td>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            checked={checkedStudents.includes(student.id)}
                                            onChange={() => handleCheckboxChange(student.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button onClick={addStudentsToCourse}>Öğrencileri Kursa Ekle</Button>
                </div>
            )}
        </Container>
    );
};

export default AddStudentToCoursePage;
