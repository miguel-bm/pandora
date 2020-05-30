"""
This script downloads the EarthEnv Consensus Land Cover dataset (reduced version, without DISCover)
"""


import typer
import yaml
import requests
import urllib
from pathlib import Path


def load_yaml(path):
    path = Path(path)
    with open(path) as yaml_file:
        data = yaml.load(yaml_file, Loader=yaml.FullLoader)
    return data


def download_file(url, save_location, allow_redirects=True):
    request = requests.get(url, allow_redirects=allow_redirects)
    with open(save_location, "wb") as file:
        file.write(request.content)


def download_earthenv(
    destination: str = "data/raw/earthenv/",
    path_yaml: str = "data/raw/earthenv_urls.yaml",
    redownload: bool = False,
):
    """Download all files listed in provided .yaml file"""
    urls = load_yaml(path_yaml)
    destination = Path(destination)

    for layer, url in urls.items():
        filename = layer + ".tif"
        if ((destination / filename).is_file() == False) or redownload:
            print(f"Downloading data for {layer} to {destination/filename}...")
            download_file(url=url[0], save_location=destination / filename)
            print(f"Complete!")
        else:
            print(f"File for {layer} already exists! Moving ahead.")
    print(f"Finished download queue :D")


if __name__ == "__main__":
    typer.run(download_earthenv)
