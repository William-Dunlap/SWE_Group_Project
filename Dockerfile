# Stage 1: Build React app
FROM node:18 as react-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

RUN npm install firebase


# Stage 2: Flask app
FROM python:3.9-slim

WORKDIR /app

# Copy Flask app
COPY main.py /app/

# Copy React build output
COPY --from=react-build /app/frontend/build/ /app/frontend/public/

# Install Flask
RUN pip install flask
RUN pip install firebase-admin

# Set Flask environment variables
ENV FLASK_APP=main.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=development

# Expose Flask's port
EXPOSE 5000

# Run Flask
CMD ["flask", "run"]