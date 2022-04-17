import { useParams } from "react-router-dom";
import reviewsProvider from "@data-access/reviews";
import {
    useState,
    useEffect
} from "react";
import ReviewLists from "@src/components/ReviewLists";
import AddReviews from "@src/components/AddReviews";

export default function Reviews() {
    const restaurant_id  = useParams().id;
    const [reviews, setReviews] = useState([]);

    const getData = async()=> {
        const res =
            await reviewsProvider.getAlls(`?restaurant_id=${restaurant_id}`);
        setReviews(res?.data?.data);
    }

    useEffect(()=> {  
        getData();
    },[])
    const updateData = async()=> {
        getData();
    }

    return (
        <div className="container mb-4">
            <h1 className="mt-4 mb-4">Reviews</h1>
            <ReviewLists reviews={reviews}/>
            <AddReviews updateData= {updateData}/>
        </div>
    )
}