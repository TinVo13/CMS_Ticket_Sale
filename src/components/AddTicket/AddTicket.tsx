import React from 'react'
import { Button, Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select, Space, TimePicker, Typography } from 'antd'
import { TicketPackageType } from '../../types/type';

interface ModelProps {
    isOpen: boolean,
    isClose: (e: React.MouseEvent<HTMLButtonElement>) => void,
    handleAddTicket: (ticket: TicketPackageType) => void
}
const { Text } = Typography;
const AddTicket: React.FC<ModelProps> = ({ isOpen, isClose, handleAddTicket }) => {
    const [ticketPackage, setTicketPackage] = React.useState<TicketPackageType>({
        giaCombo: "",
        giaVe: "",
        key: "",
        maGoi: "",
        ngayApDung: "",
        ngayHetHan: "",
        tenGoiVe: "",
        tinhTrang: ""
    });
    return (
        <Modal
            title={(
                <Row justify={'center'}>
                    <Text style={{ fontSize: 24, color: 'black' }} strong>Thêm gói vé</Text>
                </Row>
            )}
            centered
            open={isOpen}
            footer={false}
        >
            <Form
                onFinish={() => handleAddTicket(ticketPackage)}>
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
                                <Input placeholder='Nhập tên gói vé'
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTicketPackage({ ...ticketPackage, tenGoiVe: e.target.value })} />
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
                                    <Form.Item
                                        name={'ngayApDung'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng điền vào!'
                                            }
                                        ]}>
                                        <DatePicker format={'DD/MM/YYYY'}
                                            onChange={(date: any, dateString) =>
                                                setTicketPackage({ ...ticketPackage, ngayApDung: `${dateString}` })} />
                                    </Form.Item>
                                    <Form.Item
                                        name={'gioApDung'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng điền vào!'
                                            }
                                        ]}>
                                        <TimePicker onChange={(value,dateString)=>{
                                            setTicketPackage({...ticketPackage,ngayApDung: ticketPackage.ngayApDung + ` ${dateString}`})
                                        }}/>
                                    </Form.Item>
                                </Space>
                            </div>
                        </Space>
                    </Col>
                    <Col span={12}>
                        <Space direction='vertical'>
                            <Text>Ngày hết hạn</Text>
                            <div>
                                <Space>
                                    <Form.Item
                                        name={'ngayHetHan'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng điền vào!'
                                            }
                                        ]}>
                                        <DatePicker format={'DD/MM/YYYY'}
                                            onChange={(date: any, dateString) =>
                                                setTicketPackage({ ...ticketPackage, ngayHetHan: `${dateString}` })} />
                                    </Form.Item>
                                    <Form.Item
                                        name={'gioHetHan'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng điền vào!'
                                            }
                                        ]}>
                                        <TimePicker onChange={(value,dateString)=>{
                                            setTicketPackage({...ticketPackage,ngayHetHan: ticketPackage.ngayHetHan + ` ${dateString}`})
                                        }}/>
                                    </Form.Item>
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
                        <Form.Item
                            name={'giaVe'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền vào!'
                                }
                            ]}>
                            <Space>
                                <Checkbox value={'giaVe'} checked>Vé lẻ (vnđ/vé) với giá</Checkbox>
                                <Input type='text' placeholder='Giá vé' style={{ width: 100 }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTicketPackage({ ...ticketPackage, giaVe: e.target.value })} />
                                <Text>/vé</Text>
                            </Space>
                        </Form.Item>
                    </Space>
                </Row>
                <Row>
                    <Space>
                        <Form.Item
                            name={'giaCombo'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền vào!'
                                }
                            ]}>
                            <Space>
                                <Checkbox value={'giaCombo'} checked>Combo vé với giá</Checkbox>
                                <Input type='text' placeholder='Giá vé' style={{ width: 100 }} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setTicketPackage({ ...ticketPackage, giaCombo: e.target.value })} />
                                <Text>/</Text>
                                <Input type='text' placeholder='Giá vé' style={{ width: 100 }} defaultValue={1} />
                                <Text>vé</Text>
                            </Space>
                        </Form.Item>
                    </Space>
                </Row>
                <Row>
                    <Space style={{ width: '100%' }} direction='vertical'>
                        <Text>Tình trạng</Text>
                        <Form.Item
                            name={'tinhTrang'}
                            rules={[{
                                required: true,
                                message: 'Vui lòng điền vào!'
                            }]}>
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
                                // defaultValue={'Đang sử dụng'}
                                style={{ width: 150, }}
                                onChange={(value) => setTicketPackage({ ...ticketPackage, tinhTrang: value })} />
                        </Form.Item>
                    </Space>
                </Row>
                    <Text type='danger'>*<Text>là thông tin bắt buộc</Text></Text>
                <Row>
                </Row>
                <Row justify={'center'}>
                    <Space>
                        <Form.Item>
                            <Button style={{ width: 100, color: '#FFB800', fontWeight: 'bold' }} onClick={(event: any) => isClose(event)}>Hủy</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button style={{ width: 100, color: 'white', background: 'orange' }} htmlType='submit'>Thêm</Button>
                        </Form.Item>
                    </Space>
                </Row>
                {/* </Space> */}
            </Form>
        </Modal>
    )
}

export default AddTicket