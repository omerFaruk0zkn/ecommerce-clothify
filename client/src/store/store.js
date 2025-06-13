import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";

import adminProductsReducer from "./admin/products-slice";
import adminOrderReducer from "./admin/order-slice";

import shopProductsReducer from "./shop/products-slice";
import shopCartReducer from "./shop/cart-slice";
import shopAddressReducer from "./shop/address-slice";
import shopOrderReducer from "./shop/order-slice";
import shopSearchReducer from "./shop/search-slice";
import shopReviewReducer from "./shop/review-slice";

import commonFeatureReducer from "./common-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,

    adminProducts: adminProductsReducer,
    adminOrder: adminOrderReducer,

    shopProducts: shopProductsReducer,
    shopCart: shopCartReducer,
    shopAddress: shopAddressReducer,
    shopOrder: shopOrderReducer,
    shopSearch: shopSearchReducer,
    shopReview: shopReviewReducer,

    commonFeature: commonFeatureReducer,
  },
});

export default store;
