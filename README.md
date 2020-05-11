## Project Description

CRUD Angular application that uses `json-server` for full fake REST API and `json-server-auth` for authentication and authorization.

Entities:
* Contact
* User

## How to run/use

### Client Side:
* Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Server:
- Install `json-server` and run it locally:
	* cmd command: `npm install -g json-server` 
	* help: https://github.com/typicode/json-server
	* note: existing database is provided in "src/server/db.json"
- Install `json-server-auth` for authentication an authorization:
	* cmd command: `npm install -g json-server-auth`
	* help: https://github.com/jeremyben/json-server-auth
	* info: exsting data for authentication is provided in db.json
  
- Go to "src/server/" and run `json-server-auth db.json` to run the server with authentication locally.

### Database:
- Users:
	* email: user1@email.com - password: 123456 
	* email: user2@email.com - password: 123456
	* email: user3@email.com - password: 123456
- Contacts:
	* each user has assigned a list of contacts 




