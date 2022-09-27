import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";








export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {

        try {
            if (calendarEvent.id) {
                //Actualizando
                await calendarApi.put(`/events/update/${calendarEvent.id}`,calendarEvent );
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }
                //Creando
                const { data } = await calendarApi.post('/events/create', calendarEvent);
                //console.log({data});
                dispatch(onAddNewEvent({ ...calendarEvent, _id: data.event.id, user}))
            
        } catch (error) {
            Swal.fire('Hubo un error', error.response.data.msg ,'error');
        }
    }


    const startDeletingEvent = async() => {
        try {
        const {data} = await calendarApi.delete(`/events/delete/${activeEvent.id}`);
        dispatch(onDeleteEvent() );

        } catch (error) {
            console.log(error);
            Swal.fire('Hubo un error', error.response.data.msg ,'error');            
        }
    }

    const starLodingEvents = async() => {
        try {
            const {data} = await calendarApi.get('/events/events',);
            const events = convertEventsToDateEvents(data.events);
            dispatch(onLoadEvents(events))
            
        } catch (error) {
            console.log(error);
            
        }
    }

    return {

        //Properties
        events,
        activeEvent,
        hasEventSelect: !!activeEvent,

        //Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        starLodingEvents,

    }
}
