import React from "react";
import keplerGlReducer from "kepler.gl/reducers";
import {processKeplerglJSON} from 'kepler.gl/processors';
import { Provider, useDispatch } from "react-redux";
import KeplerGl from "kepler.gl";
import { addDataToMap } from "kepler.gl/actions";
import useSwr from "swr";

import data_x1 from './data_processed/X1.json';
import data_x2 from './data_processed/X2.json';
import data_x3 from './data_processed/X3.json';
import data_x4 from './data_processed/X4.json';

import data_zoonotic from './data_processed/zoonotic_factor.json';

import data_demographic from './data_processed/dem.json';


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

function MapProcessed() {
  const dispatch = useDispatch();
  // const data_covid = useSwr("covid", async () => {
  //   const response = await fetch(
  //     //"https://gist.githubusercontent.com/leighhalliday/a994915d8050e90d413515e97babd3b3/raw/a3eaaadcc784168e3845a98931780bd60afb362f/covid19.json"
  //     //"https://nasa-covid.s3-eu-west-1.amazonaws.com/data_forest.csv"
  //     //'.covid19.json'
  //     "https://nasa-covid.s3-eu-west-1.amazonaws.com/covid19.json"
  //     //"https://nasa-covid.s3-eu-west-1.amazonaws.com/all_mammals.json"
  //   );
  //   const data = await response.json();
  //   await console.log(data)
  //   return data;
  // });
  //
  // const data_mammals = useSwr("covid", async () => {
  //   const response = await fetch(
  //     //"https://gist.githubusercontent.com/leighhalliday/a994915d8050e90d413515e97babd3b3/raw/a3eaaadcc784168e3845a98931780bd60afb362f/covid19.json"
  //     //"https://nasa-covid.s3-eu-west-1.amazonaws.com/data_forest.csv"
  //     //'.covid19.json'
  //     "https://nasa-covid.s3-eu-west-1.amazonaws.com/covid19.json"
  //     //"https://nasa-covid.s3-eu-west-1.amazonaws.com/all_mammals.json"
  //   );
  //   const data = await response.json();
  //   await console.log(data)
  //   return data;
  // });

  // const data_ta = processKeplerglJSON('.covid19.json');
  // console.log('loaded data 1')
  // // Use processCsvData helper to convert csv file into kepler.gl structure {fields, rows}
  // const data_m = processKeplerglJSON('.covid19.json');
  // console.log('loaded data 2')
  // console.log(data_m)


  // const dataset_covid = {
  //       data: data_covid,
  //       info: {
  //         id: "data_covid"
  //       }
  //     }

  const dataset_x1 = {
        data: data_x1,
        info: {
          label: "Deforestation Impact",
          id: "data_x1"
        }
      }

  const dataset_x2 = {
        data: data_x2,
        info: {
          label: "Non Industrial Land Use",
          id: "data_cultivated"
        }
      }

  const dataset_x3 = {
        data: data_x3,
        info: {
          label: "High Biodiversity",
          id: "data_floods"
        }
      }

  const dataset_x4 = {
        data: data_x4,
        info: {
          label: "Major Environmental Disruptors",
          id: "data_pastures"
        }
      }

  const dataset_demographic = {
        data: data_demographic,
        info: {
          label: "Population",
          id: "data_population"
        }
      }

  const dataset_zoonotic = {
            data: data_zoonotic,
            info: {
              label: "Zoonotic Risk",
              id: "data_zoonotic"
            }
          }

  const datasets = {datasets : [
                      dataset_x1,
                      dataset_x2,
                      dataset_x3,
                      dataset_x4,
                      dataset_zoonotic,
                      dataset_demographic,
                    ],
                    option: {
                      centerMap: true,
                      readOnly: false
                    },
                    config: {
                      mapStyle: {styleType: 'dark'},
                    }}

  console.log(datasets)

  React.useEffect(() => {
    if (datasets) {
      dispatch(
        addDataToMap(datasets)
      );
    }
  }, [dispatch, datasets]);

  return (
    <KeplerGl
      id="covid"
      mapboxApiAccessToken="pk.eyJ1IjoicGFibG90OTQiLCJhIjoiY2o5dDRuZzRrM3FyNTJ3bXZwMjdrazh0dyJ9.4mCctZYbFkZ0kO_oA7Ni8Q"
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
}

export default MapProcessed
