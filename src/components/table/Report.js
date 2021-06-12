import React from 'react'
import './style.scss'

const Report = ({ items }) => {
    return (
        <div className="content-table-container">
            <table className="table table-hover table-responsive-sm table-borderless">
                <thead>
                    <tr className="border-bottom">
                        <td className="text-center sl-td">SL</td>
                        <td className="text-td text-center">Purchase Date</td>
                        <td className="text-td text-center">Number of Product</td>
                        <td className="text-td text-center">Quantity</td>
                        <td className="text-td text-center">Total Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((item, i) =>
                        <tr className="border-bottom" key={i}>
                            <td className="text-center sl-td">{i + 1}</td>
                            <td className="text-td text-center">{item.name}</td>
                            <td className="text-td text-center">{item.salePrice}</td>
                            <td className="text-td text-center">{item.stockAmount}</td>
                            <td className="text-td text-center">{item.salePrice * item.stockAmount}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
};

export default Report;