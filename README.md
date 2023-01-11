
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

Dev environment

```bash
  yarn dev
```

Production environment

```bash
  yarn start
```
    
## 🔗 API Documentation
https://documenter.getpostman.com/view/12125468/2s8Z76x9qA
