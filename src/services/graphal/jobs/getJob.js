import { gql } from '@apollo/client';

export const GET_JOBS = gql`
 query{
  getJobs{
    jobs{
     
            id,
            title,
            jobType,
            country,
            salary,
            technologies,
            candidates,
            status,
            Descrition,
            createdAt,
            creator{
                    name,
                    photo
      },
      
    }
  },

}
`;


export const GET_JOB = 
gql`
  query getJob($id: String!) {
    getJob(id: $id) {
            id,
            title,
            jobType,
            country,
            salary,
            canApplay,
            technologies,
            candidates,
            status,
            Descrition,
            createdAt,
            creator{
                    name,
                    photo
      },
    }
  }
`;






