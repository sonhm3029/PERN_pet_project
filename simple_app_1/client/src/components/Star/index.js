const EmptyStar = ()=> {
    return (
        <i class="fa-regular fa-star"></i>
    )
}

const FullStar = ()=> {
    return (
        <i class="fa-solid fa-star"></i>
    )
}

const HalfStar = ()=> {
    return (
        <i class="fa-solid fa-star-half-stroke"></i>
    )
}


export default function StarRating({numberstar}) {
    console.log(numberstar);
    return (
        <>
            {[1,2,3,4,5].map((item, index)=> {
                console.log(item);
                if(index+1 <= numberstar) {
                    return (<FullStar key={index}/>)
                }
                else if(Math.ceil(numberstar)===index + 1&&!Number.isInteger(numberstar)) {
                    return (<HalfStar key={index}/>)
                }
                else if(index + 1 >= numberstar) {
                    return (<EmptyStar key={index}/>)
                }
            })}
        </>
    )
}