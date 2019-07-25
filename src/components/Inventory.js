import React, { Component } from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import PropTypes from 'prop-types';
import base, { firebaseApp } from '../base';
import firebase from 'firebase';
import Login from './Login';

export default class Inventory extends Component {
    static propTypes = {
        deleteFish: PropTypes.func,
        updateFish: PropTypes.func,
        loadSampleFish: PropTypes.func,
        fishes: PropTypes.object,
        addFish: PropTypes.func,
    }
    state =  {
        uid : null,
        owner : null
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged( user => {
            if(user) {
                this.authHandler({user});
            }
        })
    }
    authHandler = async authData => {
        // 1 .Look up the current store in the firebase database
        const store = await base.fetch(this.props.storeId, { context: this});
        // console.log(store);
        // 2. Claim it if there is no owner
        if (!store.owner) {
            // save it as our own
            await base.post(`${this.props.storeId}/owner`, {
              data: authData.user.uid
            });
        }
        // 3. Set the state of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
          });

    }
    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
        .auth()
        .signInWithPopup(authProvider)
        .then(this.authHandler);
    }
    logout = async () => {
        console.log("loggin out")
        await firebase.auth().signOut();
        this.setState({ uid: null});
    }
    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>;
        if(!this.state.uid) {
            return <Login authenticate = {this.authenticate} />;
        }
        if(this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry you are not the owner</p>
                    {logout}
                </div>
            )
        }
        return (
            <div className="inventory">
                <h2> Inventory </h2>
                {logout}
                {
                    Object.keys(this.props.fishes).map(key => (
                        <EditFishForm
                            key={key}
                            index={key}
                            fish={this.props.fishes[key]}
                            deleteFish={this.props.deleteFish}
                            updateFish={this.props.updateFish} />
                    ))
                }
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSampleFishes}> Load Sample Fishes </button>
            </div>
        )
    }
}
