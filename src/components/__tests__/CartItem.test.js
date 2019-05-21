import React from 'react';
import Enzyme, { shallow, mount, render  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CartItem from '../product/CartItem';

Enzyme.configure({adapter: new Adapter()});

let product = {title: "test",price: 100, id: 0, sku: "123abc", image: 'none'};
let quantity = 1;
let index = 0;


describe('CartItem', () => {
    it('renders ', () => {
        const wrapper = shallow(<CartItem product={product}
                                          quantity={quantity}
                                          key={index}/>);
        expect(wrapper.length).toBeGreaterThan(0);
    });
});

