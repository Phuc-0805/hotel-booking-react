
import Header from '../Header/header.jsx';

import Aboutus from './Aboutus/Aboutus.jsx';

import Carousel from './Carousel/carousel.jsx';

import Room from './Room/room.jsx';

import Gallery from './Gallery/gallery.jsx';

import Blogs from './Blogs/blogs.jsx';

import ContactUs from './contactus/contactus.jsx';

import Footer from '../footer/footer.jsx';
export default function Home() {
    return (
        <div className="home-container">
        <Header />

        <Carousel />

        <Aboutus />

        <Room />

        <Gallery />

        <Blogs />

        <ContactUs />

        <Footer />
        </div>
    );
}