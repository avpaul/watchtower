import React from 'react';

function RenderStackTechnologies(technologies) {
  const stacks = technologies.split('/');
  return stacks.map(stack => <span key={stack}>{stack}</span>);
}

export default RenderStackTechnologies;
