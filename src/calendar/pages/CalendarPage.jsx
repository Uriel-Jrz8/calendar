import { Navbar, CalendarEvent, CalendarModal } from "../"
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getMessages, localizer } from "../../helpers";
import { addHours } from "date-fns";
import { useState } from "react";

const events = [{
    title: 'Cumpleaños',
    notes: 'Comprar pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    user: {
        name: 'uriel'
    }
}]

export const CalendarPage = () => {

     const [lastView, setlastView] = useState(localStorage.getItem('lastView') ||  'week');

    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: '#3447CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    }

    const onDoubleClick = (event) => {
        console.log({ doubleClick: event });
    }

    const onSelect = (event) => {
        console.log({ click: event });
    }

    const onViewChanged = (event) => {
        console.log({ viewChanged: event });
        localStorage.setItem('lastView', event);

    }


    return (
        <>
            <Navbar />
            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                defaultView= {lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={getMessages()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView = {onViewChanged}
            />
            <CalendarModal/>
        </>
    )
}

