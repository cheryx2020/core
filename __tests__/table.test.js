import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '../src/components/table';
import {jest} from '@jest/globals';

const mockPost = jest.fn();
const mockGet = jest.fn().mockResolvedValue({ data: "response" })
jest.unstable_mockModule("@cheryx2020/api-service", () => {
    return {
      __esModule: true,
      post: mockPost,
      get: mockGet,
    };
});

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
    it('Render table with correct formFields', async () => {
        render(<Table listApi="test" formFields={[{id: "vinh"}]}/>);
        expect(screen.getByTestId('table')).toBeInTheDocument();
        expect(mockGet).toBeDefined();
    });
    it('Render table with addApi formFields', async () => {
        render(<Table addApi="test" listApi="test" formFields={[{id: "vinh"}, {id: "textare", type: "textarea"}]}/>);
        const addButton = screen.getByTestId('add-button');
        expect(screen.getByTestId('add-button')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByTestId('error-message')).toBeInTheDocument();
        });
        expect(screen.getByTestId("table-element")).toBeInTheDocument();
        fireEvent.click(addButton);
        const submitButton = screen.getByTestId("form-submit");
        expect(screen.getByTestId("edit-form")).toBeInTheDocument();
        const firstInputField = screen.getByTestId("form-field-vinh");
        expect(firstInputField).toBeInTheDocument();
        fireEvent.change(firstInputField, { target: { value: '23' } });
        expect(firstInputField.getAttribute("value")).toBe("23");
        const secondInputField = screen.getByTestId("form-field-textare");
        expect(secondInputField).toBeInTheDocument();
        fireEvent.change(secondInputField, { target: { value: '24' } });
        expect(secondInputField.value).toBe("24");
        expect(submitButton).toBeInTheDocument();
        expect(submitButton.getAttribute('disabled')).toBeNull();
        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByTestId('loader')).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(screen.getByTestId('error-message')).toBeInTheDocument();
        });
        expect(mockPost).toBeDefined();
    });
});