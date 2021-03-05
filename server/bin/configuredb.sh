#!/bin/bash

export

database="resumedb";

echo "Configuring database: $resumedb";

dropdb -U node_user portfoliodb;
createdb -U node_user portfoliodb;

psql -U node_user resumedb < ./bin/sql/resume.sql;

echo "$resumedb configured";