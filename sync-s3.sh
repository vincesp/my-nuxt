#!/bin/sh

aws configure --profile s3-sync-action <<-EOF > /dev/null 2>&1
${AWS_ACCESS_KEY_ID}
${AWS_SECRET_ACCESS_KEY}
${AWS_REGION}
text
EOF

aws s3 sync ./dist s3://${AWS_S3_BUCKET}/ --profile s3-sync-action --acl public-read --follow-symlinks --delete
