import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";

export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedResult<T> {
  result: T;
  pagination: Pagination
}

export function getPaginatedResult<T>(url: string, params: any, http: HttpClient) {
  return http.get<T>(url, { observe: 'response', params });
}

export function getPaginationHeaders(pageNumber: number, pageSize: number): HttpParams {
  let params = new HttpParams();

  params = params.append('page', pageNumber.toString());
  params = params.append('size', pageSize.toString());

  return params;
}