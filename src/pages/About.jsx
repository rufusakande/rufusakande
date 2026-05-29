import FinalCTA from "../sections/FinalCTA/FinalCTA";
import Header from '../components/layout/Header/Header'
import Footer from '../components/layout/Footer/Footer'
import AboutHero from "../sections/AboutHero/AboutHero";
import MonParcours from "../sections/MonParcours/MonParcours";

function About () {
    return (
        <>  <Header/>
            <main>
                <AboutHero/>
                <MonParcours/>
                <FinalCTA/>
            </main>
            <Footer/>
        </>
    )
}

export default About;