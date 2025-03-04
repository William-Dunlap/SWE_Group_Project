# Use multi-stage builds to build React first
FROM node:16 AS build

WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Set up the Flask app
FROM python:3.9-slim

WORKDIR /app

# Install Flask
RUN pip install flask

# Copy Flask app (main.py)
COPY main.py /app/

# Copy React build output to Flask's serving directory
COPY --from=build /app/frontend/public/static /app/static
COPY --from=build /app/frontend/public/templates /app/templates

# Expose Flask port
EXPOSE 5000

# Run Flask app
CMD ["python", "main.py"]
