import React, {Component} from 'react';
import {graphql, Link, StaticQuery} from 'gatsby';
import CartItem from './CartItem';


class CartList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      subtotal: 0,
      tax: 0,
      shipping:0,
      totalCost:0,
      quantity: 0,
      totalQuantity: 0,
    };
    this.updateCart = this.updateCart.bind(this);
  }

  getCartProducts(cart) {
    let products = [];
    let id = null;
    let cartProducts = JSON.parse(cart);
    let allProducts = this.props.products.allDataJson.edges[0].node.products;

    if (!cart) return JSON.Parse(products);
    for (let i = 0; i < allProducts.length; i++) {
      id = allProducts[i].id.toString();
      if (cartProducts.hasOwnProperty(id)) {
        allProducts[i].qty = cartProducts[id];
        products.push(allProducts[i]);
      }
    }
    this.calculate(products);
  }

  calculate = (prods) => {
    let products = prods;
    let subtotal = 0;
    let totalQuantity = 0;
    for (let i = 0; i < products.length; i++) {
        subtotal += products[i].price * products[i].qty;
        totalQuantity += products[i].qty;
    }
    this.setState({ products, subtotal, totalQuantity });

  };

  componentWillMount() {
    let cart = localStorage.getItem('cart');
    if(!cart) return; //no items in cart? then return now.
    this.getCartProducts(cart);
  }

  updateCart = (event, productId, productQty) => {
    event.preventDefault();
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
    let id = Number(productId);
    let newQty = Number(productQty);
    cart[id] = newQty;

    localStorage.setItem('cart', JSON.stringify(cart));
    this.setState({ state: this.state });
  };


  removeFromCart = (event, product) => {
      event.preventDefault();
      let products = this.state.products.filter((item) => item.id !== product.id);
      let cart = JSON.parse(localStorage.getItem('cart'));
      delete cart[product.id.toString()];
      localStorage.setItem('cart', JSON.stringify(cart));
      let subtotal = this.state.subtotal - (product.qty * product.price)
      this.setState({products, subtotal});
      console.log("remove called")
  };

  clearCart = (event) => {
      event.preventDefault();
      localStorage.removeItem('cart');
      this.setState({products: []});
  };

  render() {
    const { products, subtotal, totalQuantity } =  this.state;

    let tax = (subtotal * 0.10).toFixed(2);
    let shipping = ((50 + 0.02 ) - (5 * totalQuantity)).toFixed(2) ;
    let totalCost = parseFloat(tax + shipping + subtotal).toFixed(2);

    return (
        <form>
        <div className="container">
            <hr/>
            {
              products.map((product, index, quantity) => <CartItem
                product={product} quantity={quantity}
                remove={this.removeFromCart} updateCart={this.updateCart} key={index}/>)
            }
            <hr/>

            { products.length ?(
                <>
                  <div ><h4><small>SubTotal:</small><span className="float-right text-primary">${parseFloat(subtotal).toFixed(2)}</span></h4><hr/></div>
                  <div><h4><small>Tax:</small><span className="float-right text-primary">${tax}</span></h4><hr/></div>
                  <div><h4><small>Shipping:</small><span className="float-right text-primary">${shipping}</span></h4><hr/></div>
                  <div><h4><small>Total Cost:</small><span className="float-right text-primary">${totalCost}</span></h4><hr/></div>
                </>
            ):(
                <h3 className="text-warning">No item in the cart</h3>
            )}

            <Link to="/checkout"><button className="btn btn-success">Checkout</button></Link>
            <button className="btn btn-danger" onClick={(e) => {this.clearCart(e)}} style={{ marginRight: "10px" }}>Clear Cart</button>
            <br/><br/><br/>
        </div>
        </form>
    );
  }
}

export default () => (
    <StaticQuery
    query={graphql`
      query {
        allDataJson {
          edges {
            node {
              products {
                id
                sku
                title
                price
                image
              }
            }
          }
        }
      }
    `}
    render={(data) => (
      <CartList products={data} />
    )}
  />
)



