interface params {
  [key: string]: string;
}

export const getFormDataFromParams = (params: params) => {
  const form = new FormData();

  for (const key in params) {
    form.append(key, params[key]);
  }

  return form;
};
