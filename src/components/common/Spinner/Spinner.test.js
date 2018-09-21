import React from 'react';
import { Spinner } from './Spinner';
import renderer from 'react-test-renderer';

describe('Spinner', () => {
  it('to match snapshot', () => {
    const spinner = renderer
    .create(<Spinner />)
    .toJSON();

  expect(spinner).toMatchSnapshot();
  });
});
