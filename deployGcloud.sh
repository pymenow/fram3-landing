#!/bin/bash

# Exit on any error
set -e

# Ensure gcloud is logged in, prompt for login if expired
echo "Checking gcloud authentication status..."
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" &> /dev/null; then
    echo "Your gcloud login has expired or is missing. Please log in."
    gcloud auth login
fi

# Retrieve the current git tag
GIT_TAG=$(git describe --tags --abbrev=0)
if [ -z "$GIT_TAG" ]; then
    echo "No git tag found. Ensure the repository has tags and you are on a tagged commit."
    exit 1
fi

# Define variables
LOCAL_IMAGE="fram3-web:$GIT_TAG"
REMOTE_IMAGE="asia.gcr.io/auth-fa6e5/fram3-web:$GIT_TAG"
REMOTE_IMAGE_LATEST="asia.gcr.io/auth-fa6e5/fram3-web:latest"
SERVICE_NAME="fram3-web"
REGION="asia-south1"
SERVICE_ACCOUNT="f3backend@auth-fa6e5.iam.gserviceaccount.com"
ENV_VARS="VITE_EMAILJS_SERVICE_ID=service_gmc8zgh,VITE_EMAILJS_TEMPLATE_ID=template_vwnut77,VITE_EMAILJS_TEMPLATE_ID2=template_rn8wmq9,VITE_EMAILJS_PUBLIC_KEY=3vqq_ylZwfdeCwvJK"

# Build the Docker image
echo "Building Docker image..."
docker buildx build --platform=linux/amd64 -t "$LOCAL_IMAGE" .

# Tag the image for the latest version
echo "Tagging Docker image with 'latest'..."
docker tag "$LOCAL_IMAGE" "$REMOTE_IMAGE"
docker tag "$LOCAL_IMAGE" "$REMOTE_IMAGE_LATEST"

# Push the image to Google Container Registry
echo "Pushing Docker images to Google Container Registry..."
docker push "$REMOTE_IMAGE"
docker push "$REMOTE_IMAGE_LATEST"

# Deploy to Google Cloud Run
echo "Deploying to Google Cloud Run..."
gcloud run deploy "$SERVICE_NAME" \
    --image="$REMOTE_IMAGE" \
    --platform managed \
    --region "$REGION" \
    --service-account "$SERVICE_ACCOUNT" \
    --allow-unauthenticated \
    --set-env-vars "$ENV_VARS"

echo "Deployment complete. Service is live."