import React from "react";

export default class ProductItem extends React.Component{

  	constructor(props) {
		super(props);
		this.state = {
			quantity: 1
		}
	}

	addToCart = () => {
  	  // console.log(this.props.product.id.toString());
		let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
		let id = this.props.product.id.toString();
		cart[id] = (cart[id] ? cart[id] : 0);
		let qty = cart[id] + parseInt(this.state.quantity);
		console.log(qty);
		cart[id] = qty;
		localStorage.setItem('cart', JSON.stringify(cart));
	}




	render(){
		const { product } = this.props;
		return (
               <div className="product cell small-12 grid-x grid-margin-x" id={ product.sku } key={ product.sku }>
                  <div className="product-image cell small-2"><img src={ product.image } alt={ product.title } /></div>
                  <div className="product-title cell small-4">{ product.title }</div>
                  <div className="product-sku cell small-2">{ product.sku }</div>
                  <div className="product-price cell small-2">${ product.price }</div>
                  <div className="product-add-to-cart cell small-2">
                    <button id="add-to-cart" onClick={this.addToCart}> Add to Cart</button>
                  </div>
                </div>
		)
	}
}


