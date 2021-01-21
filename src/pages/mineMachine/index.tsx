import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import { FormattedMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { BitCoinAccount, TableListItem } from './data.d';
import { query } from './service';
import { ModalForm, ProFormDigit } from '@ant-design/pro-form';

const TableList: React.FC = () => {

  const actionRef = useRef<ActionType>();
  const [values,setValues] = useState<TableListItem>({});
  const [bitCoinAccount,setBitCoinAccount] = useState<BitCoinAccount>({});
  const [changeBitCoinMoneyModalVisible,setChangeBitCoinMoneyModalVisible] = useState<boolean>(false);


  const columns: ProColumns<TableListItem>[] = [
    {
      title: '矿机名称',
      dataIndex: 'name',
      width:120,
    },
    {
      title: '算力(天)',
      dataIndex: 'profit',
    },
    {
      title: '库存',
      dataIndex: 'stock',
      width:60,
    },
    {
      title: '售价',
      dataIndex: 'money',
      width:60,
      valueType: 'money'
    },
  ];

  return (
    <PageContainer title={false}>
      <ProTable<TableListItem>
        actionRef={actionRef}
        rowKey="id"
        size='small'
        search={false}
        bordered
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
          </Button>,
        ]}
        request={(params, sorter, filter) => query({ ...params, sorter, filter })}
        columns={columns}
      />

      {
        changeBitCoinMoneyModalVisible ? (
          <ModalForm
            title={`调整 ${bitCoinAccount.name} 余额`}
            width="400px"
            layout='inline'
            visible={changeBitCoinMoneyModalVisible}
            onVisibleChange={()=>{
              setChangeBitCoinMoneyModalVisible(false);
              setValues({});
              setBitCoinAccount({});
            }}
            onFinish={async (value) => {
              const success = await updateBitCoinMoney({
                ...value,
                bitCoinAccountMoneyId: bitCoinAccount.id,
                memberId: values.id,
              });
              console.log(success);
              if (success) {
                setChangeBitCoinMoneyModalVisible(false);
                setValues({});
                setBitCoinAccount({});
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
          >
            <ProFormDigit
              label="调整之后余额"
              name="money"
              min={0}
              width={200}
              rules={[
                {
                  required: true,
                  message:'必填',
                }
              ]}
            />
          </ModalForm>
        ) : null
      }

    </PageContainer>
  );
};

export default TableList;
