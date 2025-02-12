import { Fragment, useEffect, useRef, useState } from "react";
import CartProduct from "../components/Fragments/CartProduct";
import Botton from "../components/Elements/Button";
import Counter from "../components/Fragments/Counter";
import { getProducts } from "../services/productapi.service";
import { getUserName } from "../services/auth.service";
import { useLogin } from "../hooks/useLogin";

// const email = localStorage.getItem("email");

const Product = () => {
  const [cart, setCart] = useState([
    // {
    //   id: 1,
    //   qty: 1,
    // },
  ]);

  //?~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ API ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //* Buat state untuk API
  //~ Nilai default adalah array kosong
  const [products, setproducts] = useState([]);
  //* Use effect untuk API
  useEffect(() => {
    //* data dari hasil callback res.data
    getProducts((data) => {
      // console.log(data);
      setproducts(data);
    });
    // getProducts();
  }, []);

  //* Sebelum adanya costum hooks
  // const [username, setUsername] = useState("");
  // useEffect(() => {
  //   // getUserName(token);
  //   // console.log(getUserName, "get username");
  //   //* Yang diambil sekarang adalah token
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setUsername(getUserName(token));
  //   } else {
  //     window.location.href = "/login";
  //   }
  // });

  //* Setelah adanya costum hooks
  const username = useLogin();

  //?~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ LOCAL STORAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  //* Total price menjadi nilai awal
  const [totalPrice, setTotalPrice] = useState(0);

  //* Use Effect untuk componentDidMount
  useEffect(() => {
    // setCart([{ id: 1, qty: 1 }]);
    //* [] adalah denpedencies
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  //* Use Effect untuk componentDidUpdate
  //? Fungsi menjumlahkan total 
  useEffect(() => {
    //* Jika datanya ada
    if (products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((accumulator, item) => {
        const product = products.find((product) => product.id === item.id);
        return accumulator + product.price * item.qty;
      }, 0);
      setTotalPrice(sum);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    //* Jika saat direload tidak ada perubahan. Tetap update cart dan productsnya
  }, [cart, products]);

  const handleLogout = () => {
    // event.preventDefault();
    localStorage.removeItem("token");
    // localStorage.removeItem("password");
    window.location.href = "/login";
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Use Reff For Total Price ~~~~~~~
  const totalPriceRef = useRef(null);
  // console.log(totalPriceRef);
  useEffect(() => {
    if (cart.length > 0) {
      totalPriceRef.current.style.display = "table-row";
    } else {
      totalPriceRef.current.style.display = "none";
    }
  }, [cart]);

  const handleAddToCart = (id) => {
    //* Menggunakan cara lama yaitu item ditambahkan manual tanpa mempengaruhi qty
    // setCart([
    //   //* Digunakan untuk menampung hasil dari cart yang sudah pernah ditambahkan/menambahkan array
    //   //cart,
    //   ...cart,
    //   //Setcart
    //   {
    //     id,
    //     qty: 1,
    //   },
    // ]);
    //* Cara baru agar data yang sama ditambahkan maka qty akan bertambah
    //* Jika ditermukan riwayat barang yang baru ditambahkan dengan data lama
    if (cart.find((item) => item.id === id)) {
      setCart(
        cart.map((item) =>
          //?  Jika ID item yang sedang diproses sama dengan ID yang dicari, maka qty dari item tersebut akan ditambah 1.
          //? Jika tidak sama, maka item tersebut akan tetap seperti semula.
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        )
      );
      //* Jika yang ditambahkan adalah barang baru yang belum pernah dipesan sebelumnya
    } else {
      setCart([...cart, { id: id, qty: 1 }]);
    }
  };

  return (
    <Fragment>
      <div className="flex justify-end h-20 bg-blue-600 text-white items-center px-10">
        {username}{" "}
        <Botton classname="ml-5 bg-black" onClick={handleLogout}>
          {" "}
          Logout
        </Botton>
      </div>
      <div className="flex justify-center py-5">
        {/** Flex supaya arahnya kesamping menempati bagian disampingnya */}
        {/* Flex wrap artinya jika disampingnya tidak muat. Maka pindahkan sisanya kebawah  */}

        {/*products adalah data awal yang dimiliki  */}
        <div className="w-3-5 flex flex-wrap">
          {/* Kalau ada datanya tampilkan, jika tidak ada biarkan  */}
          {products.length > 0 &&
            products.map((item) => (
              <CartProduct key={item.id}>
                <CartProduct.Header image={item.image} id={item.id} />
                <CartProduct.Body title={item.title}>
                  {item.description}
                </CartProduct.Body>
                <CartProduct.Footer
                  price={item.price}
                  id={item.id}
                  handleAddToCart={handleAddToCart}
                />
              </CartProduct>
            ))}
        </div>
        <div className="w-2/5">
          <h1 className="text-3xl font-bold text-blue-400 ml-5">Cart</h1>
          {/* <ul>
            {cart.map((item) => (
              <li key={item.id}>{item.id}</li>
            ))}
          </ul> */}
          {/* Text-left supaya fontnya kekiri semua */}
          <table className="text-left table-auto border-separate border-spacing-x-5">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {products.length > 0 &&
                cart.map((item) => {
                  //* products adalah data awal yang dimiliki ini */

                  //* Cari product asal dengan id yang sama dengan product hasil dari cart.map(item)
                  const product = products.find(
                    (product) => product.id === item.id
                  );
                  //* Jika sama maka kembalikan datanya
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      {/* <td></td> */}
                      <td>{product.title.substring(0, 10)}....</td>
                      <td>
                        {" "}
                        Rp.{" "}
                        {product.price.toLocaleString("id-ID", {
                          styles: "currency",
                          currency: "IDR",
                        })}
                      </td>
                      <td>{item.qty}</td>
                      <td>
                        {" "}
                        Rp.{" "}
                        {(item.qty * product.price).toLocaleString("id-ID", {
                          styles: "currency",
                          currency: "IDR",
                        })}
                      </td>
                    </tr>
                  );
                })}
              <tr ref={totalPriceRef}>
                <td colSpan={3}>
                  <strong>Total</strong>{" "}
                </td>
                <td>
                  <strong>
                    {" "}
                    Rp.{" "}
                    {totalPrice.toLocaleString("id-ID", {
                      styles: "currency",
                      currency: "IDR",
                    })}
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className="flex w-100 justify-center">
        <Counter></Counter>
      </div> */}
    </Fragment>
  );
};

export default Product;
