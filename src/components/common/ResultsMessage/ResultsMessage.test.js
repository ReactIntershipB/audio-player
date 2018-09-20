import React from 'react';
import ResultsMessage from './ResultsMessage';
import renderer from 'react-test-renderer';

describe('ResultsMessage', () => {
  it('to match snapshot', () => {
    const resultsMessage = renderer
    .create(<ResultsMessage />)
    .toJSON();

  expect(resultsMessage).toMatchSnapshot();
  });
});
