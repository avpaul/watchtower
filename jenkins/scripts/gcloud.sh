#!/bin/bash

set +ex

# Getting the namespace name to use when connecting to the cluster 
get_namespace(){

  if [ "${GIT_BRANCH}" = "develop" ]; then
    export namespace=${NAMESPACE_STAGING}
  elif [ "${GIT_BRANCH}" = "master" ]; then
    export namespace=${NAMESPACE_PRODUCTION}
  fi
 # setting the GCP project
  gcloud config set project ${GCLOUD_WATCHTOWER_PROJECT}
  # connecting to the cluster
  gcloud container clusters get-credentials watch-tower-${namespace}-apprenticeship --zone us-central1-a --project ${GCP_PROJECT_ID}
  
}

main(){
  get_namespace
}

main
