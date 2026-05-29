import FinalCTA from "../sections/FinalCTA/FinalCTA";
import Header from '../components/layout/Header/Header'
import Footer from '../components/layout/Footer/Footer'
import ServicesHero from "../sections/ServicesHero/ServicesHero";
import ServicesList from "../sections/ServicesList/ServicesList";

function Services () {
    return (
        <>  <Header/>
            <main>
                <ServicesHero/>
                <ServicesList/>
                <FinalCTA/>
            </main>
            <Footer/>
        </>
    )
}

export default Services;