import React from 'react'
import PropTypes from 'prop-types'

export default function YearsTitles({ yearCenters }) {
  return (
    <g className="yearsTitles">
      {
        Object.keys(yearCenters).map(year =>
          <text
            key={year}
            x={yearCenters[year].x}
            y={yearCenters[year].y}
            fontSize="10"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {
              year
            }
          </text>)
      }
    </g>
  )
}

YearsTitles.propTypes = {
  yearCenters: PropTypes.objectOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired).isRequired,
}
