import React, { useState } from 'react'
import './style.scss'
import { Form } from 'react-bootstrap'
import SingleSelect from '../select/Single'

const ReturnPolicy = (props) => {
    const [isReturn, setReturn] = useState(false)
    const options = [
        { label: '1 Days', value: 1 },
        { label: '2 Days', value: 2 },
        { label: '3 Days', value: 3 },
        { label: '4 Days', value: 4 },
        { label: '5 Days', value: 5 },
        { label: '6 Days', value: 6 },
        { label: '7 Days', value: 7 },
        { label: '8 Days', value: 8 },
        { label: '9 Days', value: 1 },
        { label: '10 Days', value: 10 }
    ]

    // Handle return
    const handleReturn = () => {
        setReturn(!isReturn)
        props.data({ ...props.data, status: !isReturn })
    }

    return (
        <div className="return-policy product-material-inputs">
            <div className="container-fluid mb-4">
                <div className="row">
                    <div className="col-12 py-3 border-bottom">
                        <h6 className="mb-0">Return & replacement policy</h6>
                    </div>
                    <div className="col-12 py-3">
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check
                                type="checkbox"
                                label="Return & replacement available"
                                checked={props.deafult ? props.deafult.status : isReturn}
                                onChange={handleReturn}
                            />
                        </Form.Group>

                        {(props.deafult && props.deafult.status) || isReturn ?
                            <div>
                                <SingleSelect
                                    options={options}
                                    error={props.error}
                                    placeholder={'day limit'}
                                    value={(event) => props.data({ ...props.data, limit: event.value })}
                                    deafult={props.deafult && props.deafult.limit ? [{ _id: props.deafult.limit, name: props.deafult.limit + ' Days' }] : null}
                                />

                                <div className="form-group mt-4 mb-0">
                                    <p>Description</p>

                                    <textarea
                                        rows={4}
                                        className="form-control shadow-none"
                                        onChange={(event) => props.data({ ...props.data, description: event.target.value })}
                                        defaultValue={props.deafult && props.deafult.description ? props.deafult.description : null}
                                    />
                                </div>
                            </div>
                            : null}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnPolicy;