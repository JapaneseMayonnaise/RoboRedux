import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

import { setSearchField, requestRobots } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
} 

// Dispatch: what triggers an action
const mapDispatchToProps = dispatch => {
  return {
    // function onSearchChange "dispatches" what setSearchField returns, which is type and payload
    // This is same as "function onSearchChange(event) {dispatch(setSearchField(event.target.value)}"
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends Component {
  componentDidMount() {   
    this.props.onRequestRobots();
  } 

  render() {
    const { searchField, onSearchChange, robots, isPending } = this.props;

    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().startsWith(searchField.toLowerCase());
    });

    return isPending ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboRedux</h1>
          <SearchBox searchChange={onSearchChange} />
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
  }
}

// mapStateToProps - subscribe any state changes to the Redux store
// mapDispatchToProps - subscribe any new actions
export default connect(mapStateToProps, mapDispatchToProps)(App);