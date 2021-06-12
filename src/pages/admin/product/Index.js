import React, { useCallback, useEffect, useState } from 'react'
import './style.scss'
import { useQuery } from '../../../components/query/Index'
import Requests from '../../../utils/Requests/Index'

import Pageinate from '../../../components/pageination/Index'
import ProductTable from '../../../components/table/Product'
import LoadingComponent from '../../../components/loading/Index'
import SearchComponent from '../../../components/search/Index'

const Index = () => {
    let { limit, page } = useQuery()
    const [items, setItems] = useState([])
    const [pagination, setPagination] = useState(null)
    const [searching, setSearching] = useState(false)
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

    // Filter data
    const filterData = async data => {
        try {
            setSearching(true)
            const response = await Requests.Product.Search({ query: data.query }, header)
            if (response) {
                setItems(response)
            }
            setSearching(false)
        } catch (error) {
            if (error) console.log(error)
        }
    }

    return (
        <div className="product-index">
            {/* if loading to fetch data */}
            {isLoading ? <LoadingComponent /> : null}

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-padding">
                        <div className="card border-0 shadow-sm">
                            <div className="card-header p-3 p-lg-4 bg-white">
                                <div className="d-flex">
                                    <div><h6 className="mb-0">Products List ({pagination && pagination.totalItems ? pagination.totalItems : 0})</h6></div>
                                    <div className="ml-auto pr-2">
                                        <SearchComponent
                                            placeholder="by name/sku"
                                            search={filterData}
                                            loading={searching}
                                            clear={fetchData}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Data table component for show data */}
                            <div className="card-body p-0">
                                <ProductTable items={items} refetch={fetchData} />

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

export default Index;