import {
  XAxis, YAxis,
  BarChart, Bar, Brush
} from 'recharts';

import { scaleLog } from 'd3-scale'

import { Button, Grid, Typography, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'

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





function StatsView({ datePick, getSteps, stepData, getDeviceList, selectDevice }) {

  const [deviceList, setDeviceList] = useState(null);
  const [selected, setSelected] = useState("");

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
          <InputLabel id="deviceList">Select Device</InputLabel>
          <Select
            labelId="deviceList "
            autoWidth="false"
            onChange={(e) => { setSelected(e.target.value) }}>
            {deviceList && deviceList.map(dev => {
              return <MenuItem key={dev.deviceId} value={dev.deviceId}>{dev.deviceId}</MenuItem>
            })}
            {/*  <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={() => selectDevice(selected)}>
          Confirm
        </Button>
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
    <Brush dataKey="day" startIndex={0} endIndex={data.length - 1}>
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