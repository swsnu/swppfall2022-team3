[![Build Status](https://app.travis-ci.com/swsnu/swppfall2022-team3.svg?branch=main)](https://app.travis-ci.com/swsnu/swppfall2022-team3)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swppfall2022-team3&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swppfall2022-team3)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swppfall2022-team3/badge.svg?branch=main&kill_cache=1)](https://coveralls.io/github/swsnu/swppfall2022-team3?branch=main)

# Pitapat Campus

## Frontend

### Run

```shell
cd frontend
yarn start
```

### Test

```shell
cd frontend
yarn test --coverage --watchAll=false
```

## Backend

### Run

```shell
cd backend
python manage.py runserver
```

### Test

```shell
cd backend
coverage run --source='.' manage.py test
```

