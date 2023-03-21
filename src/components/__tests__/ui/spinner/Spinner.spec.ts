import Spinner from "@components/ui/spinner/Spinner";

describe('Spinner', () => {
  it('should render spinner properly', () => {
    const container = document.createElement('div');
    container.appendChild(Spinner({ size: 'md' }));
    expect(container.innerHTML).toMatchSnapshot();
  });
});