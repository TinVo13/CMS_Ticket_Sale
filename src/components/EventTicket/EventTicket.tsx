import React from 'react'
import { Badge, Button, Checkbox, Col, ConfigProvider, DatePicker, Form, Input, Layout, Modal, Popover, Radio, Row, Space, Tag, Typography } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { SearchOutlined, MoreOutlined } from '@ant-design/icons';
import { TicketEventPackage } from '../../types/type';
import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore';
import { ticketEventPackageCollection } from '../../firebase/controller';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import ChangeDateModal from '../Model/ChangeDateModal';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getListTicketEventPackage, updateDateTicketEventPackage, updateStatusTicket } from '../../redux/features/ticketEventPackage.slice';


interface Filter {
  tuNgay: string,
  denNgay: string,
  tinhTrangSuDung: string,
  congCheckIn: CheckboxValueType[]
}
const dateFormat = 'YYYY/MM/DD';
const { Text } = Typography;
const EventTicket: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.ticketEventPackageSlice);

  const [searchValue, setSearchValue] = React.useState<string>("");
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [changeDateModalOpen, setChangeDateModalOpen] = React.useState<boolean>(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [ticketEventPackage, setTicketEventPackage] = React.useState<TicketEventPackage[]>();
  //filter để lọc vé
  const [filter, setFilter] = React.useState<Filter>({
    tuNgay: '01/01/2001',
    denNgay: dayjs().format(dateFormat).toString(),
    tinhTrangSuDung: 'Tất cả',
    congCheckIn: ['Tất cả']
  });
  //lọc vé
  const handleFinish = (fieldValues: any) => {
    const values = {
      ...fieldValues,
      'tuNgay': fieldValues['tuNgay'].format(dateFormat),
      'denNgay': fieldValues['denNgay'].format(dateFormat),
      'tinhTrangSuDung': fieldValues['tinhTrangSuDung'],
      'congCheckIn': fieldValues['congCheckIn']
    }
    setFilter(values);
    setModalOpen(false);
  }
  //xuất file csv
  const handleDownloadCSV = () => {
    const downloadExcel = () => {
      const workSheet = XLSX.utils.json_to_sheet(ticketEventPackage!);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "Báo Cáo");
      //Buffer
      XLSX.write(workBook, {
        bookType: "xlsx",
        type: "buffer",
      });
      //Binary string
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
      //Download
      XLSX.writeFile(workBook, "QuanLyGoiSuKien.xlsx");
    };
    downloadExcel();
  }

  //cập nhật ngày sử dụng
  const handleChangeDate = (key: string, hanSuDung: string) => {
    dispatch(updateDateTicketEventPackage({ key: key, hanSuDung: hanSuDung }));
    setChangeDateModalOpen(false);
  }

  //cập nhật tình trạng sử dụng
  const handleUpdateEventTicketStatus = (key: string) => {
    dispatch(updateStatusTicket({ key: key }));
  }

  React.useEffect(() => {
    onSnapshot(ticketEventPackageCollection, (snapshot: QuerySnapshot<DocumentData>) => {
      setTicketEventPackage(
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
    dispatch(getListTicketEventPackage({ list: ticketEventPackage! }));
  });
  //columns table
  const columns: ColumnsType<TicketEventPackage> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (value, record, index) => (
        index + 1
      )
    },
    {
      title: 'Booking Code',
      dataIndex: 'bookingCode',
      key: 'bookingCode',
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
      title: 'Tên sự kiện',
      dataIndex: 'tenSuKien',
      key: 'tenSuKien',
    },
    {
      title: 'Tình trạng sử dụng',
      dataIndex: 'tinhTrangSuDung',
      key: 'tinhTrangSuDung',
      render: (_, record) => (
        <Space>
          {record.tinhTrangSuDung.includes("Đã sử dụng") && <Tag color='default'><Badge status='default' text={record.tinhTrangSuDung} style={{ color: '#919DBA' }} /></Tag>}
          {record.tinhTrangSuDung.includes('Chưa sử dụng') && <Tag color='success' bordered><Badge status='success' text={record.tinhTrangSuDung} style={{ color: '#03AC00' }} /></Tag>}
          {record.tinhTrangSuDung.includes('Hết hạn') && <Tag color='error' bordered><Badge status='error' text={record.tinhTrangSuDung} style={{ color: 'red' }} /></Tag>}
        </Space>
      ),
      filteredValue: [filter.tinhTrangSuDung],
      onFilter: (value: any, record) => {
        if (value === 'Tất cả') {
          return record.tinhTrangSuDung;
        } else {
          return record.tinhTrangSuDung.includes(value)
        }
      }
    },
    {
      title: 'Ngày sử dụng',
      dataIndex: 'ngaySuDung',
      key: 'ngaySuDung',
      filteredValue: [filter.tuNgay],
      onFilter: (value: any, record) => {
        let tuNgay = new Date(value.toString());
        let denNgay = new Date(filter.denNgay.toString());
        let ngaySuDung = new Date(record.ngaySuDung?.toString()!);
        return tuNgay.valueOf() <= ngaySuDung.valueOf() && ngaySuDung.valueOf() <= denNgay.valueOf();
      },
    },
    {
      title: 'Ngày xuất vé',
      dataIndex: 'ngayXuatVe',
      key: 'ngayXuatVe',
    },
    {
      title: 'Cổng check - in',
      dataIndex: 'congCheckIn',
      key: 'congCheckIn',
      filteredValue: ['Tất cả'],
      onFilter: (value: string | number | boolean, record) => {
        if (filter.congCheckIn.find((values) => values.valueOf() === value)) {
          return record.congCheckIn;
        }
        return record.congCheckIn.includes(filter.congCheckIn.map((values) => values.toString()));
      }
    },
    {
      dataIndex: 'options',
      key: 'options',
      render: (_, record) => (
        <Space>
          {record.tinhTrangSuDung.toString().includes('Chưa sử dụng') ? 
          <Popover content={(
            <Space direction='vertical'>
              <Button type='ghost' onClick={() => handleUpdateEventTicketStatus(record.key!)}>
                <Text strong>
                  Sử dụng vé
                </Text>
              </Button>
              <Button type='ghost' onClick={() => setChangeDateModalOpen(true)}>
                <Text strong>
                  Đổi ngày sử dụng
                </Text>
              </Button>
              <ChangeDateModal
                visible={changeDateModalOpen}
                type='Family'
                onCancel={() => setChangeDateModalOpen(false)}
                onClose={() => setChangeDateModalOpen(false)}
                data={record}
                handleChangeDate={(key, hanSuDung) => handleChangeDate(key, hanSuDung)} />
            </Space>
          )} trigger={'hover'} color='#FFD2A8' placement='topRight'>
            <MoreOutlined />
          </Popover>:
          null}
        </Space>
      )
    }
  ]

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FF993C'
        },
        components: {
          Button: {
            colorBorder: '#FF993C',
            colorText: '#FF993C'
          },
          Input: {
            colorBgContainer: '#F7F7F8'
          },
        }
      }}>
      <Layout>
        <Space direction='vertical'>
          <Row justify={'space-between'}>
            <Col span={9}>
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                placeholder='Tìm bằng số vé'
                suffix={<SearchOutlined />} />
            </Col>
            <Col>
              <Space>
                <Button style={{ fontWeight: 'bold' }} onClick={() => setModalOpen(true)}>
                  Lọc vé
                </Button>
                <Button style={{ fontWeight: 'bold' }} onClick={() => handleDownloadCSV()}>
                  Xuất file (.CSV)
                </Button>
              </Space>
            </Col>
          </Row>
          <Table
            size='middle'
            pagination={{ pageSize: 7, position: ['bottomCenter'] }}
            dataSource={data.ticketEventList}
            columns={columns} />
        </Space>
        <Modal
          title={(
            <Row justify={'center'}>
              <Text style={{ fontSize: 24, color: 'black' }} strong>Lọc vé</Text>
            </Row>
          )}
          centered
          open={modalOpen}
          footer={false}
          closable={false}
          onOk={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
        >
          <Form
            initialValues={{
              tuNgay: dayjs('2020/01/01', dateFormat),
              denNgay: dayjs(),
              tinhTrangSuDung: 'Tất cả',
              congCheckIn: ['Tất cả']
            }}
            onFinish={handleFinish}>
            <Row>
              <Col md={12}>
                <div>
                  <Text>Từ ngày</Text>
                  <Form.Item
                    name={'tuNgay'}>
                    <DatePicker
                      format={dateFormat}/>
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <Text>Đến ngày</Text>
                  <Form.Item
                    name={'denNgay'}>
                    <DatePicker
                      format={dateFormat} />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Text>Tình trạng sử dụng</Text>
            <Form.Item
              name={'tinhTrangSuDung'}>
              <Radio.Group>
                <Radio value={'Tất cả'}>Tất cả</Radio>
                <Radio value={'Đã sử dụng'}>Đã sử dụng</Radio>
                <Radio value={'Chưa sử dụng'}>Chưa sử dụng</Radio>
                <Radio value={'Hết hạn'}>Hết hạn</Radio>
              </Radio.Group>
            </Form.Item>
            <Text>Cổng Check - in</Text>
            <Form.Item
              name={'congCheckIn'}>
              <Checkbox.Group>
                <Row justify={'space-between'}>
                  <Col span={8}>
                    <Checkbox value="Tất cả" onChange={(e: CheckboxChangeEvent) => {
                      e.target.checked ? setDisabled(true) : setDisabled(false)
                    }}>Tất cả</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Cổng 1" disabled={disabled}>Cổng 1</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Cổng 2" disabled={disabled}>Cổng 2</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Cổng 3" disabled={disabled}>Cổng 3</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Cổng 4" disabled={disabled}>Cổng 4</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Cổng 5" disabled={disabled}>Cổng 5</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
            <Row justify={'center'}>
              <Button htmlType='submit'>Lọc</Button>
            </Row>
          </Form>
        </Modal>
      </Layout>
    </ConfigProvider>
  )
}

export default EventTicket