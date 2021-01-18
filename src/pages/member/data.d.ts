export type BitCoinAccount = {
  assetType: number;
  createdDate: Date;
  frozenMoney: number;
  id: number;
  money: number;
  name: string;
}

export type TableListItem = {
  id: number;
  name: string;
  username: string;
  phone: string;
  extendCode: string;
  updatedAt: Date;
  createdDate: Date;
  isAuth: boolean;
  bitCoinAccounts: BitCoinAccount[]
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
