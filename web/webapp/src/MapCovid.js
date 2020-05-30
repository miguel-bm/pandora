import React from "react";
import keplerGlReducer from "kepler.gl/reducers";
import {processKeplerglJSON} from 'kepler.gl/processors';
import { Provider, useDispatch } from "react-redux";
import KeplerGl from "kepler.gl";
import { addDataToMap } from "kepler.gl/actions";
import useSwr from "swr";

import data_mammals from './data/mammals_mercfix.json';
import data_cultivated from './data/cultivated_mercfix.json';
import data_floods from './data/floods_mercfix.json';
import data_pastures from './data/pastures_mercfix.json';
import data_population from './data/population_mercfix.json';
import data_urban from './data/urban_mercfix.json';

import data_covid from './data/covid19.json';


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

function MapCovid() {
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

  const dataset_mammals = {
        data: data_mammals,
        info: {
          label: "Mammals", 
          id: "data_mammals"
        }
      }

  const dataset_cultivated = {
        data: data_cultivated,
        info: {
          label: "Cultivated Land",
          id: "data_cultivated"
        }
      }

  const dataset_floods = {
        data: data_floods,
        info: {
          label: "Flood riks",
          id: "data_floods"
        }
      }

  const dataset_pastures = {
        data: data_pastures,
        info: {
          label: "Pastures",
          id: "data_pastures"
        }
      }

  const dataset_population = {
        data: data_population,
        info: {
          label: "Population",
          id: "data_population"
        }
      }

  const dataset_urban = {
        data: data_urban,
        info: {
          id: "data_urban"
        }
      }


  const datasets = {datasets : [
                      dataset_mammals,
                      dataset_cultivated,
                      dataset_floods,
                      dataset_pastures,
                      dataset_population,
                      dataset_urban,
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

export default MapCovid
