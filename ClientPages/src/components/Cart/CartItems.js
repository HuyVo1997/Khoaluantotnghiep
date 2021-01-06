import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class CartItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quantity: 0
        }
    }

    onChange = (event) => {
        var target = event.target;
        var value = target.value;
        var name = target.name;

        console.log(value);

        this.onChangeQuantity(this.props.item.cartID ? this.props.item.cartID : this.props.item.productID,
             name === 'quantity' ? value : this.state.quantity);

        this.setState({
            quantity: value
        })
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.item.quantity !== prevState.quantity){
            return {quantity : nextProps.item.quantity}
        }
        else return null
    }

    render() {

        var { item } = this.props;

        return (
            <tr>
                <td className="product-thumbnail">
                    <Link to="#"><img src={item.images[0].url} alt="cart-image" /></Link>
                </td>
                <td className="product-name"><Link to={`/product-details/${item.productID}`}>{item.name}</Link></td>
                <td className="product-price"><span className="amount">${item.price}</span></td>
                <td className="product-quantity"><input type="number"
                    min="1"
                    name="quantity"
                    value={this.props.item.quantity}
                    onChange={this.onChange} /></td>
                <td className="product-subtotal">${this.state.quantity * item.price}</td>
                <td className="product-remove"> <Link to="#"><i className="fa fa-times" aria-hidden="true"
                    onClick={() => this.onDeleteItem(item.cartID ? item.cartID : item.productID)} /></Link></td>
            </tr>
        )
    }

    onChangeQuantity = (product, quantity) => {
        this.props.onChangeQuantity(product, parseInt(quantity, 10));
    }

    onDeleteItem = (ID) => {
        this.props.onDeleteItem(ID);
    }

}


export default CartItems
