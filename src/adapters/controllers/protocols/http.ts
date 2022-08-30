export interface HttpRequest {
  body?: any;
  headers?: any;
  query?: any;
  params?: any;
}

export interface HttpResponse {
  body?: any;
  headers?: any;
  statusCode: number;
}
