import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
import configparser

import queries.summary_rest as summary_rest

# Load configuration
config = configparser.ConfigParser()
config.read('configurations.ini')

# Set up engine:
engine = create_engine(config['database']['ConnectionString'], echo=True)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex='http://localhost:.*',
    allow_methods=["*"],
    allow_headers=["*"]
)

conn = engine.connect()
summary_rest.register_calls(app, conn)
