from fastapi import FastAPI,UploadFile,Form,File,Response,Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.staticfiles import StaticFiles
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
from typing import Annotated
import sqlite3

con = sqlite3.connect('carrot.db',check_same_thread=False)
cur = con.cursor()

cur.execute(f"""
                CREATE TABLE IF NOT EXISTS items(
	                id integer primary key,
	                title text not null,
	                image blob,
	                price integer not null,
	                description text,
	                place text not null,
	                timestamp integer
                );
            """)

app = FastAPI()

SECRET = "super-coding "
manager = LoginManager(SECRET,"/login")
    

@app.post("/items")
async def create_item(image:Annotated[UploadFile,File],title:Annotated[str,Form()],
                price:Annotated[int,Form()],
                description:Annotated[str,Form()],
                place:Annotated[str,Form()],
                timestamp:Annotated[int,Form()]):
    
    image_bytes = await image.read()
    cur.execute(f"""
                INSERT INTO items (title,image,price,description,place,timestamp)
                VALUES ('{title}','{image_bytes.hex()}',{price},'{description}','{place}',{timestamp})
                """)
    con.commit()
    return 'OK'

@app.get("/items")
async def get_item(user = Depends(manager)):
    con.row_factory = sqlite3.Row # 컬럼명 같이 가져오기
    cur = con.cursor()
    rows = cur.execute(f"""
                       SELECT * FROM items
                       """).fetchall()
    return JSONResponse(jsonable_encoder(dict(row) for row in rows))

@app.get("/images/{item_id}")
async def get_image(item_id):
    cur = con.cursor()
    image_bytes = cur.execute(f'''
                            SELECT image FROM items WHERE id = {item_id} 
                              ''').fetchone()[0]
    return Response(content=bytes.fromhex(image_bytes), media_type='image/*')

@app.post('/signup')
def signup(uid:Annotated[str,Form()],upw:Annotated[str,Form()],name:Annotated[str,Form()]):
    cur.execute(f"""
                INSERT INTO users(id,name,password)
                VALUES ('{uid}','{name}','{upw}');
                """)
    con.commit()
    return '200'

@app.get('/users')
def get_users():
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    datas = cur.execute(f"""
                  SELECT * FROM USERS
                """).fetchall()
    con.commit()
    return JSONResponse(jsonable_encoder(dict(data) for data in datas))

@manager.user_loader()
def query_user(data):
    WHERE_STATEMENTS = f"""
                        id="{data}"
                        """
    if type(data) == dict:
        WHERE_STATEMENTS = f"""
                            id="{data['id']}"
                            """
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    user = cur.execute(f"""
                        SELECT * FROM users WHERE {WHERE_STATEMENTS}
                       """).fetchone()
    con.commit()
    return user

@app.post("/root/login")
def login(idval:Annotated[str,Form()],pwval:Annotated[str,Form()]):

    user = query_user(idval)
    if not user:
        raise InvalidCredentialsException
    elif pwval != user['password']:
        raise InvalidCredentialsException
    
    access_token = manager.create_access_token(data={
        'sub': {
            'name': user['name'],
            'id': user['id'],
            'password': user['password']
        }
    })
    return {'access_token' : access_token }

app.mount("/root",StaticFiles(directory="publics",html = True),name="publics")