#!/bin/bash

# create
sudo docker-compose exec exercises python manage.py recreate_db
sudo docker-compose exec users python manage.py recreate_db
sudo docker-compose exec scores python manage.py recreate_db
# seed
sudo docker-compose exec exercises python manage.py seed_db
sudo docker-compose exec users python manage.py seed_db
sudo docker-compose exec scores python manage.py seed_db