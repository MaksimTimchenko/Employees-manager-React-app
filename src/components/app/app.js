import {Component} from 'react'

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';
import './app.css';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [
                {name: 'John C.', salary: 800, increase: false, rise: false, id: 1},
                {name: 'Alex M.', salary: 3000, increase: false, rise: false, id: 2},
                {name: 'Carl W.', salary: 5000, increase: false, rise: false, id: 3},
            ],
            term: '',
            filter: 'all'
        
        }
        this.maxId = 4;
    }
   
    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

   onToggleIncrease = (id) => {
    this.setState(({data}) => ({
        data : data.map(item => {
            if (item.id === id) {
                return {...item, increase: !item.increase}
            }
            return item
        })
    }))
   }

   onToggleRise = (id) => {
    this.setState(({data}) => ({
        data : data.map(item => {
            if (item.id === id) {
                return {...item, rise: !item.rise}
            }
            return item
        })
    }))
   }

  searchEmp = (items, term) => {
        if (term.length === 0){
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        })  
  }

  onUpdateSearch = (term) => {
    this.setState({term});
  }

  FilterPost = (items, filter) => {
    switch (filter) {
        case 'rise':
            return items.filter(item => item.rise);
        case 'moreThen1000':
            return items.filter(item => item.salary > 1000 );
        default:
            return items;  

    }
  }

  onFilterSelected = (filter) => {
    this.setState({filter})
  }

    render() {
        const {data, term, filter} = this.state;
        const employers = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.FilterPost( this.searchEmp(data,term), filter);
        
        return (
            <div className='app'>
                <AppInfo 
                totalEployers ={employers}
                totalRiseEmployers = {increased}
                />
    
                <div className="serach-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter}
                    onFilterSelected={this.onFilterSelected}/>
                </div>
    
                <EmployersList 
                data = {visibleData}
                onDelete = {this.deleteItem}
                onToggleIncrease = {this.onToggleIncrease}
                onToggleRise = {this.onToggleRise}
                />
                <EmployersAddForm onAdd={this.addItem}/>
            </div>
            
        )
    }
}

export default App;