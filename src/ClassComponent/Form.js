import {Component} from "react";

export default class Form extends Component {
    number

    constructor(props) {
        super(props);
        this.state = {
            id: {
                name: "name",
                age: "age",
                address: "address"
            },
            inputName: this.props.person.name,
            inputAge: this.props.person.age,
            inputAddress: this.props.person.address
        }
    }

    render() {
        return (
            <>
                <h1>Form person</h1>
                <form>
                    <div className={'mb-3'}>
                        <label className={'form-label'} htmlFor={this.state.id.name}>Name</label><br/>
                        <input className={'form-control'} type="text" value={this.state.inputName}
                               id={this.state.id.name} onChange={(e) => {
                            this.setState({
                                inputName: e.target.value
                            })
                        }}/>
                    </div>
                    <div className={'mb-3'}>
                        <label className={'form-label'} htmlFor={this.state.id.age}>Age</label><br/>
                        <input className={'form-control'} type="text" value={this.state.inputAge}
                               id={this.state.id.age} onChange={(e) => {
                            this.setState({
                                inputAge: e.target.value
                            })
                        }}/>
                    </div>
                    <div className={'mb-3'}>
                        <label className={'form-label'} htmlFor={this.state.id.address}>Address</label><br/>
                        <input className={'form-control'} type="text" value={this.state.inputAddress}
                               id={this.state.id.address} onChange={(e) => {
                            this.setState({
                                inputAddress: e.target.value
                            })
                        }}/>
                    </div>
                    <div className={'mb-3'}>
                        <button className={'btn btn-primary'} onClick={this.save}>Save</button>
                        <button className={'btn btn-danger'} onClick={this.sendData}>Close</button>
                    </div>
                </form>
            </>
        )
    }

    save = () => {
        if (this.props.person !== "") {
            this.props.person.name = this.state.inputName
            this.props.person.age = this.state.inputAge
            this.props.person.address = this.state.inputAddress
        } else {
            let index = this.props.persons[this.props.persons.length - 1].id
            this.props.persons.push({
                id: ++index, name: this.state.inputName,
                age: this.state.inputAge, address: this.state.inputAddress
            })
        }
        this.setState(() => {
            return {
                inputName: "",
                inputAge: "",
                inputAddress: ""
            }
        })
        this.sendData(this.props)
    }

    sendData = () => {
        this.props.parentCallback({persons: this.props.persons, isShow: false})
    }
}
