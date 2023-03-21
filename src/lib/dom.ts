import searchIcon from '@assets/svgs/user-icon.svg';

export const createElement = (
  template: DocumentFragment,
  eventHandlers: Record<string, (event: Event) => void> | null = {},
  children: Array<DocumentFragment> = [],
): DocumentFragment => {
  if (eventHandlers !== null) {
    const eventAttrRegex = /^data-on-(.+)/;
    template.querySelectorAll('*').forEach((el) => {
      Array.from(el.attributes).forEach((attr) => {
        const match = attr.name.match(eventAttrRegex);
        if (match) {
          const fn = eventHandlers[attr.value];
          el.addEventListener(match[1], (event) => fn(event));
          el.removeAttribute(attr.name);
        }
      });
    });
  }

  children.forEach((child) => {
    if (typeof child === 'string') {
      template.appendChild(document.createTextNode(child));
    } else {
      template.appendChild(child);
    }
  });

  return template;
};

export const replaceElementWithId = (id: string, newElement: DocumentFragment) => {
  const element = document.getElementById(id);
  if (!element) return;
  element.innerHTML = '';
  element.appendChild(newElement);
}

export const replaceElementWithAttr = (attr: string, newElement: DocumentFragment) => {
  const element = document.querySelector(attr);
  if (!element) return;
  element.innerHTML = '';
  element.appendChild(newElement);
}

export const getSvgElement = (svg: string): SVGSVGElement | null => {
  const decodedData = atob(svg.split(',')[1]);
  const parser = new DOMParser();
  const svgElement =  parser.parseFromString(decodedData, 'image/svg+xml').querySelector('svg');
  return svgElement;
}

export const getStringFromFragment = (fragment: DocumentFragment): string => {
  const div = document.createElement('div');
  div?.appendChild(fragment.cloneNode(true));
  return div?.innerHTML;
}