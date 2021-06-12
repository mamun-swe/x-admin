import React, { useEffect, useState } from 'react'
import './style.scss'

import BarChart from '../../../components/chart/Index'
import ReportTable from '../../../components/table/Report'
import LoadingComponent from '../../../components/loading/Index'

const Index = () => {
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }, [])

    if (isLoading) return <LoadingComponent />

    return (
        <div className="report-container">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-padding">
                        <div className="card border-0 shadow-sm mb-3">
                            <div className="card-header p-lg-4 bg-white">
                                <h6 className="mb-0">Date wise purchase report</h6>
                            </div>
                            <div className="card-body">
                                <BarChart
                                    height={80}
                                    title={'Date wise report'}
                                />
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm">
                            <div className="card-body px-0">
                                <ReportTable />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index;