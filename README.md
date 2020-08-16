# IronSource Interview Assignment

This is an app-rating system that will be personalized based on age and interests.
This system will, based on user's request, return the most relevant applications.
After the client received the apps, the client will choose one app (to install) and send a call back to the service, this will change the rating for the future requests.

## Getting Started

Clone this repo and run:

```bash
docker-compose up -d
docker-compose logs -f node
```

The node.js server will then listen on port 3000.

## Seed

The databse starts with one collection called "Applications" that contains 15 apps. All apps have `avgAge = 0` and `installCount = 0`.

The `seeder.sh` script will send `<call_count>` requests to the `installedApps/` endpoint with random age and random installedApp. Note that going crazy with `<call_count>` will simply make all apps have an avarage age of ~30 so keep it around 20 calls.

```bash
./seeder.sh <call_count>
```

## API

|path|type|params|notes|
|---|---|---|---|
| `/appService/relevantApplication` | GET | `age`, `category`, `customerType` | Get a list of relevant application according to your customerType |
| `/appService/installedApps` | POST | `age`, `installedApp` | Send feedback on your selected app |

## Tech Used In This Project

* Server: NodeJs + Express
* DB: MongoDB (with mongoose as DAL)
* Validation: Joi
* Testing: Jest
* Http: axios

## Tools

### Postman

Import `/postman_collection.json` into postman to have the endpoint ready.

### Mongo-Express

You can explore the database with "Mongo Express" at `http://localhost:8081/`.
