import React from 'react';
import PropTypes from 'prop-types';
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

import './Chart.css';

const Chart = ({ data, averageRatings }) => (
  <div className="line-chart-card pulse-chart__legend">
    <div className="line-chart-card__header" />
    <ResponsiveContainer height={330} width="100%" minWidth={500}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 50, left: 35, bottom: 50 }}
        width={300}
        height={300}
      >
        <XAxis
          dataKey="week"
          padding={{ left: 25 }}
          tickLine={false}
          angle={45}
          label={{ fontFamily: 'DIN Pro Light' }}
          axisLine={{ stroke: '#ECECEC' }}
          tick={{ fontSize: '12px', fontFamily: 'DIN Pro Light' }}
          tickMargin={25}
          interval={0}
        />
        <YAxis
          tickLine={false}
          domain={[-3, 3]}
          axisLine={{ stroke: '#ECECEC' }}
          tickSize={0}
          tickMargin={15}
          ticks={[-2, -1, 0, 1, 2]}
          tickCount={5}
          tick={{ fontSize: '14px', fontFamily: 'DIN Pro Light' }}
        >
          <Label
            value="DevPulse Ratings"
            angle={-90}
            position="center"
            dx={-20}
            fontFamily="DIN Pro Light"
          />
        </YAxis>
        <CartesianGrid vertical={false} stroke="#ccc" />
        <ReferenceLine y="1" stroke="white" strokeDasharray="5 5" />
        <ReferenceLine
          x={
            data[data.length - 1] !== undefined
              ? data[data.length - 1].week
              : 'week'
          }
          dx={-50}
          offset={25}
        />
        <Tooltip />
        <Legend
          payload={[
            {
              value: `Quantity - ${averageRatings.quantity}`,
              type: 'circle',
              color: '#FF3030'
            },
            {
              value: `Quality - ${averageRatings.quality}`,
              type: 'circle',
              color: '#9C8330'
            },
            {
              value: `Professionalism - ${averageRatings.professionalism}`,
              type: 'circle',
              color: '#000000'
            },
            {
              value: `Initiative - ${averageRatings.initiative}`,
              type: 'circle',
              color: '#72BCD4'
            },
            {
              value: `Integration - ${averageRatings.integration}`,
              type: 'circle',
              color: '#FFAF30'
            },
            {
              value: `Communication - ${averageRatings.communication}`,
              type: 'circle',
              color: '#3359DB',
              marginRight: '40px'
            }
          ]}
          verticalAlign="top"
          align="center"
          itemStyle={{
            paddingRight: '40px',
            textAlign: 'center'
          }}
          wrapperStyle={{
            top: -44,
            fontFamily: 'DIN Pro Light',
            width: 'inherit'
          }}
          iconType="circle"
        />
        <Line
          type="monotone"
          dataKey="communication"
          stroke="#3359DB"
          activeDot={{ r: 4 }}
          className="lineA"
        />
        <Line
          type="monotone"
          dataKey="integration"
          stroke="#FFAF30"
          className="lineB"
          id="ID02"
        />
        <Line
          type="monotone"
          dataKey="initiative"
          stroke="#72BCD4"
          className="lineC"
        />
        <Line
          type="monotone"
          dataKey="professionalism"
          stroke="#000000"
          className="lineD"
        />
        <Line
          type="monotone"
          dataKey="quality"
          stroke="#9C8330"
          className="lineE"
        />
        <Line
          type="monotone"
          dataKey="quantity"
          stroke="#FF3030"
          className="lineF"
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);
Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  averageRatings: PropTypes.shape({
    quantity: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ]),
    quality: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ]),
    initiative: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ]),
    communication: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ]),
    professionalism: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ]),
    integration: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ])
  }).isRequired
};
export default Chart;
