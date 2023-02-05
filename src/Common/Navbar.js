import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <h1>
                <Link className={'btn btn-primary'} to={'/'}>List animal</Link>&nbsp;
                <Link className={'btn btn-primary'} to={'/form/0'}>Create new animal</Link>&nbsp;
                <Link className={'btn btn-primary'} to={'/person'}>Person</Link>&nbsp;
            </h1>
        </>
    );
}
