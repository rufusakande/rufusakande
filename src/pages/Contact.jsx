import Header from '../components/layout/Header/Header'
import Footer from '../components/layout/Footer/Footer'
import ContactHeroSection from "../sections/ContactHeroSection/ContactHeroSection";
import ContactInfoSection from "../sections/ContactInfoSection/ContactInfoSection";

function Contact () {
    return (
        <>  <Header/>
            <main>
                <ContactHeroSection/>
                <ContactInfoSection/>
            </main>
            <Footer/>
        </>
    )
}

export default Contact;