const ProductCard = ({ product }) => (
    <div className="card w-60 bg-base-100 shadow-xl">
        <figure><img src={product.image} alt={product.name} /></figure>
        <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <p>${product.price}</p>
            <div className="card-actions justify-end">
                <button className="btn btn-primary">Add to Cart</button>
                <button className="btn btn-outline">Like</button>
            </div>
        </div>
    </div>
);

export default ProductCard;
