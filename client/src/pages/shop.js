/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { getProductsByCount, getSearchProducts } from "../function/product";
import { getCategories } from "../function/category";
import { getSubCategories } from "../function/subcategory";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/card/ProductCard";
import { Menu, Slider, Checkbox, Radio } from "antd";
import { DownSquareOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [subs, setSubs] = useState([]);
    const [sub, setSub] = useState("");
    const [brands, setBrands] = useState([
        "Police", "4711", "PlayBoy", "Estle", "Swiss Image", "Plum", "Deborah Milano", "Ajmal", "Guess"
    ]);
    const [brand, setBrand] = useState("");
    const [colors, setColors] = useState([
        "Black",
        "Brown",
        "Silver",
        "White",
        "Blue",
        "gold",
        "blue"
    ]);
    const [color, setColor] = useState("");
    const [shipping, setShipping] = useState("");

    let dispatch = useDispatch();
    let { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    useEffect(() => {
        loadAllProducts();
        // fetch categories
        getCategories().then((res) => setCategories(res.data));
        // fetch subcategories
        getSubCategories().then((res) => setSubs(res.data));
    }, []);

    const fetchProducts = (arg) => {
        getSearchProducts(arg).then((res) => {
            setProducts(res.data);
            // console.log("FETCH PRODUCT------->",products)
    });
};

  // 1. load products by default on page load
    const loadAllProducts = () => {
        getProductsByCount(20).then((p) => {
        setProducts(p.data);
        // console.log("all products--------->",p.data)
        setLoading(false);
        });
    };

  // 2. load products on user search input
    useEffect(() => {
        const delayed = setTimeout(() => {
        fetchProducts({ query: text });
        if (!text) {
            loadAllProducts();
        }
        }, 300);
        return () => clearTimeout(delayed);
        
    }, [text]);

  // 3. load products based on price range
    useEffect(() => {
        console.log("ok to request", products);
        fetchProducts({ price });
    }, [ok]);

    const handleSlider = (value) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });

    // reset
    setCategoryIds([]);
    setPrice(value);
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    setTimeout(() => {
    setOk(!ok);
    }, 300);
  };

  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handle check for categories
  const handleCheck = (e) => {
    // reset
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setSub("");
        setBrand("");
        setColor("");
        // console.log("cate------>",e.target.value);
        let inTheState = [...categoryIds];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked); // index or -1

        // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
        if (foundInTheState === -1) {
            inTheState.push(justChecked);
        } else {
        // if found pull out one item from index
            inTheState.splice(foundInTheState, 1);
        }

        setCategoryIds(inTheState);
        // console.log(inTheState);
        fetchProducts({ category: inTheState });
    };



  // 6. show products by sub category
    const showSubs = () =>
        subs.map((s) => (
            <div
                key={s._id}
                onClick={() => handleSub(s)}
                className="p-1 m-1 badge badge-secondary"
                style={{ cursor: "pointer" }}
            >
                {s.name}
            </div>
    ));

    const handleSub = (sub) => {
        // console.log("SUB", sub);
            setSub(sub);
            dispatch({
                type: "SEARCH_QUERY",
                payload: { text: "" },
            });
            setPrice([0, 0]);
            setCategoryIds([]);
            setBrand("");
            setColor("");
            fetchProducts({ sub });
    };

  // 7. show products based on brand name
    const showBrands = () =>
        brands.map((b) => (
        <Radio
            key = {b}
            value={b}
            name={b}
            checked={b === brand}
            onChange={handleBrand}
            className="pb-1 pl-4 pr-4"
        >
            {b}
        </Radio>
    ));

    const handleBrand = (e) => {
        setSub("");
        dispatch({
        type: "SEARCH_QUERY",
        payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setColor("");
        setBrand(e.target.value);
        fetchProducts({ brand: e.target.value });
    };

  // 8. show products based on color
    const showColors = () =>
        colors.map((c) => (
        <Radio
            key = {c}
            value={c}
            name={c}
            checked={c === color}
            onChange={handleColor}
            className="pb-1 pl-4 pr-4"
        >
        {c}
        </Radio>
    ));

    const handleColor = (e) => {
        setSub("");
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setBrand("");
        setColor(e.target.value);
        fetchProducts({ color: e.target.value });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                    <div className="col-md-3 pt-2">
                        <h4>Search/Filter</h4>
                    <hr />

                    <Menu
                        defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
                        mode="inline"
                    >
                    {/* price */}
                    <SubMenu
                        key="1"
                        title={
                            <span className="h6">
                                &#8377; Price
                            </span>
                        }
                    >
                        <div>
                            <Slider
                                className="ml-4 mr-4"
                                tipFormatter={(v) => `Rs-${v}`}
                                range
                                value={price}
                                onChange={handleSlider}
                                max="10000"
                            />
                        </div>
                    </SubMenu> 

                    {/* category */}
                    <SubMenu
                            key="2"
                            title={
                                <span className="h6">
                                <DownSquareOutlined /> Categories
                                </span>
                            }
                        >
                        <div style={{ maringTop: "-10px" }}>{showCategories()}</div>
                    </SubMenu>


                    {/* sub category */}
                    <SubMenu
                        key="4"
                        title={
                            <span className="h6">
                            <DownSquareOutlined /> Sub Categories
                            </span>
                        }
                        >
                        <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
                            {showSubs()}
                        </div>
                    </SubMenu>

                    {/* brands */}
                    <SubMenu
                        key="5"
                        title={
                            <span className="h6">
                                <DownSquareOutlined /> Brands
                            </span>
                        }
                        >
                        <div style={{ maringTop: "-10px" }} className="pr-5">
                            {showBrands()}
                        </div>
                    </SubMenu>

                    {/* colors */}
                    <SubMenu
                        key="6"
                        title={
                            <span className="h6">
                                <DownSquareOutlined /> Colors
                            </span>
                        }
                        >
                        <div style={{ maringTop: "-10px" }} className="pr-5">
                            {showColors()}
                        </div>
                    </SubMenu>

                </Menu>
                </div>
                        {/* {JSON.stringify(products)} */}
                <div className="col-md-9 pt-2">
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4 className="text-danger">Products</h4>
                    )}

                    { products.length < 1 && <p>No products found</p> }

                    <div className="row pb-5">
                        {products.map((p) => (
                        <div key={p._id} className="col-md-4 mt-3">
                            <ProductCard product={p} />
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;

