export default function SendMessage({message}) {
    return (
        <div className="border bg-success w-40 border-black d-flex justify-content-end">
            <div>
                <h4>Ahmet Ozmen</h4>
            </div>
            <div>
                <p>{message}</p>
            </div>
        </div>
        );
}