import React, { useState } from "react";
import axios from 'axios';
import Rating from "./Rating.js"

const DataBase = () => {
    const [charactersData, setCharactersData] = useState([]);
    const [paginationData, setPagination] = useState([]);
    const [paginas, setPaginas] = useState(0);
    const [next, setNext] = useState("");
    const [prev, setPrev] = useState("");
    const [start, setStart] = useState(false);

    const saveData = function () {
        axios.get('https://rickandmortyapi.com/api/character')
            .then((data) => {
                setCharactersData(data.data.results);
                setPagination(data.data.info);
                setPaginas(data.data.info.pages);
                setNext(data.data.info.next);
                setPrev(data.data.info.prev);
                setStart(true)

                console.log(charactersData, paginationData, "hola 2")

            })
    }

    const NextPage = function () {
        axios.get(next)
            .then((data) => {
                setCharactersData(data.data.results);
                setPagination(data.data.info);
                setPaginas(data.data.info.pages);
                setNext(data.data.info.next);
                setPrev(data.data.info.prev);

                setStart(true)
                console.log(charactersData, paginationData, "hola 2")

            })
    }

    const PrevPage = function () {
        axios.get(prev)
            .then((data) => {
                setCharactersData(data.data.results);
                setPagination(data.data.info);
                setPaginas(data.data.info.pages);
                setNext(data.data.info.next);
                setPrev(data.data.info.prev);
                setStart(true)

                console.log(charactersData, paginationData, "hola 2")

            })
    }

    return (
        <div>
            <div className="grilla">

                {charactersData.map((char, index) =>

                    <div key={index} className="card">
                        <a href={`/product/${char.id}`}>
                            <img className="medium" src={char.image} alt="product" />
                        </a>
                        <div className="card-body">
                            <a  href={`/product/${char.id}`}>
                                <h2>{char.name}</h2>
                            </a>
                            <a  href={`/product/${char.id}`}>
                            Status: <h2>{char.status}</h2>
                            </a>
                            <a href="none">
                            Species:  <h2>{char.species}</h2>
                            </a>
                            <div className="rating">
                                    <Rating></Rating>
                            </div>
                            <div className="price">
                                Type: {char.type ? char.type : "No Definido"}
                            </div>
                            <div className="price">
                                Origin: {char.origin.name ? char.origin.name : "No Definido"}
                            </div>
                            <div className="price">
                                Gender: {char.gender ? char.gender : "No Definido"}
                            </div>
                        </div>
                    </div>
                )
                }

                <div className="paginador">
                    {start === false ?
                        <div>
                            <button onClick={() => saveData()}>Start</button>
                        </div>
                        :
                        null
                    }
                    {start === true ?

                        <div className="paginate">
                            {prev !== null ?
                                <div onClick={() => PrevPage()} >Before</div>
                                :
                                null
                            }
                            <div>tenemos {paginas} paginas</div>
                            <div onClick={() => NextPage()}>Next</div>
                        </div>
                        :
                        null
                    }

                </div>
            </div>
        </div>
    )
}


export default DataBase;