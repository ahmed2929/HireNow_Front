import { gql } from '@apollo/client';

export const REGISTER_USER=gql`
mutation register(
$name:String!
$email:String!
$password:String!
$act:String!


){

register(
name:$name,
email:$email,
password:$password
act:$act


){
    user{
       name,
       photo,
       email,
       act,
       id,
       emailVerfied
   }
    token
    refreshToken
}
    
}




`

export const LOGIN_USER=gql`
mutation login(

$email:String!
$password:String!



){

login(

email:$email,
password:$password



){
   user{
       name,
       photo,
       email,
       act,
       id,
       emailVerfied
   }
    token
    refreshToken
}
    
}




`