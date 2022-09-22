import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";

//-.En este hook se accede a lo que es el Store de la aplicacion y se obtine las propiedades de ui
//-.Se crean dos funciones que disparan el disptach

export const useUiStore = () => {
    const dispatch = useDispatch();

    const { isDateModalOpen } = useSelector( state => state.ui );

    const openDateModal = () =>  {
        dispatch( onOpenDateModal() );
    }

    const closeDateModal = () => {
        dispatch( onCloseDateModal() );
    }


    return {
        //properties
        isDateModalOpen,

        //Metodos
        openDateModal,
        closeDateModal,
    }
}