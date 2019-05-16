import React from "react"
import "../../assets/css/components/product/product-list.css"
// import ProductItem from './product'
import { StaticQuery, graphql } from "gatsby"
import ProductItem from "./ProductItem";


class ProductList extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
        <div className="product-list grid-x grid-margin-y">
          { this.props.products.allDataJson.edges[0].node.products.map((product, index) => (
            <ProductItem product={product} key={index}/>))
          }
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
      <ProductList products={data} />
    )}
  />
)

