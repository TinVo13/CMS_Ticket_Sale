import React from 'react'
import { Button, Col, DatePicker, Form, Modal, Row, Space, Typography } from 'antd'
import { TicketEventPackage, TicketFamilyPackage } from '../../types/type';

interface ModelProps {
    visible: boolean,
    type:string,
    data: TicketFamilyPackage|TicketEventPackage,
    onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void,
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void,
    handleChangeDate: (key: string, hanSuDung: string) => void
}
const dateFormat = 'YYYY/MM/DD';
const {Text} = Typography;

const ChangeDateModal: React.FC<ModelProps> = ({ visible,type, onCancel, onClose, data, handleChangeDate }) => {
    const [hanSuDung, setHanSuDung] = React.useState<string>('');
    return (
        <Modal
            open={visible}
            onCancel={(e) => onCancel(e)}
            footer={false}
        >
            <Form
                initialValues={{
                    hanSuDung: data.ngaySuDung
                }}
                onFinish={() => handleChangeDate(data.key!, hanSuDung)}>
                <Space direction='vertical' style={{ width: '100%' }}>
                    <Row justify={'center'}>
                        <Typography.Text strong style={{ fontSize: 24 }}>
                            Đổi ngày sử dụng vé
                        </Typography.Text>
                    </Row>
                    <Row>
                        <Col span={8}>
                            Booking code
                        </Col>
                        <Col span={16}>
                            {data.bookingCode}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            Số vé
                        </Col>
                        <Col span={16}>
                            {data.soVe}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            {type.includes('Family')?<Text>Cổng Check - In</Text>
                            :<Text>Tên sự kiện</Text>}
                        </Col>
                        <Col span={16}>
                            {data.congCheckIn}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            Hạn sử dụng
                        </Col>
                        <Col span={16}>
                            <Form.Item
                                name={'hanSuSung'}
                                rules={[
                                    {
                                        required:true,
                                        message:'Vui lòng điền vào!'
                                    }
                                ]}>
                                <DatePicker format={dateFormat}
                                    onChange={(date, dateString) => setHanSuDung(dateString)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify={'center'}>
                        <Space>
                            <Button style={{ width: 100 }} onClick={(e: any) => onClose(e)}>Hủy</Button>
                            <Button style={{ width: 100 }} type='primary' htmlType='submit'>Lưu</Button>
                        </Space>
                    </Row>
                </Space>
            </Form>
        </Modal >
    )
}

export default ChangeDateModal