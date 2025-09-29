# CI/CD with GitHub

When creating a workflow in GitHub, you should create a separate folder called `.github`.  
This is **different from the `.git` folder**, which should never be manually adjusted.  
The `.github` folder, however, *should* be edited — GitHub recognizes it as a special folder for community health files (issue templates, PR templates, etc.) and CI/CD workflows.  

For the CI/CD process, create a `workflows` folder inside `.github`.

---

## CI/CD Dockerized Setup

When pushing changes to the `main` branch, there is a GitHub Action script, **DockerCDSetup.yml**, which builds Docker images, runs tests, and deploys the images to GitHub’s container registry (GHCR).  

This setup provides several benefits:  
- Every change lives in one ecosystem under the umbrella of GitHub.  
- You can define who is allowed to read or write to the container images.  

However, there are also drawbacks:  
- If you want to move to another environment, the images must be rebuilt.  
- Personal accounts have limitations on bandwidth and storage.  

Once properly configured, if the `docker-compose.yml` files are accurate, you don’t need to build the images manually. Instead, you can simply pull the images from GHCR to run the services.  

Additionally, when reusing GHCR images in different CI/CD jobs, tests can be executed against the **published images**, rather than rebuilding everything from scratch in each workflow run.

---

## Setup: Push Your Own Docker Image to GitHub Container Registry

When forking this project and setting it up for the first time, the GitHub Actions workflow will most likely fail because GHCR is not yet configured.  

To fix this, follow these steps:  

1. **Ensure you have a GitHub account** (required to fork).  
2. **Update the `docker-compose.yml` files**:  
   - Adjust the image names to match your GitHub username.  
   - Use only **lowercase letters** (GHCR does not allow uppercase in image names).  
3. **Create a Personal Access Token (PAT):**  
   - Go to [GitHub Token Settings](https://github.com/settings/tokens).  
   - Create a **Personal Access Token (classic)**.  
   - Enable the following scopes:  
     - `write:packages`  
     - `read:packages`  
     - `delete:packages`  
4. **Add the token as a repository secret:**  
   - Go to your repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.  
   - Name the secret `GHCR_PAT`.  
   - Paste in the token you created.  

That’s it — once this is set up, GitHub Actions will be able to build and push your Docker images to GHCR.

---
