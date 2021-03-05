#!/bin/bash

database="resumedb";

echo "Configuring database: $resumedb";

dropdb -U node_user resumedb;
createdb -U node_user resumedb;

psql -U node_user resumedb < ./bin/sql/resume.sql;

echo "$resumedb configured";