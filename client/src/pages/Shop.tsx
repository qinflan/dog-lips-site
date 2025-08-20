import "./Shop.css"
import merch from './admin/data/ShopData.json';


const Shop = () => {
  return (
    <div className="page-content-container">
      <div className="shop-section-container">
      <div className="marquee">
        <span>☠️ UNDER CONSTRUCTION 🕷️ WE ARE CURRENTLY ROCKING 🩸 MERCH WILL BE UPLOADED TO SHOP AFTER TOUR ☮️</span>
      </div>
      <h1>
        SHOP
      </h1>
      <div className="merch-items-container">
        {merch.map((item) => (
          <div className="merch-item" key={item.id}>
            <img src={item.imageUrl} alt={item.name} className="merch-image" />
            <div className="merch-details">
              <h2 className="merch-name">{item.name}</h2>
              <p className="merch-price">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  
)}

export default Shop