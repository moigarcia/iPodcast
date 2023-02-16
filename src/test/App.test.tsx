import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('App', () => {
    test('Should be render', async () => {
      
      const { container: { firstChild} } = render(<App />);
      
      expect(firstChild).toBeTruthy();
      expect(firstChild.nodeName).toBe('DIV');
    });
    test('navigates to Dashboard', () => {
      const history = createMemoryHistory();
      history.push('/');
      render(<App />);
      const dashboardElement = screen.getByTestId('Dashboard');
      expect(dashboardElement).toBeTruthy()
    });
});
