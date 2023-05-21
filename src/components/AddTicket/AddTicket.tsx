import React from 'react'
import { Button, Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select, Space, TimePicker, Typography } from 'antd'
import { TicketType } from '../../types/type';

interface ModelProps {
    isOpen: boolean,
    isClose: (e: React.MouseEvent<HTMLButtonElement>) => void,
    handleAddTicket: (ticket: TicketType) => void
}
const { Text } = Typography;
const AddTicket: React.FC<ModelProps> = ({ isOpen, isClose, handleAddTicket }) => {
    return (
        <Modal
            title={(
                <Row justify={'center'}>
                    <Text style={{ fontSize: 24, color: 'black' }} strong>Lọc vé</Text>
                </Row>
            )}
            centered
            open={isOpen}
            footer={true}
            closable={true}
        >
            <Form
                onFinish={(value: TicketType) => handleAddTicket(value)}>
                <Space style={{ width: '100%' }} direction='vertical'>
                    <Row>
                        <Col span={12}>
                            <Space direction='vertical'>
                                <Text>Tên gói vé<Text type='danger'>*</Text></Text>
                                <Form.Item
                                    name={'tenGoiVe'}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên gói vé!'
                                        }
                                    ]}>
                                    <Input placeholder='Nhập tên gói vé' />
                                </Form.Item>
                            </Space>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Space direction='vertical'>
                                <Text>Ngày áp dụng</Text>
                                <div>
                                    <Space>
                                        <DatePicker format={'DD/MM/YY'} />
                                        <TimePicker />
                                    </Space>
                                </div>
                            </Space>
                        </Col>
                        <Col span={12}>
                            <Space direction='vertical'>
                                <Text>Ngày hết hạn</Text>
                                <div>
                                    <Space>
                                        <DatePicker format={'DD/MM/YY'} />
                                        <TimePicker />
                                    </Space>
                                </div>
                            </Space>
                        </Col>
                    </Row>
                    <Row>
                        <Text>Giá vé áp dụng</Text>
                    </Row>
                    <Row>
                        <Space>
                            <Checkbox value={'giaVe'}>Vé lẻ (vnđ/vé) với giá</Checkbox>
                            <Input type='text' placeholder='Giá vé' style={{ width: 100 }} />
                            <Text>/vé</Text>
                        </Space>
                    </Row>
                    <Row>
                        <Space>
                            <Checkbox value={'giaCombo'}>Combo vé với giá</Checkbox>
                            <Input type='text' placeholder='Giá vé' style={{ width: 100 }} />
                            <Text>/</Text>
                            <Input type='text' placeholder='Giá vé' style={{ width: 100 }} />
                            <Text>vé</Text>
                        </Space>
                    </Row>
                    <Row>
                        <Space style={{ width: '100%' }} direction='vertical'>
                            <Text>Tình trạng</Text>
                            <Select options={[
                                {
                                    value: 'Đang áp dụng',
                                    label: 'Đang áp dụng'
                                },
                                {
                                    label: 'Tắt',
                                    value: 'Tắt'
                                }
                            ]}
                                defaultValue={'Đang sử dụng'}
                                style={{ width: 150, }} />
                        </Space>
                    </Row>
                    <Row>
                        <Text type='danger'>*<Text>là thông tin bắt buộc</Text></Text>
                    </Row>
                    <Row justify={'center'}>
                        <Space>
                            <Form.Item>
                                <Button style={{width: 100,color:'#FFB800',fontWeight:'bold'}} onClick={(event: any) => isClose(event)}>Huy</Button>
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType='submit' style={{width:100,color:'white',background:'orange'}}>Lọc</Button>
                            </Form.Item>
                        </Space>
                    </Row>
                </Space>
            </Form>
        </Modal>
    )
}

export default AddTicket