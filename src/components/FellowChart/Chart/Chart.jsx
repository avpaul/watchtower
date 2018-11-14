import React from 'react';
import PropTypes from 'prop-types';

import './Chart.css';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ReferenceLine,
  ResponsiveContainer
} from 'recharts';

const Chart = ({ data, title }) => (
  <div className="line-chart-card">
    <div className="line-chart-card__header">
      <p className="my-auto"> {title}</p>
    </div>

    <ResponsiveContainer height={258} width="100%" minWidth={400}>
      <LineChart
        width={1200}
        height={300}
        data={data}
        margin={{ top: 20, right: 50, left: 35, bottom: 20 }}
      >
        <XAxis dataKey="name" padding={{ left: 25 }} tickLine={false} />
        <YAxis tickLine={false}>
          <Label value="Total Fellows" angle={-90} position="center" dx={-20} />
        </YAxis>
        <ReferenceLine x="Week 12" dx={-50} offset={25} />
        <CartesianGrid vertical={false} />
        <Tooltip />

        <Legend
          verticalAlign="top"
          align="right"
          wrapperStyle={{ top: -44 }}
          iconType="circle"
        />
        <Line
          dataKey="On Track"
          stroke="#3359db"
          activeDot={{ r: 4 }}
          className="lineA"
        />
        <Line dataKey="Off Track" stroke="#ffaf30" className="lineB" />
        <Line dataKey="PIP" stroke="#ff3030" className="lineC" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);
Chart.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};
export default Chart;
