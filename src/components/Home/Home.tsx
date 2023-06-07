import React from 'react';
import { Col, ConfigProvider, DatePicker, Layout, Row, Space, Typography, theme } from 'antd';
import { ticketEventPackageCollection, ticketFamilyPackageCollection } from '../../firebase/controller';
import { Data } from '../../types/type';
import { getCountFromServer, query, where } from 'firebase/firestore';
import dayjs from 'dayjs';
import LineChart from '../Chart/LineChart';
import DonutChart from '../Chart/DonutChart';

const { Text } = Typography;
const Home: React.FC = () => {
  const [ticketFamilyPackage, setTicketFamilyPackage] = React.useState<Data>({
    used: 0,
    unused: 0
  });
  const [ticketEventPackage, setTicketEventPackage] = React.useState<Data>({
    used: 0,
    unused: 0
  });
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  React.useEffect(() => {
    async function getTicketFamilyPackage() {
      const query1 = query(ticketFamilyPackageCollection, where("tinhTrangSuDung", "==", "Đã sử dụng"));
      const query2 = query(ticketFamilyPackageCollection, where("tinhTrangSuDung", "==", "Chưa sử dụng"));
      setTicketFamilyPackage({
        used: (await getCountFromServer(query1)).data().count,
        unused: (await getCountFromServer(query2)).data().count
      })
    };
    async function getTicketEventPackage() {
      const query1 = query(ticketEventPackageCollection, where("tinhTrangSuDung", "==", "Đã sử dụng"));
      const query2 = query(ticketEventPackageCollection, where("tinhTrangSuDung", "==", "Chưa sử dụng"));
      setTicketEventPackage({
        used: (await getCountFromServer(query1)).data().count,
        unused: (await getCountFromServer(query2)).data().count
      })
    };
    getTicketFamilyPackage();
    getTicketEventPackage();
  }, [])
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FFB800',
          colorBgLayout: colorBgContainer,
        }
      }}>
      <Layout style={{ borderRadius: 24, padding: 16 }}>
        <Space direction='vertical'>
          <Text className='page-title'>Thống kê</Text>
          <Row justify={'space-between'}>
            <Text strong>Doanh thu</Text>
            <DatePicker
              format={"DD/MM/YYYY"}
              defaultValue={dayjs()} />
          </Row>
          <div>
            <LineChart />
          </div>
          <Text>Tổng doanh thu theo tuần</Text>
          <Text style={{ fontSize: 24 }}>525.145.000<Text style={{ fontSize: 14 }}>đồng</Text></Text>
          <Row align={'top'} justify={'space-between'} style={{ height: 200, width: '100%' }}>
            <Col span={4}>
              <DatePicker
                format={"DD/MM/YYYY"}
                defaultValue={dayjs()} />
            </Col>
            <Col span={8}>
              <DonutChart title="Gói gia đình" data={ticketFamilyPackage!} />
            </Col>
            <Col span={8}>
              <DonutChart title="Gói sự kiện" data={ticketEventPackage!} />
            </Col>
            <Col span={2}></Col>
          </Row>
        </Space>
      </Layout>
    </ConfigProvider>
  )
}

export default Home