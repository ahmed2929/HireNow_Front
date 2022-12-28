import * as actionType from "../actions/actionTypes"



const initialState = {
   token:null,
   refreshToken:null,
    user:null
}
 /* eslint-disable */ 
export default (state = initialState, { type ,token,refreshToken,user,error}) => {
    switch (type) {

        case actionType.AUTH_SUCCESS:
        
        return {
            ...state,
           token,
           refreshToken,
            user


        
        
        }
    


    case actionType.AUTH_FAILD:
       
        return {
            ...state,
            error


        
        
        }

   
        case actionType.AUTH_LOGOUT:
       
            return {
                
                token:null,
                refreshToken:null,
                user:null
                    
            
            
            }
    


    default:
        return state
    }
}
