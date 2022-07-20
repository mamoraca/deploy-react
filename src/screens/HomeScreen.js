import React, { useState } from "react";
import axios from 'axios';
import Rating from "../components/Rating.js"

const HomeScreen = () => {
    const [charactersData, setCharactersData] = useState([]);
    const [paginationData, setPagination] = useState([]);
    const [paginas, setPaginas] = useState(0);
    const [next, setNext] = useState("");
    const [prev, setPrev] = useState("");
    const [start, setStart] = useState(false);
    const [statePage, setStatePage] = useState("");


    const saveData = async function () {
        await axios.get('https://rickandmortyapi.com/api/character')
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




    const orderBy = () => {
        charactersData.sort(function (a, b) {
            if (a.name > b.name) {
                return 1;
            }
            if (b.name > a.name) {
                return -1;
            }
            return 0;
        });
        console.log(charactersData, "data")
        setCharactersData(charactersData);

    }


    const orderByNameASC = async () => {
        let newPage = parseInt(statePage);
        await axios.get('https://rickandmortyapi.com/api/character')
            .then((data) => {
                setCharactersData(data.data.results.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                })

                );
                console.log(charactersData, "category");
                setStart(true);
                setStatePage(newPage.toString());
            })
    }



    const orderByNameDES = async () => {
        let newPage = parseInt(statePage);
        await axios.get('https://rickandmortyapi.com/api/character')
            .then((data) => {
                setCharactersData(data.data.results.sort(function (a, b) {
                    if (a.name < b.name) {
                        return 1;
                    }
                    if (b.name < a.name) {
                        return -1;
                    }
                    return 0;
                })

                );
                console.log(charactersData, "category");
                setStart(true);
                setStatePage(newPage.toString());
            })
    }




    const orderByType = async () => {
        let newPage = parseInt(statePage);
        await axios.get('https://rickandmortyapi.com/api/character')
            .then((data) => {
                setCharactersData(data.data.results.sort(function (a, b) {
                    if (a.type < b.type) {
                        return 1;
                    }
                    if (b.type < a.type) {
                        return -1;
                    }
                    return 0;
                })

                );
                console.log(charactersData, "category");
                setStart(true);
                setStatePage(newPage.toString());
            })
    }



    const orderByLive = async () => {
        let newPage = parseInt(statePage);
        await axios.get('https://rickandmortyapi.com/api/character')
            .then((data) => {
                setCharactersData(data.data.results.sort(function (a, b) {
                    if (a.status < b.status) {
                        return 1;
                    }
                    if (b.status < a.status) {
                        return -1;
                    }
                    return 0;
                })

                );
                console.log(charactersData, "category");
                setStart(true);
                setStatePage(newPage.toString());
            })
    }


    const orderByGender = async () => {
        let newPage = parseInt(statePage);
        await axios.get('https://rickandmortyapi.com/api/character')
            .then((data) => {
                setCharactersData(data.data.results.sort(function (a, b) {
                    if (a.gender < b.gender) {
                        return 1;
                    }
                    if (b.gender < a.gender) {
                        return -1;
                    }
                    return 0;
                })

                );
                console.log(charactersData, "category");
                setStart(true);
                setStatePage(newPage.toString());
            })
    }

    setTimeout(() => {
        if (document.querySelector(".start")) {
            document.querySelector(".start").click();
        }
    }, 100);

    return (
        <div>
            <h1>Todos los Prouctos</h1>
            <div>

            </div>
            <div className="grilla">
                <div className="filter">
                    <h3>Pagina Home Grilla</h3>
                    <div className="row">
                     
                    </div>
                </div>
                <div className="gridhome">
                    {charactersData.map((char, index) =>

                        <div key={index} className="card">
                            <a href={`/product/${char.id}`}>
                                <img className="medium" src={char.image} alt="product" />
                            </a>
                            <div className="card-body">
                                <a href={`/product/${char.id}`}>
                                    <h2>{char.name}</h2>
                                </a>
                                <a href={`/product/${char.id}`}>
                                    Status: <h2>{char.status}</h2>
                                </a>
                                <a href={`/category/${char.species}/page/1`}>
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
                </div>


            </div>

            <div className="paginador">
                {start === false ?
                    <div className="row">
                        <button className="start" onClick={() => saveData()}>Ver</button>
                    </div>
                    :
                    null
                }
                {start === true ?

                    <div className="paginate">
                        <div>
                            <h3>Filtrar Por</h3>
                            <div className="row">
                                <button onClick={() => orderByNameASC()}>orden por Nombre ASC</button>
                                <button onClick={() => orderByNameDES()}>orden por Nombre DES</button>
                                <button onClick={() => orderByType()}>orden por Tipo</button>
                                <button onClick={() => orderByLive()}>orden por Vida</button>
                                <button onClick={() => orderByGender()}>orden por Genero</button>
                            </div>
                        </div>
                        <div>
                            <div className="row">
                            {prev !== null ?
                                <div onClick={() => PrevPage()}  className="prev_rot"><img width="50" src="https://static.vecteezy.com/system/resources/previews/000/592/934/non_2x/vector-rightward-arrow-icon.jpg" alt="name"></img></div>
                                :
                                null
                            }
                           
                            <div onClick={() => NextPage()}><img width="50" src="https://static.vecteezy.com/system/resources/previews/000/592/934/non_2x/vector-rightward-arrow-icon.jpg" alt="name"></img></div>
                            </div>
                            <div><h6>tenemos {paginas} paginas</h6></div>
                        </div>
                    </div>
                    :
                    null
                }

            </div>
        </div>
    )
}


export default HomeScreen;