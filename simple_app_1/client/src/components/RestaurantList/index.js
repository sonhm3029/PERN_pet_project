import { useContext } from "react";

import { RestaurantContext } from "@src/context/RestaurantContext";
import restaurantProvider from "@data-access/restaurants";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import StarRating from "../Star";
import api from "@utils/api";



const OptionGroup = ({id, update}) => {

    
   const navigate = useNavigate();
    const handleDelete = async(e) => {
        e.stopPropagation();
        const cf = window.confirm("Are you sure deleting!");
        if(cf) {
            try {
                const res = await restaurantProvider.delete(id);
                if(res) {
                    const newData = await restaurantProvider.getAlls();
                    update(newData?.data?.data);
                    toast.success("Delete Successfully!");
                }
            } catch (error) {
                toast.error(error);
            }
        }
    }

    // const handleNavigateUpdate = ()=> {
    //     navigate(`restaurants/${id}/update`);
    // }

    return (
        <div className="">
            {/* <Link to={`/restaurants/${id}/update`}> */}
            <button 
                className="btn btn-warning mr-4"
                // onClick={handleNavigateUpdate}
                onClick={(e)=> {
                    e.stopPropagation();
                    navigate(`restaurants/${id}/update`)
                }}
            >
                Edit
            </button>
            {/* </Link> */}
            <button
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    )
}

export default function RestaurantList() {
    const {restaurants, setRestaurants} = useContext(RestaurantContext);
  
    const navigate = useNavigate();
    return (
        <table className=" table-hover mt-4 table table-dark table-striped">
             <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Restaurant</th>
                  <th scope="col">Location</th>
                  <th scope="col">Price range</th>
                  <th scope="col">Ratings</th>
                  <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody>
                {restaurants?.map((restaurant, index)=> (
                <tr key={index} onClick={()=> {
                    navigate(`/reviews/${restaurant?.id}`);
                }}>
                    <th scope="row">{index+1}</th>
                    <td>{restaurant?.name}</td>
                    <td>{restaurant?.location}</td>
                    <td>{restaurant?.price_range}</td>
                    <td><StarRating numberstar={Number(restaurant?.rating)}/></td>
                    <td><OptionGroup id={restaurant?.id} update={setRestaurants}/></td>
                </tr>
                ))}
            </tbody>
        </table>
    )
}