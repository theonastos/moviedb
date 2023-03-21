import { generateId } from "@utils/id";

const html = (strings: TemplateStringsArray, ...values: any[]) => {
  const parser = new DOMParser();
  const includedFragments: { id: string; value: DocumentFragment }[] = [];

  const processValue = (value: DocumentFragment | string, acc: string, string: string): string => {
    // keep as is
    if (value === undefined) {
      return acc + string;
      // run recursively to handle arrays of strings/fragments
    } else if (Array.isArray(value)) {
      return acc + string + value.reduce((arrayAcc, arrayValue) => processValue(arrayValue, arrayAcc, ''), '');
      // handle fragments
    } else if (typeof value === 'object') {
      const id = `__${generateId()}__`;
      includedFragments.push({ id, value });
      return acc + string + `<fragment id="${id}"></fragment>`;
      // handle strings
    } else {
      return acc + string + value;
    }
  }

  const markup = strings.reduce((acc: string, string: string, index: number) => {
    const value = values[index];
    return processValue(value, acc, string);
  }, '');

  // Parse the markup into a document fragment
  const content = parser.parseFromString(markup, 'text/html').body;
  const fragment = document.createDocumentFragment();

  // Append all child nodes to the fragment
  while (content.firstChild) {
    fragment.appendChild(content.firstChild);
  }

  // Replace all fragment elements with corresponding fragment ids
  includedFragments.forEach(({ id, value }) => {
    const element = fragment.getElementById(id);
    if (element) {
      element.replaceWith(value);
    }
  });

  return fragment;
}

export default html;
