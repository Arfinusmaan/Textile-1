import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useEffect(() => {
    gsap.fromTo('.about-section', 
      { opacity: 0, y: 60 },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.about-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            About EthnicStyle
          </h1>
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            Celebrating the rich heritage of Indian fashion with contemporary elegance
          </p>
        </div>
      </section>

      <div className="about-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <section className="about-section mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Our Heritage Story
              </h2>
              <div className="space-y-4 text-lg text-foreground leading-relaxed">
                <p>
                  Founded with a passion for preserving and celebrating India's rich textile heritage, 
                  EthnicStyle has been at the forefront of ethnic fashion for over a decade. We believe 
                  that every thread tells a story, every pattern carries history, and every garment 
                  embodies the skilled craftsmanship of generations.
                </p>
                <p>
                  Our journey began in the bustling lanes of traditional textile markets, where we 
                  discovered the incredible artistry of local weavers and craftspeople. From the silk 
                  weavers of Banaras to the cotton artisans of Gujarat, we've built relationships 
                  that honor their craft while bringing their creations to fashion enthusiasts worldwide.
                </p>
                <p>
                  Today, EthnicStyle stands as a bridge between tradition and modernity, offering 
                  carefully curated collections that celebrate the timeless beauty of ethnic wear 
                  while embracing contemporary design sensibilities.
                </p>
              </div>
            </div>
            <div className="card-luxury p-8 text-center">
              <div className="w-24 h-24 bg-gradient-luxury rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gradient mb-4">10+ Years</h3>
              <p className="text-muted-foreground">of celebrating ethnic fashion excellence</p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="about-section mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do at EthnicStyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-luxury p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-emerald rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Authentic Craftsmanship</h3>
              <p className="text-muted-foreground">
                We work directly with skilled artisans to ensure every piece reflects genuine 
                traditional techniques and superior quality.
              </p>
            </div>

            <div className="card-luxury p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-primary-light rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 13.5l3.5-2.5L12 18.5 8.5 11l3.5 2.5z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Sustainable Fashion</h3>
              <p className="text-muted-foreground">
                Committed to eco-friendly practices, fair trade, and supporting sustainable 
                textile production methods.
              </p>
            </div>

            <div className="card-luxury p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald to-primary-dark rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Innovation in Tradition</h3>
              <p className="text-muted-foreground">
                Blending timeless designs with contemporary fits and styling to create 
                pieces perfect for modern lifestyles.
              </p>
            </div>
          </div>
        </section>

        {/* Craftsmanship */}
        <section className="about-section mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="card-luxury p-8">
              <div className="bg-gradient-subtle rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-gradient mb-6">The Art of Textile Excellence</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">500+</div>
                    <div className="text-muted-foreground">Skilled Artisans</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">50+</div>
                    <div className="text-muted-foreground">Fabric Varieties</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">25+</div>
                    <div className="text-muted-foreground">States Sourced</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">100%</div>
                    <div className="text-muted-foreground">Quality Promise</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Sourcing Excellence
              </h2>
              <div className="space-y-4 text-lg text-foreground leading-relaxed">
                <p>
                  Our fabric sourcing journey takes us across India's textile heartlands. From 
                  the luxurious silks of Kanchipuram to the finest cottons of Chanderi, we 
                  carefully select materials that meet our exacting standards for quality, 
                  authenticity, and ethical production.
                </p>
                <p>
                  Each fabric tells its own story - the intricate ikat weaves from Odisha, 
                  the vibrant bandhani from Rajasthan, the delicate chikankari from Lucknow. 
                  We work closely with master weavers and their communities, ensuring fair 
                  compensation and preserving age-old techniques.
                </p>
                <p>
                  Our quality assurance process includes multiple checkpoints, from raw material 
                  inspection to final garment review, ensuring that every piece that reaches 
                  you embodies the finest in Indian craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="about-section mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The passionate individuals behind EthnicStyle's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Founder & Creative Director",
                description: "With 15 years in fashion design, Priya brings her passion for ethnic wear to every collection."
              },
              {
                name: "Rajesh Kumar",
                role: "Head of Sourcing",
                description: "Rajesh travels across India to discover the finest fabrics and build relationships with artisan communities."
              },
              {
                name: "Meera Patel",
                role: "Quality Assurance Lead",
                description: "Ensuring every piece meets our quality standards, Meera's attention to detail is unmatched."
              }
            ].map((member, index) => (
              <div key={index} className="card-luxury p-8 text-center">
                <div className="w-24 h-24 bg-gradient-card rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-12 h-12 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground">{member.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="about-section text-center">
          <div className="card-luxury p-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
              Join Our Journey
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Become part of the EthnicStyle family and celebrate the beauty of traditional 
              Indian fashion. Discover pieces that connect you to our rich cultural heritage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/collections" className="btn-luxury">
                Explore Collections
              </a>
              <a href="/contact" className="btn-outline-luxury">
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;