import React, { useState } from 'react'
import './style.scss'
import { Icon } from 'react-icons-kit'
import 'react-toastify/dist/ReactToastify.css'
import CreatableSelect from 'react-select/creatable'
import { plus, x } from 'react-icons-kit/feather'

const Material = (props) => {
    const [material, setMaterial] = useState([
        {
            title: null,
            properties: [{
                sku: null,
                values: [],
                adjustmentPurchasePrice: null,
                adjustmentSellingPrice: null
            }]
        }
    ])

    // Add material field
    const addMaterial = () => {
        setMaterial([
            ...material,
            {
                title: null,
                properties: [{
                    sku: null,
                    values: [],
                    adjustmentPurchasePrice: null,
                    adjustmentSellingPrice: null
                }]
            }
        ])
    }

    // Remove field
    const removeField = (index) => {
        const values = [...material]
        values.splice(index, 1)
        setMaterial(values)
    }

    // Add sub-material field
    const addSubMaterial = (index) => {
        let modifiedField = material.map((item, i) => {
            if (i === index) {
                item.properties = [
                    ...item.properties,
                    {
                        sku: null,
                        values: [],
                        adjustmentPurchasePrice: null,
                        adjustmentSellingPrice: null
                    }]
            }
            return item
        })
        setMaterial(modifiedField)
    }

    // Remove sub field
    const removeSubMaterial = (mainIndex, subIndex) => {
        let modifiedField = material.map((item, i) => {
            if (i === mainIndex) {
                item.properties = item.properties.filter((x, j) => j !== subIndex)
            }
            return item
        })
        setMaterial(modifiedField)
    }

    // handle input
    const handleMaterialInputChange = (index, subIndex, name, event) => {
        const values = [...material]

        if (name && name === "title") {
            values[index].title = event.target.value
        }
        else if (name === 'sku') {
            values[index].properties[subIndex].sku = event.target.value
        }
        else if (name === 'values') {
            values[index].properties[subIndex].values = event && event.map(item => item.value)
        }
        else if (name === 'adjustmentPurchasePrice') {
            values[index].properties[subIndex].adjustmentPurchasePrice = parseInt(event.target.value)
        }
        else {
            values[index].properties[subIndex].adjustmentSellingPrice = parseInt(event.target.value)
        }

        setMaterial(values)
        props.data(material)
    }


    return (
        <div className="product-material-inputs">
            <div className="container-fluid mb-4">
                <div className="row">
                    <div className="col-12 py-3 mb-3 border-bottom">
                        <div className="d-flex">
                            <div style={{ paddingTop: 6 }}><h6>Product variation</h6></div>
                            <div className="ml-auto">
                                <button
                                    type="button"
                                    className="btn shadow-none rounded-circle plus-btn"
                                    onClick={addMaterial}
                                >
                                    <Icon icon={plus} size={22} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {material && material.map((item, i) =>
                    <div className="row" key={i}>
                        <div className="col-12 col-lg-2 pr-lg-2">
                            <div className="form-group mb-4">
                                <p>Title</p>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control shadow-none"
                                    placeholder="Enter title"
                                    onChange={event => handleMaterialInputChange(i, null, 'title', event)}
                                />
                            </div>
                        </div>

                        <div className="col-12 col-lg-9">
                            {item.properties && item.properties.map((property, j) =>
                                <div className="row" key={j}>
                                    
                                    {/* SKU */}
                                    <div className="col-12 col-lg-2">
                                        <div className="form-group mb-4">
                                            <p>Variation SKU</p>
                                            <input
                                                type="text"
                                                placeholder="Enter SKU"
                                                className="form-control shadow-none"
                                                onChange={event => handleMaterialInputChange(i, j, 'sku', event)}
                                            />
                                        </div>
                                    </div>

                                    {/* Field values */}
                                    <div className="col-12 col-lg-3">
                                        <div className="form-group mb-4">
                                            <p>Field values</p>
                                            <CreatableSelect
                                                classNamePrefix="custom-select"
                                                isMulti
                                                styles={customStyles}
                                                placeholder={'Enter values'}
                                                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                onChange={event => handleMaterialInputChange(i, j, 'values', event)}
                                            />
                                        </div>
                                    </div>

                                    {/* Purchase Purchase Price Increment */}
                                    <div className="col-12 col-lg-3">
                                        <div className="form-group mb-4">
                                            <p>Adjustment on Purchase Price</p>
                                            <input
                                                type="number"
                                                placeholder="Enter increments"
                                                className="form-control shadow-none"
                                                onChange={event => handleMaterialInputChange(i, j, 'adjustmentPurchasePrice', event)}
                                            />
                                        </div>
                                    </div>

                                    {/* Adjustment Selling price */}
                                    <div className="col-8 col-lg-3">
                                        <div className="form-group mb-4">
                                            <p>Adjustment on Selling Price</p>
                                            <input
                                                type="number"
                                                placeholder="Enter increments"
                                                className="form-control shadow-none"
                                                onChange={event => handleMaterialInputChange(i, j, 'adjustmentSellingPrice', event)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-2 col-lg-1 pt-4">
                                        {j === 0 ?
                                            <button
                                                type="button"
                                                className="btn shadow-none rounded-circle plus-btn mt-1"
                                                onClick={() => addSubMaterial(i)}
                                            >
                                                <Icon icon={plus} size={22} />
                                            </button>
                                            :
                                            <button
                                                type="button"
                                                className="btn shadow-none rounded-circle close-btn mt-1"
                                                onClick={() => removeSubMaterial(i, j)}
                                            >
                                                <Icon icon={x} size={22} />
                                            </button>
                                        }
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="col-12 col-lg-1">
                            {i !== 0 ?
                                <div className="col-2 col-lg-1 pt-4">
                                    <button type="button" className="btn shadow-none rounded-circle close-btn" onClick={() => removeField(i)}>
                                        <Icon icon={x} size={22} />
                                    </button>
                                </div>
                                : null}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Material;

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        minHeight: 42,
        fontSize: 14,
        color: '#000',
        boxShadow: 'none', '&:hover': { borderColor: '1px solid #ced4da' },
        border: state.isFocused ? '1px solid #dfdfdf' : '1px solid #ced4da',
        borderRadius: 4
    })
}
