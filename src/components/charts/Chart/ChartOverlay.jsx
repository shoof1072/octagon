import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class ChartOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.mouseMove = this.mouseMove.bind(this);
  }

  mouseMove(e) {
    const { xScale, data } = this.props;
    const bisectXAxis = d3.bisector((d) => d.x).left;
    const node = ReactDOM.findDOMNode(this);

    const bounds = node.getBoundingClientRect();
    const x = Math.floor(Math.abs(e.clientX - bounds.left));
    const y = Math.floor(Math.abs(e.clientY - bounds.top));

    const x0 = xScale.invert(x);

    const i = bisectXAxis(data, x0, 1);
    const d0 = this.props.data[i - 1];
    const d1 = this.props.data[i];
    const d = x0 - d0.x > d1.x - x0 ? d1 : d0;

    // const toolTipData = {
    //   key: d[this.props.xData],
    //   value: d[yData],
    // };

    const toolTipPos = { x, y };

    this.props.mouseMove(d, toolTipPos);
  }

  render() {
    const { height, hideToolTip, width } = this.props;
    return (
      <rect
        className="overlay"
        width={width}
        fill={'none'}
        stroke={'none'}
        style={{ pointerEvents: 'all' }}
        height={height}
        onMouseMove={(e) => { this.mouseMove(e); }}
        onMouseOut={hideToolTip}
      />
    );
  }
}

ChartOverlay.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  hideToolTip: PropTypes.func,
  mouseMove: PropTypes.func.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default ChartOverlay;
