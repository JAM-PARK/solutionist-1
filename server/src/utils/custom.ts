export const emptyObjectCk = (obj: Object): boolean => {
  if (Object.keys(obj).length === 0) {
    return true;
  } else {
    return false;
  }
};

export const insertIntoObject = (obj: object, key: string, val: number) => {
  obj[key] = val;
  return obj;
};

export const convertRawObject = (obj: Object) => {
  return JSON.parse(JSON.stringify(obj));
};

export const timestampToLocaleTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};
