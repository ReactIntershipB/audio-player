import React from 'react';
import { Start } from './Start';
import renderer from 'react-test-renderer';

describe('Start', () => {
  it('to match snapshot', () => {
    const start = renderer
    .create(<Start />)
    .toJSON();

  expect(start).toMatchSnapshot();
  });
});
