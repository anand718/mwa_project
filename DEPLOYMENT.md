# 🚀 Deployment Guide: CyberLab Simulator

This guide outlines the steps to deploy the CyberLab Simulator to various platforms.

## ☁️ Deploying to Google Cloud Run (Recommended)

Since this project is built in the Google AI Studio environment, it is optimized for Cloud Run.

1.  **Build the Project**:
    Ensure the project builds successfully by running:
    ```bash
    npm run build
    ```
2.  **Containerization**:
    The project includes a `package.json` with a build script that produces a static `dist/` folder. The AI Studio infrastructure automatically handles the serving of these files.
3.  **Deployment**:
    Use the "Deploy" button in the AI Studio interface to push the application to a live Cloud Run URL.

## 🐙 Deploying to GitHub Pages

To host this as a static site on GitHub:

1.  **Install `gh-pages`**:
    ```bash
    npm install gh-pages --save-dev
    ```
2.  **Update `package.json`**:
    Add the following scripts:
    ```json
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
    ```
3.  **Run Deploy**:
    ```bash
    npm run deploy
    ```

## ⚡ Deploying to Vercel / Netlify

1.  Connect your GitHub repository to Vercel or Netlify.
2.  Set the **Build Command** to `npm run build`.
3.  Set the **Output Directory** to `dist`.
4.  Add any required environment variables (like `GEMINI_API_KEY` if used).

## 🐳 Docker Deployment

If you wish to run this in a custom container:

1.  **Create a `Dockerfile`**:
    ```dockerfile
    FROM node:20-alpine as build
    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY . .
    RUN npm run build

    FROM nginx:alpine
    COPY --from=build /app/dist /usr/share/nginx/html
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    ```
2.  **Build and Run**:
    ```bash
    docker build -t cyberlab-simulator .
    docker run -p 8080:80 cyberlab-simulator
    ```

---
**Note:** Ensure that the `VITE_` prefix is used for any environment variables that need to be accessed by the frontend in production.
