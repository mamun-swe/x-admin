import React, { useCallback, useEffect, useState } from 'react'
import './style.scss'

import { useQuery } from '../../../components/query/Index'
import Requests from '../../../utils/Requests/Index'

import SingleSelect from '../../../components/select/Single'
import Pageinate from '../../../components/pageination/Index'
import ProductTable from '../../../components/table/Product'
import LoadingComponent from '../../../components/loading/Index'

const Pending = () => {
    let { limit, page } = useQuery()
    const [items, setItems] = useState([])
    const [pagination, setPagination] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })
    const options = [
        { label: 'Pending', value: 'Pending' },
        { label: 'Approved', value: 'Approved' }
    ]

    // Fetch data
    const fetchData = useCallback(async () => {
        setLoading(true)
        const data = await Requests.Product.Index(page, limit, header)
        if (data) {
            setPagination(data.pagination)
            setItems(data.products)
            setLoading(false)
            console.log(data.products);
        }
        setLoading(false)
    }, [limit, page, header])

    useEffect(() => {
        fetchData()
    }, [header, fetchData])


    // Handle filter
    const handleFilter = data => {
        try {
            console.log(data.value)
        } catch (error) {
            if (error) console.log(error)
        }
    }

    if (isLoading) return <LoadingComponent />

    return (
        <div className="product-index">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-padding">
                        <div className="card border-0 shadow-sm">
                            <div className="card-header p-3 p-lg-4 bg-white">
                                <div className="d-flex">
                                    <div className="ml-auto pr-2" style={{ width: 200 }}>
                                        <SingleSelect
                                            placeholder={'option'}
                                            options={options}
                                            value={handleFilter}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Data table component for show data */}
                            <div className="card-body p-0">
                                <ProductTable items={items} />

                                {pagination ?
                                    <div className="px-3">
                                        <div className="px-3">
                                            <Pageinate data={pagination} />
                                        </div>
                                    </div>
                                    : null}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pending;