#!/bin/bash

#create a variable to access the jenkins pipeline
workflow=https://jenkins.andela.com/blue/organizations/jenkins/Watchtower-frontend/detail/${GIT_BRANCH}/${BUILD_NUMBER}/pipeline/

#if statement to determine the environment name to be added to the slack message
if [ "$GIT_BRANCH" = "develop" ]
then
  ENV="Staging"
elif [ "$GIT_BRANCH" = "master" ]
then
  ENV="Production"
else
  ENV="Testing"
fi

# This is the content of the slack message 
#e.g `WatchTower Backend has successfully deployed to Staging' when the branch deployed is develop.
data=$(cat << EOF
    [ {
        "text": "More Details",
        "title": "Deployed commit >> ${GIT_COMMIT}",
        "title_link": "https://github.com/andela/watch-tower/commit/${GIT_COMMIT}",
        "callback_id": "Deplo",
        "color": "#3AA3E3",
        "attachment_type": "default",
        "actions": [
        {
            "name": "Workflow",
            "text": "View Workflow",
            "style": "primary",
            "type": "button",
            "value": "yes",
            "url": "${workflow}"
        },
        {
            "name": "Commit",
            "text": "View Commit",
            "style": "primary",
            "type": "button",
            "value": "yes",
            "url": "https://github.com/andela/watch-tower/commit/${GIT_COMMIT}"
        },
        {
            "name": "Build",
            "text": "View Build",
            "style": "primary",
            "type": "button",
            "value": "yes",
            "url": "$BUILD_URL/console"
        }
    ]
}
]
EOF
)

# Pushing the message to slack
curl -X POST https://slack.com/api/chat.postMessage \
--data-urlencode token="${SLACK_TOKEN}" \
--data-urlencode channel="${SLACK_CHANNEL}" \
--data-urlencode username="${SLACK_USER}" \
--data-urlencode text="WatchTower Frontend has successfuly deployed to $ENV" \
-d attachments="${data}"
