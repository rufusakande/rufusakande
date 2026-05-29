import FinalCTA from "../sections/FinalCTA/FinalCTA";
import Header from '../components/layout/Header/Header'
import Footer from '../components/layout/Footer/Footer'
import AboutHero from "../sections/AboutHero/AboutHero";
import MonParcours from "../sections/MonParcours/MonParcours";
import RealisationsIntro from "../sections/RealisationsIntro/RealisationsIntro";
import ProjetsCards from "../sections/ProjetsCards/ProjetsCards";

function Realisations () {
    return (
        <>  <Header/>
            <main>
                <RealisationsIntro/>
                <ProjetsCards/>
                <FinalCTA/>
            </main>
            <Footer/>
        </>
    )
}

export default Realisations;