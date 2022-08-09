export interface HttpRequest {
  body?: any;
  header?: any;
}

export interface HttpResponse {
  body?: any;
  header?: any;
  statusCode: number;
}
