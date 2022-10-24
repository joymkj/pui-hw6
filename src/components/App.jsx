import './App.css';
import Navbar from './Navbar.jsx';
import Product from './Product.jsx';
import Inventory from './Inventory';
import MenuBar from './MenuBar';
import CartItem from './CartItem';
import Cart from './Cart';
import { useState, useEffect } from 'react';

function App() {
  const localCart = localStorage.getItem('cart');
  const localCartSize = localStorage.getItem('cartSize');
  const localCartTotal = localStorage.getItem('cartTotal');
  const localCartID = localStorage.getItem('cartID');
  const [cart, setCart] = useState(localCart ? JSON.parse(localCart) : []);
  const [cartSize, setCartSize] = useState(localCartSize ? JSON.parse(localCartSize) : 0);
  const [cartTotal, setCartTotal] = useState(localCartTotal ? JSON.parse(localCartTotal) : 0.0);
  const [cartID, setCartID] = useState(localCartID && cartSize ? JSON.parse(localCartID) : 0);
  const [productList, setProductList] = useState(Inventory);
  const [latestRoll, setLatestRoll] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('Name');
  const [showPopup, setShowPopup] = useState(false);
  const [searchMatch, setSearchMatch] = useState(true);
  const [showCart, setShowCart] = useState(false);

  //called during any modification to the cart
  useEffect(() => {
    if (cartID) console.log(cart);
    saveToLocalStorage();
    console.log('new');
  }, [cartSize]);

  //show the cart popup
  useEffect(() => {
    let timer = setTimeout(() => {
      setShowPopup(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [showPopup]);

  //Adds rolls to cart. Called when you click the Add to Cart button
  const addToCart = (Roll) => {
    Roll.id = cartID;
    setCartID(cartID + 1);
    setCartSize(cartSize + 1);
    setCartTotal(cartTotal + parseFloat(Roll.price));
    setLatestRoll(Roll);
    cart.push(Roll);
    setShowPopup(true);
  };

  //Deletes item from cart
  function deleteFromCart(id, price) {
    setCartTotal(cartTotal - price);
    setCartSize(cartSize - 1);
    setCart(cart.filter((item) => item.id !== id));
  }

  //Sorts the list of products
  function handleSort(event) {
    setSort(event.target.value);
    if (event.target.value === 'Name') productList.sort((a, b) => (a.name > b.name ? 1 : -1));
    else productList.sort((a, b) => (a.price > b.price ? 1 : -1));
  }

  //Search functionality
  function handleSearch(event) {
    setSearch(event.target.value.toLowerCase());
    if (Inventory.filter((str) => str.name.toLowerCase().includes(event.target.value.toLowerCase())).length)
      setSearchMatch(true);
    else setSearchMatch(false);
  }

  //updated productlist to match search
  function searchButtonClicked() {
    setProductList(Inventory.filter((str) => str.name.toLowerCase().includes(search)));
  }

  //Returns the cart component
  function renderCart(cart) {
    return (
      <CartItem
        key={cart.id}
        id={cart.id}
        name={cart.type}
        url={'/assets/' + cart.type.replace(/ /g, '-').toLowerCase() + '.jpg'}
        glazing={cart.glazing}
        packSize={cart.packSize}
        price={cart.price}
        deleteFromCart={deleteFromCart}
      />
    );
  }

  //Return the roll component to be displayed. Called by mapping on the list of products
  function renderRolls(productList) {
    return (
      <Product
        key={productList.id}
        id={productList.id}
        rollName={productList.name}
        rollPrice={productList.price}
        rollURL={productList.url}
        addToCart={addToCart}
      />
    );
  }

  function displayCart() {
    return <Cart cartSize={cartSize} renderCart={renderCart} cart={cart} cartTotal={cartTotal} />;
  }

  //saves data to local storage
  function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartID', JSON.stringify(cartID));
    localStorage.setItem('cartSize', JSON.stringify(cartSize));
    localStorage.setItem('cartTotal', JSON.stringify(cartTotal));
  }

  return (
    <div className="App">
      <Navbar
        cartSize={cartSize}
        cartTotal={cartTotal}
        roll={latestRoll}
        showPopup={showPopup}
        showCart={showCart}
        setShowCart={setShowCart}
      />
      {showCart ? displayCart() : ''}
      <div className="Gallery">
        <MenuBar handleSearch={handleSearch} searchButtonClicked={searchButtonClicked} handleSort={handleSort} />
        {searchMatch || productList.length ? productList.map(renderRolls) : <p>No Match!</p>}
      </div>
    </div>
  );
}

export default App;
