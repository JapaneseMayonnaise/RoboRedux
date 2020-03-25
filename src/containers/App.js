import React from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from './ErrorBoundry';

import { setSearchField } from '../actions'; 

const mapStateToProps = (state) => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            robots: [],
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(users => this.setState({robots: users}));
    }

    render() {
        const { robots } = this.state;
        const { searchField, onSearchChange } = this.props;


        const filteredRobotList = robots.filter(robot => robot.name.toLowerCase().startsWith(searchField.toLowerCase()));
        

            return !robots.length ?
            (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <p className="loading">Loading...</p>
               </div>
            ) :
            (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox onSearchChange={onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobotList} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            )    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
