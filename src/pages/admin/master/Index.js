import React from 'react'
import './style.scss'
import { Switch, Route } from 'react-router-dom'

import Layout from '../../../components/layout/Index'
import DashboardIndex from '../dashboard/Index'
import ProductrIndex from '../product/Index'
import ProductrStore from '../product/Create'
import PendingProducts from '../product/Pending'
import TodayPurchaseProducts from '../product/TodayPurchase'

import InventoryIndex from '../inventory/Index'
import ContactIndex from '../contact/Index'
import DateWisePurchaseReport from '../dateWisePurchase/Index'

import FourOFour from '../fourOfour/Index'

const Index = () => {


    return (
        <div className="master">
            <Layout />
            <div className="main">
                <Switch>
                    <Route exact path="/seller/" component={DashboardIndex} />
                    <Route exact path="/seller/products" component={ProductrIndex} />
                    <Route exact path="/seller/product-entry" component={ProductrStore} />
                    <Route exact path="/seller/product-pending" component={PendingProducts} />
                    <Route exact path="/seller/product-purchase" component={TodayPurchaseProducts} />
                    <Route exact path="/seller/inventory" component={InventoryIndex} />
                    <Route exact path="/seller/contact" component={ContactIndex} />
                    <Route exact path="/seller/purchase-report" component={DateWisePurchaseReport} />
                    <Route path="*" component={FourOFour} />
                </Switch>
            </div>
        </div>
    );
}

export default Index;

