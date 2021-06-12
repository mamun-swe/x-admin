import React, { useCallback, useEffect, useState } from 'react'
import './style.scss'

import Requests from '../../../utils/Requests/Index'
import BarChart from '../../../components/chart/Index'
import ProductTable from '../../../components/table/Product'
import LoadingComponent from '../../../components/loading/Index'

const Index = () => {
    const [items, setItems] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    // Fetch data
    const fetchData = useCallback(async () => {
        setLoading(true)
        const data = await Requests.Product.Index(null, null, header)
        if (data) {
            setItems(data.products)
            setLoading(false)
        }
        setLoading(false)
    }, [header])

    useEffect(() => {
        fetchData()
    }, [header, fetchData])

    if (isLoading) return <LoadingComponent />

    return (
        <div className="dashboard-container container-fluid">
            <div className="row">
                <div className="col-12 col-xl-6 col-padding">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <BarChart
                                height={143}
                                title={'Sales Report'}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-12 col-xl-6 col-padding pl-xl-0">
                    <div className="row">

                        <div className="col-6 mb-3 pr-xl-2">
                            <div className="card item-card border-0 shadow-sm">
                                <div className="text-center flex-center flex-column">
                                    <h5>120</h5>
                                    <p>Products</p>
                                </div>

                                <div className="triangle bottom-right"></div>
                            </div>
                        </div>

                        <div className="col-6 mb-3 pl-2">
                            <div className="card item-card border-0 shadow-sm">
                                <div className="text-center flex-center flex-column">
                                    <h5>120</h5>
                                    <p>Pending</p>
                                </div>
                                <div className="triangle bottom-left"></div>
                            </div>
                        </div>

                        <div className="col-6 mb-3 pr-xl-2">
                            <div className="card item-card border-0 shadow-sm">
                                <div className="text-center flex-center flex-column">
                                    <h5>120</h5>
                                    <p>Approved</p>
                                </div>
                                <div className="triangle top-right"></div>
                            </div>
                        </div>

                        <div className="col-6 mb-3 pl-2">
                            <div className="card item-card border-0 shadow-sm">
                                <div className="text-center flex-center flex-column">
                                    <h5>120</h5>
                                    <p>Sales</p>
                                </div>
                                <div className="triangle top-left"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12 col-padding">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header border-0 p-3 p-lg-4 bg-white">
                            <h6 className="mb-0">Last Approved Products</h6>
                        </div>
                        <div className="card-body p-0">
                            <ProductTable items={items} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;