import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import Order from './Order';
import base from '../base';
export default class App extends React.Component {
    state = {
        fishes: {},
        order: {},
    };
    // addFish = fish => {
    //     const fishes = { ...this.state.fishes };
    //     fishes[`fish$`]
    // }
    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes })
    }
    addToOrder = key => {
        const order = {...this.state.order}
        order[key] = order[key] + 1 || 1;
        this.setState({ order });
        console.log(order);
    }
    addFish = fish => {
        const fishes = {...this.state.fishes};
        fishes[`fish${Date.now()}`] = fish;
        this.setState({fishes})
    }
    updateFish = (key, updatedFish) => {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({fishes});
    }
    deleteFish = (key) => {
                // 1. take a copy of state
        const fishes = { ...this.state.fishes };
        // 2. update the state
        fishes[key] = null;
        // 3.  update state
        this.setState({ fishes });
    }
    removeFromOrder = key =>{
        const order = {...this.state.order}
        delete order[key];
        this.setState({order});
    }
    componentDidMount() {
        const { params } = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId);
        if( localStorageRef ) {
            this.setState({order: JSON.parse(localStorageRef)});
        }
        // this.ref is specific to firebase
        this.ref = base.syncState(`${params.storeId}/fishes`,
         {
             context: this,
             state: "fishes"
         }   
        );
    }
    componentDidUpdate() {
        localStorage.setItem(
            this.props.match.params.storeId,
            JSON.stringify(this.state.order)
        )
    }
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }
    render(){
        return (
            <div className="catch-of-the-day">
              <div className="menu">
                 <Header tagline="Fresh Seafood Market" age={100} />
                 <ul className="fishes">
                    { Object.keys(this.state.fishes).map(key => (
                        <Fish
                            key = {key}
                            index = {key}
                            details = {this.state.fishes[key]}
                            addToOrder = {this.addToOrder}
                        />
                    ))
                    }

                 </ul>
              </div>  
              <Order
                fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}
              ></Order>
              <Inventory
                fishes = {this.state.fishes}
                updateFish = {this.updateFish}
                deleteFish = {this.deleteFish}
                addFish = {this.addFish}
                loadSampleFishes = {this.loadSampleFishes}
                storeId= {this.props.match.params.storeId}
              ></Inventory>
            </div>
          )
    }
}
