import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HbrHqGzpnJ8n4oJeXrY7hkG66l6XH1F245p3KJq19wm0gdYgbfZIxUr3gwvfOlr6cpnh06DGY23oktHsbD6MjXC00Lee8Zbmc'; 

    const onToken = token => {
        alert('Payment Successful');
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='Vinyl Shop Ltd.'
            billingAddress
            shippingAddress
            description={`Your total is ${price}€`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
};

export default StripeCheckoutButton;