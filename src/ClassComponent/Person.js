import {Component} from "react";
import Form from "./Form";
import {PersonObject} from "./PersonObject";

export default class Person extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: [
                new PersonObject(1, "Lê Hồng Quân", 29, "HB"),
                {
                    id: 2,
                    name: "Nguyễn Đông Nam",
                    age: 27,
                    address: "HN"
                },
                {
                    id: 3,
                    name: "Đào Như Anh",
                    age: 25,
                    address: "TB"
                }
            ],
            back_up: "",
            isShow: false,
            person: "",
            search: "search"
        }
    }

    componentDidMount() {
        this.setState(() => {
            return {
                back_up: this.state.persons
            }
        })
    }

    render() {
        return (
            <>
                <div className={'container'}>
                    {this.state.isShow && <Form
                        persons={this.state.persons}
                        person={this.state.person}
                        parentCallback={this.callbackFunction}>
                    </Form>}
                    <h1>List person</h1>
                    <button className={'btn btn-primary'} onClick={this.add}>Create new person</button>
                    <div id={'div-search'}>
                        <label htmlFor={this.state.search}>Search</label>
                        <input id={this.state.search} type="text" onChange={(e) => this.search(e)}/>
                    </div>
                    <table className={'table table-striped'}>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Address</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.persons.map((item, id) => (
                            <tr key={id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button className={'btn btn-warning'}
                                            onClick={() => this.edit(item)}>Edit
                                    </button>
                                </td>
                                <td>
                                    <button className={'btn btn-danger'}
                                            onClick={() => this.delete(item)}>Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }

    backUp = () => {
        this.setState(() => {
            return {
                persons: this.state.back_up
            }
        })
    }

    callbackFunction = (childData) => {
        this.setState(() => {
            return {
                persons: childData.persons,
                isShow: childData.isShow
            }
        })
    }

    edit = (value) => {
        this.setState(() => {
            return {
                person: value,
                isShow: true
            }
        })
    }

    add = () => {
        this.setState(() => {
            return {
                person: "",
                isShow: true
            }
        })
        console.log(this.state.person)
    }

    delete = (value) => {
        if (window.confirm("Are you sure you want to delete this person?")) {
            let arr = this.state.persons
            arr.splice(this.state.persons.indexOf(value), 1)
            this.setState(() => {
                return {
                    persons: arr
                }
            })
        }
    }

    search = (e) => {
        let arr = []
        for (let i = 0; i < this.state.persons.length; i++) {
            if (this.state.persons[i].name.toUpperCase().includes(e.target.value.toUpperCase())) {
                arr.push(this.state.persons[i])
            }
        }
        this.setState(() => {
            if (e.target.value === '' || e.target.value === undefined) {
                this.backUp()
            } else {
                return {
                    persons: arr
                }
            }
        })
    }
}
