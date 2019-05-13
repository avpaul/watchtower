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

export const getChartProps = lineName => {
  switch (lineName) {
    case 'On Track':
      return {
        stroke: '#3359dbff',
        strokeWidth: 5,
        activeDot: { r: 4, strokeWidth: 1 },
        className: 'lineA'
      };
    case 'Off Track':
      return {
        stroke: '#ffaf30cc',
        strokeWidth: 3,
        activeDot: { r: 3 },
        className: 'lineB'
      };
    case 'PIP':
      return {
        stroke: '#ff3030aa',
        strokeWidth: 1,
        activeDot: { r: 2.5 },
        className: 'lineC'
      };
    default:
      return {};
  }
};

const renderChartLine = lineName => (
  <Line type="monotone" dataKey={lineName} {...getChartProps(lineName)} />
);

const lineChart = data => (
  <LineChart
    width={12000}
    height={440}
    data={data}
    margin={{ top: 20, right: 50, left: 35, bottom: 80 }}
  >
    <XAxis
      dataKey="week"
      padding={{ left: 0 }}
      tickLine={false}
      angle={-45}
      dy={52}
      interval={0}
    />
    <YAxis tickLine={false} allowDecimals={false}>
      <Label value="Total Fellows" angle={-90} position="center" dx={-20} />
    </YAxis>
    <ReferenceLine x={data.slice(-1)[0].week} />
    <CartesianGrid vertical={false} />
    <Tooltip />
    <Legend
      verticalAlign="top"
      align="right"
      wrapperStyle={{ top: -44 }}
      iconType="circle"
    />
    {renderChartLine('On Track')}
    {renderChartLine('Off Track')}
    {renderChartLine('PIP')}
    {renderChartLine('')}
  </LineChart>
);

const Chart = ({ data, title }) => (
  <div className="line-chart-card">
    <div className="line-chart-card__header">
      <p className="my-auto"> {title}</p>
    </div>

    <ResponsiveContainer height={298} width="100%" minWidth={400}>
      {lineChart(data)}
    </ResponsiveContainer>
  </div>
);

Chart.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Chart;
