#!/bin/bash
export BUILD_VERSION=$1
if [ "$BUILD_VERSION" = "" ]; then
    echo "Missing build version parameter (Git commit SHA)"
    exit -1
fi

ENVIRONMENT_KEY=$( echo $2 | tr '[a-z]' '[A-Z]' )
if [ "$ENVIRONMENT_KEY" = "" ]; then
    echo "Missing environment parameter"
    exit -1
fi


echo "Installing AWS client"

aws --version

echo "Configure AWS"
aws configure set aws_access_key_id $ONEUPS_KOPS_ACCESS_KEY
aws configure set aws_secret_access_key $ONEUPS_KOPS_SECRET_KEY
aws configure set default.region eu-west-1

export NAME=k8s.dev.oneupsgame.com
export KOPS_STATE_STORE=s3://dev-oneupsgame.com-state

kops export kubecfg $NAME

echo "Set credentials for DockerHub"

# kubectl delete secret regcred
# kubectl create secret docker-registry regcred \
#     --docker-server=https://index.docker.io/v1/ \
#     --docker-username=$ONEUPS_DOCKER_REGISTRY_USERNAME \
#     --docker-password=$ONEUPS_DOCKER_REGISTRY_PASSWORD \
#     --docker-email=$ONEUPS_DOCKER_REGISTRY_EMAIL
kubectl get secret regcred -o yaml
echo "Performing kubernetes service"
kubectl apply -f kubernetes/service.yml
echo "Performing kubernetes deployment"
# cat kubernetes/deployment.yml | envsubst | kubectl apply -f -

cat kubernetes/deployment.yml | \
sed 's/\${BUILD_VERSION}'"/$BUILD_VERSION/g" | \
kubectl apply -f -