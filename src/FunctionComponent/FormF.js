import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function FormF() {
    const param = useParams();
    const navigate = useNavigate();
    let [species, setSpecies] = useState([]);
    let [animal, setAnimal] = useState('');
    useEffect(() => {
        axios.get('http://localhost:8080/animal/species').then((res) => {
            setSpecies(res.data)
        })
        axios.get('http://localhost:8080/animal/' + param.id).then((res) => {
            setAnimal(res.data)
        })
    }, [])

    return (
        <>
            <div className={'form'}>
                <Formik
                    initialValues={{
                        name: animal.name,
                        image: "https://firebasestorage.googleapis.com/v0/b/animal-demo-2c19f.appspot.com/o/image%2Favatar_1675242065874?alt=media&token=8472a74c-794a-4338-bc15-e59e765379f3",
                        age: animal.age,
                        price: animal.price,
                        quantity: animal.quantity,
                        species: ''
                    }}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        createAnimal(values)
                    }}>
                    <Form>
                        <div className={'mb-3'}>
                            <label className={'form-label'} htmlFor={'name'}>Name</label><br/>
                            <Field className={'form-control'} type="text" id={'name'} name={'name'}></Field>
                        </div>
                        <div className={'mb-3'}>
                            <label className={'form-label'} htmlFor={'image'}>Image</label><br/>
                            <input className={'form-control'} type="file" id={'image'}/>
                        </div>
                        <div className={'mb-3'}>
                            <label className={'form-label'} htmlFor={'age'}>Age</label><br/>
                            <Field className={'form-control'} type="text" id={'age'} name={'age'}></Field>
                        </div>
                        <div className={'mb-3'}>
                            <label className={'form-label'} htmlFor={'price'}>Price</label><br/>
                            <Field className={'form-control'} type="text" id={'price'} name={'price'}></Field>
                        </div>
                        <div className={'mb-3'}>
                            <label className={'form-label'} htmlFor={'quantity'}>Quantity</label><br/>
                            <Field className={'form-control'} type="text" id={'quantity'} name={'quantity'}></Field>
                        </div>
                        <div className={'mb-3'}>
                                <label className={'form-label'} htmlFor={'species'}>Species</label><br/>
                                <Field as="select" className={'form-select'} id={'species'} name={'species'}>
                                    <option value={''}>-----------</option>
                                    {species.map((item, id) => (
                                        <option key={id} value={item.id}>{item.name}</option>
                                    ))}
                                </Field>
                        </div>
                        <button type={'submit'} className={'btn btn-primary'}>Save</button>
                        <Link className={'btn btn-danger'} to={'/'}>Back</Link>
                    </Form>
                </Formik>
            </div>
        </>
    )

    function createAnimal(values) {
        const animal = {
            id: param.id,
            name: values.name,
            image: "https://firebasestorage.googleapis.com/v0/b/animal-demo-2c19f.appspot.com/o/image%2Favatar_1675242065874?alt=media&token=8472a74c-794a-4338-bc15-e59e765379f3",
            age: values.age,
            price: values.price,
            quantity: values.quantity,
            species: {
                id: values.species
            }
        }
        axios.post('http://localhost:8080/animal', animal).then(() => {
            navigate("/")
        })
    }
}
