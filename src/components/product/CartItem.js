import React, {Component} from 'react';
import "../../assets/css/components/product/cart-item.css"

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };

    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    let quantity = this.props.product.qty;
    this.setState({quantity})
  }

  handleChange = (event) => this.setState({[event.target.name]: event.target.value});


  render() {
    const { product } = this.props;

    return (
        <form>
        <div className="cart">
            <h4 className="cart-title">{product.title}</h4>
            <h5 className="cart-text"><small>price: </small>${product.price}</h5>
            {/*TODO: conditional render goes here */}
            <span className="cart-text text-success"><small>Quantity: </small>{product.qty}</span>
            <input type="number"
                   name="quantity"
                   value={this.state.quantity}
                   onChange={this.handleChange}
                   className="float-right"
                   style={{ width: "60px", marginRight: "10px", borderRadius: "3px"}}
            />
            <button className="btn btn-sm btn-warning float-right" onClick={this.props.updateCart(product.id,this.state.quantity)}>edit qty</button>

            <button id={"remove-from-cart"}
                    className=" btn btn-sm btn-warning float-right"
                    onClick={() => this.props.remove(product)}>Remove from cart</button>

          </div>
          </form>
    );
  }
}

export default CartItem;
