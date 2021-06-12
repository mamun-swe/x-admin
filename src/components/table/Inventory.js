import React from 'react'
import './style.scss'

const Inventory = ({ items }) => {
    return (
        <div className="content-table-container pb-4">
            <table className="table table-hover table-responsive-sm table-borderless">
                <thead>
                    <tr className="border-bottom">
                        <td className="text-center sl-td">SL</td>
                        <td className="text-td">Name</td>
                        <td className="text-td">Author</td>
                        <td className="text-td">Purchase Price</td>
                        <td className="text-td">Sale Price</td>
                        <td className="text-td">Quantity</td>
                        <td className="text-td">Total Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((item, i) =>
                        <tr className="border-bottom" key={i}>
                            <td className="text-center sl-td">{i + 1}</td>
                            <td className="text-td">{item.name}</td>
                            <td className="text-td"></td>
                            <td className="text-td">{item.purchasePrice}</td>
                            <td className="text-td">{item.salePrice}</td>
                            <td className="text-td">{item.stockAmount}</td>
                            <td className="text-td">{item.salePrice * item.stockAmount}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
};

export default Inventory;