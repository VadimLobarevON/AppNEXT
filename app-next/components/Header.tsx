import Link from 'next/link';
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
        </header>
    );
};



export default Header;
