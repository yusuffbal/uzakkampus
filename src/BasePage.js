import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import HomePage from './app/pages/HomePage';
import GradingPage from './app/pages/GradingPage';
import ExamPage from './app/pages/ExamPage';
import ProfilePage from './app/pages/ProfilePage';
import LessonPage from './app/pages/LessonPage';
import LessonActionsPage from './app/pages/LessonActionsPage';
import ForumsPage from './app/pages/ForumsPage';

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
        <Route path="/forums" component={ForumsPage} />

        <Redirect to="/homepage" /> 
      </Switch>
    </Suspense>
  );
}

export default BasePage;
