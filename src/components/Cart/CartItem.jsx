import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react';

function CartItem({ cartItem, CartStore }) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(CartStore.getQuantity(cartItem.id));
  }, []);

  return (
    <Stack direction="row" spacing={5} sx={{ fontSize: 20 }}>
      <span>
        <img
          src={require(`../../assets/${cartItem.img}`)}
          alt={cartItem.name}
          style={{ width: 90, height: 90, borderRadius: '10px' }}
        />
      </span>
      <Stack
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <span style={{ fontWeight: 'bolder' }}>{cartItem.name}</span>
        <Stack direction="row" spacing={1}>
          <span
            onClick={(e) => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
                CartStore.updateIeam(cartItem.id, quantity - 1);
              }
            }}
          >
            -
          </span>
          <input
            value={quantity}
            type="number"
            style={{ width: '10px' }}
            disabled
          />
          <span
            onClick={(e) => {
              setQuantity(quantity + 1);
              CartStore.updateIeam(cartItem.id, quantity + 1);
            }}
          >
            +
          </span>
        </Stack>
      </Stack>
      <Stack
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <span>₪{cartItem.price * quantity}</span>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#ff9800', color: 'black', width: '10px' }}
          onClick={() => CartStore.removeIeam(cartItem.id)}
        >
          x
        </Button>
      </Stack>
    </Stack>
  );
}

export default inject('CartStore')(observer(CartItem));
