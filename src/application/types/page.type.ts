export type Page<T = any> = {
  total: number;
  skip: number;
  data: T[];
};
