import { PlusOutlined,HighlightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import { FormattedMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { BitCoinAccount, TableListItem } from './data.d';
import { query,updateBitCoinMoney } from './service';
import { ModalForm, ProFormDigit } from '@ant-design/pro-form';

const TableList: React.FC = () => {

  const actionRef = useRef<ActionType>();
  const [values,setValues] = useState<TableListItem>({});
  const [bitCoinAccount,setBitCoinAccount] = useState<BitCoinAccount>({});
  const [changeBitCoinMoneyModalVisible,setChangeBitCoinMoneyModalVisible] = useState<boolean>(false);

  const change = (record: BitCoinAccount,values:TableListItem)=>{
    setChangeBitCoinMoneyModalVisible(true);
    setValues(values);
    setBitCoinAccount(record);
  }


  const columns: ProColumns<TableListItem>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      width:120,
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      width:120,
    },
    {
      title: '推荐码',
      width:80,
      dataIndex: 'extendCode',
    },
    {
      title: '实名认证',
      dataIndex: 'isAuth',
      width:80,
      renderText:text=>text?"已认证":"未认证"
    },
    {
      title: '操作',
      dataIndex: 'option',
      width:200,
      render: (_, record) => (
        <>
          <a>锁定</a>
        </>
      )
    },
  ];

  return (
    <PageContainer title={false}>
      <ProTable<TableListItem>
        actionRef={actionRef}
        rowKey="id"
        size='small'
        bordered
        search={{
          labelWidth: 120,
        }}
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
