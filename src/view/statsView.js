import {
  XAxis, YAxis,
  BarChart, Bar, Brush
} from 'recharts';

import { scaleLog } from 'd3-scale'

import { Grid, Typography } from '@material-ui/core'

import * as _ from 'lodash';

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


function StatsView() {
  return (
    <Grid container style={{ "height": "calc(100vh - 65px)", "alignContent": "center" }}>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Typography style={{ "fontSize": 50, "fontWeight": "bold" }}>Statistics: Steps</Typography>
          <Grid container justify="center" style={{ "padding": "40px" }}>
            <Grid style={{ "border": "solid 4px", "borderRadius": "5px", "padding": "30px", "backgroundColor": "#F9F4F5" }}>
              <BarChart
                width={1000} height={500} data={data01}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <XAxis dataKey="day" />
                <YAxis />
                <Bar dataKey="steps" fill="#E0607E" label={renderCustomBarLabel} />
                <Brush dataKey="date" startIndex={0} endIndex={10}>
                  <BarChart>
                    <YAxis hide />
                    <Bar dataKey="steps" fill="#E0607E" dot={false} />
                  </BarChart>
                </Brush>
              </BarChart>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
  return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`${value}`}</text>;
};


export { StatsView }