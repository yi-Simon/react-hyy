import Mock from "mockjs";

import searchData from "./data-1.json";

Mock.mock("/mock/AdSearch", { data: searchData });
