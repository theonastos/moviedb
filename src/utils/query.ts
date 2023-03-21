export const setQueryParam = (key: string, value: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({}, '', url);
}

export const getQueryParam = (key: string) => {
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
}

export const onQueryParamChange = (callback: Function) => {
  window.onpopstate = () => {
    callback();
  };
};

export const removeQueryParam = (key: string) => {
  const url = new URL(window.location.href);
  url.searchParams.delete(key);
  window.history.pushState({}, '', url);
}