import { Link } from "react-router-dom";
import Botton from "../Elements/Button";

const CartProduct = (props) => {
  const { children } = props;
  return (
    <div className="w-full max-w-xs my-2 bg-gray-600 border border-gray-200 rounded-lg shadow mx-2 flex flex-col">
      {children}
    </div>
  );
};

const Header = (props) => {
  const { image, id } = props;
  return (
    <Link to={`/product/${id}`}>
      <img
        src={image}
        alt="product"
        className="p-5 rounded-t-lg h-60 w-full object-cover"
      />
    </Link>
  );
};

const Body = (props) => {
  const { children, title } = props;
  return (
    <div className="px-5 pb-5 h-full">
      <a href="">
        <h5 className="text-xl font-semibold tracking-tight text-white">
          {title.substring(0, 20)}...
        </h5>
        <p className="text-m text-white">{children.substring(0, 100)}....</p>
      </a>
    </div>
  );
};

const Footer = (props) => {
  const { price, handleAddToCart, id } = props;
  return (
    <div className="flex items-center justify-between px-5 pb-5">
      <span className="text-xl text-white">
        Rp.{" "}
        {price.toLocaleString("id-ID", { styles: "currency", currency: "IDR" })}
      </span>
      {/* Data dari footer dikirimkan ke halaman product bagian handleaddto cart  */}
      <Botton classname="bg-blue-600" onClick={() => handleAddToCart(id)}>
        Add To Cart
      </Botton>
    </div>
  );
};

CartProduct.Header = Header;
CartProduct.Body = Body;
CartProduct.Footer = Footer;

export default CartProduct;
