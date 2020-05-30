import numpy as np
import rasterio
import PIL
from PIL import Image
from pathlib import Path
import pickle
import json
import multiprocessing
import typer

import matplotlib.pyplot as plt


def granule_from_tif(tif_location, granule_size=30):
    locator = (tif_location).stem[-8:]

    with rasterio.open(tif_location) as dataset_reader:
        # Upscale factor for achieving appropriate longitude dimension
        upscale_factor = 1 / (dataset_reader.width / granule_size)
        # Downscale the dataset. Avg scaling to retain integer info
        array = dataset_reader.read(
            out_shape=(
                dataset_reader.count,
                int(dataset_reader.height * upscale_factor),
                int(dataset_reader.width * upscale_factor),
            ),
            resampling=rasterio.enums.Resampling.average,
        ).squeeze()

    return (array, locator)


def integrate_granule_to_base(base, granule, locator, lat_range=(-60, 80), granule_size=30):
    lat = int(locator[:2]) * (1 if locator[2] == "N" else -1)
    lon = int(locator[4:7]) * (1 if locator[7] == "E" else -1)

    lat_degs = lat_range[1] - lat_range[0]

    lat_min_id = int((80 - lat) / lat_degs * base.shape[0])
    lat_max_id = lat_min_id + granule_size
    lon_min_id = int((lon + 180) / 360 * base.shape[1])
    lon_max_id = lon_min_id + granule_size

    base[lat_min_id:lat_max_id, lon_min_id:lon_max_id] = granule

    return base


def save_outputs(array, name, location, value_type="real", round_to=3):
    with open(location / f"{name}.pickle", "wb") as file:
        pickle.dump(array, file)
    array_to_json(array, location / f"{name}.json", value_type=value_type, round_to=round_to)
    plt.imsave(location / f"{name}.jpg", array, cmap="inferno")


def process_all(
    layer: str, output_folder: str, input_folder: str = "data/raw/hansen/", img_size=(420, 1080)
):

    input_folder = Path(input_folder)
    output_folder = Path(output_folder)

    output_folder.mkdir(parents=True, exist_ok=True)

    tif_files = list(input_folder.glob(f"*{layer}*.tif"))

    max_processes = multiprocessing.cpu_count()
    pool = multiprocessing.Pool(max_processes)
    results = pool.map(granule_from_tif, tif_files)

    base = np.zeros(img_size)
    for granule, locator in results:
        base = integrate_granule_to_base(base, granule, locator)
    array = base

    if layer == "lossyear":
        array[array != 0] = 1

    save_outputs(array, layer, output_folder, value_type="real", round_to=3)
    return array


def array_to_json(
    array,
    destination,
    value_name="value",
    value_type="real",
    round_to=3,
    lon_range=(-180, 180),
    lat_range=(-60, 80),
    threshold=0,
    normalize_by=1.0,
):
    data = {}
    fields = [
        {"name": "latitude", "format": "", "type": "real"},
        {"name": "longitude", "format": "", "type": "real"},
        {"name": value_name, "format": "", "type": value_type},
    ]
    data["fields"] = fields
    data["rows"] = array_to_coords(
        array,
        round_to=round_to,
        lon_range=lon_range,
        lat_range=lat_range,
        threshold=threshold,
        normalize_by=normalize_by,
    )
    with open(destination, "w") as file:
        json.dump(data, file)


def array_to_coords(
    array, round_to=3, lon_range=(-180, 180), lat_range=(-60, 80), threshold=0, normalize_by=1.0
):
    norm = array / normalize_by
    lats = np.arange(lat_range[1], lat_range[0], -(lat_range[1] - lat_range[0]) / array.shape[0])
    lons = np.arange(lon_range[0], lon_range[1], (lon_range[1] - lon_range[0]) / array.shape[1])
    rows = list()
    rows = [
        [
            round(float(lats[i]), round_to),
            round(float(lons[j]), round_to),
            round(float(norm[i, j]), round_to),
        ]
        for j in range(array.shape[1])
        for i in range(array.shape[0])
        if array[i, j] > threshold
    ]  # Do not store values below or equal to the threshold (e.g. zeroes)
    return rows


if __name__ == "__main__":
    typer.run(process_all)
