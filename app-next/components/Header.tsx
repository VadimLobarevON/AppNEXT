import Link from 'next/link';
const handleLogout = () =>{
    console.log('logout')
    localStorage.clear();
    window.location.href = "/";

}
const Header = () => {
    return (
        <header>
            <h1>Header</h1>
            <Link href="/activities">
                Activities
            </Link>
            <br></br>
            <Link href="/profile">
                Profile
            </Link>
            <br></br>

            <Link href="/addService">
                Add Service
            </Link>
            <br></br>
            <button onClick={handleLogout}>Logout</button>
        </header>
    );
};



export default Header;
