import React, { useCallback, useEffect, useState } from 'react'
import './style.scss'

import { useQuery } from '../../../components/query/Index'
import Requests from '../../../utils/Requests/Index'
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

    if (isLoading) return <LoadingComponent />

    return (
        <div className="product-index">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-padding">
                        <div className="card border-0 shadow-sm">
                            <div className="card-header p-3 p-lg-4 bg-white">
                            <h6 className="mb-0">Today Purchase</h6>
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