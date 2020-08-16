#!/bin/bash

NUM_CALLS=${1:-20}
music_apps=("Kanlam" "Subin" "Greenlam" "Bitwolf" "Fixflex")
count=0

while [ "$count" -lt $NUM_CALLS ]
do
  number=$(($RANDOM % 100))
  index=$(($RANDOM % 5))
  app=${music_apps[$index]}
  echo  "POST installedApps/"
  echo  "app: $app"
  echo  "age: $number"
  curl --location --request POST 'http://localhost:3000/appService/installedApps' --header 'Content-Type: application/json' --data-raw '{"age" : "'$number'", "installedApp": "'$app'" }'
  let count+=1
  echo
  echo 
done