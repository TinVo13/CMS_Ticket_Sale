import React from 'react'
import { Badge, Button, Col, ConfigProvider, Form, Input, Layout, Row, Space, Table, Tag, Typography, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { TicketPackage, TicketPackageType } from '../../types/type';
import { SearchOutlined, EditOutlined } from '@ant-design/icons';
import { ticketPackageCollection } from '../../firebase/controller';
import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getListTicketPackage, addTicketPackage, updateTicketPackage } from '../../redux/features/ticketPackage.slice';
import AddTicket from '../../components/Model/AddTicket';
import UpdateTicket from '../../components/Model/UpdateTicket';

const { Text } = Typography; 
const dateFormat = 'YYYY/MM/DD';
const timeFormat = 'HH:mm:ss';
const Setting: React.FC = () => {
  const [formUpdateModel] = Form.useForm();
  const [formAddModel] = Form.useForm();
  const [openAddModel, setOpenAddModel] = React.useState<boolean>(false);
  const [openUpdateModel, setOpenUpdateModel] = React.useState<boolean>(false);
  const [ticketPackage, setTicketPackage] = React.useState<TicketPackage[]>();
  const [record, setRecord] = React.useState<TicketPackage>({
    giaCombo: '',
    giaVe: '',
    key: '',
    maGoi: '',
    ngayApDung: '',
    ngayHetHan: '',
    tenGoiVe: '',
    tinhTrang: ''
  })
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [number, setNumber] = React.useState<number>(Math.floor(Math.random() * 99999) + 10000);
  const dispatch = useAppDispatch();

  const data = useAppSelector(state => state.ticketPackageSlice);

  const handleAddTicket = (ticket: TicketPackageType) => {
    setNumber(Math.floor(Math.random() * 99999) + 10000);
    ticket.maGoi = "ALT" + number;
    dispatch(addTicketPackage({ ticketPackage: ticket }));
    setOpenAddModel(false);
    formAddModel.resetFields();
  }

  const handleOpenUpdateModel = (ticketPackage: TicketPackage) => {
    setOpenUpdateModel(true);
    setRecord(ticketPackage);
  }
  const handleUpdateTicket = (key: string, fieldValues: any) => {
    const values:TicketPackageType = {
      'maGoi': fieldValues['maGoi'],
      'tenGoiVe': fieldValues['tenGoiVe'],
      'ngayApDung': fieldValues['ngayApDung'].format(dateFormat) +' '+ fieldValues['gioApDung'].format(timeFormat),
      'ngayHetHan':fieldValues['ngayHetHan'].format(dateFormat) +' '+ fieldValues['gioHetHan'].format(timeFormat),
      'giaVe':fieldValues['giaVe'],
      'giaCombo':fieldValues['giaCombo'],
      'tinhTrang':record.tinhTrang
    }
    setOpenUpdateModel(false);
    dispatch(updateTicketPackage({ key: key, ticketPackage: values }))
  }
  React.useEffect(() => {
    onSnapshot(ticketPackageCollection, (snapshot: QuerySnapshot<DocumentData>) => {
      setTicketPackage(
        snapshot.docs.map((doc) => {
          return {
            key: doc.id,
            ...doc.data()
          }
        })
      )
    })
  }, []);

  React.useEffect(() => {
    dispatch(getListTicketPackage({ list: ticketPackage! }));
  });

  const columns: ColumnsType<TicketPackage> = [
    {
      title: 'STT',
      render: (text, record, index) => (
        index + 1
      )
    },
    {
      title: 'Mã gói',
      dataIndex: 'maGoi',
      key: 'maGoi'
    },
    {
      title: 'Tên gói vé',
      dataIndex: 'tenGoiVe',
      key: 'tenGoiVe',
      filteredValue: [searchValue],
      onFilter: (value, record) => {
        return String(record.tenGoiVe).toLowerCase().includes(String(value).toLowerCase());
      }
    },
    {
      title: 'Ngày áp dụng',
      dataIndex: 'ngayApDung',
      key: 'ngayApDung'
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'ngayHetHan',
      key: 'ngayHetHan'
    },
    {
      title: 'Giá vé (VNĐ/Vé)',
      dataIndex: 'giaVe',
      key: 'giaVe',
      render: (_, record) => {
        return record.giaVe + ' VNĐ'
      }
    },
    {
      title: 'Giá combo (VNĐ/Combo)',
      dataIndex: 'giaCombo',
      key: 'giaCombo',
      render: (_, record) => {
        return record.giaCombo + ' VNĐ/1 vé';
      }
    },
    {
      title: 'Tình trạng',
      dataIndex: 'tinhTrang',
      key: 'tinhTrang',
      render: (_, record) => (
        <Space>
          {record.tinhTrang!.includes('Đang áp dụng') && <Tag color='success' bordered><Badge status='success' text={record.tinhTrang} style={{ color: '#03AC00' }} /></Tag>}
          {record.tinhTrang!.includes('Tắt') && <Tag color='error' bordered><Badge status='error' text={record.tinhTrang} style={{ color: 'red' }} /></Tag>}
        </Space>
      )
    },
    {
      dataIndex: 'options',
      key: 'options',
      render: (_, record) => (
        <Space>
          <Button type='text' onClick={() => handleOpenUpdateModel(record)}>
            <EditOutlined style={{ color: '#FF993C' }} />
            <Text strong style={{ color: '#FF993C' }}>Cập nhật</Text>
          </Button>
        </Space>
      ),
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
          Input: {
            colorBgContainer: '#EDEDED'
          },
          Button: {
            colorBorder: '#FFB800'
          }
        }
      }}>
      <Layout style={{ borderRadius: 24, padding: '8px 16px' }}>
        <Space direction='vertical'>
          <Text className='page-title'>Danh sách gói vé</Text>
          <Row justify={'space-between'}>
            <Col span={9}>
              <Input
                placeholder='Tìm bằng tên gói vé'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                prefix={<SearchOutlined />} />
            </Col>
            <Col>
              <Space>
                <Button style={{ color: '#FFB800', fontWeight: 'bold' }} >Xuất file (.csv)</Button>
                <Button style={{ background: '#FFB800', color: 'white', fontWeight: 'bold' }} onClick={() => setOpenAddModel(true)}>Thêm gói vé</Button>
              </Space>
            </Col>
          </Row>
          <Table
            pagination={{ pageSize: 7, position: ['bottomCenter'] }}
            size='middle'
            dataSource={data.settingList}
            columns={columns}
            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
          />
        </Space>
        <AddTicket
          form={formAddModel}
          isOpen={openAddModel}
          isClose={() => setOpenAddModel(false)}
          handleAddTicket={(ticket: TicketPackageType) => handleAddTicket(ticket)} />
        <UpdateTicket
          form={formUpdateModel}
          data={record}
          isClose={() => setOpenUpdateModel(false)}
          isOpen={openUpdateModel}
          handleUpdateTicket={(key: string, ticket: TicketPackageType) => handleUpdateTicket(key, ticket)} />
      </Layout>
    </ConfigProvider>
  )
}

export default Setting;