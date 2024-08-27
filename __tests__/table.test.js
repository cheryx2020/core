import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '../src/components/table';

describe('Table component', () => {
    it('Render table with no property listApi', () => {
        render(<Table />);
        expect(screen.getByTestId('error-missing-list-api')).toBeInTheDocument();
    });
    it('Render table with missing property formFields', () => {
        render(<Table listApi="test"/>);
        expect(screen.getByTestId('error-invalid-form-fields')).toBeInTheDocument();
    });
    it('Render table with empty array property formFields', () => {
        render(<Table listApi="test" formFields={[]}/>);
        expect(screen.getByTestId('error-invalid-form-fields')).toBeInTheDocument();
    });
    it('Render table with correct formFields', () => {
        render(<Table listApi="test" formFields={[{id: "vinh"}]}/>);
        expect(screen.getByTestId('table')).toBeInTheDocument();
    });
    it('Render table with addApi formFields', async () => {
        render(<Table addApi="test" listApi="test" formFields={[{id: "vinh"}]}/>);
        expect(screen.getByTestId('add-button')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByTestId('error-message')).toBeInTheDocument();
        });
        expect(screen.getByTestId("table-element")).toBeInTheDocument();
    });
});