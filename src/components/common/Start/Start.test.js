import React from 'react';
import { Start } from './Start';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Start', () => {
  it('to match snapshot', () => {
    const start = renderer
      .create(
        <Router>
          <Start />
        </Router>
      ).toJSON();

    expect(start).toMatchSnapshot();
  });
});
