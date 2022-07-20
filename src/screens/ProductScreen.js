import React, { useState } from "react";
import axios from 'axios';


export default function ProductScreen() {

    const [charactersData, setCharactersData] = useState([]);
    const [start, setStart] = useState(false);
    const [cantidad, setQty] = useState(1);
    const [cantidadCarro, setQtyTotal] = useState();

    const [nombreChar, setProdName] = useState("");
    var getId = window.location.pathname.replace("/product/", "");






    const showData = async function () {
        await axios.get('https://rickandmortyapi.com/api/character/' + getId + '')
            .then((data) => {
                setCharactersData(data.data);
                console.log(charactersData, "producto");
                setStart(true);
            })
    }


    var infoProd = charactersData;
    console.log(infoProd, "prodstart");


    const addtoCartHandler = function () {
        setProdName(infoProd.name);
        var CartCurrent = JSON.parse(window.localStorage.orderFortm).productos;
        var CartOrden = JSON.parse(window.localStorage.orderFortm);
        console.log(CartOrden, "orden");
        var localCart = CartCurrent;

        var testObjectNew = {
            'productos': localCart

            , 'carrito': {
                cantidadTotal: cantidadCarro

            }, 'cliente': {
                nombre: 'mauricio'
            }
        };
        setQtyTotal(testObjectNew.productos.length);
        localCart.push({ prodname: nombreChar, prodcantidad: cantidad, prodSku: "color" + cantidad.toString() });
        window.localStorage.setItem("orderFortm", JSON.stringify(testObjectNew));
    }

    setTimeout(() => {

        if (document.querySelector(".start")) {
            document.querySelector(".start").click();
            addtoCartHandler();
        }
    }, 100);
    return (


        <div>
            <h1>Pagina de Producto</h1>
            {start === false ?
                <div className="row">
                    <button className="start" onClick={() => showData()}>Ver</button>
                </div>
                :
                null
            }
            <div className="miga_pan">
                <a href={"/"}>Home</a>
                <a href={`/category/${infoProd.species}/page/1`}>{infoProd.species}</a>
                <a href={`/product/${infoProd.id}`}> {infoProd.name}</a>

            </div>
            {start === true ?
                <div className="pdp">
                    <div className="col-2">
                        <img src={infoProd.image} alt={infoProd.name}></img>
                    </div>
                   
                    <div className="col-1">
                    <div className="col-1">
                        {infoProd.name}
                    </div>
                        <a href={`/product/${infoProd.id}`}>
                            Status: <h2>{infoProd.status}</h2>
                        </a>
                        <a href="none">
                            Species:  <h2>{infoProd.species}</h2>
                        </a>
                        <div className="price">
                            Type: {infoProd.type ? infoProd.type : "No Definido"}
                        </div>
                        <div className="price">
                            Origin: {infoProd.origin.name ? infoProd.origin.name : "No Definido"}
                        </div>
                        <div className="price">
                            Gender: {infoProd.gender ? infoProd.gender : "No Definido"}
                        </div>
                        <div className="add-cart">
                            <select onChange={e => setQty(e.target.value)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <button onClick={addtoCartHandler}>Añadir Al Carrito</button>
                        </div>
                    </div>
                </div>
                : null
            }

        </div>
    )
}