import Header from  "@components/Header";
import AddRestaurants from "@src/components/AddRestaurants";
import RestaurantList from "@src/components/RestaurantList";
import { Outlet } from "react-router-dom";


export default function Home() {
    return (
        <div className="container">
            <Header title="Restaurant Finder" />
            <div>
                <AddRestaurants/>
            </div>
            <RestaurantList/>
        </div>
    )
}