import React from 'react';
import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';

const probabilityDistributionModal = ({ chartData, chartLayout }) => {
  return (
    <div>
      <Plot data={chartData} layout={chartLayout} style={{ width: '100%' }} />
    </div>
  );
};

probabilityDistributionModal.propTypes = {
  chartData: PropTypes.array,
  chartLayout: PropTypes.object,
};
export default probabilityDistributionModal;