import { Modal } from 'antd'
import React from 'react'

const FilterTicket: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState(false);
    return (
        <Modal
            title="Vertically centered modal dialog"
            centered
            open={modalOpen}
            onOk={() => setModalOpen(false)}
            onCancel={() => setModalOpen(false)}
        >
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
        </Modal>
    )
}

export default FilterTicket