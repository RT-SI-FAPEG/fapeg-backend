export interface HttpRequest {
  body?: any;
  headers?: any;
  query?: any;
}

export interface HttpResponse {
  body?: any;
  headers?: any;
  statusCode: number;
}
