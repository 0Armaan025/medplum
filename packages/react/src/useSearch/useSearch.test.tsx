import { operationOutcomeToString } from '@medplum/core';
import { MockClient } from '@medplum/mock';
import { act, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MedplumProvider } from '../MedplumProvider/MedplumProvider';
import { useSearch } from './useSearch';

function TestComponent(): JSX.Element {
  const [bundle, loading, outcome] = useSearch('Patient', { name: 'homer' });
  return (
    <div>
      <div data-testid="bundle">{JSON.stringify(bundle)}</div>
      <div data-testid="loading">{loading}</div>
      <div data-testid="outcome">{outcome && operationOutcomeToString(outcome)}</div>
    </div>
  );
}

describe('useSearch hooks', () => {
  beforeAll(() => {
    console.error = jest.fn();
  });

  async function setup(children: React.ReactNode): Promise<void> {
    const medplum = new MockClient();
    await act(async () => {
      render(
        <MemoryRouter>
          <MedplumProvider medplum={medplum}>{children}</MedplumProvider>
        </MemoryRouter>
      );
    });
  }

  test('Happy path', async () => {
    await setup(<TestComponent />);
    await waitFor(() => screen.getByText('All OK'));

    const el = screen.getByTestId('bundle');
    expect(el).toBeInTheDocument();

    const bundle = JSON.parse(el.innerHTML);
    expect(bundle.resourceType).toBe('Bundle');
    expect(bundle.entry).toHaveLength(1);
  });
});
