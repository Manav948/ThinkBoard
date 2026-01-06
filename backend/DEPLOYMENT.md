# Deployment Guide for Render

This guide will help you deploy the backend to Render.

## Environment Variables

Set the following environment variables in your Render dashboard:

### Required Variables

1. **MONGO_URI**
   - Your MongoDB connection string
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

2. **UPSTASH_REDIS_REST_URL**
   - Your Upstash Redis REST URL
   - Get this from your Upstash dashboard

3. **UPSTASH_REDIS_REST_TOKEN**
   - Your Upstash Redis REST Token
   - Get this from your Upstash dashboard

### Optional Variables

4. **PORT**
   - Server port (Render automatically sets this, but you can override)
   - Default: `5001`

5. **NODE_ENV**
   - Set to `production` for production deployment
   - Default: `development`

6. **ALLOWED_ORIGINS**
   - Comma-separated list of allowed frontend URLs
   - Example: `http://localhost:5173,https://your-frontend.onrender.com`
   - Default: `http://localhost:5173`

## Render Deployment Steps

1. **Create a New Web Service**
   - Go to your Render dashboard
   - Click "New +" → "Web Service"
   - Connect your repository

2. **Configure Build Settings**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend` (if your repo root contains both frontend and backend)

3. **Set Environment Variables**
   - Go to the "Environment" tab
   - Add all the required environment variables listed above

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your application

## Health Check

The application includes a health check endpoint at `/health` that Render can use for monitoring.

## Notes

- The server listens on `0.0.0.0` to accept connections from Render's load balancer
- CORS is configured to allow requests from your frontend domain
- Make sure to update `ALLOWED_ORIGINS` with your production frontend URL

