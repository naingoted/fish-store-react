import React, { Component } from 'react'
import PropTypes from 'prop-types';
export default class EditFishForm extends Component {
    static propTypes = {
      updateFish : PropTypes.func,
      index: PropTypes.string,
      fish: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
        status: PropTypes.string,
        desc: PropTypes.string,
        image: PropTypes.string,
      })
    }
    handleChange = event => {
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]:
              event.currentTarget.name === 'price'
              ? parseFloat(event.currentTarget.value)
              : event.currentTarget.value
        };
        this.props.updateFish(this.props.index, updatedFish);
    };
    render() {
        return (
        <div className="fish-edit">
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.props.fish.name}
            />
            <input
              type="text"
              name="price"
              onChange={this.handleChange}
              value={this.props.fish.price}
            />
            <select
              type="text"
              name="status"
              onChange={this.handleChange}
              value={this.props.fish.status}
            >
              <option value="available">Fresh!</option>
              <option value="unavailable">Sold Out!</option>
            </select>
            <textarea
              name="desc"
              onChange={this.handleChange}
              value={this.props.fish.desc}
            />
            <input
              type="text"
              name="image"
              onChange={this.handleChange}
              value={this.props.fish.image}
            />
            <button onClick={() => this.props.deleteFish(this.props.index)}>
                Remove Fish
            </button>
          </div>
        )
    }
}
