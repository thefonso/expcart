import React, {Component} from 'react';
import "../../assets/css/components/product/cart-item.css"

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
    this.onEdit = this.onEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    let quantity = this.props.product.qty;
    this.setState({quantity})
  }

  handleChange = (event) => this.setState({[event.target.name]: event.target.value});

  onEdit(){
    this.setState({
        isEdit: true
    });
  }

  render() {
    const { product } = this.props;

    return (

        <div className="cart">
            <h4 className="cart-title">{product.title}</h4>
            <h5 className="cart-text"><small>price: </small>${product.price }</h5>
          {
              this.state.isEdit?(
              <>
                  <span className="cart-text text-success"><small>Quantity: </small></span>
                  <input type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange} className="float-right" style={{ width: "60px", marginRight: "10px", borderRadius: "3px"}} />
                  <button className="btn btn-sm btn-warning float-right"
                          onClick={(e) => { this.setState({isEdit: false}); this.props.updateCart(e, product.id,this.state.quantity)}}>save</button>
              </>
            ) : (
                <span>
                  <span className="cart-text text-success"><small>Quantity: </small>{this.state.quantity}</span>
                  <button className="btn btn-sm btn-warning float-right" onClick={this.onEdit}>edit qty</button>
                  <button id={"remove-from-cart"}
                      className=" btn btn-sm btn-warning float-right"
                      onClick={(e) => {this.props.remove(e, product)}}>Remove from cart</button>
                </span>
            )
          }
        </div>

    );
  }
}

export default CartItem;
