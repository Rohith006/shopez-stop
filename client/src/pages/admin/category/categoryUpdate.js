/* eslint-disable react-hooks/exhaustive-deps */
import React,{ useState, useEffect } from "react";
import AdminNav from "../../../components/nav/adminnav"
import { toast } from "react-toastify"
import { useSelector } from 'react-redux'
import { getCategory, updateCategory} from "../../../function/category"
import CategoryFrom from '../../../components/form/categoryForm'

const CategoryUpdate = ({history, match}) => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    // const [categories, setCategories] = useState([]);

    useEffect(() => {
        // console.log('match>>>>>>>>', match)
        loadCategory()
    }, []);

    const loadCategory = () =>
        getCategory(match.params.slug).then((c) => setName(c.data.name));

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setLoading(true);
        updateCategory(match.params.slug, { name }, user.token)
        .then((res) => {
            // console.log(res)
            setLoading(false);
            setName("");
            toast.success(`"${res.data.name}" is updated`);
            history.push("/admin/category")
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
            if (err.response.status === 400) toast.error(err.response.data);
        });
    };



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (
                    <h4 className="text-danger">Loading..</h4>
                    ) : (
                    <h4>Update category</h4>
                    )}
                    <CategoryFrom 
                        handleSubmit = {handleSubmit}
                        name={name}
                        setName = {setName}
                    />
                    <hr />
                </div>
            </div>
        </div>
    );
}

export default CategoryUpdate