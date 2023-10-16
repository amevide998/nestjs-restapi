interface Page {
  current : number,
  size: number
  total: number,
  totalPage: number
}

export class WebResponse<T> {
  status: number
  message: String
  data: T
  pagination: Page | null
  constructor(status: number, message: String, data: T, pagination : Page| null) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.pagination = pagination
  }
}