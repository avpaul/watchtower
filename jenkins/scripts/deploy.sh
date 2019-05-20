#!/bin/bash

set +ex

#  Clone the deployment repository
clone_deployment_repo(){
 mkdir ~/.ssh/ && echo "Host github.com\n\tStrictHostKeyChecking no\n" > ~/.ssh/config
  git clone -b develop ${DEPLOYMENT_SCRIPTS_REPO}
  if [ "${GIT_BRANCH}" = "develop" ]; then
    export namespace=${NAMESPACE_STAGING}
  elif [ "${GIT_BRANCH}" = "master" ]; then
    export namespace=${NAMESPACE_PRODUCTION}
  fi
  cd watchtower-deployment-scripts/
  
}

# Export environment variables
export_env(){
  export PROJECT_NAME=${PROJECT_NAME}
  export namespace=${namespace}
  export IMG_TAG=$(echo $GIT_COMMIT | cut -c -7)
  export PROJECT_ID=${GCP_PROJECT_ID}
  export RESERVED_IP_NAME=${RESERVED_IP_NAME} 
  export DOMAIN=${DOMAIN}
  export SSL_CERT=${SSL_CERT}
  export SSL_KEY=${SSL_KEY}
  export GOOGLE_APPLICATION_CREDENTIALS=${WORKSPACE}/watchtower-deployment-scripts/service_key.json
}

# Install gettext to enable environment variable substitution in the deployment yaml files
install_gettext(){
  apt-get install gettext -y
  apt-get install -y sudo
}

gcloud_authentication(){
  #@--- Create service account key ---@#   
  touch service_key.json    
  #@--- Decode the service acoount into json format ---@#    
  echo $GCLOUD_SERVICE_KEY | base64 -d > service_key.json
  gcloud auth activate-service-account --key-file=./service_key.json 

}

# Run deployment
deploy_app(){ 
  export K8S_AUTH_KUBECONFIG=/root/.kube/config 
	sudo -E ansible-playbook ansible/frontend/main.yml -vvvv

}

main(){
  install_gettext
  export_env
  clone_deployment_repo
  gcloud_authentication
  deploy_app
}

main
