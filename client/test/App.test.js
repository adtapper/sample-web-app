import React from 'react';
import { mount, shallow } from 'enzyme';
import { App } from '../src/App';
import fetch from 'node-fetch';
jest.mock('node-fetch', () => jest.fn());

describe('App', () => {
    beforeAll(() => {
        const response = Promise.resolve({
            json: () => {
                return { 'payment': 0 };
            },
        })
        fetch.mockImplementation(()=> response);
    });

    afterEach(() => {
        fetch.mockClear();
    });

    describe('Default Values', () => {
        it('whenComponentMounts_thenAllLabelsAreCorrect', () => {
            const app = mount(<App />);
            const header = app.find('h1');
            const payment = app.find('#label');
            const labels = app.find('label');
            const button = app.find('#button'); 
    
            expect(header.text()).toEqual('Mortgage Calculator');
            expect(payment.text()).toEqual('Monthly Payment:');
            expect(labels.at(0).text()).toEqual('Loan Amount');
            expect(labels.at(1).text()).toEqual('Loan Term');
            expect(labels.at(2).text()).toEqual('Interest Rate');
            expect(button.instance().value).toEqual('Calculate Interest');
        });
    
        it('whenComponentMounts_thenAllDefaultValueSet', () => {
            const app = mount(<App />);
            const button = app.find('#button');
    
            button.simulate('click');
    
            expect(fetch).toHaveBeenCalledWith(
                "http://localhost:5000/interest",
                {
                    "body": "{\"rate\":0,\"term\":10,\"principal\":0}",
                    "headers": {"Content-Type": "application/json"},
                    "method": "post"
                }
            );
        });
    });

    describe('Loan Amount', () => {
        it('whenLoanAmountUpdatedToString_thenUpdateDoesNotTakeEffect', () => {
            const app = mount(<App />);
            const loanAmountInput = app.find('#loan');
            const button = app.find('#button');

            loanAmountInput.simulate('change', { target: { value: 'eeee' } });
            button.simulate('click');

            expect(fetch).toHaveBeenCalledWith(
                "http://localhost:5000/interest",
                {
                    "body": "{\"rate\":0,\"term\":10,\"principal\":0}",
                    "headers": {"Content-Type": "application/json"},
                    "method": "post"
                }
            );
        });

        it('whenLoanAmountUpdatedToNegativeNumber_thenUpdateDoesNotTakeEffect', () => {
            const app = mount(<App />);
            const loanAmountInput = app.find('#loan');
            const button = app.find('#button');

            loanAmountInput.simulate('change', { target: { value: -5.2 } });
            button.simulate('click');

            expect(fetch).toHaveBeenCalledWith(
                "http://localhost:5000/interest",
                {
                    "body": "{\"rate\":0,\"term\":10,\"principal\":0}",
                    "headers": {"Content-Type": "application/json"},
                    "method": "post"
                }
            );
        });

        it('whenLoanAmountUpdatedToNumber_thenUpdateTakesEffect', () => {
            const app = mount(<App />);
            const loanAmountInput = app.find('#loan');
            const button = app.find('#button');

            loanAmountInput.simulate('change', { target: { value: 342 } });
            button.simulate('click');

            expect(fetch).toHaveBeenCalledWith(
                "http://localhost:5000/interest",
                {
                    "body": "{\"rate\":0,\"term\":10,\"principal\":342}",
                    "headers": {"Content-Type": "application/json"},
                    "method": "post"
                }
            );
        });
    });

    describe('Loan Term', () => {
        it.each`
            term
            ${'10'}
            ${'15'}
            ${'20'}
            ${'30'}
        `('whenLoanTerm $term YearsSelected_thenUpdateTakesEffect', ({term}) => {
            const app = mount(<App />);
            const loanTermInput = app.find('#term');
            const button = app.find('#button');

            loanTermInput.simulate('change', {target: {value: term}});
            button.simulate('click');

            expect(fetch).toHaveBeenCalledWith(
                "http://localhost:5000/interest",
                {
                    "body": `{\"rate\":0,\"term\":${term},\"principal\":0}`,
                    "headers": {"Content-Type": "application/json"},
                    "method": "post"
                }
            );
        });
    });

    describe('Interest Rate', () => {
        it('whenInterestRateUpdatedToString_thenUpdateDoesNotTakeEffect', () => {
            const app = mount(<App />);
            const interestRateInput = app.find('#interest');
            const button = app.find('#button');

            interestRateInput.simulate('change', { target: { value: 'eeee' } });
            button.simulate('click');

            expect(fetch).toHaveBeenCalledWith(
                "http://localhost:5000/interest",
                {
                    "body": "{\"rate\":0,\"term\":10,\"principal\":0}",
                    "headers": {"Content-Type": "application/json"},
                    "method": "post"
                }
            );
        });

        it('whenInterestRateUpdatedToNegativeNumber_thenUpdateDoesNotTakeEffect', () => {
            const app = mount(<App />);
            const interestRateInput = app.find('#interest');
            const button = app.find('#button');

            interestRateInput.simulate('change', { target: { value: -5.2 } });
            button.simulate('click');

            expect(fetch).toHaveBeenCalledWith(
                "http://localhost:5000/interest",
                {
                    "body": "{\"rate\":0,\"term\":10,\"principal\":0}",
                    "headers": {"Content-Type": "application/json"},
                    "method": "post"
                }
            );
        });

        it('whenInterestRateUpdatedToNumber_thenUpdateTakesEffect', () => {
            const app = mount(<App />);
            const interestRateInput = app.find('#interest');
            const button = app.find('#button');

            interestRateInput.simulate('change', { target: { value: 2.3 } });
            button.simulate('click');

            expect(fetch).toHaveBeenCalledWith(
                "http://localhost:5000/interest",
                {
                    "body": "{\"rate\":0.023,\"term\":10,\"principal\":0}",
                    "headers": {"Content-Type": "application/json"},
                    "method": "post"
                }
            );
        });
    });
    

    describe('Multiple Changes', () => {
        it('whenAllFieldsAreChanged_thenAllUpdatesTakeEffect', () => {
            const response = Promise.resolve({
                json: () => {
                    return { 'payment': 0 };
                },
            })
            fetch.mockImplementation(()=> response);
            const app = mount(<App />);
            const loanAmountInput = app.find('#loan');
            const loanTermInput = app.find('#term');
            const interestRateInput = app.find('#interest');
            const button = app.find('#button');

            loanAmountInput.simulate('change', { target: { value: 518 } });
            loanTermInput.simulate('change', {target: {value: 20}});
            interestRateInput.simulate('change', { target: { value: 4.7 } });
            button.simulate('click');

            expect(fetch).toHaveBeenCalledWith(
                "http://localhost:5000/interest",
                {
                    "body": "{\"rate\":0.047,\"term\":20,\"principal\":518}",
                    "headers": {"Content-Type": "application/json"},
                    "method": "post"
                }
            );
        });
    });
});