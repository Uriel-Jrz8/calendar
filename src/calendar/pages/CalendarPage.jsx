import { Navbar, CalendarEvent, CalendarModal, FabAddNew } from "../"
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getMessages, localizer } from "../../helpers";
import { useEffect, useState } from "react";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";
import { FabDelete } from "../components/FabDelete";


export const CalendarPage = () => {

    const { user} = useAuthStore();
    const { openDateModal } = useUiStore();
    const { events, setActiveEvent,starLodingEvents } = useCalendarStore();
    const [lastView, setlastView] = useState(localStorage.getItem('lastView') ||  'week');

    const eventStyleGetter = (event, start, end, isSelected) => {
        const isMyEvent = ( user.uid === event.user._id || user.uid === event.user.uid)
        const style = {
            backgroundColor: isMyEvent ? '#3447CF7' : '#465660',
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
        openDateModal();
    }

    const onSelect = (event) => {
        console.log({ click: event });
        setActiveEvent(event);
    }

    const onViewChanged = (event) => {
        console.log({ viewChanged: event });
        localStorage.setItem('lastView', event);
        setlastView( event);

    }

    useEffect(() => {
        starLodingEvents();
    }, [])

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
            <FabAddNew/>
            <FabDelete/> 
        </>
    )
}

