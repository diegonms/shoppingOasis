import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./style.css";

const dados = [
  {
    nome: "Amy Liu",
    titulo: "CTO, Cybertech Solutions",
    imagem: "https://i.pravatar.cc/200?img=31",
    quote:
      "I was skeptical about the MindSync Neural Interface, but it transformed how I engage with the world.",
  },
  {
    nome: "Sarah Price",
    titulo: "Sr. Technology Analyst",
    imagem: "https://i.pravatar.cc/200?img=26",
    quote:
      "The MindSync Neural Interface redefined the way I interact with digital devices. A game-changer.",
  },
  {
    nome: "Dr. Miguel Torres",
    titulo: "Head of Neurobiology, Central University",
    imagem: "https://i.pravatar.cc/200?img=69",
    quote:
      "It's an extraordinary leap in innovation. It understands and processes my thoughts like never before.",
  },
  {
    nome: "Benjamin Moore",
    titulo: "Director of HCI, FutureTech",
    imagem: "https://i.pravatar.cc/200?img=59",
    quote:
      "The interface feels like a natural extension of my mind. It's empowering and liberating.",
  },
  {
    nome: "Dr. Simone Laurent",
    titulo: "Chief Neurologist, NeuroTech Hospital",
    imagem: "https://i.pravatar.cc/200?img=49",
    quote:
      "The accuracy in translating neural signals is astounding. A leap in making technology intuitive.",
  },
  {
    nome: "Jared Foster",
    titulo: "Sr. Tech Journalist, Digital Frontier",
    imagem: "https://i.pravatar.cc/200?img=68",
    quote:
      "The Neural Interface revolutionizes how we perceive technology. It’s an experience, not just a device.",
  },
];

const CarrosselHero = () => {
  return (
    <div className="container">
      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={10}
        loop={true}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        navigation={true}
        className="swiperCarousel"
      >
        {dados.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="card">
              <img className="avatar" src={item.imagem} alt={item.nome} />
              <svg
                className="quote-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="125"
                height="125"
              >
                <path d="M 16.48 8.99 A 1.5 1.5 0 0 0 15.94 9.1 C 15.94 9.1 13.06 10.28 10.36 13.46 C 7.65 16.65 5 21.93 5 30 A 1.5 1.5 0 0 0 5.02 30.22 A 8.5 8.5 0 0 0 13.5 39 A 8.5 8.5 0 0 0 13.5 22 A 8.5 8.5 0 0 0 8.71 23.48 C 9.58 19.78 11.12 17.2 12.64 15.41 C 14.93 12.72 17.06 11.89 17.06 11.89 A 1.5 1.5 0 0 0 16.48 8.99 z M 37.48 8.99 A 1.5 1.5 0 0 0 36.94 9.1 C 36.94 9.1 34.06 10.28 31.36 13.46 C 28.65 16.65 26 21.93 26 30 A 1.5 1.5 0 0 0 26.02 30.22 A 8.5 8.5 0 0 0 34.5 39 A 8.5 8.5 0 0 0 34.5 22 A 8.5 8.5 0 0 0 29.71 23.48 C 30.58 19.78 32.12 17.2 33.64 15.41 C 35.93 12.72 38.06 11.89 38.06 11.89 A 1.5 1.5 0 0 0 37.48 8.99 z" />
              </svg>
              <div className="header">
                <h1 className="name">{item.nome}</h1>
                <h2 className="title">{item.titulo}</h2>
              </div>
              <div className="quote-container">
                <p className="quote">{item.quote}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarrosselHero;
