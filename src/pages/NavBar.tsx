import "bootstrap/dist/css/bootstrap.min.css";

const NavBar: React.FC = () => {



    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Demo banca</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/account">Account</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/movement">Movement</a>
                </li>
                
                </ul>
            </div>
            </nav>
            </>
    );

}

export default NavBar;