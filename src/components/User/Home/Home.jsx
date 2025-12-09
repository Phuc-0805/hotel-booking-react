
import Header from '../Header/header.jsx';

import Aboutus from './Aboutus/Aboutus.jsx';

import Carousel from './Carousel/carousel.jsx';
import Room from './Room/room.jsx';
import Gallery from './Gallery/gallery.jsx';

export default function Home() {
    return (
        <div className="home-container">
        <Header />

        <Carousel />

        <Aboutus />

        <Room />
        
        <Gallery />
        </div>
    );
}