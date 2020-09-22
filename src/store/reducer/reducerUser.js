import * as actionType from '../action'
const initaliState = {
loading:false,
errorMassge:"",
  User:null,
  UserPath:null
}
const reducer = (state = initaliState, action) => {
    switch (action.type) {      
        case actionType.login:
            return {
                ...state,
                User:action.user,
                loading:false,
                errorMassge:""         
            }
        case actionType.userpath:
            return{
                ...state,
                UserPath:action.userpath
            }
        case actionType.logout:{
            return {
                ...state,
                UserPath:null,
                User:null,
                loading:false,
                errorMassge:""
            }
        }
        case actionType.loading:{
            return {
                ...state,
                loading:true,
                errorMassge:""
            }
        }
            case actionType.error_message:{
                return {
                    ...state,
                    loading:false,
                    errorMassge:action.value
                }
        }
        default:
            return state;           
    }
    
}
export default reducer;