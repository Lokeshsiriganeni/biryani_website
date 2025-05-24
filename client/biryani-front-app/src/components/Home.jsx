// import { useNavigate } from "react-router-dom";
// import Header from "./Header";
// import "./Home.css";
// function Home() {
//   const navigate = useNavigate();

//   function handleClick() {
//     navigate("/card");
//   }

//   let isVisible = false;
//   return (
//     <>
//       <Header />
//       <div className="biryani-home-container">
//         <div>
//           <h1 className="">
//             Experience Authentic <span className="text-span">Biryani</span> Like
//             Never Before
//           </h1>

//           <p
//             className={`text-lg md:text-xl text-gray-700 mb-8 ${
//               isVisible ? "animate-slide-left stagger-1" : "opacity-0"
//             }`}
//           >
//             Handcrafted with love, our biryanis blend traditional recipes with
//             premium ingredients for an unforgettable culinary journey.
//           </p>
//           <button className="btn-style" onClick={() => handleClick()}>
//             click
//           </button>
//         </div>
//         <div>
//           <img
//             src="https://res.cloudinary.com/df8sosvav/image/upload/v1742710894/Kachee-Birayani_vho8fm.jpg"
//             className="biryani-image"
//           />
//         </div>
//       </div>
//       <div className="our-story-container">
//         <h1>
//           Our <span className="text-span">Story</span>
//         </h1>
//       </div>
//     </>
//   );
// }

// export default Home;
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Award, Clock, Users } from "lucide-react"; // Ensure you have lucide-react installed

import { GiRoastChicken } from "react-icons/gi";
import { CiPizza } from "react-icons/ci";
import { TbBurger } from "react-icons/tb";

import { FaLeaf } from "react-icons/fa";

import { SiZomato } from "react-icons/si";
import { SiSwiggy } from "react-icons/si";
import { FaChevronDown } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

