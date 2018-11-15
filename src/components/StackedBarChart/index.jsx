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

  renderBarChart = (data, title) => (
    <BarChart data={data} margin={{ top: 20, right: 30, left: 30, bottom: 5 }}>
      <CartesianGrid vertical={false} />
      <XAxis dataKey="cohort" />
      <YAxis
        label={{
          value: `Total ${title}`,
          angle: -90,
          position: 'insideBottomLeft'
        }}
      />
      <Tooltip cursor={{ fill: '#fff', fillOpacity: 0.05, position: 'top' }} />
      <Legend
        verticalAlign="top"
        align="right"
        wrapperStyle={{ top: -40 }}
        iconType="circle"
      />
      <Bar dataKey="offTrack" stackId="a" fill="#FFAF30" barSize={30} />
      <Bar dataKey="onTrack" stackId="a" fill="#3359DB" barSize={30} />
    </BarChart>
  );

  render() {
    const { data, title } = this.props;
    const { loading } = this.state;
    return (
      <div className="chart_card">
        <div className="chart_card__header">
          <p className="chart_card__title"> {title}</p>
        </div>
        {loading && <span className="chart_loader" />}
        <ResponsiveContainer
          width="100%"
          height={200}
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
