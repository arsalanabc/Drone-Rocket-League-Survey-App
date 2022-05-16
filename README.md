# Drone Rocket League Survey App

A Node.js and react that is capable of presenting a user with a questionnaire about their state of mind and capturing the data on the backend. The data is captured in SQLite file based database.

The questionnaire consists of the following 6 items:

- "Enter your full name"
- "Enter your date of birth (mm/dd/yyyy)"
- "on a scale from 1-5, how happy do you feel ?"
- "on a scale form 1-5, how energetic do you feel ?"
- "on a scale from 1-5, how hopefull do you feel about the future ?"
- "how many hours have you slept last night ?"

The application records the responses along with today's date on the backend side.

After the user submits the questionnaire, the application presents the user with their results relative to their prior answers, and relative to answers of all people of the same age stored in the system.

The comparison results are:

- Happiness today compared to their average happiness
- Average happiness compared to average happiness of all people of the same age on the platform

- Energy level today compared to their average energy level
- Average energy level compared to average energy level of all people of the same age on the platform

- Hopefulness today compared to their average hopefulness
- Average hopefulness compared to average hopefulness of all people of the same age on the platform

- Hours of sleep today compared to their average sleeping hours
- Average sleeping hours compared to average sleeping hours of all people of the same age on the platform.

### Instructions

- switch to Node 14 with `nvm use 14`
- Backend API is in `backend` folder
- React APP is in `frontend` folder

## Setup

- run `npm i` in both directories

## Run

- Run Backend API in dev mode with `cd backend && npm run dev`
- Run Backend API in prod with `cd backend && npm start`
- Run React APP with `cd frontend && npm start`
