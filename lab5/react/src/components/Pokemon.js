//react components
import '../App.css';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

//bootstrap components
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';

const pokemonTypes = [
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy"
];

function Pokemon() {
    const [pokemon, setPokemon] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [form, setForm] = useState({});

    const fetchPokemon = () => {
        fetch('https://pokeapi.co/api/v2/pokemon/' + inputValue)
            .then(response => response.json())
            .then(pokemon => {
                const data = {
                    name: pokemon.name,
                    abilities: pokemon.abilities.map(a => a.ability.name),
                    type_1: pokemon.types[0].type.name,
                    type_2: pokemon.types[1]?.type.name || null,
                    hp: pokemon.stats[0].base_stat,
                    attack: pokemon.stats[1].base_stat,
                    defense: pokemon.stats[2].base_stat,
                    special_attack: pokemon.stats[3].base_stat,
                    special_defense: pokemon.stats[4].base_stat,
                    speed: pokemon.stats[5].base_stat,
                    front: pokemon.sprites.front_default,
                    back: pokemon.sprites.back_default,
                }
                setPokemon(data)
                setForm(data)
            })
            .catch(err => alert('Pokemon not found'));
    }
    useEffect(() => {
        const api = "https://pokeapi.co/api/v2/pokemon/1"
        fetch(api)
            .then(response => response.json())
            .then(pokemon => {
                setPokemon({
                    name: pokemon.name,
                    abilities: pokemon.abilities.map(a => a.ability.name),
                    type_1: pokemon.types[0].type.name,
                    type_2: pokemon.types[1]?.type.name || null,
                    hp: pokemon.stats[0].base_stat,
                    attack: pokemon.stats[1].base_stat,
                    defense: pokemon.stats[2].base_stat,
                    special_attack: pokemon.stats[3].base_stat,
                    special_defense: pokemon.stats[4].base_stat,
                    speed: pokemon.stats[5].base_stat,
                    front: pokemon.sprites.front_default,
                    back: pokemon.sprites.back_default,
                })
            })
            .catch(err => console.log('Request Failed', err));

    }, []);

    const handleSearch = (event) => {
        if (event.key === "Enter") {
            fetchPokemon()
        }
    };

    const handleSync = (event) => {
        event.preventDefault();
        setForm({ ...pokemon })
    }

    const handleGet = (event) => {
        event.preventDefault();
        if (!form.id) {
            alert('Please enter a valid ID')
            return;
        }
        fetch('http://localhost:3000/db/' + form.id)
            .then(response => response.json())
            .then(response => {
                if (!response.data) {
                    alert('Pokemon Not found')
                    return;
                }
                setForm(response.data)
                setPokemon(response.data)
            })
            .catch(err => {
                alert('Error')
            })
    }

    const handlePost = () => {
        fetch('http://localhost:3000/db/', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((response) => {
                const data = response.data
                alert(`Pokemon ${data.name}(ID ${data.id}) added successfully`)
                setForm(data)
                setPokemon(data)
            })
            .catch(err => {
                alert('Error')
            })
    }

    const handlePut = () => {
        if (!form.id) {
            alert('Please enter a valid ID')
            return;
        }
        fetch('http://localhost:3000/db/' + form.id, {
            method: 'PUT',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((response) => {
                const data = response.data
                alert(`Pokemon ${data.name}(ID ${data.id}) updated`)
                setForm(data)
                setPokemon(data)
            })
            .catch(err => {
                alert('Error')
            })
    }

    const handleDelete = () => {
        if (!form.id) {
            alert('Please enter a valid ID')
            return;
        }
        fetch('http://localhost:3000/db/' + form.id, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then((response) => {
                const data = response.data
                alert(`Pokemon ID ${data} has been deteled`)
                setForm({})
            })
            .catch(err => {
                alert('Error')
            })
    }

    const handeChange = (e) => {
        const { name, value } = e.target;
        const copy = { ...form };
        copy[name] = value;
        setForm(copy)
    }

    return (
        <div className='h-100 w-100'>
            <div className="p-5 py-2">
                <Container className="w-100">
                    <Row>
                        <Col className="mt-5">
                            <Form.Control style={{
                                width: '100%',
                            }} type="search"
                                value={inputValue}
                                onChange={(event) => setInputValue(event.target.value.toLowerCase())}
                                placeholder="Enter Pokemon Name or Poke Dex"
                                onKeyUp={handleSearch}
                            />
                        </Col>
                    </Row>
                    {pokemon && <div className="mt-5 px-5 bg-white py-5 border rounded shadow d-flex justify-content-evenly">
                        <div className="">
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <div>
                                    <img src={pokemon.front} alt="" />
                                    <img src={pokemon.back} alt="" />
                                </div>
                                <h4>{pokemon.name.toUpperCase()}</h4>
                                <div>
                                    <Badge className={pokemon.type_1}>{pokemon.type_1}</Badge>
                                    {pokemon.type_2 && <Badge className={"ms-2 " + pokemon.type_2} bg="secondary">{pokemon.type_2}</Badge>}
                                </div>
                                <Button className="mt-2" size="sm" variant="warning" onClick={handleSync}>Add to Form</Button>
                            </div>
                        </div>

                        <div className="">
                            <h4>Stats</h4>
                            <p>
                                HP: {pokemon.hp}
                            </p>
                            <p>
                                Attack: {pokemon.attack}
                            </p>
                            <p>
                                Defense: {pokemon.defense}
                            </p>
                            <p>
                                Special Attack: {pokemon.special_attack}
                            </p>
                            <p>
                                Special Defense: {pokemon.special_defense}
                            </p>
                            <p>
                                speed: {pokemon.speed}
                            </p>
                        </div>
                        <div>
                            <h4>Abilities</h4>
                            {
                                pokemon.abilities.map(a => <div key={a} className="capitalize">{a}</div>)
                            }
                        </div>

                    </div>}
                    <Card className="mt-2">

                        <Form className='m-3'>
                            <h4>My Collection</h4>
                            <Form.Group className="mb-1" >
                                <Form.Label>ID</Form.Label>
                                <Form.Control size="sm" name="id" onChange={handeChange} type="number" value={form.id || ''} />
                            </Form.Group>
                            <Form.Group className="mb-1" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control size="sm" name="name" onChange={handeChange} type="text" value={form.name || ''} required />
                            </Form.Group>

                            <Form.Group className="mb-1" >
                                <Form.Label>Type 1</Form.Label>
                                <Form.Select size="sm" name="type_1" onChange={handeChange} type="text" value={form.type_1 || ''} required >
                                    <option value=''></option>
                                    {pokemonTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-1" >
                                <Form.Label>Type 2</Form.Label>
                                <Form.Select size="sm" name="type_2" onChange={handeChange} type="text" value={form.type_2 || ''} required >
                                    <option value=''></option>
                                    {pokemonTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-1" >
                                <Form.Label>HP</Form.Label>
                                <Form.Control size="sm" name="hp" onChange={handeChange} type="number" value={form.hp || ''} required />
                            </Form.Group>
                            <Form.Group className="mb-1" >
                                <Form.Label>Defense</Form.Label>
                                <Form.Control size="sm" name="defense" onChange={handeChange} type="number" value={form.defense || ''} required />
                            </Form.Group>
                            <Form.Group className="mb-1" >
                                <Form.Label>Special Attack</Form.Label>
                                <Form.Control size="sm" name="special_attack" onChange={handeChange} type="number" value={form.special_attack || ''} required />
                            </Form.Group>
                            <Form.Group className="mb-1" >
                                <Form.Label>Special Defense</Form.Label>
                                <Form.Control size="sm" name="special_defense" onChange={handeChange} type="number" value={form.special_defense || ''} required />
                            </Form.Group>
                            <Form.Group className="mb-1" >
                                <Form.Label>Speed</Form.Label>
                                <Form.Control size="sm" type="number" name="speed" onChange={handeChange} value={form.speed || ''} required />
                            </Form.Group>

                            <div className="d-flex justify-content-evenly">
                                <Button size="sm" onClick={handleGet} variant="secondary" type="button">
                                    GET
                                </Button>
                                <Button size="sm" onClick={handlePost} variant="secondary" type="button">
                                    POST
                                </Button>
                                <Button size="sm" onClick={handlePut} variant="secondary" type="button">
                                    PUT
                                </Button>
                                <Button size="sm" onClick={handleDelete} variant="secondary" type="button">
                                    DELETE
                                </Button>
                            </div>

                        </Form>
                    </Card>
                </Container>
            </div>
        </div>
    );
}

export default Pokemon;