import React, { useState, useCallback, useEffect } from 'react'
import './style.scss'
import Select from 'react-select'
import { toast } from 'react-toastify'
import { Icon } from 'react-icons-kit'
import { useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css'
import CreatableSelect from 'react-select/creatable'
import { plus } from 'react-icons-kit/feather'

import Requests from '../../../utils/Requests/Index'
import ProductMaterialInputs from '../../../components/product/Material'
import ProductAdditionalInputs from '../../../components/product/Additional'
import DescriptionInput from '../../../components/product/Description'
import ReturnPolicy from '../../../components/product/ReturnPolicy'
import Warranty from '../../../components/product/Warranty'

toast.configure({ autoClose: 2000 })
const Create = () => {
    const { register, handleSubmit, errors } = useForm()
    const [isLoading, setLoading] = useState(false)
    const [brands, setBrands] = useState([])

    const [categories, setCategories] = useState({ options: [], value: null, error: null })
    const [subCategories, setSubCategories] = useState({ options: [], value: null })
    const [leafCategories, setLeafCategories] = useState({ options: [], value: null })

    const [header] = useState({
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
        }
    })

    // Input states
    const [brand, setBrand] = useState(null)
    const [tags, setTags] = useState({ value: [], error: null })

    const [thumbnail, setThumbnail] = useState({ value: null, preview: null, error: null })
    const [additinalImages, setAdditionalImages] = useState({ values: null, previews: null, error: null })

    const [material, setMaterial] = useState(null)
    const [additional, setAdditional] = useState(null)
    const [returnReplace, setReturnReplace] = useState({ status: null, limit: null, description: null, limitError: false })
    const [warranty, setWarranty] = useState({ status: null, day: null, month: null, year: null, description: null, error: false })
    const [description, setDescription] = useState(null)

    // Get Data 
    const getData = useCallback(async () => {
        const catResponse = await Requests.Category.Index(header)
        const brandResponse = await Requests.Brand.Index(header)

        if (catResponse && brandResponse) {
            setBrands(brandResponse && brandResponse.brands && brandResponse.brands.map(item => ({ label: item.name, value: item._id })))

            if (catResponse && catResponse.categories) setCategories(exCategory => ({
                ...exCategory,
                options: catResponse.categories && catResponse.categories.map(item => ({ label: item.name, value: item._id, children: item.children }))
            }))
        }
    }, [header])

    useEffect(() => {
        getData()
    }, [header, getData])

    // Handle brand
    const handleBrand = event => setBrand(event.value)

    // Handle main category
    const handleMainCategory = event => {
        const value = event.value
        const children = event.children

        setCategories(exCategory => ({ ...exCategory, value: value }))

        if (children && children.length) {
            setSubCategories(exChildren => ({
                ...exChildren,
                options: children && children.map(item => ({ label: item.name, value: item._id, children: item.children }))
            }))
        } else {
            setSubCategories(exChildren => ({
                ...exChildren,
                options: []
            }))
        }
    }

    // Handle sub category
    const handleSubCategory = event => {
        const value = event.value
        const children = event.children

        setSubCategories(exSubCategory => ({ ...exSubCategory, value: value }))

        if (children && children.length) {
            setLeafCategories(exChildren => ({
                ...exChildren,
                options: children && children.map(item => ({ label: item.name, value: item._id }))
            }))
        } else {
            setLeafCategories(exChildren => ({
                ...exChildren,
                options: []
            }))
        }
    }

    // Handle leaf category
    const handleLeafCategory = event => {
        const value = event.value
        setLeafCategories(exLeafCategory => ({ ...exLeafCategory, value: value }))
    }

    // Handle tags
    const handleTags = event => setTags({ value: event, error: null })

    // Thumbnail handeller
    const thumbnailHandeller = event => {
        let file = event.target.files[0]
        if (file) {
            const size = parseInt(file.size) / 1000
            if (size > 700) {
                setThumbnail({ ...thumbnail, error: 'Select less than 700KB file.' })
                return
            }
            setThumbnail({ value: file, preview: URL.createObjectURL(file), error: null })
        }
    }

    // Additinal Image handeller
    const additionalImageHandeller = event => {
        let size = 0
        let fileArray = []
        const files = event.target.files

        for (let i = 0; i < files.length; i++) {
            fileArray.push(URL.createObjectURL(files[i]))
            size += files[i].size
        }

        if (fileArray.length < 2) {
            setAdditionalImages({ ...additinalImages, error: 'Select more than 2 files.' })
            return
        } else if (parseInt(size / 1000) > 8192) {
            setAdditionalImages({ ...additinalImages, error: 'Total size limit is 8MB' })
            return
        }
        setAdditionalImages({ values: files, previews: fileArray, error: null })
    }

    // get materials data
    const getMaterials = data => setMaterial(data)

    // get additional data
    const getAdditional = data => setAdditional(data)

    // get description
    const getDescription = data => setDescription(data)

    // Handle return & replacement
    const handleReturnReplacement = data => {
        if (data.status) {
            setReturnReplace({ ...returnReplace, status: data.status })
        } else {
            setReturnReplace({ status: null, limit: null, description: null, limitError: null })
        }
        if (data.limit) setReturnReplace({ ...returnReplace, limit: data.limit, limitError: null })
        if (data.description) setReturnReplace({ ...returnReplace, description: data.description })
    }

    // Handle warranty
    const handleWarranty = data => {
        if (data.status) {
            setWarranty({ ...warranty, status: data.status })
        } else {
            setWarranty({ status: null, day: null, month: null, year: null, description: null, error: false })
        }
        if (data.day) setWarranty({ ...warranty, day: data.day, error: null })
        if (data.month) setWarranty({ ...warranty, month: data.month, error: null })
        if (data.year) setWarranty({ ...warranty, year: data.year, error: null })
        if (data.description) setWarranty({ ...warranty, description: data.description })
    }

    // Submit Data
    const onSubmit = async (data) => {

        if (!categories.value) {
            setCategories(exCategory => ({ ...exCategory, value: null, error: 'Main category is required' }))
            return
        }
        if (!tags.value.length) return setTags({ value: null, error: 'Tags is required' })
        if (returnReplace.status && !returnReplace.limit) return setReturnReplace({ ...returnReplace, limitError: true })
        if (warranty.status) {
            if (!(warranty.day || warranty.month || warranty.year)) return setWarranty({ ...warranty, error: true })
        }

        if (!thumbnail.value) return setThumbnail({ ...thumbnail, error: 'Thumbnail is required.' })

        if (!additinalImages.values) return setAdditionalImages({ values: null, error: "Additional image is required" })
        if (additinalImages.values && additinalImages.values.length < 2) return setAdditionalImages({ values: null, error: "Minimum 2 image required" })

        const product = {
            ...data,
            brand: brand || null,
            mainCategory: categories.value || null,
            subCategory: subCategories.value || null,
            leafCategory: leafCategories.value || null,
            tags: tags.value && tags.value.map(data => data.value),
            material: material,
            additional: additional,
            description: description,
            returnReplacement: returnReplace,
            warranty: warranty,
        }

        let formData = new FormData()
        formData.append('name', product.name)
        formData.append('brand', JSON.stringify(product.brand))
        formData.append('mainCategory', JSON.stringify(product.mainCategory))
        formData.append('subCategory', JSON.stringify(product.subCategory))
        formData.append('leafCategory', JSON.stringify(product.leafCategory))
        formData.append('tags', JSON.stringify(product.tags))
        formData.append('sku', product.sku)
        formData.append('stockAmount', product.stockAmount)
        formData.append('purchasePrice', product.purchasePrice)
        formData.append('salePrice', product.salePrice)
        formData.append('discountType', product.discountType)
        formData.append('discountAmount', product.discountAmount)
        formData.append('material', JSON.stringify(product.material))
        formData.append('additional', JSON.stringify(product.additional))
        formData.append('description', product.description)
        formData.append('video', product.video)
        formData.append('returnReplacement', JSON.stringify(product.returnReplacement))
        formData.append('warranty', JSON.stringify(product.warranty))

        // Basic image
        formData.append('image', thumbnail.value)

        // Additional images
        for (const key of Object.keys(additinalImages.values)) {
            formData.append('images', additinalImages.values[key])
        }

        setLoading(true)
        await Requests.Product.Store(formData, header)
        setLoading(false)
    }

    return (
        <div className="store-product">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-padding">
                        <div className="card border-0 shadow-sm">
                            <div className="card-header p-3 p-lg-4 bg-white">
                                <h6 className="mb-0">Product Entry</h6>
                            </div>

                            {/* Store form */}
                            <div className="card-body p-lg-4">
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <div className="row">

                                        {/* Name */}
                                        <div className="col-12">
                                            <div className="form-group mb-4">
                                                {errors.name && errors.name.message ? (
                                                    <p className="text-danger">{errors.name && errors.name.message}</p>
                                                ) : <p>Name</p>}

                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control shadow-none"
                                                    placeholder="Enter product name"
                                                    ref={register({
                                                        required: "Name is required"
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Brand */}
                                        <div className="col-12">
                                            <div className="form-group mb-4">
                                                <p>Brand</p>

                                                <Select
                                                    classNamePrefix="custom-select"
                                                    styles={customStyles}
                                                    placeholder={'Select brand'}
                                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                    options={brands}
                                                    onChange={handleBrand}
                                                />
                                            </div>
                                        </div>

                                        {/* Main Category */}
                                        <div className="col-12 col-lg-4">
                                            <div className="form-group mb-4">
                                                {categories.error ?
                                                    <p className="text-danger">{categories.error}</p>
                                                    : <p>Main category</p>}

                                                <Select
                                                    classNamePrefix="custom-select"
                                                    styles={customStyles}
                                                    placeholder={'Select main category'}
                                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                    options={categories.options}
                                                    onChange={handleMainCategory}
                                                />
                                            </div>
                                        </div>

                                        {/* Sub Category */}
                                        <div className="col-12 col-lg-4">
                                            <div className="form-group mb-4">
                                                <p>Sub category</p>

                                                <Select
                                                    classNamePrefix="custom-select"
                                                    styles={customStyles}
                                                    placeholder={'Select sub category'}
                                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                    options={subCategories.options}
                                                    onChange={handleSubCategory}
                                                />
                                            </div>
                                        </div>

                                        {/* Leaf Category */}
                                        <div className="col-12 col-lg-4">
                                            <div className="form-group mb-4">
                                                <p>Leaf category</p>

                                                <Select
                                                    classNamePrefix="custom-select"
                                                    styles={customStyles}
                                                    placeholder={'Select leaf category'}
                                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                    options={leafCategories.options}
                                                    onChange={handleLeafCategory}
                                                />
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        <div className="col-12 col-lg-4">
                                            <div className="form-group mb-4">
                                                {tags.error ?
                                                    <p className="text-danger">{tags.error}</p>
                                                    : <p>Tags</p>}

                                                <CreatableSelect
                                                    classNamePrefix="custom-select"
                                                    isMulti
                                                    styles={customStyles}
                                                    placeholder={'Enter tags'}
                                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                    onChange={handleTags}
                                                />
                                            </div>
                                        </div>

                                        {/* SKU */}
                                        <div className="col-12 col-lg-4">
                                            <div className="form-group mb-4">
                                                {errors.sku && errors.sku.message ? (
                                                    <p className="text-danger">{errors.sku && errors.sku.message}</p>
                                                ) : <p>Product SKU</p>}

                                                <input
                                                    type="text"
                                                    name="sku"
                                                    className="form-control shadow-none"
                                                    placeholder="Enter SKU"
                                                    ref={register({
                                                        required: "SKU is required"
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Stock amount */}
                                        <div className="col-12 col-lg-4">
                                            <div className="form-group mb-4">
                                                {errors.stockAmount && errors.stockAmount.message ? (
                                                    <p className="text-danger">{errors.stockAmount && errors.stockAmount.message}</p>
                                                ) : <p>Stock amount</p>}

                                                <input
                                                    type="number"
                                                    name="stockAmount"
                                                    className="form-control shadow-none"
                                                    placeholder="Enter stock name"
                                                    ref={register({
                                                        required: "Stock amount is required",
                                                        pattern: {
                                                            value: /^\d+$/,
                                                            message: "The amount must be in number."
                                                        }
                                                    })}
                                                />
                                            </div>
                                        </div>


                                    </div>

                                    {/* Pricing */}
                                    <div className="container-fluid pricing-container mb-4">
                                        <div className="row">
                                            <div className="col-12 py-3 mb-3 border-bottom">
                                                <h6 className="mb-0">Pricing</h6>
                                            </div>

                                            {/* Purchase price */}
                                            <div className="col-12 col-lg-6">
                                                <div className="form-group mb-4">
                                                    {errors.purchasePrice && errors.purchasePrice.message ? (
                                                        <p className="text-danger">{errors.purchasePrice && errors.purchasePrice.message}</p>
                                                    ) : <p>Purchase price</p>}

                                                    <input
                                                        type="number"
                                                        name="purchasePrice"
                                                        className="form-control shadow-none"
                                                        placeholder="Enter purchase price"
                                                        ref={register({
                                                            required: "Purchase price is required",
                                                            pattern: {
                                                                value: /^\d+$/,
                                                                message: "Price must be in number."
                                                            }
                                                        })}
                                                    />
                                                </div>
                                            </div>

                                            {/* Sale Price */}
                                            <div className="col-12 col-lg-6">
                                                <div className="form-group mb-4">
                                                    {errors.salePrice && errors.salePrice.message ? (
                                                        <p className="text-danger">{errors.salePrice && errors.salePrice.message}</p>
                                                    ) : <p>Sale price</p>}

                                                    <input
                                                        type="number"
                                                        name="salePrice"
                                                        className="form-control shadow-none"
                                                        placeholder="Enter sale price"
                                                        ref={register({
                                                            required: "Sale price is required",
                                                            pattern: {
                                                                value: /^\d+$/,
                                                                message: "Price must be in number."
                                                            }
                                                        })}
                                                    />
                                                </div>
                                            </div>

                                            {/* Discount type */}
                                            <div className="col-12 col-lg-6">
                                                <div className="form-group mb-4">
                                                    <p>Discount Type</p>

                                                    <select
                                                        name="discountType"
                                                        className="form-control shadow-none"
                                                        ref={register()}
                                                    >
                                                        <option value="">Select type</option>
                                                        <option value="Flat">Flat</option>
                                                        <option value="Percentage">Percentage</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Discount Amount */}
                                            <div className="col-12 col-lg-6">
                                                <div className="form-group mb-4">
                                                    <p>Discount Amount</p>

                                                    <input
                                                        type="number"
                                                        name="discountAmount"
                                                        className="form-control shadow-none"
                                                        placeholder="Enter amount"
                                                        ref={register()}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <ProductMaterialInputs data={getMaterials} />
                                    <ProductAdditionalInputs data={getAdditional} />
                                    <ReturnPolicy
                                        data={handleReturnReplacement}
                                        error={returnReplace.limitError}
                                    />

                                    <Warranty
                                        data={handleWarranty}
                                        error={warranty.error}
                                    />

                                    <DescriptionInput data={getDescription} />


                                    {/* Video */}
                                    <div className="row mb-2 mb-lg-3">
                                        <div className="col-12">
                                            <div className="form-group mb-4">
                                                <p>Video Link</p>

                                                <input
                                                    type="text"
                                                    name="video"
                                                    className="form-control shadow-none"
                                                    placeholder="https://www.youtube.com/embed/Fm2TH7e93ug"
                                                    ref={register()}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Thumbnail upload & preview Container */}
                                    <div className="row mb-3 mb-lg-4">
                                        <div className="col-12">
                                            <div>
                                                {thumbnail.error ?
                                                    <p className="text-danger mb-0 ml-2">{thumbnail.error}</p>
                                                    : <p className="mb-0 ml-2">Thumbnail</p>}
                                            </div>

                                            <div className="d-flex">
                                                <div className="thumbnail-container">
                                                    <div className="image border">
                                                        <input
                                                            type="file"
                                                            accept=".jpg, .png, .jpeg"
                                                            className="upload"
                                                            onChange={thumbnailHandeller}
                                                        />
                                                        <div className="flex-center flex-column">
                                                            <Icon icon={plus} size={22} />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* image preview */}
                                                {thumbnail.preview ?
                                                    <div className="thumbnail-container text-center">
                                                        <div className="image border">
                                                            <img src={thumbnail.preview} className="img-fluid" alt="..." />
                                                        </div>
                                                    </div>
                                                    : null}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Additional images upload & preview Container */}
                                    <div className="row mb-3 mb-lg-4">
                                        <div className="col-12">
                                            <div>
                                                {additinalImages.error ?
                                                    <p className="text-danger mb-0 ml-2">{additinalImages.error}</p>
                                                    : <p className="mb-0 ml-2">Additional images <small className="text-muted">(Select more than two image.)</small></p>}
                                            </div>

                                            <div className="d-flex">
                                                <div className="thumbnail-container">
                                                    <div className="image border">
                                                        <input
                                                            multiple
                                                            type="file"
                                                            accept=".jpg, .png, .jpeg"
                                                            className="upload"
                                                            onChange={additionalImageHandeller}
                                                        />
                                                        <div className="flex-center flex-column">
                                                            <Icon icon={plus} size={22} />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* image preview */}
                                                {additinalImages.previews && additinalImages.previews.map((file, i) =>
                                                    <div className="thumbnail-container text-center" key={i}>
                                                        <div className="image border">
                                                            <img src={file} className="img-fluid" alt="..." />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        {/* Submit button */}
                                        <div className="col-12 text-right">
                                            <button type="submit" className="btn shadow-none" disabled={isLoading}>
                                                {isLoading ? 'Creating...' : 'Create Product'}
                                            </button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Create;

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