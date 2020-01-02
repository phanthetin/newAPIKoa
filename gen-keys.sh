#!/bin/sh

cd ./src/keys

# ES512
# private key
openssl ecparam -genkey -name prime256v1 -noout -out ecdsa.key
 
# public key
openssl ec -in ecdsa.key -pubout -out ecdsa.pub