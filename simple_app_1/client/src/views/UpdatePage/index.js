import {
    useRef,
    useState,
    useEffect,
    useContext
} from "react";

import { useParams, Link, useNavigate } from "react-router-dom";
import restaurantProvider from "@data-access/restaurants";
import { toast } from "react-toastify";
import { RestaurantContext } from "@src/context/RestaurantContext";

export default function RestaurantUpdate() {
    const navigate = useNavigate();
    const initState = {
        name:"",
        location:"",
        price_range:""
    }
    const {updateData} = useContext(RestaurantContext);
    const [formState, setFormState] = useState(initState);
    const id = useParams().id;
    const form = useRef();

    useEffect(()=> {
        
        const runEffect = async()=> {
            try {
                const res = await restaurantProvider.getAlls(`/${id}`);
                if(res) {
                    
                    setFormState(res?.data?.data);
                }
    
            } catch (error) {
                toast.error(error.message);
            }   
        }
        runEffect();
    },[])

    const handleChangeInput = (e) => {
        
        setFormState(pre => ({
            ...pre,
            [e.target.name]:e.target.value
        }))
    }

    const handleSubmitForm = async(e)=> {
        e.preventDefault();
        const body = {...formState};
        delete body?.id;
        try {
            const res = await restaurantProvider.put({id, body});
            if(res) {
                toast.success("Successfully update!");
                updateData();
                navigate("/");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Update Restaurant</h1>
            <form ref={form} className="row g-3" action="">
            <div className="col-md-12 mb-4 mt-4">
                
                <input
                    type={"text"} 
                    className="form-control" 
                    placeholder="name"
                    name="name"
                    value={formState?.name}
                    onChange={handleChangeInput}
                />
            </div>
            <div className="col-md-12 mb-4">
                <input
                    type={"text"} 
                    className="form-control" 
                    placeholder="location"
                    name="location"
                    value={formState?.location}
                    onChange={handleChangeInput}
                />
            </div>
            <div className="col-md-12 mb-4">
                <input
                    type={"number"}
                    min={0} 
                    className="form-control" 
                    placeholder="price range"
                    name="price_range"
                    value={formState?.price_range}
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
                Submit
            </button>
            </form>
        </div>
    )
}