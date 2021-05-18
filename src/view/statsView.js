import {
  XAxis, YAxis,
  BarChart, Bar, Brush
} from 'recharts';

import { scaleLog } from 'd3-scale'

import { Grid, Typography, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'

import * as _ from 'lodash';
import { useState, useEffect } from 'react';


const devices = [
  "device-1",
  "device2",
  "dev3",
  "Old-one",
  "not-used"
]

const domain = [
  10,
  200,
  30,
  53,
  123,
  984,
  321,
  1,
  23,
  94,
  10,
  200,
  30,
  53,
  123,
  984,
  321,
  1,
  23,
  94,
  10,
  200,
  30,
  53,
  123,
  984,
  321,
  1,
  23,
  94,
  10,
  200,
  30,
  53,
  123,
  984,
  321,
  1,
  23,
  94
]

const data01 = [
  { day: '05/01', steps: domain[0] },
  { day: '06/01', steps: domain[1] },
  { day: '07/01', steps: domain[2] },
  { day: '08/01', steps: domain[3] },
  { day: '09/01', steps: domain[4] },
  { day: '10/01', steps: domain[5] },
  { day: '11/01', steps: domain[6] },
  { day: '12/01', steps: domain[7] },
  { day: '13/01', steps: domain[8] },
  { day: '14/01', steps: domain[0] },
  { day: '15/01', steps: domain[1] },
  { day: '16/01', steps: domain[2] },
  { day: '17/01', steps: domain[3] },
  { day: '18/01', steps: domain[4] },
  { day: '19/01', steps: domain[5] },
];



function StatsView({ datePick, getSteps, stepData, getDeviceList, selectDevice }) {


  const [deviceList, setDeviceList] = useState(null);

  useEffect(() => {
    getDeviceList().then(list => {
      setDeviceList(list.results);
    })
  }, []);

  return (
    <Grid container justify="center" style={{ "marginTop": 30, "alignContent": "center" }}>
      <Grid container justify="center">
        <Typography style={{ "fontSize": 50, "fontWeight": "bold" }}>Statistics: Steps</Typography>
      </Grid>
      <Grid container justify="center" style={{ "height": 150, "width": 200 }}>
        <FormControl variant="outlined" fullWidth="true" >
          <InputLabel id="demo-simple-select-outlined-label">Select Device</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            autoWidth="false"
            onChange={e => selectDevice(e.target.value)}>
            {deviceList && deviceList.map(dev => {
              return <MenuItem key={deviceList.deviceId} value={dev.deviceId}>{dev.deviceId}</MenuItem>
            })}
            {/*  <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
        </FormControl>

      </Grid>

      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid container justify="center" style={{ "padding": "40px" }}>
            <Grid style={{ "border": "solid 4px", "borderRadius": "5px", "padding": "30px", "backgroundColor": "#F9F4F5" }}>
              <StepsGraph data={stepData} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          {datePick()}
          <button onClick={() => getSteps()}>
            Get stats
            </button>
        </Grid>
      </Grid>
    </Grid>
  );
}

function StepsGraph({ data }) {
  return <BarChart
    width={800} height={500} data={data}
    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
    <XAxis dataKey="day" />
    <YAxis />
    <Bar dataKey="steps" fill="#E0607E" label={renderCustomBarLabel} />
    <Brush dataKey="day" startIndex={0} endIndex={10}>
      <BarChart>
        <YAxis hide />
        <Bar dataKey="steps" fill="#E0607E" dot={false} />
      </BarChart>
    </Brush>
  </BarChart>;
}

const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
  return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`${value}`}</text>;
};


export { StatsView }