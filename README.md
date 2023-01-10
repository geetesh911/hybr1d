
# Hybr1d Assignment




## Installation

Install dependencies

```bash
  yarn install
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

`PORT = 5000`

`DATABASE_URL= postgresql://geetesh911:root@localhost:5432/hybr1d` // Replace the url with a valid postgres db url

`SECRET_KEY = secretKey`

`EXPIRES_IN = 86400`

`LOG_FORMAT = dev`

`LOG_DIR = ../logs`

`ORIGIN = *`

`CREDENTIALS = true`

## Migrations


Run database migrations

```bash
  yarn prisma:migrate-dev
```
    
## Run Project

```bash
  yarn dev
```
    