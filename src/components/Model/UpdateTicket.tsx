import React from 'react'
import { Button, Checkbox, Col, ConfigProvider, DatePicker, Form, Input, Modal, Row, Space, TimePicker, Typography } from 'antd'
import { TicketPackageType } from '../../types/type';
import { FormInstance } from 'antd/es/form/Form';
import dayjs from 'dayjs';

interface ModelProps {
    form: FormInstance<any>,
    data: any,
    isOpen: boolean,
    isClose: (e: React.MouseEvent<HTMLButtonElement>) => void,
    handleUpdateTicket: (key: string, ticket: TicketPackageType) => void
}
const { Text } = Typography;
const dateFormat = 'YYYY/MM/DD';
const timeFormat = 'HH:mm:ss';

const UpdateTicket: React.FC<ModelProps> = ({ form, data, isClose, isOpen, handleUpdateTicket }) => {
    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        // form.resetFields();
        isClose(event);
    }
    React.useEffect(() => {
        form.setFieldsValue({
            maGoi: data.maGoi?.toString(),
            tenGoiVe: data.tenGoiVe,
            ngayApDung: dayjs(data.ngayApDung!.slice(0, 10), dateFormat),
            gioApDung: dayjs(data.ngayApDung!.slice(11, 19), timeFormat),
            ngayHetHan: dayjs(data.ngayHetHan!.slice(0, 10), dateFormat),
            gioHetHan: dayjs(data.ngayHetHan!.slice(11, 19), timeFormat),
            giaVe: data.giaVe,
            giaCombo: data.giaCombo,
            ve: '1'
        });
    }, [data,form]);
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#FF993C'
                },
                components: {
                    Input: {
                        colorBgContainer: 'white'
                    },
                }
            }}>
            <Modal
                title={(
                    <Row justify={'center'}>
                        <Text style={{ fontSize: 24, color: 'black' }} strong>Cập nhật gói vé</Text>
                    </Row>
                )}
                centered
                open={isOpen}
                footer={false}
                width={'50%'}>
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={(fieldValue) => handleUpdateTicket(data.key!, fieldValue)}>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Space direction='vertical'>
                                <Form.Item
                                    hasFeedback
                                    label={data.maGoi}
                                    name={'maGoi'}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mã gói vé!'
                                        }
                                    ]}>
                                    <Input placeholder='Nhập mã gói vé'
                                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTicketPackage({ ...ticketPackage, tenGoiVe: e.target.value })} 
                                    />
                                </Form.Item>
                            </Space>
                        </Col>
                        <Col span={12}>
                            <Space direction='vertical'>
                                <Form.Item
                                    label={'Tên gói'}
                                    name={'tenGoiVe'}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên gói vé!'
                                        }
                                    ]}>
                                    <Input placeholder='Nhập tên gói vé'
                                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTicketPackage({ ...ticketPackage, tenGoiVe: e.target.value })} 
                                    />
                                </Form.Item>
                            </Space>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                label={'Ngày áp dụng'}>
                                <Space>
                                    <Form.Item
                                        name={'ngayApDung'}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng điền vào!'
                                            }
                                        ]}>
                                        <DatePicker format={dateFormat}
                                        // onChange={(date: any, dateString) =>setTicketPackage({ ...ticketPackage, ngayApDung: `${dateString}` })} 
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name={'gioApDung'}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng điền vào!'
                                            }
                                        ]}>
                                        <TimePicker format={timeFormat}
                                        // onChange={(value, dateString) => { setTicketPackage({ ...ticketPackage, ngayApDung: ticketPackage.ngayApDung.slice(0, 10) + ` ${dateString}` }) }}
                                        />
                                    </Form.Item>
                                </Space>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={'Ngày hết hạn'}>
                                <Space>
                                    <Form.Item
                                        name={'ngayHetHan'}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng điền vào!'
                                            }
                                        ]}>
                                        <DatePicker format={dateFormat}
                                        // onChange={(date: any, dateString) =>
                                        //     setTicketPackage({ ...ticketPackage, ngayHetHan: `${dateString}` })} 
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name={'gioHetHan'}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng điền vào!'
                                            }
                                        ]}>
                                        <TimePicker format={timeFormat}
                                        // onChange={(value, dateString) => {
                                        //     setTicketPackage({ ...ticketPackage, ngayHetHan: ticketPackage.ngayHetHan.slice(0, 10) + ` ${dateString}` })}} 
                                        />
                                    </Form.Item>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Text strong>Giá vé áp dụng</Text>
                    </Row>
                    <Row>
                        <Space align='center'>
                            <Form.Item>
                                <Checkbox value={'giaVe'} checked>Vé lẻ (vnđ/vé) với giá</Checkbox>
                            </Form.Item>
                            <Form.Item
                                name={'giaVe'}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng điền vào!'
                                    },
                                    {

                                    }
                                ]}>
                                <Input type='text' placeholder='Giá vé' style={{ width: 100 }}
                                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTicketPackage({ ...ticketPackage, giaVe: e.target.value })}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Text>/vé</Text>
                            </Form.Item>
                        </Space>
                    </Row>
                    <Row>
                        <Space>
                            <Form.Item>
                                <Checkbox value={'giaCombo'} checked>Combo vé với giá</Checkbox>
                            </Form.Item>
                            <Form.Item
                                name={'giaCombo'}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng điền vào!'
                                    }
                                ]}>
                                <Input type='text' placeholder='Giá vé' style={{ width: 100 }}
                                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    //     setTicketPackage({ ...ticketPackage, giaCombo: e.target.value })}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Text>/</Text>
                            </Form.Item>
                            <Form.Item
                                name={'ve'}
                                hasFeedback
                                rules={[{
                                    required: true,
                                    message: 'Vui lòng điền vào!'
                                }]}>
                                <Input type='text' placeholder='Giá vé' style={{ width: 80 }} />
                            </Form.Item>
                            <Form.Item>
                                <Text>vé</Text>
                            </Form.Item>
                        </Space>
                    </Row>
                    <Space direction='vertical' style={{ width: '100%' }}>
                        <Text type='danger'>*<Text>là thông tin bắt buộc</Text></Text>
                        <Row justify={'center'}>
                            <Space>
                                <Form.Item>
                                    <Button style={{ width: 100, color: '#FFB800', fontWeight: 'bold' }} onClick={(event: any) => handleCancel(event)}>Hủy</Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button style={{ width: 100, color: 'white', background: 'orange' }} htmlType='submit'>Cập nhật</Button>
                                </Form.Item>
                            </Space>
                        </Row>
                    </Space>
                </Form>
            </Modal>
        </ConfigProvider>
    )
}

export default UpdateTicket