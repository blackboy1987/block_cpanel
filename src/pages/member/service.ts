import request  from '@/utils/request';
import type { TableListParams } from './data.d';
import { Constants } from '@/utils/constants';
import { PaginationResponse, parsePagination, ResponseResult } from '@/utils/common';

export async function query(params?: TableListParams) {
  return request<PaginationResponse>(`${Constants.baseUrl}member/page`, {
    method:"POST",
    data:params,
  }).then(res=>parsePagination(res));
}

export async function updateBitCoinMoney(params?: {[key: string]: any}) {
  return request<ResponseResult>(`${Constants.baseUrl}member/updateBitCoinMoney`, {
    method:"POST",
    data:params,
  });
}

