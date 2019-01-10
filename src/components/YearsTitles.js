import React from 'react'
import PropTypes from 'prop-types'

export default function YearsTitles({ yearCenters }) {
  return (
    <g className="yearsTitles">
      {
        Object.keys(yearCenters).map(year =>
          <foreignObject x={yearCenters[year].xTitle}
          y={yearCenters[year].yTitle} width="100" height="70" textAnchor="middle"
          alignmentBaseline="middle">
            <text
              key={year}
            >
              {
                year
              }
            </text>
          </foreignObject>)
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
