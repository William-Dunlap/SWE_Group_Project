# Use a lightweight Python image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy Flask app
COPY main.py /app/

# Copy the React public folder (with templates and static)
COPY frontend/public /app/frontend/public

# Install Flask
RUN pip install flask

# Set Flask environment variables
ENV FLASK_APP=main.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=development

# Expose Flask's port
EXPOSE 5000

# Run Flask
CMD ["flask", "run"]
