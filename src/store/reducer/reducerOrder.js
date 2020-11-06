
import * as actionType from '../action'

const initaliState = {
    loading: false,
    errorMassge: "",
    src:"",
    order: null,
    Drivers:[],

    OrderPath: null
}
const reducerOrder = (state = initaliState, action) => {

    switch (action.type) {
        case actionType.order:           
            return {
                ...state,
                order: action.Neworder,
            
        }
        case actionType.updateorder:           
        return {
            ...state,
            order: action.Neworder,
        
    }
        case actionType.orderpath:
            return {
                ...state,
                OrderPath: action.orderpath
            }
        case actionType.listdrivers:
            const drivers = {...action.Drivers};
            return {
                ...state,
                Drivers:drivers             
            }
         
        case actionType.loading: {
            return {
                ...state,
                loading: true,
                errorMassge: ""
            }
        }
        case actionType.error_message: {
            return {
                ...state,
                loading: false,
                errorMassge: "action.value"
            }

        }
        case actionType.src: {
         
            return {
                ...state,
                src: action.src,
                
            }
        }
       
        default:
            return state;
    }

}
export default reducerOrder;