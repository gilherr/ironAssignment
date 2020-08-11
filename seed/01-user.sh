#!/bin/bash
set -e

mongo <<EOF
use iron
db.createUser({
  user:  '$MONGO_USERNAME',
  pwd: '$MONGO_PASSWORD',
  roles: [{ role: 'readWrite', db: 'iron' }]
})
EOF