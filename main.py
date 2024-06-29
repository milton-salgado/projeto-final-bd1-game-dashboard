import argparse
import uvicorn
import configparser
import os.path as p

parser = argparse.ArgumentParser()
parser.add_argument("--config", help="Configuration file", type=str, default=p.join(p.dirname(p.abspath(__file__)), 'configurations.ini'))
args = parser.parse_args()

if args.config:
    print("Starting service with config file: ", args.config)

config = configparser.ConfigParser()
config.read(args.config)

def main():
    # Prepare application environment:
    uvicorn_env_file = open(p.join(p.dirname(p.abspath(__file__)), '.uvicorn.env'), "w")
    uvicorn_env_file.write(f"databaseConnectionString={config['database']['ConnectionString']}")
    uvicorn_env_file.close()

    # Start server: 
    uvicorn.run("api:app", port=5432, reload=True, access_log=False, env_file=".uvicorn.env")

if __name__ == "__main__":
    main()
