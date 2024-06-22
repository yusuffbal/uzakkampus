import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import HomePage from './app/pages/HomePage';
import GradingPage from './app/pages/GradingPage';
import ExamPage from './app/pages/ExamPage';
import ProfilePage from './app/pages/ProfilePage';
import LessonPage from './app/pages/LessonPage';
import LessonActionsPage from './app/pages/LessonActionsPage';
import ForumsPage from './app/pages/ForumsPage';
import ForumDetailPage from './app/pages/ForumDetailPage';
import ManagementPanel from './app/pages/ManagementPanelPage';
import AddCoursePage from './app/pages/AddCoursePage';
import AddStudentToCoursePage from './app/pages/AddStudentToCoursePage';
import AddForumPage from './app/pages/AddForumPage';
import AddAssigmentPage from './app/pages/AddAssigmentPage';
import AddDocumentPage from './app/pages/AddDocumentPage';

const BasePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Redirect exact from="/" to="/homepage" />
        <Route exact path="/homepage" component={HomePage} />
        <Route exact path="/grading-system" component={GradingPage} />
        <Route exact path="/examination-system" component={ExamPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/courses" component={LessonPage} />
        <Route path="/courses/:courseId/" component={LessonActionsPage} />
        <Route exact path="/forums" component={ForumsPage} />
        <Route path="/forums/:forumId" component={ForumDetailPage} />
        <Route exact path="/management-panel" component={ManagementPanel} />
        <Route exact path="/add-course" component={AddCoursePage} />
        <Route exact path="/add-student-to-course" component={AddStudentToCoursePage} />
        <Route exact path="/add-forum" component={AddForumPage} />
        <Route exact path="/add-assigment" component={AddAssigmentPage} />
        <Route exact path="/add-document" component={AddDocumentPage} />
        <Redirect to="/homepage" />
      </Switch>
    </Suspense>
  );
}

export default BasePage;