import Header from "./Header";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const [images, setImages] = useState([
    {
      id: 1,
      url: "https://res.cloudinary.com/dx1qxaknp/image/upload/v1746379625/turkey-biryani_RECIPE_110223_4412_VOG_final_edkwlk.jpg",
      title: "Image 1",
    },
    {
      id: 2,
      url: "https://res.cloudinary.com/dx1qxaknp/image/upload/v1746379625/30c29da8aec1403f42e82552d927abab_azzepg.png",
      title: "Image 2",
    },
    {
      id: 3,
      url: "https://res.cloudinary.com/dx1qxaknp/image/upload/v1746379625/Boneless-Chicken-Biryani-5_tmgklp.jpg",
      title: "Image 3",
    },
    {
      id: 4,
      url: "https://res.cloudinary.com/dx1qxaknp/image/upload/v1746379625/SES-chicken-biryani-recipe-7367850-hero-A-ed211926bb0e4ca1be510695c15ce111_k2q1rd.jpg",
      title: "Image 4",
    },
    {
      id: 7,
      url: "https://res.cloudinary.com/dx1qxaknp/image/upload/v1746379625/turkey-biryani_RECIPE_110223_4412_VOG_final_edkwlk.jpg",
      title: "Image 1",
    },
    {
      id: 8,
      url: "https://res.cloudinary.com/dx1qxaknp/image/upload/v1746379625/30c29da8aec1403f42e82552d927abab_azzepg.png",
      title: "Image 2",
    },
    {
      id: 5,
      url: "https://res.cloudinary.com/dx1qxaknp/image/upload/v1746379625/Boneless-Chicken-Biryani-5_tmgklp.jpg",
      title: "Image 3",
    },
    {
      id: 6,
      url: "https://res.cloudinary.com/dx1qxaknp/image/upload/v1746379625/SES-chicken-biryani-recipe-7367850-hero-A-ed211926bb0e4ca1be510695c15ce111_k2q1rd.jpg",
      title: "Image 4",
    },
  ]);

  function handleClick() {
    navigate("/card");
  }

  const handleClickArrow = () => {
    console.log(isClicked);
    setIsClicked(!isClicked); // Toggle animation
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Header />
      <div className="biryani-home-container">
        <div>
          <h1 className="">
            Experience Authentic <span className="text-span">Biryani</span> Like
            Never Before
          </h1>

          <p
            className={`text-lg md:text-xl text-gray-700 mb-8 ${
              isVisible ? "animate-slide-left stagger-1" : "opacity-0"
            }`}
          >
            Handcrafted with love, our biryanis blend traditional recipes with
            premium ingredients for an unforgettable culinary journey.
          </p>
          <button className="btn-style" onClick={handleClick}>
            Click
          </button>
        </div>
        <div>
          <img
            src="https://res.cloudinary.com/df8sosvav/image/upload/v1742710894/Kachee-Birayani_vho8fm.jpg"
            className="biryani-image"
            alt="Biryani"
          />

          {/* <img src="https://res.cloudinary.com/dx1qxaknp/image/upload/v1746379625/30c29da8aec1403f42e82552d927abab_azzepg.png" /> */}
        </div>
      </div>
      {/* <div>
        <FaChevronDown
          className={`arrow ${isClicked ? "move-down" : ""}`}
          onClick={handleClickArrow}
        />
      </div> */}

      <div className="text-container">
        <div className="food-images">
          <TbBurger className="food-icon burger" />
          <GiRoastChicken className="food-icon dumplings" />
          <CiPizza className="food-icon pizza" />
          <FaLeaf className="food-icon leaf" />
        </div>
        <section className="sub-text">
          <h1 className="betterFoodStyle">
            Better food for <span className="highlight">more people</span>
          </h1>
          <p className="our-story-text">
            {/* For over a decade, we've enabled our customers to discover new
            tastes, delivered right to their doorstep */}
            For over a decade, we’ve been on a mission to bring the authentic
            taste of biryani to every doorstep. From the fragrant basmati rice
            to the perfectly spiced meats and slow-cooked flavors, our biryani
            is a celebration of tradition and taste. Whether you crave the fiery
            zest of Hyderabadi Dum Biryani we serve passion on a plate—crafted
            fresh, delivered hot, and made to satisfy every biryani lover’s
            soul.
          </p>
        </section>
      </div>

      <div className="our-story-container" data-aos="">
        <h1>
          Our <span className="text-span">Story</span>
        </h1>
        <p className="our-story-text" data-aos="">
          Founded in 2010, Spice Haven began with a simple mission: to bring
          authentic, flavorful biryanis to food enthusiasts. Our founder, Chef
          Rahul Sharma, spent years perfecting traditional recipes passed down
          through generations.
        </p>
        <br />
        <p className="our-story-text">
          Today, we continue to honor those traditions while innovating with new
          flavors. Every biryani we serve is prepared with carefully sourced
          ingredients, aromatic spices, and cooked using time-honored techniques
          to ensure an authentic experience.
        </p>

        <div className="our-achievements">
          <div>
            <div className="custom-box">
              <Award className="icon-style" />
            </div>
            <h3>Premium Quality</h3>
            <p>Only the finest ingredients</p>
          </div>

          <div>
            <div className="custom-box">
              <Clock className="icon-style" />
            </div>
            <h3>15+ Years</h3>
            <p>Of culinary excellence</p>
          </div>

          <div>
            <div className="custom-box">
              <Users className="icon-style" />
            </div>
            <h3>50,000+</h3>
            <p>Happy customers</p>
          </div>
        </div>
      </div>

      <h1 className="items-txt-style">
        Items <span className="text-span">Available</span>
      </h1>

      <div className="items-show">
        <div className="slider-track">
          {[...images, ...images].map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={img.title}
              className="item-img-style"
            />
          ))}
        </div>
      </div>

      <div className="partners">
        <h1>
          Delivery <span className="text-span">Partners</span>
        </h1>
        <p className="our-story-text" data-aos="">
          Craving your favorite biryani? We’ve made it easier than ever to enjoy
          delicious food from the comfort of your home! Our restaurant is now
          available on Zomato and Swiggy, ensuring you get hot and fresh food
          delivered right to your doorstep.
        </p>
        <br />
        <div className="our-achievements apps">
          <div>
            <a
              href="https://www.zomato.com/mumbai/deccan-chargers-biryani-point-airoli-navi-mumbai/order"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="custom-box-delivery">
                <SiZomato className="icon-style zomato" />
              </div>
              <h3>Zomato</h3>
            </a>
          </div>

          <div>
            <div className="custom-box-delivery">
              <SiSwiggy className="icon-style" />
            </div>
            <h3>Swiggy</h3>
          </div>
        </div>
      </div>

      {/* <section id="location" className="contact">
        <h2 className="section-title" data-aos="fade-up">
          Location
        </h2>
        <div className="contact-container" data-aos="fade-up">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.
              1458262042393!2d72.99194299999999!3d19.145093!2m3!1f0!2f0!3f0!3m2!
              1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b8ab2196c141%3A0xfcf7907e41f49766!2sE
              -3%2C%20Sector%209%2C%20Airoli%2C%20Navi%20Mumbai%2C%20Maharashtra%20400708
              !5e0!3m2!1sen!2sin!4v1732359131703!5m2!1sen!2sin"
              width="600"
              height="450"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section> */}

      <h1 className="loc-heading-style">
        Find <span className="text-span">Us</span>
      </h1>

      <div className="findUsSectionStyle">
        <div style={{ width: "100%", maxWidth: "600px" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m
            3!1d3769.1458262042393!2d72.99194299999999!3d19.145093!2
            m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b8
            ab2196c141%3A0xfcf7907e41f49766!2sE-3%2C%20Sector%209%2C%20
            Airoli%2C%20Navi%20Mumbai%2C%20Maharashtra%20400708!5e0!3m2!1
            sen!2sin!4v1732359131703!5m2!1sen!2sin" // make sure full link
            width="100%"
            height="350"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Biryani Shop Location"
          ></iframe>
        </div>

        <div style={{ textAlign: "center" }}>
          <h2>Deccan Chargers Biryani</h2>
          <p>
            <strong>Phone:</strong> +91 98765 43210
          </p>
          <p>
            <strong>Address:</strong> 123 Biryani Street, Hyderabad
          </p>
          <p>
            <strong>Timings:</strong> 11 AM - 11 PM
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
