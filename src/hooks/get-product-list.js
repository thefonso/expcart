import {graphql, useStaticQuery} from "gatsby";

export const getproductlist = () => {
const { allDataJson } = useStaticQuery(
    graphql`
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
    `
  )
  return allDataJson.edges.node.products
};
