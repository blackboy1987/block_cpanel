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
  mineMachineCount: number;
  isDefault: boolean;
  memberCount: number;
  createdDate: Date;
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
