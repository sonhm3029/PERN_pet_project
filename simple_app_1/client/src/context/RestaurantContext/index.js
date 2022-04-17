import { 
    createContext,
    useEffect,
    useState,
} from "react";
import restaurantsProvider from "@data-access/restaurants";
import { toast } from "react-toastify";

export const RestaurantContext = createContext();

export default function RestaurantProvider ({children}) {

    const [restaurants, setRestaurants] = useState([]);
    const getData = async () => {
        const data = await restaurantsProvider.getAlls();
        return data;
    }
    const updateData = async()=> {
        const res = await restaurantsProvider.getAlls();
        setRestaurants(res?.data?.data);
    }
    useEffect( ()=> {   
        const runEffect = async()=> {
            try {
                const res = await getData();
                setRestaurants(res?.data?.data);
            } catch (error) {
                console.log("error",error)
            }
        }
        runEffect();
    },[])

    return (
        <RestaurantContext.Provider
            value={{
                restaurants,
                setRestaurants,
                getData,
                updateData
            }}
        >
            {children}
        </RestaurantContext.Provider>
    )
}