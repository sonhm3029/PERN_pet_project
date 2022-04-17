import StarRating from "../Star";

export default function ReviewLists({reviews}) {
    return (
        <div className="row">
            {reviews?.map((item, index)=>(
                <div className="col-md-4">
                    <div className="card text-white bg-primary mb-3">
                    <div className="card-header d-flex justify-content-between">
                        <div>{item?.name}</div>
                        <div><StarRating numberstar={item?.rating}/></div>
                    </div>
                        <div className="card-body">
                          <p className="card-text">{item?.review}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}