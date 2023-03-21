import html from '@lib/html';
import { createElement } from '@lib/dom';
import styles from './InputWithSuffix.module.scss';

type InputWithSuffixIconProps = {
  placeholder?: string;
  icon: SVGSVGElement | null;
  onInput: EventListener;
};

const InputWithSuffixIcon = ({ placeholder, icon, onInput }: InputWithSuffixIconProps) => {
  const template = html`
    <div class="${styles.inputWithSuffix}">
      <input type="text" placeholder="${placeholder || ''}" data-on-input="onInput" class="${styles.input}" data-testid="input-with-suffix" />
      <span class="${styles.suffixIcon}" data-testid="input-suffix">${icon || ''}</span>
    </div>
  `;

  return createElement(template, { onInput });
}

export default InputWithSuffixIcon;
