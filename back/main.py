import uvicorn
import os.path as p

def main():
    # Prepare application environment:
    uvicorn_env_file = open(p.join(p.dirname(p.abspath(__file__)), '.uvicorn.env'), "w")
    uvicorn_env_file.close()

    # Start server: 
    uvicorn.run("api:app", port=5432, reload=True, access_log=False, env_file=".uvicorn.env")

if __name__ == "__main__":
    main()
