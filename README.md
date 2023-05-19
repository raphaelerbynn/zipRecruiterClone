# ZipRecruiter Clone

A job posting, job search platform and job application platform.


## Features

- Recruiters can register and log in to their accounts.
- Recruiters can create, edit, and delete job postings.
- Recruiters can view and manage applications received for their job postings.
- Candidates can register and log in to their accounts.
- Candidates can search for jobs based on location, experience or title.
- Candidates can apply for jobs by submitting their resumes and cover letters.
- Candidates can track the status of their applications.


## How To Install And UUse

1. Clone the project `git clone https://github.com/raphaelerbynn/zipRecruiterClone/`
2. Navigate to the repo `cd ziprecruiter-clone`
3. Install dependencies
   - backend 
     -- `cd server`
     -- `npm install`
   - frontend
     -- `cd client/zip-recruiter`
     -- `npm install`
4. Configure environmental variables
   - backend 
     -- `DATABASE_NAME = database_name`
     -- `DATABASE_URI = your_MongoDb_URI`
     -- `JWT_SECRET_KEY = your_key`
     -- `PORT = 5000`
   - frontend
     -- `REACT_APP_API_URL = the_api_base_URL`
5. Run the backend `npm run start-ts`or `npm run build && npm start`
6. Run the frontend `npm start`
7. Open `http://localhost:3000` in your browser and access it



## API Documentation

### Base URL
The base URL for all API endpoints is: `https://zip-recruiter-clone.vercel.app/` hosted on vercel

### Authentication
All API endpoints require authentication except for 
- user registration and login 
- job search
- file download

You need to include an `Authorization` header with a valid JWT token in your requests.


### Endpoints

#### Register User
- URL: `/api/auth/register`
- Method: POST
- Description: Register a new user.
- Request Body:
  - `email`: string -: User's email address.
  - `password`: string -: User's password.
  - `role`: string -: User's role (recruiter or candidate).
- Response:
  - Success: 201 User registered
  - Error: 409 User already exist

#### Login

- URL: `/api/auth/login`
- Method: POST
- Description: Authenticate user and get a JWT token.
- Request Body:
  - `email`: string -: User's email address.
  - `password`:string -: User's password.
- Response:
  - Success: 200 with JWT token in the response body as json.
  - Error: 
    -- 404 Unknown user
    -- 400 No password
    -- 403 Invalid username or password


#### Create Job Posting

- URL: `/api/jobs`
- Method: POST
- Description: Create a new job posting.
- Request Body:
  - `title`: string -: Job title.
  - `description`:string -: Job description.
  - `location`:string : Job location.
  - `experience`: number -: Required experience year(s).
  
  - `min`: number -: Min Salary.
  - `max`: number -: MAx Salary.
  - `currency`: string -: currency o f salary.
  - `frequency`: string -: when salaries are paid.
- Response:
  - Success: 201 with the created job posting json in the response body.
  - Error: 403 USer not authorized

#### Update Job Posting

- URL: `/api/jobs/:id`
- Method: PUT
- Description: Update an existing job posting.
- Request Body:
  - `title`: string -: Job title.
  - `description`:string -: Job description.
  - `location`:string : Job location.
  - `experience`: number -: Required experience year(s).
  
  - `min`: number -: Min Salary.
  - `max`: number -: MAx Salary.
  - `currency`: string -: currency o f salary.
  - `frequency`: string -: when salaries are paid.
- Response:
  - Success: 200 Job updated successfully.
  - Error:
    -- 404 JOb not found
    -- 409 Unauthorized
    -- 403 User not authorized if not a recruiter

#### Delete Job Posting

- URL: `/api/jobs/:id`
- Method: DELETE
- Description: Delete a job posting.
- Response:
  - Success: 200 Job deleted
  - Error:
    -- 404 JOb not found
    -- 409 Unauthorized
    -- 403 User not authorized if not a recruiter
   
#### Get All Jobs

- URL: `/api/jobs/`
- Method: GET
- Description: Get all jobs.
- Response:
  - Success: 200 with all jobs in json response

#### Get One Job

- URL: `/api/jobs/:id`
- Method: GET
- Description: Get a single job.
- Response:
  - Success: 200 with the single job in json response
  - Error: 404 JOb not found

#### Get One Job

- URL: `/api/jobs/search`
- Method: GET
- Description: Search with a query request.
- Response:
  - Success: 200 with the job matching the query in json response

#### Get Applicantss

- URL: `/api/jobs/applicants`
- Method: GET
- Description: Get all applicants with applications received for the logged in recruiter's all job postings.
- Response:
  - Success: 200 with an array of application objects with applicant details attached in the response body.
  - Error: 409 Unauthorized

#### Get Applicantions

- URL: `/api/jobs/applications`
- Method: GET
- Description: Get all applications a logged in candidates to see status.
- Response:
  - Success: 200 with an array of application objects in the response body.
  - Error: 409 Unauthorized

#### Delete Application

- URL: `/api/jobs/applicantions/:apply_id`
- Method: DELETE
- Description: DElete an application for a logged in candidate.
- Response:
  - Success: 200 Application deleted and deletes file
  - Error: 409 Unauthorized and 404 Application not found

#### Apply for a Job

- URL: `/api/:job_id/apply`
- Method: POST
- Description: Apply for a job by submitting a resume and cover letter.
- Request Body:
  - `jobId`: string -: ID of the job posting to apply for.
  - `resume`: file -: Resume file (PDF or Word document).
  - `coverLetter` :file -: Cover letter file (PDF or Word document).
- Response:
  - Success: 201 Job applied successfully
  - Error: 403 User not authorized or 409 Already applied

#### Get Applicantions for JOb

- URL: `/api/jobs/:job_id/apply`
- Method: GET
- Description: Get all applications a logged in recruiter's specific job post.
- Response:
  - Success: 200 with an array of application objects in the response body.
  - Error: 409 Unauthorized and 404 job not found

#### Get One Applicantion from job

- URL: `/api/jobs/:job_id/apply/:apply_id`
- Method: GET
- Description: Get one application a logged in candidate on specific job.
- Response:
  - Success: 200 with application objects in the response body.
  - Error: 409 Unauthorized and 404 job not found
