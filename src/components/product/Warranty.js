import React, { useState } from 'react'
import './style.scss'
import { Form } from 'react-bootstrap'
import SingleSelect from '../select/Single'

const ReturnPolicy = (props) => {
    const [status, setStatus] = useState(false)
    const options = {
        day: [
            { label: '1 Days', value: 1 },
            { label: '2 Days', value: 2 },
            { label: '3 Days', value: 3 },
            { label: '4 Days', value: 4 },
            { label: '5 Days', value: 5 },
            { label: '6 Days', value: 6 },
            { label: '7 Days', value: 7 },
            { label: '8 Days', value: 8 },
            { label: '9 Days', value: 1 },
            { label: '10 Days', value: 10 },
            { label: '15 Days', value: 15 },
            { label: '20 Days', value: 20 },
            { label: '25 Days', value: 25 }
        ],
        month: [
            { label: '1 Month', value: 1 },
            { label: '2 Month', value: 2 },
            { label: '3 Month', value: 3 },
            { label: '4 Month', value: 4 },
            { label: '5 Month', value: 5 },
            { label: '6 Month', value: 6 },
            { label: '7 Month', value: 7 },
            { label: '8 Month', value: 8 },
            { label: '9 Month', value: 9 },
            { label: '10 Month', value: 10 },
            { label: '11 Month', value: 11 }
        ],
        year: [
            { label: '1 Year', value: 1 },
            { label: '2 Year', value: 2 },
            { label: '3 Year', value: 3 },
            { label: '4 Year', value: 4 },
            { label: '5 Year', value: 5 }
        ]
    }

    // Handle Status
    const handleStatus = () => {
        setStatus(!status)
        props.data({ ...props.data, status: !status })
    }

    return (
        <div className="return-policy product-material-inputs">
            <div className="container-fluid mb-4">
                <div className="row">
                    <div className="col-12 py-3 border-bottom">
                        <h6 className="mb-0">Wrranty policy</h6>
                    </div>
                    <div className="col-12 py-3">
                        <Form.Group controlId="warrantyCheck">
                            <Form.Check
                                type="checkbox"
                                label="Wrranty available"
                                checked={props.deafult ? props.deafult.status : status}
                                onChange={handleStatus}
                            />
                        </Form.Group>

                        {(props.deafult && props.deafult.status) || status ?
                            <div>

                                <div className="row">
                                    {/* Day */}
                                    <div className="col-12 col-lg-4">
                                        <div className="form-group mb-3">
                                            <p>Day</p>
                                            <SingleSelect
                                                options={options.day}
                                                error={props.error}
                                                placeholder={'day'}
                                                value={(event) => props.data({ ...props.data, day: event.value })}
                                                deafult={props.deafult && props.deafult.day ? [{ _id: props.deafult.day, name: props.deafult.day + ' Days' }] : null}
                                            />
                                        </div>
                                    </div>

                                    {/* Month */}
                                    <div className="col-12 col-lg-4">
                                        <div className="form-group mb-3">
                                            <p>Month</p>
                                            <SingleSelect
                                                options={options.month}
                                                error={props.error}
                                                placeholder={'month'}
                                                value={(event) => props.data({ ...props.data, month: event.value })}
                                                deafult={props.deafult && props.deafult.month ? [{ _id: props.deafult.month, name: props.deafult.month + ' Month' }] : null}
                                            />
                                        </div>
                                    </div>

                                    {/* Year */}
                                    <div className="col-12 col-lg-4">
                                        <div className="form-group mb-3">
                                            <p>Year</p>
                                            <SingleSelect
                                                options={options.year}
                                                error={props.error}
                                                placeholder={'year'}
                                                value={(event) => props.data({ ...props.data, year: event.value })}
                                                deafult={props.deafult && props.deafult.year ? [{ _id: props.deafult.year, name: props.deafult.year + ' Year' }] : null}
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className="form-group mb-0">
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