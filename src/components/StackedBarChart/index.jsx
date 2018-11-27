import React from 'react';
import PropTypes from 'prop-types';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './index.css';

class StackedBarChart extends React.Component {
  state = {
    loading: false
  };

  static getDerivedStateFromProps(props) {
    return { loading: props.loading };
  }

  renderXAxis = () => (
    <XAxis
      dataKey="cohort"
      label={{
        fontSize: '14px',
        fontFamily: 'DIN Pro Light',
        position: 'insideBottom'
      }}
      axisLine={{ stroke: '#ECECEC' }}
      tickLine={false}
      tickSize={0}
      tickMargin={15}
      tick={{ fontSize: '14px', fontFamily: 'DIN Pro Light' }}
      interval={0}
    />
  );

  renderYAxis = ({ title }) => (
    <YAxis
      label={{
        value: `Total ${title}`,
        angle: -90,
        fontFamily: 'DIN Pro Light',
        position: 'insideLeft',
        fontSize: '14px'
      }}
      tickLine={false}
      axisLine={{ stroke: '#ECECEC' }}
      tick={{ fontSize: '12px', fontFamily: 'DIN Pro Light' }}
      tickMargin={10}
    />
  );

  renderToolTip = () => (
    <Tooltip
      cursor={{
        fill: '#fff',
        fillOpacity: 0.05
      }}
      wrapperStyle={{ fontSize: '12px', textAlign: 'center' }}
      itemStyle={{
        padding: '5px 21px',
        width: '162px',
        textAlign: 'center'
      }}
      offset={5}
    />
  );

  renderBarChart = (data, title) => (
    <BarChart data={data} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
      <CartesianGrid vertical={false} stroke="#ECECEC" />
      {this.renderXAxis()}
      {this.renderYAxis({ title })}
      {this.renderToolTip()}
      <Legend
        verticalAlign="top"
        align="right"
        wrapperStyle={{ top: -40 }}
        iconType="circle"
      />
      <Bar
        dataKey="offTrack"
        stackId="a"
        fill="#FFAF30"
        barSize={40}
        name="Off Track"
      />
      <Bar
        dataKey="onTrack"
        fill="#3359DB"
        stackId="a"
        name="On Track"
        barSize={40}
      />
    </BarChart>
  );

  render() {
    const { data, title } = this.props;
    const { loading } = this.state;
    return (
      <div className="chart_card scroll">
        <div className="chart_card__header">
          <p className="chart_card__title">{title}</p>
        </div>
        {loading && <span className="chart_loader" />}
        <ResponsiveContainer
          width="100%"
          minWidth={1300}
          height={260}
          className={`${loading && 'chart_card__loading'}`}
        >
          {this.renderBarChart(data, title)}
        </ResponsiveContainer>
      </div>
    );
  }
}

StackedBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      offTrack: PropTypes.number,
      onTrack: PropTypes.number
    })
  ).isRequired,
  title: PropTypes.string.isRequired
};

export default StackedBarChart;
