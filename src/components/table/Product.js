import React from 'react'
import './style.scss'

const Product = ({ items }) => {
    return (
        <div className="content-image-table-container pb-4">
            <table className="table table-hover table-responsive-sm table-borderless">
                <thead>
                    <tr className="border-bottom">
                        <td className="text-center sl-td">SL</td>
                        <td></td>
                        <td className="text-td">Name</td>
                        <td className="text-td">SKU</td>
                        <td>Purchase Price <small>(tk)</small></td>
                        <td>Sale Price <small>(tk)</small></td>
                        <td className="text-td">Stock Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((item, i) =>
                        <tr className="border-bottom" key={i}>
                            <td className="text-center sl-td">{i + 1}</td>
                            <td className="text-center">
                                <img src={item.thumbnail} className="img-fluid" alt={item.name} />
                            </td>
                            <td className="text-td">{item.name}</td>
                            <td className="text-td">{item.sku}</td>
                            <td className="text-td">{item.purchasePrice}</td>
                            <td className="text-td">{item.salePrice}</td>
                            <td className="text-td">{item.stockAmount}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
};

export default Product;