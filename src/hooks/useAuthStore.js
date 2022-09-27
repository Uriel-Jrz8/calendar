import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";






export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {

        dispatch(onChecking());
        try {

            const { data } = await calendarApi.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }


    const startRegister = async({ name, email, password}) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth/new', {name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }));
            
        } catch (error) {
            dispatch(onLogout( error.response.data?.msg || 'mensaje personalizado si no viene la data' ));

            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

// revalidndo token
    const startAuthToken = async() =>  {
        const token = localStorage.getItem('token');
        if( !token ) return dispatch( onLogout() );

        try {
            const {data} = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            localStorage.clear();
            return dispatch( onLogout() );
        }
    }

    // logout
    const startLogout = () =>{
        localStorage.clear();
        dispatch(onLogoutCalendar());
        dispatch(onLogout());
    }



    return {
        status,
        user,
        errorMessage,


        startLogin,
        startRegister,
        startAuthToken,
        startLogout

    }
}
