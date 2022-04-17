import { useState, useRef, useEffect, useContext } from "react"
import Modal from "../Modal";
import {toast} from "react-toastify";
import restaurantsProvider from "@data-access/restaurants";
import { RestaurantContext } from "@src/context/RestaurantContext";



export default function AddRestaurants() {
    const initState = {
        name:null,
        location:null,
        price_range:null
    }
    const {setRestaurants, getData, restaurants} = useContext(RestaurantContext);
    const [formState, setFormState] = useState({
        name:"",
        location:"",
        price_range:""
    })

    const form = useRef();
    

    const handleChangeInput = (e) => {
        
        setFormState(pre => ({
            ...pre,
            [e.target.name]:e.target.value
        }))
    }

    const handleSubmitForm = async(e)=> {
        e.preventDefault();
        const confirm = window.confirm("Are you sure ?");
        if(confirm) {
            
            try {
                const res = await restaurantsProvider.post(formState);
                if(res) {
                    setFormState(initState);
                    form.current.reset();
                    const oldData = [...restaurants];
                    oldData?.push(res?.data?.data);
                    
                    if(oldData) {
                        setRestaurants(oldData);
                        toast("Success adding restaurant!");
                    }
                }
            } catch (error) {
                toast(error?.message);
            }
        }
    }

    

    
    return (
        <>
        <form ref={form} className="row g-3" action="">
            <div className="col-md-3">
                <input
                    type={"text"} 
                    className="form-control" 
                    placeholder="name"
                    name="name"
                    onChange={handleChangeInput}
                />
            </div>
            <div className="col-md-3">
                <input
                    type={"text"} 
                    className="form-control" 
                    placeholder="location"
                    name="location"
                    onChange={handleChangeInput}
                />
            </div>
            <div className="col-md-3">
                <input
                    type={"number"}
                    min={0} 
                    className="form-control" 
                    placeholder="price range"
                    name="price_range"
                    onChange={handleChangeInput}
                />
            </div>
            <button
                className="btn btn-primary"
                type="submit"
                onClick={handleSubmitForm}
                data-bs-toggle="modal" 
                data-bs-target="#customModal"
            >
                Add
            </button>
        </form>
        </>
    )
}