import { gql } from '@apollo/client';

export const jobSchema=gql`

mutation createNewJob(
    $title:String!
    $jobType:String!
    $country:String!,
    $salary:Float!,
    $technologies:[String]
    $Descrition:String
    
  ){
createNewJob(

    title:$title,
    jobType:$jobType,
    country:$country,
    salary:$salary,
    technologies:$technologies,
    Descrition:$Descrition

){
    id,
    title,
    jobType,
    country,
    salary,
    technologies,
  
}
  }







`



export const applayJob=gql`

mutation  summitPropsal(
  
    $job_id:String!,
    $file_uri:String,
    $Comment:String
  	
    
  ){
    summitPropsal(
    job_id:$job_id,
    file_uri:$file_uri,
    Comment:$Comment 

){
  message
  
}
  }







`

