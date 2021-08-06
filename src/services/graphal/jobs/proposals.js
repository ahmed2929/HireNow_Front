
import { gql } from '@apollo/client';

export const GET_PROPOSALS = 
gql`
  query getProposals {
    getProposals {
    proposals{
      id,
      Comment,
      applicant{
        name,
        id,
        photo
        
      },
      status,
      file_uri,
      job_id{
        id,
        title,
        technologies,
        jobType,
        salary,
        Descrition
      },
    }

  }
    }
  
`;

export const CHANGE_PROPOSAL_STATUS=gql`

mutation changeProposalSatus(
  
    $id:String!,
    $status:String!,
    
  ){
    changeProposalSatus(
   id:$id,
    status:$status,

){
  message
  
}
  }







`