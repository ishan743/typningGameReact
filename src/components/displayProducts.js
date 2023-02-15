import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function DisplayProducts() {
  const [Data, setData] = useState([]);
  const [NewData,setNewData]=useState([]);
  async function getAPIdata() {
    let response = await fetch("https://fakestoreapi.com/products");
    response = await response.json();
    return response;
  }
  useEffect(() => {
    getAPIdata().then((res) => {
      setData(res);
      setNewData(res);
      ProductsList();
    });
  }, []);

  // Filter by category
  function filterCategory() {
    let val = document.getElementById("inp").value;
    console.log(val);
    if(val!="all"){
      let newData = Data.filter((product) => product.category === val);
      console.log(newData);
      setNewData(newData);
    }
    else{
      setNewData(Data);
    }
    ProductsList();
  }
  function ProductsList() {
    if (NewData.length > 0) {
      return (
        <>
          <h1>search products by Category</h1>
          <label >Choose Category:</label>
          <select name="cars" id="inp" onChange={filterCategory}>
            <option value="all">all</option>
            <option value="jewelery">jewelery</option>
            <option value="men's clothing">men's clothing</option>
            <option value="electronics">electronics</option>
            <option value="women's clothing">women's clothing</option>
          </select>
          <div id="main">
            {NewData.map((ele) => {
              return (
                <div className="card" key={ele.id}>
                  <img src={ele.image} alt="Denim Jeans" />
                  <h4>{ele.title}</h4>
                  <p className="price">{ele.price}</p>
                  <p>{ele.description} </p>
                  <p>
                    {/* <button>Add to Cart</button> */}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      );
    } else {
      return (
        <div>
          <h1 id="loadingIcon">Loading...</h1>
        </div>
      );
    }
  }
  return ProductsList();
}
