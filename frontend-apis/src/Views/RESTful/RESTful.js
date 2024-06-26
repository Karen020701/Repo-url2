import React, { useState, useEffect } from 'react';
import './estilos.css';
import {Link} from "react-router-dom";

function RESTful() {
    const [songs, setSongs] = useState([]);
    const [newMovie, setNewSongs] = useState({
        name: '',
        single: '',
        genre: ''
    });
    const [editingSongId, setEditingSongId] = useState(null);
    const [editingSong, setEditingSong] = useState({
        id: null,
        name: '',
        single: '',
        genre: ''
    });

    useEffect(() => {
        fetchSongs();
    }, []);

    const fetchSongs = () => {
        fetch('http://localhost:3001/api/songs')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                return response.json();
            })
            .then(data => setSongs(data))
            .catch(error => console.error('Error fetching songs:', error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingSongId !== null) {
            setEditingSong({ ...editingSong, [name]: value });
        } else {
            setNewSong({ ...newSong, [name]: value });
        }
    };

    const handleAddSong = () => {
        fetch('http://localhost:3001/api/songs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSong)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error in add song');
                }
                return response.json();
            })
            .then(data => {
                setSong([...songs, data]);
                setNewSong({
                    name: '',
                    single: '',
                    genre: ''
                });
            })
            .catch(error => console.error('Error adding song:', error));
    };

    const handleEditSong = () => {
        fetch(http://localhost:3001/api/songs/${editingSong.id}, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editingSong)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to edit song');
                }
                return response.json();
            })
            .then(data => {
                const updatedSong = songs.map(song => {
                    if (song.id === editingSong.id) {
                        return { ...song, ...editingSong };
                    }
                    return song;
                });
                setSongs(updatedSongs);
                setEditingSongId(null);
                setEditingSong({
                    id: null,
                    name: '',
                    single: '',
                    genre: ''
                });
            })
            .catch(error => console.error('Error editing song:', error));
    };

    const handleDeleteSong = (id) => {
        fetch(http://localhost:3001/api/songs/${id}, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete song');
                }
                return response.json();
            })
            .then(() => {
                const updatedSongs = songs.filter(song => song.id !== id);
                setSongs(updatedSongs);
            })
            .catch(error => console.error('Error deleting song:', error));
    };

    const handleStartEditing = (song) => {
        setEditingSongId(song.id);
        setEditingSong(song);
    };


    return (
        <div>
            <h1>Canciones</h1>
            <pre>{JSON.stringify(songs,null,2)}</pre>
            <h2>Lista de Canciones</h2>
            {songs.length > 0 ? (
                <ul>
                    {songs.map(song => (
                        <li key={song.id}>
                            {editingMovieId === song.id ? (
                                <div>
                                    <h3>{song.title}</h3>
                                    <input type="text" name="name" value={editingSong.name} onChange={handleInputChange}/>
                                    <input type="text" name="single" value={editingSong.single} onChange={handleInputChange}/>
                                    <input type="text" name="genre" value={editingSong.genre} onChange={handleInputChange}/>
                                    <button onClick={handleEditSong}>Guardar Cambios</button>
                                </div>
                            ) : (
                                <div>
                                    <h3>{song.title}</h3>
                                    <p><strong>Single:</strong> {song.director}</p>
                                    <p><strong>Genre:</strong> {song.year}</p>
                                    <button className="delete" onClick={() => handleDeleteSong(song.id)}>Eliminar</button>
                                    <button className="edit" onClick={() => handleStartEditing(song)}>Editar</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay canciones disponibles.</p>
            )}

            <h2>Agregar Cancion</h2>
            <input type="text" name="name" placeholder="Name" value={newSong.name} onChange={handleInputChange}/>
            <input type="text" name="single" placeholder="Single" value={newSong.single} onChange={handleInputChange}/>
            <input type="text" name="genre" placeholder="Genre" value={newSong.genre} onChange={handleInputChange}/>
            <button onClick={handleAddMovie}>Agregar</button>
            <div className="button-container">
                <Link to="/"><button className="styled-button">Volver</button></Link>
            </div>
        </div>
    );

}

export default RESTful;