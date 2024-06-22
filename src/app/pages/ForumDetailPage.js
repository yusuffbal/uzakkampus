import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, ListGroup, Form, Button, Modal, Pagination } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as forumActions from "../redux/forum/forumActions";

const ForumDetailPage = () => {
    const { forumId } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [activePage, setActivePage] = useState(1);
    const dispatch = useDispatch();

    const forumDetail = useSelector(
        state => state.forum.forumDetail,
        shallowEqual
    );
    
    useEffect(() => {
        if (forumId) {
            dispatch(forumActions.ForumById(forumId));
        }
    }, [forumId]);

    const handleImageClick = (imageUrl) => {
        setModalImage(imageUrl);
        setShowModal(true);
    };

    const handlePageChange = (page) => {
        setActivePage(page);
    };

    const postsPerPage = 2; // Sayfa başına gönderi sayısı
    const indexOfLastPost = activePage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = forumDetail?.posts?.slice(indexOfFirstPost, indexOfLastPost) || [];
    const totalPosts = forumDetail?.posts?.length || 0;

    const initialValues = { title: '', body: '', image: null };
    const validationSchema = Yup.object({
        title: Yup.string().required('Başlık gereklidir'),
        body: Yup.string().required('İçerik gereklidir'),
        image: Yup.mixed().nullable(),
    });

    const handlePostSubmit = (values, { setSubmitting, resetForm }) => {
        const newPostData = {
            forumId,
            title: values.title,
            description: values.body,
            authorId: 1, 
            image: values.image, 
        };
        dispatch(forumActions.CreatePost(newPostData));
        resetForm();
        setSubmitting(false);
    };

    const formatImage = (image) => {
        if (image && image.startsWith("data:image")) {
            return image;
        }
        return `data:image/jpeg;base64,${image}`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Geçersiz tarih';
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        return isNaN(date) ? 'Geçersiz tarih' : date.toLocaleDateString('tr-TR', options);
    };

    return (
        <Container className="mt-5 bg-white p-4 rounded shadow-sm">
            {forumDetail ? (
                <>
                    <Card className="mb-4 border-primary">
                        <Card.Body>
                            <Card.Title className="display-4 text-primary">{forumDetail.forumTitle}</Card.Title>
                            <Card.Text className="lead text-secondary">{forumDetail.forumDescription}</Card.Text>
                        </Card.Body>
                    </Card>
                    <h4 className="mb-4 text-success">Gönderiler</h4>
                    <ListGroup variant="flush">
                        {currentPosts.map((post, index) => (
                            <ListGroup.Item key={index} className="mb-3 p-3 shadow-sm border-success">
                                <Card>
                                    <Card.Body>
                                        <Card.Title className="h5 text-info">{post.postTitle}</Card.Title>
                                        {post.postImage && (
                                            <Card.Img
                                                variant="top"
                                                src={formatImage(post.postImage)}
                                                className="my-3 img-thumbnail"
                                                style={{ cursor: 'pointer', width: '100px', height: '100px', objectFit: 'cover' }}
                                                onClick={() => handleImageClick(formatImage(post.postImage))}
                                            />
                                        )}
                                        <Card.Text>{post.postDescription}</Card.Text>
                                        <Card.Subtitle className="text-muted">Yazar: {post.authorName} {post.authorSurname}</Card.Subtitle>
                                        <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>Oluşturulma Tarihi: {formatDate(post.dateOfCreated)}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    {totalPosts > postsPerPage && (
                        <Pagination className="mt-4">
                            {[...Array(Math.ceil(totalPosts / postsPerPage)).keys()].map(page => (
                                <Pagination.Item key={page + 1} active={page + 1 === activePage} onClick={() => handlePageChange(page + 1)}>
                                    {page + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    )}
                    <h4 className="mt-4 text-success">Yeni Gönderi Oluştur</h4>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handlePostSubmit}
                    >
                        {({ setFieldValue }) => (
                            <FormikForm className="mt-3">
                                <Form.Group className="mb-3" controlId="formTitle">
                                    <Form.Label className="text-primary">Başlık</Form.Label>
                                    <Field
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        placeholder="Başlık girin"
                                    />
                                    <ErrorMessage name="title" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBody">
                                    <Form.Label className="text-primary">İçerik</Form.Label>
                                    <Field
                                        as="textarea"
                                        name="body"
                                        className="form-control"
                                        placeholder="İçerik girin"
                                        rows={3}
                                    />
                                    <ErrorMessage name="body" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formImage">
                                    <Form.Label className="text-primary">Görsel</Form.Label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="image"
                                        onChange={(event) => {
                                            const file = event.target.files[0];
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setFieldValue("image", reader.result);
                                            };
                                            reader.readAsDataURL(file);
                                        }}
                                        className="form-control"
                                    />
                                </Form.Group>
                                <Button type="submit" variant="primary">Gönderi Oluştur</Button>
                            </FormikForm>
                        )}
                    </Formik>
                </>
            ) : (
                <p>Yükleniyor...</p>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Görsel Önizleme</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={modalImage} alt="Gönderi" className="img-fluid" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Kapat
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ForumDetailPage;
