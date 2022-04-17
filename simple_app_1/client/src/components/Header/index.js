export default function Header({
    title=""
}) {
    return (
        <div>
            <h1 className="font-weight-light display-1 text-center">{title}</h1>
        </div>
    )
}