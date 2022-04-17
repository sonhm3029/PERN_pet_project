import { useParams } from "react-router-dom"

export default function RestaurantDetail() {
    const param = useParams();
    return (
        <div>Hello {param?.id}</div>
    )
}