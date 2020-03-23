import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchField: '',
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(users => this.setState({robots: users}));
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value});
    }

    render() {
        const {robots, searchField} = this.state;

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
                    <SearchBox onSearchChange={this.onSearchChange} />
                    <Scroll>
                        <CardList robots={filteredRobotList} />
                    </Scroll>
                </div>
            )    
    }
}

export default App;
