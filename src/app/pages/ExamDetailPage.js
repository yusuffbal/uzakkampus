import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button, Modal, Col, Spinner } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import format from 'date-fns/format';
import tr from 'date-fns/locale/tr';
import RadioButton from '../components/global/RadioButton';
import * as examAction from "../redux/exam/examActions";

const locales = {
    'tr': tr,
};

const formatDateTime = (dateTime) => {
    if (!dateTime) return 'Geçersiz Tarih';

    const dateObj = new Date(dateTime);
    if (isNaN(dateObj.getTime())) {
        return 'Geçersiz Tarih';
    }

    return format(dateObj, "dd/MM/yyyy HH:mm", { locale: locales.tr });
};

const ExamDetail = () => {
    const { examId } = useParams();
    const dispatch = useDispatch();

    const [showPopup, setShowPopup] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [examStartTime, setExamStartTime] = useState(null);

    const { currentUser, examInfo, examQuestions } = useSelector(
        state => ({
            currentUser: state.auth.currentUser,
            examInfo: state.exam.examInfo.find(exam => exam.examId === parseInt(examId)),
            examQuestions: state.exam.examQuestions
        }),
        shallowEqual
    );

    useEffect(() => {
        if (currentUser && currentUser.id) {
            dispatch(examAction.GetUserExamFetch(currentUser.id));
        }
    }, [currentUser, dispatch]);

    useEffect(() => {
        if (examId && examInfo) {
            dispatch(examAction.ExamQuestionsFetch(examId));
        }
    }, [examId, examInfo, dispatch]);

    useEffect(() => {
        console.log("examInfo: ", examInfo);
        console.log("examQuestions: ", examQuestions);
    }, [examInfo, examQuestions]);

    const examTypeText = () => {
        if (!examInfo) return 'Belirtilmemiş';

        switch (examInfo.type) {
            case 1:
                return 'Vize';
            case 2:
                return 'Final';
            case 3:
                return 'Bütünleme';
            default:
                return 'Belirtilmemiş';
        }
    };

    const startExam = () => {
        const currentDate = new Date();
        const examStartTime = new Date(examInfo.examStartTime);
        const examEndTime = new Date(examInfo.examEndTime);

        if (currentDate >= examStartTime && currentDate <= examEndTime) {
            setShowPopup(true); 
            setExamStartTime(currentDate);
        } else {
            console.log('Sınav başlatma zamanı değil.');
        }
    };

    const handleAnswerChange = (questionId, answer) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer
        }));
    };

    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const goToNextQuestion = () => {
        if (currentQuestionIndex < examQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const finishExam = () => {
        setShowPopup(false); 
        calculateScore();
    };

    const calculateScore = () => {
        let correctAnswersCount = 0;
        examQuestions.forEach(question => {
            const userAnswer = answers[question.id];
            const correctAnswer = question.correct;
            console.log(`Question ID: ${question.id}, User Answer: ${userAnswer}, Correct Answer: ${correctAnswer}`);
            if (userAnswer === correctAnswer) {
                correctAnswersCount++;
            }
        });
        const score = (correctAnswersCount / examQuestions.length) * 100;
        console.log(`Toplam Doğru Sayısı: ${correctAnswersCount}`);
        console.log(`Toplam Puan: ${score}`);
        
        // Dispatch the action to send exam data to the backend
        const examEndTime = new Date();
        const exam = {
            StudentId: currentUser.id,
            examId: parseInt(examId),
            point: score,
            status: 1, // Assuming 1 means completed
            dateOfStart: examStartTime.toISOString(),
            dateOfEnd: examEndTime.toISOString()
        };

        dispatch(examAction.FinishExam(exam));
    };

    if (!examInfo) {
        return (
            <Container className="mt-4">
                <h3>Sınav Detayı Bulunamadı</h3>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Col md={12}>
                <Card>
                    <Card.Body>
                        <Card.Title>{examInfo.examName}</Card.Title>
                        <Card.Text>
                            <strong>Açıklama:</strong> {examInfo.examDescription}
                        </Card.Text>
                        <Card.Text>
                            <strong>Başlangıç Tarihi:</strong> {formatDateTime(examInfo.examStartTime)}
                        </Card.Text>
                        <Card.Text>
                            <strong>Bitiş Tarihi:</strong> {formatDateTime(examInfo.examEndTime)}
                        </Card.Text>
                        <Card.Text>
                            <strong>Sınav Türü:</strong> {examTypeText()}
                        </Card.Text>
                        <Button variant="primary" onClick={startExam}>Sınava Başla</Button>
                    </Card.Body>
                </Card>
            </Col>

            <Modal show={showPopup} fullscreen>
                <Modal.Body>
                    {!examQuestions || examQuestions.length === 0 ? (
                        <Spinner animation="border" />
                    ) : (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
                                {examQuestions.map((question, index) => (
                                    <Button
                                        key={question.id}
                                        variant={index === currentQuestionIndex ? 'primary' : 'outline-primary'}
                                        onClick={() => setCurrentQuestionIndex(index)}
                                        style={{ marginRight: '5px' }}
                                    >
                                        {question.id}
                                    </Button>
                                ))}
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <h4>{examQuestions[currentQuestionIndex].answerText}</h4>
                                <RadioButton 
                                    text={examQuestions[currentQuestionIndex].choice1} 
                                    checked={answers[examQuestions[currentQuestionIndex].id] === examQuestions[currentQuestionIndex].choice1 || false}
                                    onChange={() => handleAnswerChange(examQuestions[currentQuestionIndex].id, examQuestions[currentQuestionIndex].choice1)}
                                />
                                <RadioButton 
                                    text={examQuestions[currentQuestionIndex].choice2} 
                                    checked={answers[examQuestions[currentQuestionIndex].id] === examQuestions[currentQuestionIndex].choice2 || false}
                                    onChange={() => handleAnswerChange(examQuestions[currentQuestionIndex].id, examQuestions[currentQuestionIndex].choice2)}
                                />
                                <RadioButton 
                                    text={examQuestions[currentQuestionIndex].choice3} 
                                    checked={answers[examQuestions[currentQuestionIndex].id] === examQuestions[currentQuestionIndex].choice3 || false}
                                    onChange={() => handleAnswerChange(examQuestions[currentQuestionIndex].id, examQuestions[currentQuestionIndex].choice3)}
                                />
                                <RadioButton 
                                    text={examQuestions[currentQuestionIndex].choice4} 
                                    checked={answers[examQuestions[currentQuestionIndex].id] === examQuestions[currentQuestionIndex].choice4 || false}
                                    onChange={() => handleAnswerChange(examQuestions[currentQuestionIndex].id, examQuestions[currentQuestionIndex].choice4)}
                                />
                            </div>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="primary" onClick={goToPreviousQuestion}>Önceki Soru</Button>
                    <Button variant="danger" onClick={finishExam}>Sınavı Bitir</Button>
                    <Button variant="primary" onClick={goToNextQuestion}>Sonraki Soru</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ExamDetail;
