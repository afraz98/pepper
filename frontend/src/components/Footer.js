import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faBootstrap, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Navbar, Nav } from 'react-bootstrap';
import '../style/footer.css';

const Footer = () => {
    return (
        <>
            <Navbar fixed="bottom" className="bg-dark">
                <Nav>
                    <Nav.Link href="https://reactjs.org/"><FontAwesomeIcon icon={faReact}/></Nav.Link>
                    <Nav.Link href="https://getbootstrap.com/"><FontAwesomeIcon icon={faBootstrap}/></Nav.Link>
                    <Nav.Link href="https://www.github.com/afraz98/"><FontAwesomeIcon icon={faGithub}/></Nav.Link>
                </Nav>
            </Navbar>
        </>
    );
}

export default Footer;