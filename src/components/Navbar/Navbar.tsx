import { useLoadingContext } from '../../contexts/LoadingContext';
import { useNavigate } from 'react-router-dom';
import Button from '../assets/button/Button';
import './Navbar.scss';

const Navbar = () => {
    const { loading } = useLoadingContext();
    const navigate = useNavigate();

    return (
        <div className="Navbar" data-testid="Navbar">
            <Button text="Podcaster" className="Navbar__logo" action={() => navigate('/')} />

            {loading && <img className="Navbar__loading" src="/loading.gif" alt="loading" />}
        </div>
    );
};

export default Navbar;
