import { lazy } from "react";

const AdvertisingList = () =>
    lazy(() =>
        import ("../pages/Marketing/AdvertisingList"));
const CouponList = () => lazy(() =>
    import ("../pages/Marketing/CouponList"));
const SeckillActivityList = () =>
    lazy(() =>
        import ("../pages/Marketing/SeckillActivityList"));
const AddAdvertise = () =>
    lazy(() =>
        import ("../pages/Marketing/AdvertisingList/AddAdvertise"));

export default {
    AdvertisingList,
    CouponList,
    SeckillActivityList,
    AddAdvertise,
};