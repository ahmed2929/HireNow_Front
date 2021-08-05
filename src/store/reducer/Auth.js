import * as actionType from "../actions/actionTypes"


// {
//     "data": {
//         "login": {
//             "user": {
//                 "name": "asa",
//                 "photo": "https://img.icons8.com/bubbles/50/000000/user-male.png",
//                 "email": "ooo",
//                 "__typename": "User"
//             },
//             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGNiOTU3NWE2M2E4ZTFmOGE5MTZlNzQiLCJpYXQiOjE2MjQzNzI1MjIsImV4cCI6MTYyNDM3NjEyMn0.Bp0AG1QZKHTY5DGtYnZNyidWSNDIE6h7OO4wvFLIr6c",
//             "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGNiOTU3NWE2M2E4ZTFmOGE5MTZlNzQiLCJpYXQiOjE2MjQzNzI1MjIsImV4cCI6MTYyNjk2NDUyMn0.ALKon_cNg94zpf3r0d-LpwJ1J0vse7yhKu-hPSyEfkM",
//             "__typename": "Auth"
//         }
//     }
// }


const initialState = {
   token:null,
   refreshToken:null,
   name:null,
   email:null,
    photo:null,
   error:null,
   loading:false,
   _id:null,
   act:null,
   emailVerfied:null
}
 /* eslint-disable */ 
export default (state = initialState, { type ,token,refreshToken,user,error}) => {
    switch (type) {

        case actionType.AUTH_SUCCESS:
        
        return {
            ...state,
           token,
           refreshToken,
          name:user.name,
          email:user.email,
          photo:user.photo,
          _id:user.id,
            act:user.act,
            emailVerfied:user.emailVerfied


        
        
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
                name:null,
                email:null,
                photo:null,
                error:null,
                loading:false,
                _id:null,
                act:null,
                emailVerfied:null
                    
            
            
            }
    


    default:
        return state
    }
}
