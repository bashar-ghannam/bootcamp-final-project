import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div style={{ padding: '10px 20px' }}>
      Not Found,back to{' '}
      <Link
        to="/"
        style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder' }}
      >
        Home
      </Link>
    </div>
  );
}

export default ErrorPage;
