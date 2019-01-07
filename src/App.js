import React from 'react'
import * as d3 from 'd3'
import './App.scss'
import BubbleChart from './components/BubbleChart'
import Bubbles from './components/Bubbles'
import YearsTitles from './components/YearsTitles'
import GroupingPicker from './components/GroupingPicker'
import { createNodes } from './utils'
import { width, height, center, yearCenters } from './constants'
import { circl } from './data';

export default class App extends React.Component {
  state = {
    data: [],
    grouping: 'all',
  }

  componentDidMount() {
    const data = circl.budget_array_data.map(it => { return it })
    Promise.all([data]).then(() => this.setState({
      data: createNodes(data),
    }))
    d3.csv('data/gates_money.csv', (err, data) => {
      if (err) {
        console.log(err)
        return
      }
      console.log(data,'aaa');
      // this.setState({
      //   data: createNodes(data),
      // })
    })
  }

  onGroupingChanged = (newGrouping) => {
    this.setState({
      grouping: newGrouping,
    })
  }

  render() {
    const { data, grouping } = this.state
    console.log(data,'aaa');
    return (
      <div className="App">
        <GroupingPicker onChanged={this.onGroupingChanged} active={grouping} />
        <BubbleChart width={width} height={height}>
          <Bubbles data={data} forceStrength={0.03} center={center} yearCenters={yearCenters} groupByYear={grouping === 'year'} />
          {/* {
            grouping === 'year' &&
            <YearsTitles width={width} yearCenters={yearCenters} />
          } */}
        </BubbleChart>
      </div>
    )
  }

}
