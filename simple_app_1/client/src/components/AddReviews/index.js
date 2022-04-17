import { useRef, useState } from "react";
import reviewsProvider from "@data-access/reviews";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";


export default function AddReviews({updateData}) {
    const restaurant_id = useParams().id;
    const initState = {
        restaurant_id: restaurant_id,
        name:"",
        rating:0,
        review:""
    }
    const form = useRef();

    const [formState, setFormState] = useState(initState);
    const handleChangeInput = (e)=> {
        setFormState(pre => ({
            ...pre,
            [e.target.name]:e.target.value
        }))
    }

    const handleSubmitForm = async(e) => {
        e.preventDefault();
        const cf = window.confirm("Are you sure to add this review?");
        if(cf) {
            try {
                const res = await reviewsProvider.post(formState);
                updateData();
                toast.success("Successfully add review!");
                form.current.reset();
            } catch (error) {
                toast(error.message);
            }
        }
    }

    return (
        <form ref={form} className="row g-3" action="">
            <div className="col-md-6">
                <input
                    type={"text"} 
                    className="form-control" 
                    placeholder="name"
                    name="name"
                    onChange={handleChangeInput}
                />
            </div>
            <div className="col-md-6">
                <input
                    type={"number"} 
                    className="form-control" 
                    placeholder="rating"
                    name="rating"
                    onChange={handleChangeInput}
                    min={0}
                    max={5}
                />
            </div>
            <div className="col-md-12 mt-4">
                <textarea
                    className="form-control" 
                    placeholder="write something..."
                    name="review"
                    onChange={handleChangeInput}
                />
            </div>
            <button
                className="btn btn-primary mt-4"
                type="submit"
                onClick={handleSubmitForm}
                data-bs-toggle="modal" 
                data-bs-target="#customModal"
            >
                Add
            </button>
            <Link to={"/"}>
            <button
                className="btn btn-primary mt-4 ml-4"
            >
                Go to Home
            </button>
            </Link>
        </form>
    )
}