import FinalCTA from "../sections/FinalCTA/FinalCTA";
import Heros from "../sections/Heros/Heros";
import Testimonials from "../sections/Testimonials/Testimonials";
import WhatIOffer from "../sections/WhatIOffer/WhatIOffer";
import WhyChooseMe from "../sections/WhyChooseMe/WhyChooseMe";
import WorkProcess from "../sections/WorkProcess/WorkProcess";
import Header from '../components/layout/Header/Header'
import Footer from '../components/layout/Footer/Footer'

function Home () {
    return (
        <>  <Header/>
            <main>
                <Heros/>
                <WhatIOffer/>
                <WhyChooseMe/>
                <WorkProcess/>
                <Testimonials/>
                <FinalCTA/>
            </main>
            <Footer/>
        </>
    )
}

export default Home;