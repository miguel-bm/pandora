import React from "react";
import keplerGlReducer from "kepler.gl/reducers";
import { Provider, useDispatch } from "react-redux";
import KeplerGl from "kepler.gl";
import { addDataToMap } from "kepler.gl/actions";
import useSwr from "swr";


// {mapState, mapStyle, visState}
const sampleConfig = {
  visState: {
    filters: [
      {
        id: 'me',
        dataId: 'test_trip_data',
        name: 'tpep_pickup_datetime',
        type: 'timeRange',
        enlarged: true
      },
    ]
  }
}

function MapMammals() {
  const dispatch = useDispatch();
  const { data } = useSwr("mammals", async () => {
    const response = await fetch(
      //"https://gist.githubusercontent.com/leighhalliday/a994915d8050e90d413515e97babd3b3/raw/a3eaaadcc784168e3845a98931780bd60afb362f/covid19.json"
      //"https://nasa-covid.s3-eu-west-1.amazonaws.com/data_forest.csv"
      //'.covid19.json'
      "https://nasa-covid.s3-eu-west-1.amazonaws.com/mammals_data.json"
    );
    const data = await response.json();
    return data;
  });

  React.useEffect(() => {
    if (data) {
      dispatch(
        addDataToMap({
          datasets: {
            info: {
              label: "Mammals",
              id: "mammals"
            },
            data
          },
          option: {
            centerMap: true,
            readOnly: false
          },
          config: {
            mapStyle: {styleType: 'dark'}
          }
        })
      );
    }
  }, [dispatch, data]);

  return (
    <KeplerGl
      id="mammals"
      mapboxApiAccessToken="pk.eyJ1IjoicGFibG90OTQiLCJhIjoiY2o5dDRuZzRrM3FyNTJ3bXZwMjdrazh0dyJ9.4mCctZYbFkZ0kO_oA7Ni8Q"
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
}

export default MapMammals
