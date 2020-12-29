import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'

export default function ConfirmationModal({openClose, openCloseModal, title, body, deleteFunction}) {

    return (
        <Modal isOpen={openClose}>
            <ModalHeader>
                {title}
            </ModalHeader>
            <ModalBody>
                {body}
            </ModalBody>
            <ModalFooter className="d-flex justify-content-center">
                <Button color="secondary" onClick={openCloseModal}>Cerrar</Button>
                <Button color="danger" onClick={deleteFunction}>Eliminar</Button>
            </ModalFooter>
        </Modal>
    )
}
