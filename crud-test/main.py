from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()

class Memo(BaseModel):
    id:int
    content:str

memos = []

@app.post('/memos')
def create_memo(memo:Memo):
    memos.append(memo)
    return "성공"

@app.post("/reset")
def reset_memo():
    global memos
    memos = []
    return "리셋완료"

@app.get('/memos')
def read_memo():
    return memos

app.mount("/",StaticFiles(directory="public",html=True), name="public")