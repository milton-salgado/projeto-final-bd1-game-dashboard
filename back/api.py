import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine

import queries.summary_rest as summary_rest
import queries.quantity_rest as quantity_rest

# Directly specify the connection string
connection_string = "mysql+pymysql://root:senha@localhost/banco"

# Set up engine:
engine = create_engine(connection_string, echo=True)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex='http://localhost:.*',
    allow_methods=["*"],
    allow_headers=["*"]
)

conn = engine.connect()
summary_rest.register_calls(app, conn)
quantity_rest.register_calls(app, conn)
