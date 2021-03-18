#!/bin/bash

fails=""

inspect() {
    if [ $1 -ne 0 ]; then
        fails="${fails} $2"
    fi  
}

# run unit and integration tests
sudo docker-compose up -d --build
sudo docker-compose exec users python manage.py test
inspect $? users
sudo docker-compose exec users flake8 project
inspect $? users-lint
sudo docker-compose exec client npm test -- --coverage
inspect $? client
sudo docker-compose down

# return proper code
if [ -n "${fails}" ]; then
  echo "Tests failed: ${fails}"
  exit 1
else
  echo "Tests passed!"
  exit 0
fi