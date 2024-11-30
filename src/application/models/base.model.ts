export class BaseModel<D> {
  constructor(data?: D) {
    Object.assign(this, data);
  }

  id: string;
}
