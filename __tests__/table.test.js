import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '../src/components/table';

describe('Table component', () => {
    it('Render table with no property listApi', () => {
        render(<Table />);
        expect(screen.getByTestId('error-missing-list-api')).toBeDefined()
    });
    it('Render table with missing property formFields', () => {
        render(<Table listApi="test"/>);
        expect(screen.getByTestId('error-invalid-form-fields')).toBeDefined()
    });
    it('Render table with empty array property formFields', () => {
        render(<Table listApi="test" formFields={[]}/>);
        expect(screen.getByTestId('error-invalid-form-fields')).toBeDefined()
    });
    it('Render table with correct formFields', () => {
        render(<Table listApi="test" formFields={[{id: "vinh"}]}/>);
        expect(screen.getByTestId('table')).toBeDefined()
    });
    it('Render table with addApi formFields', () => {
        render(<Table addApi="test" listApi="test" formFields={[{id: "vinh"}]}/>);
        expect(screen.getByTestId('add-button')).toBeDefined()
    });
});