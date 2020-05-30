import typer
import numpy as np
import yaml
import requests
import urllib
from pathlib import Path


def load_yaml(path):
    path = Path(path)
    with open(path) as yaml_file:
        data = yaml.load(yaml_file, Loader=yaml.FullLoader)

    return data


def coords_to_granule(coords):
    lat, lon = coords
    assert -90 <= lat <= 90, "Longitude out of valid range"
    assert -180 <= lon < 180, "Latitude out of valid range"

    # Transform the latitude
    granule_lat = int(np.ceil(lat / 10) * 10)
    str_lat = str(abs(granule_lat)).zfill(2) + ("N" if granule_lat >= 0 else "S")

    # Transform the longitude
    granule_lon = int(np.floor(lon / 10) * 10)
    str_lon = str(abs(granule_lon)).zfill(3) + ("E" if granule_lon >= 0 else "W")

    return str_lat + "_" + str_lon


def url_for_granule(coords, layer, url_dict):
    assert -60 < coords[0] <= 80, "Longitude out of available granule range"
    assert layer in url_dict, "Requested layer is not in the provided URL dict"
    for url in url_dict[layer]:
        granule_str = coords_to_granule(coords)
        if granule_str in url:
            return url
    raise Exception(
        f"URL not found for granule {granule_str} corresponding to requested coordinates {coords}."
    )


def download_granule(coords, layer, destination, url_dict, redownload=False):
    url = url_for_granule(coords, layer, url_dict)
    filename = Path(urllib.parse.urlparse(url).path).name
    destination = Path(destination)
    # If file already exists, do not download again unless specified
    if ((destination / filename).is_file() == False) or redownload:
        request = requests.get(url, allow_redirects=True)
        with open(destination / filename, "wb") as file:
            file.write(request.content)


def download_list(coords_list: list, layer: str, destination, url_dict: dict):
    for coords in coords_list:
        print(f"Downloading data for layer {layer} at coordinates {coords}...")
        download_granule(
            coords, layer=layer, destination=destination, url_dict=url_dict, redownload=False
        )
        print(f"Complete!")
    print(f"Finished download queue :D")


def download_full_map(
    layer: str, destination: str = "data/raw/hansen/", path_yaml: str = "data/raw/hansen_urls.yaml"
):
    all_granules = [(lat, lon) for lon in range(-180, 180, 10) for lat in range(-50, 90, 10)]
    urls = load_yaml(path_yaml)
    download_list(all_granules, layer=layer, destination=destination, url_dict=urls)


if __name__ == "__main__":
    typer.run(download_full_map)
