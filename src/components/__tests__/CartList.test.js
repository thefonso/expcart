import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import { createSpyObj } from 'jest-createspyobj';
import Adapter from 'enzyme-adapter-react-16';
import CartList from '../product/CartList';
import productList from "../../lib/data/products"
import { MemoryRouter, Route, Switch, Link } from 'react-router-dom';
import { StaticQuery } from 'gatsby' // mocked


Enzyme.configure({adapter: new Adapter()});

let products = productList;
let quantity = 1;
let index = 0;
let subtotal = 0;
let totalQuantity = 3;
// let tax = (subtotal * 0.10).toFixed(2);
// let shipping = ((50 + 0.02 ) - (5 * totalQuantity)).toFixed(2) ;
// let totalCost = parseFloat(tax + shipping + subtotal).toFixed(2);

beforeEach(() => {
  StaticQuery.mockImplementationOnce(({ render }) =>
    render({
      query: {
        allDataJson: {
          edges: {
            node: {
              products:{
              }
            }
          },
        },
      },
    })
  )
});

// jest mock functions (mocks this.props.func)
const clearCart =  jest.fn();

// defining this.props
const baseProps = {
  clearCart
};

describe('CartItem', () => {
    it('renders ', () => {
      const wrapper = shallow(<CartList products={products} />);
      expect(wrapper.length).toBeGreaterThan(0);
    });

    it('test clear cart button can be clicked', () => {
      const event = createSpyObj('event', ['preventDefault']);
      const wrapper1 = mount(<CartList products={products}/>);
      const button = wrapper1.find('#clearCart');
      expect(button.length).toBe(1);
      wrapper1.find('#clearCart').simulate('click',event);
      expect(event.preventDefault).toHaveBeenCalled();
    });
    it('checkout link can be clicked', () => {
      const wrapper2 = mount(<CartList products={products}/>);
      const button = wrapper2.find('#checkout');
      expect(button.length).toBe(1);
      wrapper2.find('#checkout').simulate('click');
    });
    it('clear cart button removes all items from cart' , () => {
      baseProps.clearCart.mockClear();
      const event = createSpyObj('event', ['preventDefault']);
      const wrapper3 = mount(<CartList products={products}/>);
      wrapper3.find('#clearCart').simulate('click', event);
      expect(baseProps.clearCart).toHaveBeenCalled();
    });
    xit('remove from cart button, removes item from cart ', () =>{

    });
    xit('edit Qty button updates items in cart' , () => {

    });
});
