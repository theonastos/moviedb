import html from '@lib/html';
import { createElement, getSvgElement } from '@lib/dom';
import spinnerIcon from '@assets/svgs/spinner.svg';
import styles from './Spinner.module.scss';

const Spinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const template = html`<span class="${styles.spinner} ${size}">${getSvgElement(spinnerIcon)}</span>`;

  return createElement(template);
};

export default Spinner;
