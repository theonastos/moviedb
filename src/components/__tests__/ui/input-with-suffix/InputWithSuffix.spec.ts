import {fireEvent, getByTestId, within} from '@testing-library/dom';
import InputWithSuffix from '@components/ui/input-with-suffix/InputWithSuffix';
import searchIcon from '@assets/svgs/search-icon.svg';
import { getSvgElement } from '@lib/dom';

describe('InputWithSuffix', () => {
  it('should render placeholder text', () => {
    const container = document.createElement('div');
    container.appendChild(InputWithSuffix({ placeholder: 'Search...', icon: null, onInput: () => {} }));
    const input = getByTestId(container, 'input-with-suffix');
    expect(input).toHaveAttribute('placeholder', 'Search...');
  });

  it('should render placeholder text', () => {
    const container = document.createElement('div');
    container.appendChild(
      InputWithSuffix({ placeholder: 'Search...', icon: getSvgElement(searchIcon), onInput: () => {} }),
    );
    const suffixContainer = getByTestId(container, 'input-suffix');
    expect(suffixContainer.firstElementChild).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('should trigger on input when user types', () => {
    const onInput = jest.fn();
    const container = document.createElement('div');
    container.appendChild(InputWithSuffix({ placeholder: 'Search...', icon: null, onInput }));
    const input = getByTestId(container, 'input-with-suffix');

    expect(onInput).toHaveBeenCalledTimes(0);
    fireEvent.input(input, { target: { value: 'Testing input' } });
    expect(onInput).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('Testing input');
  });
});