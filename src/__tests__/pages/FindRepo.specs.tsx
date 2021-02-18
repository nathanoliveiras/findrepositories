import Home from '../../pages/home/index';
import React from 'react';
import { render } from '@testing-library/react'

describe ('Home app', () => {
    it('Find repo', () =>{
        const { debug } = render(<Home />)
        debug();
    })
})