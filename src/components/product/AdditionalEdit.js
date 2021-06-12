import React, { useState } from 'react'
import './style.scss'
import { Icon } from 'react-icons-kit'
import 'react-toastify/dist/ReactToastify.css'
import { plus, x } from 'react-icons-kit/feather'

const Additional = (props) => {
    const [additional, setAdditional] = useState(props.value ?
        [...props.value] :
        [{ title: null, value: null }]
    )

    // Add field
    const addAdditional = () => setAdditional([...additional, { title: null, value: null }])

    // Remove field
    const removeAdditional = (index) => {
        const fields = [...additional]
        fields.splice(index, 1)
        setAdditional(fields)
    }

    // Handle input
    const handleAdditionalInputChange = (index, event) => {
        const fields = [...additional]
        if (event.target && event.target.name === "title") {
            fields[index].title = event.target.value
        } else {
            fields[index].value = event.target.value
        }

        setAdditional(fields)
        props.update(additional)
    }

    return (
        <div className="dynamic-additional-fields-container">
            <div className="container-fluid mb-4">
                <div className="row">
                    <div className="col-12 py-3 mb-3 border-bottom">
                        <div className="d-flex">
                            <div style={{ paddingTop: 6 }}><h6>Additional info</h6></div>
                            <div className="ml-auto">
                                <button
                                    type="button"
                                    className="btn shadow-none rounded-circle plus-btn"
                                    onClick={addAdditional}
                                >
                                    <Icon icon={plus} size={22} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {additional && additional.map((item, i) =>
                        <div className="col-12" key={i}>
                            <div className="d-flex">
                                {/* Title */}
                                <div className="flex-fill">
                                    <div className="form-group mb-4">
                                        <p>Title</p>

                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control shadow-none"
                                            placeholder="Enter title"
                                            defaultValue={item.title}
                                            onChange={event => handleAdditionalInputChange(i, event)}
                                        />
                                    </div>
                                </div>
                                {/* Value */}
                                <div className={i > 0 ? "flex-fill px-2 px-md-3" : "flex-fill pl-2 pl-md-3"}>
                                    <div className="form-group mb-4">
                                        <p>Value</p>

                                        <input
                                            type="text"
                                            name="value"
                                            className="form-control shadow-none"
                                            placeholder="Enter title"
                                            defaultValue={item.value}
                                            onChange={event => handleAdditionalInputChange(i, event)}
                                        />
                                    </div>
                                </div>

                                {i !== 0 ?
                                    <div style={{ paddingTop: 28 }}>
                                        <button type="button" className="btn shadow-none rounded-circle close-btn" onClick={() => removeAdditional(i)}>
                                            <Icon icon={x} size={22} />
                                        </button>
                                    </div>
                                    : null}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Additional;