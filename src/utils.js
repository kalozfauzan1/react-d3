import * as d3 from 'd3'

/*
   * This data manipulation function takes the raw data from
   * the CSV file and converts it into an array of node objects.
   * Each node will store data and visualization values to visualize
   * a bubble.
   *
   * rawData is expected to be an array of data objects, read in from
   * one of d3's loading functions like d3.csv.
   *
   * This function returns the new node array, with a node in that
   * array for each element in the rawData input.
   */
export function createNodes(rawData) {
    // Use the max total_amount in the data as the max in the scale's domain
    // note we have to ensure the total_amount is a number.
  const maxAmount = d3.max(rawData, d => d.bajet2019)

    // Sizes bubbles based on area.
    // @v4: new flattened scale names.
  const group = () => {
        if (isNaN(d.beza)) {
            return 0;
        } else if (d.beza < -0.25) {
            return -3;
        } else if (d.beza < -0.05) {
            return -2;
        } else if (d.beza < -0.001) {
            return -1;
        } else if (d.beza <= 0.001) {
            return 0;
        } else if (d.beza <= 0.05) {
            return 1;
        } else if (d.beza <= 0.25) {
            return 2;
        } else {
            return 3;
        }
  }
  const radiusScale = d3.scalePow()
      .exponent(0.5)
      .range([2, 85])
      .domain([0, maxAmount])

    // Use map() to convert raw data into node data.
    // Checkout http://learnjsdata.com/ for more on
    // working with data.
  const myNodes = rawData.map(d => ({
    id: d.id,
    radius: radiusScale(d.bajet2019),
    value: d.bajet2019,
    name: d.kementerian,
    org: d.program,
    group: group,
    positions:{
      kementerian: {
        x:d.positions.kementerian.x,
        y:d.positions.kementerian.x
      }
    },
    year: 2018,
    x: Math.random() * 900,
    y: Math.random() * 800,
  }))

    // sort them descending to prevent occlusion of smaller nodes.
  myNodes.sort((a, b) => b.value - a.value)
  console.log(myNodes)

  return myNodes
}

export const fillColor = d3.scaleOrdinal().domain([-3, -2, -1, 0, 1, 2, 3]).range(["#c72d0a", "#e67761", "#d9a097", "#999", "#a7bb8f", "#7e965d", "#5a8731"])
export const strokeColor = d3.scaleOrdinal().domain([-3, -2, -1, 0, 1, 2, 3]).range(["#c72d0a", "#e67761", "#d9a097", "#999", "#a7bb8f", "#7e965d", "#5a8731"])
