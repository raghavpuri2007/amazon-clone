import React from 'react'
import "./Home.css"
import Product from './Product'
function Home() {
    return (
        <div className="home">
            <div className="home_container">
                <img className="home_image" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt="Prime Video ad" />
                <div className="home_row">
                    <Product id="232" title='Washington State Driver’s Practice Tests: + 360 Driving Test Questions To Help You Ace Your DMV Exam. (Practice Driving Tests)' price={12.85} image="https://images-na.ssl-images-amazon.com/images/I/71S5-5r9PcL._AC_UL160_SR160,160_.jpg" rating={4} />
                    <Product id="123" title='SLUXKE 1 Gallon Water Bottle Portable Water Jug Fitness Sports Daily Water Bottle with Motivational Time Marker' price={17.96} image="https://m.media-amazon.com/images/I/610iiQryvEL._AC_SY355_.jpg" rating={5} />
                </div>
                <div className="home_row">
                    <Product id="342" title='Apple AirPods Pro' price={249} image="https://m.media-amazon.com/images/I/71bhWgQK-cL._AC_UY218_.jpg" rating={4} />
                    <Product id="4223" title='WILSON Evolution Game Basketball' price={69.95} image="https://m.media-amazon.com/images/I/91vdgs5FY4L._AC_SY355_.jpg" rating={5} />
                    <Product id="240" title='Amazon Basics Rubber Encased Hex Dumbbell Hand Weight' price={27.83} image="https://m.media-amazon.com/images/I/71cUT5+EdOS._AC_SY355_.jpg" rating={3} />
                </div>
                <div className="home_row">
                    <Product title='LG OLED C1 Series 77” Alexa Built-in 4k Smart TV (3840 x 2160), 120Hz Refresh Rate, AI-Powered 4K, Dolby Cinema, WiSA Ready, Gaming Mode (OLED77C1PUB, 2021)' price={3_799.99} image="https://m.media-amazon.com/images/I/91otJ1fmuXS._AC_SX355_.jpg" rating={5} />
                </div>
            </div>
        </div>
    )
}

export default Home