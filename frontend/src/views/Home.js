import { Container } from "reactstrap";
import '../style/home.css'


const Home = () => {
    return (
        <div className="homepage">
            <Container>
                <div className="row justify-context-center">
                    <div className="col-md-9">
                        <h1 className="display-4 font-weight-bold text-uppercase flair text-center">Pepper</h1>
                        <p className="lead text-center"> Next generation issue-tracking platform. </p>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Home;