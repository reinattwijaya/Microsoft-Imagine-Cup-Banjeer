### BACKEND:
1. Create your own virtual environment in backend/venv folder and enable it in your terminal/ide (make sure your pip is up to date).  
Linux/Mac
```
python3 -m venv venv
source venv/bin/activate
```
Windows
```
python3 -m venv venv
venv\Scripts\activate.bat
```

2. Open backend directory with your console. Install needed modules:
```
pip install -r requirements.txt
```

3. Finally, run the backend in src folder
```
python manage.py runserver
```
PS: you may need to migrate django models if backend doesn't work
```
python manage.py makemigrations
python manage.py migrate
```
4. For the api just call the url:
```
http://127.0.0.1:8000/api/river
```