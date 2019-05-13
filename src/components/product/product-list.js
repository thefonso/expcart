import React from "react"
import "../../assets/css/components/product/product-list.css"
import Product from './product'
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
    console.log(this.props.products.allDataJson);
    return(
        <div className="product-list grid-x grid-margin-y">
          { this.props.products.allDataJson.edges[0].node.products.map(product => (
              <Product { ...product } key={ product.sku } />
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

