import React, { useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import tr from 'date-fns/locale/tr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import * as examAction from "../redux/exam/examActions";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const locales = {
    'tr': tr,
};

const localizer = dateFnsLocalizer({
    format: (date, formatStr, options) => format(date, formatStr, { locale: options?.locale }),
    parse: (dateStr, formatStr, options) => parse(dateStr, formatStr, new Date(), { locale: options?.locale }),
    startOfWeek: (date, options) => startOfWeek(date, { locale: options?.locale }),
    getDay: (date) => getDay(date),
    locales,
});

function ExamsPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    const { currentUser, examInfo } = useSelector(
      state => ({
        currentUser: state.auth.currentUser,
        examInfo: state.exam.examInfo
      }),
      shallowEqual
    );

    useEffect(() => {
        if (currentUser && currentUser.id) {
            dispatch(examAction.GetUserExamFetch(currentUser.id));
        }
    }, [currentUser]);

    const handleSelectEvent = (event) => {
        history.push(`/exam/${event.id}`);
    };

    // examInfo'dan events dizisi oluşturma
    const events = examInfo.map(exam => ({
        id: exam.examId,
        title: exam.examName,
        start: new Date(exam.examStartTime),
        end: new Date(exam.examEndTime)
    }));

    return (
        <Container style={{ backgroundColor: 'white' }}>
            <div style={{ height: '100vh' }}>
                <h3 className="text-center mt-4 mb-4">Sınav Takvimi</h3>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600, margin: '50px' }}
                    onSelectEvent={handleSelectEvent}
                    culture="tr"
                    messages={{
                        date: 'Tarih',
                        time: 'Zaman',
                        event: 'Olay',
                        allDay: 'Tüm gün',
                        week: 'Hafta',
                        work_week: 'İş haftası',
                        day: 'Gün',
                        month: 'Ay',
                        previous: 'Önceki',
                        next: 'Sonraki',
                        yesterday: 'Dün',
                        tomorrow: 'Yarın',
                        today: 'Bugün',
                        agenda: 'Gündem',
                        noEventsInRange: 'Bu aralıkta etkinlik yok.',
                        showMore: (total) => `+ Daha fazla (${total})`
                    }}
                />
            </div>
        </Container>
    );
}

export default ExamsPage;
