import { configureStore } from "@reduxjs/toolkit";
import { authSlice,uiSlice,calendarSlice } from './';






export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer,
        auth: authSlice.reducer,
    },
    
    // para configurar el middleware por un error que daba en las fechas 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})