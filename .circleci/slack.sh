#!/bin/bash
workflow=https://circleci.com/workflow-run/${CIRCLE_WORKFLOW_ID}

if [ "$CIRCLE_BRANCH" = "develop" ]
then
  ENV="Staging"
elif [ "$CIRCLE_BRANCH" = "master" ]
then
  ENV="Production"
else
  ENV="Testing"
fi
data=$(cat << EOF
    [ {
        "text": "More Details",
        "title": "Deployed commit >> ${CIRCLE_SHA1}",
        "title_link": "https://github.com/andela/watch-tower/commit/${CIRCLE_SHA1}",
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
            "url": "https://github.com/andela/watch-tower/commit/${CIRCLE_SHA1}"
        },
        {
            "name": "Build",
            "text": "View Build",
            "style": "primary",
            "type": "button",
            "value": "yes",
            "url": "$CIRCLE_BUILD_URL"
        }
    ]
}
]
EOF
)

curl -X POST https://slack.com/api/chat.postMessage \
--data-urlencode token="${SLACK_TOKEN}" \
--data-urlencode channel="${SLACK_CHANNEL}" \
--data-urlencode username="${SLACK_USER}" \
--data-urlencode text="WatchTower Frontend has successfuly deployed to $ENV" \
-d attachments="${data}"