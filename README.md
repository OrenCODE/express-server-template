# express-server-template
NodeJS server template (Domain driven design patterns)

### Project Overview
The primary motivation behind this project is to gain a comprehensive understanding of building a server from the ground up, coupled with the practical application of domain-driven design patterns tailored to meet the demands of enterprise-level usage.

### The main technologies that are used in this project are:
1. ExpressJS (Creation of API routes and middlewares)
2. Prisma ORM (Dynamic Modules + Typescript)
3. Class-validator (DTO model validation)
4. MongoDB / SQL postgres (Database)
5. Docker (Relevant compose script)
6. Bcrypt and JWT (authentication)
7. ESLint and Prettier (Code Parsers)

### Install and run locally
1. Clone repo with `git clone git@github.com:OrenCODE/express-server-template.git`
2. Run `npm install`
3. Run `cd backend`
4. Run `touch .env`
5. Add these demo variables to .env file `PORT=3000 SECRET_KEY=yoursecret DATABASE_URL="mongodb://localhost:30001/exampleExpressAPI?directConnection=true&serverSelectionTimeoutMS=2000"`

### Connect to DB
###### Docker compose + mongoDB shell
1. Make sure docker is installed on your system
2. Open new terminal and run `docker-compose -f docker-compose-mongodb.yml up -d` (this compose script creates a replica set of 3 clusters to mimic backup functionality)
3. Run mongodb cluster-1 with `docker exec -it mongodb-cluster-1 mongosh`
4. Add this demo replica set `rs.initiate({_id:"mongodb-cluster",members:[{_id:0,host:"mongodb-cluster-1:27017"},{_id:1,host:"mongodb-cluster-2:27017"},{_id:2,host:"mongodb-cluster-3:27017"}]})`
5. Add this connection string to the .env file `DATABASE_URL="mongodb://localhost:30001/exampleExpressAPI?directConnection=true&serverSelectionTimeoutMS=2000"`
6. Start server in development mode with `npm run dev`

### Test endpoints with postman
import these files:

[Authentication.postman_collection.json](..%2F..%2FDocuments%2FAuthentication.postman_collection.json)
[Users.postman_collection.json](..%2F..%2FDocuments%2FUsers.postman_collection.json)

###### SQL postgres (coming soon...)

### Tech Design Diagram:
[backend digram.pdf](backend%20digram.pdf)

##### Branch Record (Temp):
express-server-initial-design
