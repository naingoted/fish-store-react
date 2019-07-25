import React, { Component } from 'react'
import PropTypes from "prop-types";
import { formatPrice } from '../helpers';

export default class Fish extends Component {
    static propTypes = {
        details: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price : PropTypes.number
        }),
        addToOrder: PropTypes.func,
        index: PropTypes.string
    };
    render() {
        const {index, addToOrder } = this.props;
        const { image, name, price, desc, status } = this.props.details;
        const isAvilable = status === "available";
        return (
            <li className="menu-fish">
                <img src={image} alt={name} />
                <h3 className="fish-name">
                    {name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p> {desc} </p>
                <button
                    disabled={!isAvilable}
                    onClick={() => addToOrder(index)}                
                > {isAvilable ? "Add To Order" : "Sold Out!"}</button>
            </li>
        )
    }
}
