import React, { useState, useEffect, useCallback } from 'react'
import './style.scss'

import { StringShort } from '../../../utils/Helpers'
import Requests from '../../../utils/Requests/Index'
import LoadingComponent from '../../../components/loading/Index'

const Index = () => {
    const [isLoading, setLoading] = useState(true)
    const [vendor, setVendor] = useState(null)
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    // Fetch data
    const fetchData = useCallback(async () => {
        const data = await Requests.Vendor.Show('608c413f36eb9c2c9d90ee13', header)
        if (data) {
            setVendor(data.vendor)
            setLoading(false)
        }
        setLoading(false)
    }, [header])

    useEffect(() => {
        fetchData()
    }, [header, fetchData])

    if (isLoading) return <LoadingComponent />
    if (!vendor) return <div><p>Seller not found</p></div>

    return (
        <div className="seller-profile pb-4">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-padding">
                        <div className="card border-0 shadow-sm">
                            <div className="card-header p-3 p-lg-4 bg-white">
                                <div className="d-flex">
                                    <div><h6 className="mb-0">{vendor && vendor.name}</h6></div>
                                </div>
                            </div>
                            <div className="card-body p-4">
                                <div className="d-sm-flex vendor-profile-container">
                                    {/* Name circle */}
                                    <div className="name-circle rounded-circle flex-center flex-column">
                                        <h1>{StringShort(vendor.name)}</h1>
                                    </div>

                                    {/* Content container */}
                                    <div className="flex-fill content-container pl-sm-4">
                                        <table className="table-sm">
                                            <tbody>
                                                <tr>
                                                    <td className="title-td">Name</td>
                                                    <td>: {vendor.name}</td>
                                                </tr>
                                                <tr>
                                                    <td className="title-td">E-mail</td>
                                                    <td className="text-lowercase">: {vendor.email}</td>
                                                </tr>
                                                <tr>
                                                    <td className="title-td">Phone</td>
                                                    <td>: {vendor.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td className="title-td">Address</td>
                                                    <td>: {vendor.address}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row bank-info">
                    <div className="col-12 col-padding">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">

                                {/* Bank info */}
                                <h6 className="mb-0 pl-1">Bank info</h6>
                                <hr className="my-3" />
                                <div className="row mb-4">
                                    <div className="col-12 col-sm-6">
                                        <table className="table-sm">
                                            <tbody>
                                                <tr>
                                                    <td className="title-td">Account name</td>
                                                    <td>: {vendor.bank.accountName}</td>
                                                </tr>
                                                <tr>
                                                    <td className="title-td">Account number</td>
                                                    <td>: {vendor.bank.accountNumber}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <table className="table-sm">
                                            <tbody>
                                                <tr>
                                                    <td className="title-td">Branch</td>
                                                    <td>: {vendor.bank.branchName}</td>
                                                </tr>
                                                <tr>
                                                    <td className="title-td">Routing number</td>
                                                    <td>: {vendor.bank.routingNumber}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>



                                {/* Business & payment info */}
                                <h6 className="mb-0 pl-1">Business & payment info</h6>
                                <hr className="my-3" />
                                <div className="row mb-4">
                                    <div className="col-12 col-sm-6">
                                        <table className="table-sm">
                                            <tbody>
                                                <tr>
                                                    <td className="title-td">Trade licence</td>
                                                    <td>: {vendor.tradeLicence}</td>
                                                </tr>
                                                <tr>
                                                    <td className="title-td">Pick Up location</td>
                                                    <td>: {vendor.pickupLocation}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <table className="table-sm">
                                            <tbody>
                                                <tr>
                                                    <td className="title-td">Payment system</td>
                                                    <td>: {vendor.paymentSystem}</td>
                                                </tr>
                                                {vendor.payPeriod ?
                                                    <tr>
                                                        <td className="title-td">Payment period</td>
                                                        <td>: {vendor.payPeriod}</td>
                                                    </tr>
                                                    : null}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Contact */}
                                <div className="row mb-4">
                                    <div className="col-12 col-sm-6">
                                        <h6 className="mb-0 pl-1">Contact person 1</h6>
                                        <hr className="my-3" />
                                        <table className="table-sm">
                                            <tbody>
                                                <tr>
                                                    <td className="title-td">Name</td>
                                                    <td>: {vendor.contact.personOne ? vendor.contact.personOne.name : null}</td>
                                                </tr>
                                                <tr>
                                                    <td className="title-td">Phone</td>
                                                    <td>: {vendor.contact.personOne ? vendor.contact.personOne.phone : null}</td>
                                                </tr>
                                                <tr>
                                                    <td className="title-td">E-mail</td>
                                                    <td>: <span className="text-lowercase">{vendor.contact.personOne ? vendor.contact.personOne.email : null}</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <h6 className="mb-0 pl-1">Contact person 2</h6>
                                        <hr className="my-3" />
                                        <table className="table-sm">
                                            <tbody>
                                                <tr>
                                                    <td className="title-td">Name</td>
                                                    <td>: {vendor.contact.personTwo ? vendor.contact.personTwo.name : null}</td>
                                                </tr>
                                                <tr>
                                                    <td className="title-td">Phone</td>
                                                    <td>: {vendor.contact.personTwo ? vendor.contact.personTwo.phone : null}</td>
                                                </tr>
                                                <tr>
                                                    <td className="title-td">E-mail</td>
                                                    <td>: <span className="text-lowercase">{vendor.contact.personTwo ? vendor.contact.personTwo.email : null}</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Management */}
                                <div className="row mb-4">
                                    <div className="col-12 col-sm-6">
                                        <h6 className="mb-0 pl-1">Key account manager</h6>
                                        <hr className="my-3" />
                                        <p>{vendor.keyAccountManager}</p>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <h6 className="mb-0 pl-1">Secondary key account manager</h6>
                                        <hr className="my-3" />
                                        <p>{vendor.secondaryKeyAccountManager}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Index;