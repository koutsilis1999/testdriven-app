#!/bin/bash


type=$1
fails=""

inspect() {
  if [ $1 -ne 0 ]; then
    fails="${fails} $2"
  fi
}

# run server-side tests
server() {
  sudo docker-compose up -d --build
  sudo docker-compose exec users python manage.py test
  inspect $? users
  sudo docker-compose exec users flake8 project
  inspect $? users-lint
  sudo docker-compose exec exercises python manage.py test
  inspect $? exercises
  sudo docker-compose exec exercises flake8 project
  inspect $? exercises-lint
  sudo docker-compose down
}

# run client-side tests
client() {
  sudo docker-compose up -d --build
  sudo docker-compose exec client npm test -- --coverage
  inspect $? client
  sudo docker-compose down
}

# run e2e tests
e2e() {
  sudo docker-compose -f docker-compose-stage.yml up -d --build
  sudo docker-compose -f docker-compose-stage.yml exec users python manage.py recreate_db
   ./node_modules/.bin/cypress run --config baseUrl=http://localhost --env REACT_APP_API_GATEWAY_URL=$REACT_APP_API_GATEWAY_URL,LOAD_BALANCER_STAGE_DNS_NAME=http://localhost
  sudo docker-compose -f docker-compose-stage.yml down
}

# run all tests
all() {
  sudo docker-compose up -d --build
  sudo docker-compose exec users python manage.py test
  inspect $? users
  sudo docker-compose exec users flake8 project
  inspect $? users-lint
  sudo docker-compose exec exercises python manage.py test
  inspect $? exercises
  sudo docker-compose exec exercises flake8 project
  inspect $? exercises-lint
  sudo docker-compose exec client npm test -- --coverage
  inspect $? client
  sudo docker-compose down
  e2e
}

# run appropriate tests
if [[ "${type}" == "server" ]]; then
  echo "\n"
  echo "Running server-side tests!\n"
  server
elif [[ "${type}" == "client" ]]; then
  echo "\n"
  echo "Running client-side tests!\n"
  client
elif [[ "${type}" == "e2e" ]]; then
  echo "\n"
  echo "Running e2e tests!\n"
  e2e
else
  echo "\n"
  echo "Running all tests!\n"
  all
fi

# return proper code
if [ -n "${fails}" ]; then
  echo "\n"
  echo "Tests failed: ${fails}"
  exit 1
else
  echo "\n"
  echo "Tests passed!"
  exit 0
fi