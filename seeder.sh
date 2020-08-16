#!/bin/bash

NUM_CALLS=${1:-20}
apps=("Kanlam" "Opela" "Regrant" "Greenlam" "Tempsoft" "Bitwolf" "Aerified" "Asoka" "Sub-Ex" "Subin" "Fixflex" "Trippledex" "Stronghold" "Tres-Zap" "Tin")
count=0

while [ "$count" -lt $NUM_CALLS ]
do
  number=$(($RANDOM % 60 + 5))
  index=$(($RANDOM % 15))
  app=${apps[$index]}
  echo  "POST installedApps/"
  echo  "app: $app"
  echo  "age: $number"
  curl --location --request POST 'http://localhost:3000/appService/installedApps' --header 'Content-Type: application/json' --data-raw '{"age" : "'$number'", "installedApp": "'$app'" }'
  let count+=1
  echo
  echo 
done