import React from 'react';

const Error = () => (
  <main>
    <div
      style={{
        minHeight: 'calc(100vh - 145px)',
        padding: '1rem',
      }}
      className="text-center"
    >
      <h1 style={{ margin: '5rem auto 3rem auto' }}>
        <i className="fas fa-exclamation-circle" style={{ fontSize: '7rem', color: '#0459E4' }} />
      </h1>
      <h3 style={{ margin: '3rem auto' }}>
        Oops! Something went wrong. We are working on it.
        <p style={{ marginTop: '1rem' }}>Please reload the page.</p>
      </h3>
    </div>
  </main>
);

export default Error;
