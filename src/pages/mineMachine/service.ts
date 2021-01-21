import {TableListParams} from "@/pages/memberRank/data";
import request from "@/utils/request";
import {PaginationResponse, parsePagination} from "@/utils/common";
import {Constants} from "@/utils/constants";

export async function query(params?: TableListParams) {
  return request<PaginationResponse>(`${Constants.baseUrl}mine_machine/page`, {
    method:"POST",
    data:params,
  }).then(res=>parsePagination(res));
}
