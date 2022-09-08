import React from 'react';
import { observer, inject } from 'mobx-react';
import CartItem from './CartItem';
import { Stack } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Cart({ CartStore }) {
  const navigate = useNavigate();
  return CartStore.totalQuantities > 0 ? (
    <div>
      <Stack
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={4}
        p={2}
      >
        {CartStore.order.map((cartItem, index) => (
          <CartItem key={index} cartItem={cartItem} />
        ))}
      </Stack>
      <hr style={{ width: '80%', margin: 'auto' }} />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={3}
        my={3}
        sx={{ fontSize: 20 }}
      >
        <span>Total : </span>
        <span>₪{CartStore.totalSum}</span>
      </Stack>
      <div style={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          sx={{
            backgroundColor: '#ff9800',
            fontSize: 12,
            my: 1,
          }}
          onClick={() => {
            CartStore.emptyCart();
            navigate('/');
          }}
        >
          Checkout
        </Button>
      </div>
    </div>
  ) : (
    <h2 style={{ padding: '10px' }}>No item added yet!</h2>
  );
}

export default inject('CartStore')(observer(Cart));
