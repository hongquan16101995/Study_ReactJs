import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function Animal() {
    let [animals, setAnimals] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/animal').then((res) => {
            setAnimals(res.data)
        })
    }, [])

    return (
        <>
            <div className={'container'}>
                <h1>List animal</h1>
                <Link className={'btn btn-primary'} to={"/form/0"}>Create new person</Link>
                <div id={'div-search'}>
                    <label htmlFor={'search'}>Search</label>
                    <input id={'search'} type="text" onChange={(e) => searchAnimal(e)}/>
                </div>
                <table className={'table table-striped'}>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Age</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Species</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {animals.map((item, id) => (
                        <tr key={id}>
                            <td>{id + 1}</td>
                            <td>{item.name}</td>
                            <td><img src={item.image} alt=""/></td>
                            <td>{item.age}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.species.name}</td>
                            <td>
                                <Link id={'btn_1'} className={'btn btn-warning'} to={`/form/${item.id}`}>Update</Link>
                            </td>
                            <td>
                                <button type={'button'} className={'btn btn-danger'}
                                        onClick={() => deleteAnimal(item.id)}>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )

    function deleteAnimal(id) {
        if (window.confirm("Are you sure you want to delete this animals?")) {
            axios.delete('http://localhost:8080/animal/' + id).then(() => {
                axios.get('http://localhost:8080/animal').then((res) => {
                    setAnimals(res.data)
                })
            })
        }
    }

    function searchAnimal(e) {
        axios.post('http://localhost:8080/animal/search', {search: e.target.value}).then((res) => {
            setAnimals(res.data)
        })
    }
}
