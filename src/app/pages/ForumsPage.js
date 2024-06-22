import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as forumActions from "../redux/forum/forumActions";

const ForumsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { currentUser, forum } = useSelector(
    state => ({
      currentUser: state.auth.currentUser,
      forum: state.forum.entities,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(forumActions.ForumByUserIdFetch(currentUser.id));
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    console.log("forum: ", forum);
  }, [forum]);

  const handleAction = (forumId) => {
    history.push(`/forums/${forumId}/`);
  };

  return (
    <div className="container mt-5 bg-white">
      <h2>Forums</h2>
      <div className="row">
        {forum.map(forum => (
          <div className="col-md-4" key={forum.Id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{forum.title}</Card.Title>
                <Card.Text>{forum.description}</Card.Text>
                <Button variant="primary" onClick={() => handleAction(forum.id)}>Ziyaret Et</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumsPage;
