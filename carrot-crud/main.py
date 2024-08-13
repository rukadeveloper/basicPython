from fastapi import FastAPI,UploadFile,Form,File,Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.staticfiles import StaticFiles
from typing import Annotated
import sqlite3

con = sqlite3.connect('carrot.db',check_same_thread=False)
cur = con.cursor()

app = FastAPI()
    

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
async def get_item():
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
    return Response(content=bytes.fromhex(image_bytes))


app.mount("/root",StaticFiles(directory="publics",html = True),name="publics")