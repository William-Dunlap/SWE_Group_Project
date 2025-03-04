# Step 1: Build the React app (using Node.js)
FROM node:16 AS build

WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build  # This will generate the React build in /app/frontend/build

# Step 2: Set up the Flask app (using Python)
FROM python:3.9-slim

# Install system dependencies and Python dependencies
WORKDIR /app
COPY main/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy Flask app code into container
COPY main/ /app/

# Copy the React build files into the Flask app's static directory (for serving)
COPY --from=build /app/frontend/build /app/static

# Expose necessary ports
EXPOSE 5000
EXPOSE 80

# Run both Flask and serve the React app (Flask serves React from static folder)
CMD ["sh", "-c", "python app.py & npx serve /app/static -p 80"]
