import React from 'react'
import { Button, Col, ConfigProvider, DatePicker, Form, Input, Layout, Radio, Row, Space, Table, Typography, theme } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { TicketChecks } from '../../types/type';
import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore';
import { ticketCheckPackageCollection } from '../../firebase/controller';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getTicketCheck } from '../../redux/features/ticketCheck.slice';

interface Filter {
  doiSoat: string,
  tuNgay: string,
  denNgay: string
}
const { Text } = Typography;
const dateFormat = 'YYYY/MM/DD';
const TicketCheck: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state)=>state.ticketCheckSlice);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [ticketCheck, setTicketCheck] = React.useState<TicketChecks[]>();
  const [filter, setFilter] = React.useState<Filter>({
    tuNgay: dayjs('2020/01/01').format(dateFormat),
    denNgay: dayjs().format(dateFormat),
    doiSoat: 'Tất cả'
  });

  const handleClick = (fieldsValue: any) => {
    const value = {
      ...fieldsValue,
      'doiSoat': fieldsValue['doiSoat'],
      'tuNgay': fieldsValue['tuNgay'].format(dateFormat),
      'denNgay': fieldsValue['denNgay'].format(dateFormat)
    }
    setFilter(value);
  }
  React.useEffect(() => {
    onSnapshot(ticketCheckPackageCollection, (snapshot: QuerySnapshot<DocumentData>) => {
      setTicketCheck(
        snapshot.docs.map((doc) => {
          return {
            key: doc.id,
            ...doc.data()
          }
        })
      )
    })
  }, [])
  React.useEffect(()=>{
    dispatch(getTicketCheck({list:ticketCheck!}));
  });
  const columns: ColumnsType<TicketChecks> = [
    {
      title: 'STT',
      render: (text, record, index) => (
        index + 1
      )
    },
    {
      title: 'Số vé',
      dataIndex: 'soVe',
      key: 'soVe',
      filteredValue: [searchValue],
      onFilter(value: any, record) {
        return String(record.soVe).toLowerCase().includes(value)
      },
    },
    {
      title: 'Ngày sử dụng',
      dataIndex: 'ngaySuDung',
      key: 'ngaySuDung',
      filteredValue: [filter.tuNgay],
      onFilter: (value: number | string | boolean, record) => {
        var ngaySuDung = new Date(record.ngaySuDung?.toString()!);
        var tuNgay = new Date(filter.tuNgay.toString());
        var denNgay = new Date(filter.denNgay.toString());
        return tuNgay <= ngaySuDung && ngaySuDung <= denNgay;
      }
    },
    {
      title: 'Tên loại vé',
      dataIndex: 'tenLoaiVe',
      key: 'tenLoaiVe',
    },
    {
      title: 'Cổng check - in',
      dataIndex: 'congCheckIn',
      key: 'congCheckIn',
    },
    {
      dataIndex: 'doiSoat',
      key: 'doiSoat',
      render: (_, record) => (
        <Space>
          {record.doiSoat?.includes('Đã đối soát') && <Text type='danger' italic>{record.doiSoat}</Text>}
          {record.doiSoat?.includes('Chưa đối soát') && <Text type='secondary' italic>{record.doiSoat}</Text>}
        </Space>
      ),
      filteredValue: [filter.doiSoat],
      onFilter: (value: string | boolean | number, record) => {
        if (value === 'Tất cả') {
          return record.doiSoat!;
        }
        return record.doiSoat === value;
      }
    }
  ]
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FFB800',
          colorBgLayout: colorBgContainer
        },
        components: {
          Button: {
            colorBgContainer: '#FFB800',
            colorText: 'white',
          },
        }
      }}>
      <Row gutter={24}>
        <Col span={17}>
          <Layout style={{ borderRadius: 24, padding: 16, height: '75ch' }}>
            <Space direction='vertical' style={{ width: '100%' }}>
              <Text className='page-title'>Đối soát vé</Text>
              <Row justify={'space-between'}>
                <Col span={13}>
                  <Input
                    prefix={<SearchOutlined />}
                    placeholder='Tìm bằng số vé'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} />
                </Col>
                <Col>
                  <Button>Chốt đối soát</Button>
                </Col>
              </Row>
              <Table
                dataSource={data.ticketCheckList}
                columns={columns}
                pagination={{ pageSize: 6 }} />
            </Space>
          </Layout>
        </Col>
        <Col span={7}>
          <Layout style={{ borderRadius: 24, padding: 16, height: '75ch' }}>
            <Form
              initialValues={{
                doiSoat: 'Tất cả',
                tuNgay: dayjs('2020/01/01'),
                denNgay: dayjs()
              }}
              onFinish={(fieldsValue) => handleClick(fieldsValue)}>
              <Space direction='vertical'>
                <Text strong style={{ fontSize: 24 }}>Lọc vé</Text>
                <Row>
                  <Col span={12}>
                    <Text>Tình trạng đối soát</Text>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={'doiSoat'}>
                      <Radio.Group>
                        <Radio value={'Tất cả'}>Tất cả</Radio>
                        <Radio value={'Đã đối soát'}>Đã đối soát</Radio>
                        <Radio value={'Chưa đối soát'}>Chưa đối soát</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Text>Loại vé</Text>
                  </Col>
                  <Col span={12}>
                    Vé cổng
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Text>Từ ngày</Text>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={'tuNgay'}>
                      <DatePicker format={dateFormat} disabled />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Text>Đến ngày</Text>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={'denNgay'}>
                      <DatePicker format={dateFormat} placement='bottomRight' showToday={false}/>
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={'center'}>
                  <Button
                    style={{ background: 'white', borderColor: '#FFB800', color: '#FFB800', fontWeight: 'bold', width: 100 }}
                    htmlType='submit'>Lọc</Button>
                </Row>
              </Space>
            </Form>
          </Layout>
        </Col>
      </Row>
    </ConfigProvider>
  )
}

export default TicketCheck