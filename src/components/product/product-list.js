import React from "react"
import "../../assets/css/components/product/product-list.css"
// import Product from './product'
import { StaticQuery, graphql } from "gatsby"


class ProductList extends React.Component{

  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("I was clicked" + this.props)
  }

  render(){
    return(
        <div className="product-list grid-x grid-margin-y">
          { this.props.products.allDataJson.edges[0].node.products.map(product => (
                <div className="product cell small-12 grid-x grid-margin-x" id={ product.sku }>
                  <div className="product-image cell small-2"><img src={ product.image } alt={ product.title } /></div>
                  <div className="product-title cell small-4">{ product.title }</div>
                  <div className="product-sku cell small-2">{ product.sku }</div>
                  <div className="product-price cell small-2">${ product.price }</div>
                  <div className="product-add-to-cart cell small-2">
                    <button id="add-to-cart" onClick={this.handleClick}> Add to Cart</button>
                  </div>
                </div>
          )) }
        </div>
    )
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
      <ProductList products={data} />
    )}
  />
)

