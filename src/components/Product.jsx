import Inventory, { glazingPrice, packPrice } from './Inventory.jsx';
import './Product.css';
import { useEffect, useState } from 'react';

function Product({ id, rollName, rollPrice, rollURL, updateCart }) {
  const [price, setPrice] = useState(parseFloat(rollPrice));
  const [glazing, setGlazing] = useState('Keep Original');
  const [packSize, setPackSize] = useState(1);

  function addToCart() {
    let roll = {
      type: rollName,
      price: price,
      glazing: glazing,
      packSize: packSize,
    };
    updateCart(roll);
  }

  useEffect(() => {
    let newPrice = (parseFloat(rollPrice) + glazingPrice[glazing]) * packPrice[packSize];
    setPrice(newPrice.toFixed(2));
  }, [glazing, packSize]);

  return (
    <div className="product">
      <img src={process.env.PUBLIC_URL + rollURL} alt={rollName} width="260px" />
      <h2 className="product-name">{rollName}</h2>
      <form>
        <table>
          <tbody>
            <tr>
              <td className="cell-left">
                <label form={rollName}>Glazing:</label>
              </td>
              <td className="cell-right">
                <select
                  name={rollName}
                  id={rollName}
                  value={glazing}
                  className="glaze-menu"
                  onChange={(e) => setGlazing(e.target.value)}>
                  <option value="Keep Original">Keep Original</option>
                  <option value="Sugar Milk">Sugar Milk</option>
                  <option value="Vanilla Milk">Vanilla Milk</option>
                  <option value="Double chocolate">Double chocolate</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <p>Pack size:</p>
              </td>
              <td className="cell-right">
                <input
                  type="radio"
                  id={`${id}-1`}
                  name={`${id}`}
                  value="1"
                  onClick={() => setPackSize(1)}
                  defaultChecked
                />
                <label
                  htmlFor={`${id}-1`}
                  className="size-menu"
                  value="1"
                  style={{ backgroundColor: packSize === 1 ? '#c0c0c0' : 'white' }}>
                  1
                </label>
                <input type="radio" id={`${id}-3`} name={`${id}`} value="3" onClick={() => setPackSize(3)} />
                <label
                  htmlFor={`${id}-3`}
                  className="size-menu"
                  style={{ backgroundColor: packSize === 3 ? '#c0c0c0' : 'white' }}>
                  3
                </label>
                <input type="radio" id={`${id}-6`} name={`${id}`} value="6" onClick={() => setPackSize(6)} />
                <label
                  htmlFor={`${id}-6`}
                  className="size-menu"
                  style={{ backgroundColor: packSize === 6 ? '#c0c0c0' : 'white' }}>
                  6
                </label>
                <input type="radio" id={`${id}-12`} name={`${id}`} value="12" onClick={() => setPackSize(12)} />
                <label
                  htmlFor={`${id}-12`}
                  className="size-menu size-menu-12"
                  style={{ backgroundColor: packSize === 12 ? '#c0c0c0' : 'white' }}>
                  12
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <h2 className="price">$ {price}</h2>
              </td>
              <td className="cell-right">
                <input type="button" className="add-to-cart" value="Add to Cart" onClick={() => addToCart()} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default Product;
