# SWE_Group_Project
First clone the repository \
Navigate to the directory using the command line \
Add flask to the interpreter with 
* pip install flask 

Run 
* cd frontend 
* npm install  
* npm run build  

Install docker desktop 
Open docker desktop and navigate to the images tab \
Look at the bottom right and click the terminal button 
Run 
* docker build -t flask-react-app .
* docker run -p 5000:5000 flask-react-app

Then go to localhost:5000 to view the page