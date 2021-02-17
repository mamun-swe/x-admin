import React, { useState } from 'react'
import './style.scss'
import { Icon } from 'react-icons-kit'
import Modal from 'react-bootstrap/Modal'
import { ic_clear } from 'react-icons-kit/md'

const Index = (props) => {
    const [isDelete, setDelete] = useState(false)

    const submitDelete = id => {
        setDelete(true)

        setTimeout(() => {
            setDelete(false)
        }, 2000)
    }

    return (
        <div>
            {/* Delete Modal */}
            <Modal
                show={props.show}
                onHide={() => props.hide({ value: null, status: false })}
                dialogClassName="custom-delete-modal"
            >
                <Modal.Header>
                    <div className="d-flex w-100">
                        <div><h6 className="mb-0">Are you sure ?</h6></div>
                        <div className="ml-auto">
                            <button
                                type="button"
                                className="btn btn-sm btn-light shadow-none rounded-circle p-1"
                                onClick={() => props.hide({ value: null, status: false })}
                            >
                                <Icon icon={ic_clear} size={25} />
                            </button>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <p className="mb-4">Want to delete {props.value} item .</p>
                    <div>
                        <button
                            type="button"
                            className="btn shadow-none yes-btn"
                            disabled={isDelete}
                            onClick={() => submitDelete(props.value)}
                        >{isDelete ? 'Deleting....' : 'Yes'}</button>
                        <button
                            type="button"
                            className="btn shadow-none no-btn"
                            disabled={isDelete}
                            onClick={() => props.hide({ value: null, status: false })}
                        >No</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Index;