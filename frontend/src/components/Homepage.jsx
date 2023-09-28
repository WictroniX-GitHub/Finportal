import React,{useEffect, useRef} from "react";
import { NavLink } from "react-router-dom";
import {gsap} from 'gsap'
import NumberAnimation from "./NumberAnimation.jsx";
import "../styles/homepage.css";
import "../styles/hp.scss"

const Homepage = () => {
  const slideshowRef = useRef(null);
  const timelineRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const imageSlides = document.getElementsByClassName('imageSlides');
    const circles = document.getElementsByClassName('circle');
    const leftArrow = document.getElementById('leftArrow');
    const rightArrow = document.getElementById('rightArrow');
    let counter = 0;

    function hideImages() {
      for (let i = 0; i < imageSlides.length; i++) {
        imageSlides[i].style.opacity = 0;
      }
    }

    function removeDots() {
      for (let i = 0; i < imageSlides.length; i++) {
        circles[i].classList.remove('dot');
      }
    }

    function imageLoop() {
      const currentImage = imageSlides[counter];
      const currentDot = circles[counter];
      if (currentImage && currentDot) {
        currentImage.style.opacity = 1;
        removeDots();
        currentDot.classList.add('dot');
      }
      counter++;
      
      timelineRef.current = gsap.timeline();
      timelineRef.current
        .fromTo(".sl-h6", {
          opacity: 0
        },
        {
          opacity: 1,
          duration: 1
        })
        .fromTo(".sl-h1", {
          opacity: 0
        },
        {
          opacity: 1,
          duration: 1
        }, "-=0.5") // Add a delay before setting opacity to 0
        .fromTo(".sl-p", {
          opacity: 0
        },
        {
          opacity: 1,
          duration: 1
        }, "-=0.5") // Add a delay before setting opacity to 0
        .fromTo(".sl-btn", {
          opacity: 0
        },
        {
          opacity: 1,
          duration: 1
        }, "-=0.5"); // Add a delay before setting opacity to 0
    }

    function arrowClick(e) {
      const target = e.target;
      if (target === leftArrow) {
        clearInterval(slideshowRef.current);
        if (timelineRef.current) {
          timelineRef.current.kill();
        }
        hideImages();
        removeDots();
        if (counter === 1) {
          counter = imageSlides.length - 1;
          imageLoop();
          slideshowRef.current = setInterval(slideshow, 8000);
        } else {
          counter--;
          counter--;
          imageLoop();
          slideshowRef.current = setInterval(slideshow, 8000);
        }
      } else if (target === rightArrow) {
        clearInterval(slideshowRef.current);
        if (timelineRef.current) {
          timelineRef.current.kill();
        }
        hideImages();
        removeDots();
        if (counter === imageSlides.length) {
          counter = 0;
          imageLoop();
          slideshowRef.current = setInterval(slideshow, 8000);
        } else {
          imageLoop();
          slideshowRef.current = setInterval(slideshow, 8000);
        }
      }
    }

    // leftArrow.addEventListener('click', arrowClick);
    // rightArrow.addEventListener('click', arrowClick);

    function slideshow() {
      if (counter < imageSlides.length) {
        imageLoop();
      } else {
        counter = 0;
        hideImages();
        imageLoop();
      }
    }

    slideshowRef.current = setInterval(slideshow, 8000);
    slideshow();
    // IntersectionObserver Configuration
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('hide-left')) {
            entry.target.classList.add('show-left');
          }
          if (entry.target.classList.contains('hide-right')) {
            entry.target.classList.add('show-right');
          }
          if (entry.target.classList.contains('hide-top')) {
            entry.target.classList.add('show-top');
          }
          if (entry.target.classList.contains('hide-bottom')) {
            entry.target.classList.add('show-bottom');
          }
        } else {
          if (entry.target.classList.contains('hide-left')) {
            entry.target.classList.remove('show-left');
          }
          if (entry.target.classList.contains('hide-right')) {
            entry.target.classList.remove('show-right');
          }
          if (entry.target.classList.contains('hide-top')) {
            entry.target.classList.remove('show-top');
          }
          if (entry.target.classList.contains('hide-bottom')) {
            entry.target.classList.remove('show-bottom');
          }
        }
      });
    }, options);

    const hideRightElements = document.querySelectorAll('.hide-right');
    hideRightElements.forEach((el) => observerRef.current.observe(el));

    const hideLeftElements = document.querySelectorAll('.hide-left');
    hideLeftElements.forEach((el) => observerRef.current.observe(el));

    const hideTopElements = document.querySelectorAll('.hide-top');
    hideTopElements.forEach((el) => observerRef.current.observe(el));

    const hideBottomElements = document.querySelectorAll('.hide-bottom');
    hideBottomElements.forEach((el) => observerRef.current.observe(el));

    return () => {
      clearInterval(slideshowRef.current);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // form submit
      function HPformSubmit() {
        document.getElementById("HPform").submit();
      }

  return (
    <>
      <body class="home page-template-default page page-id-6 ehf-header ehf-footer ehf-template-hello-elementor ehf-stylesheet-hello-elementor jkit-color-scheme elementor-default elementor-template-full-width elementor-kit-5 elementor-page elementor-page-6">
        <div
          data-elementor-type="wp-page"
          data-elementor-id="6"
          class="elementor elementor-6"
        >
          <section
            class="elementor-section elementor-top-section elementor-element elementor-element-f0dd4c4 elementor-section-height-min-height elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-items-middle"
            data-id="f0dd4c4"
            data-element_type="section"
            data-settings='{"background_background":"classic"}'
          >
            <div class="elementor-background-overlay"></div>
            <div class="elementor-container elementor-column-gap-default">
              <div
                class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-a994da8"
                data-id="a994da8"
                data-element_type="column"
              >
                <div class="elementor-widget-wrap"></div>
              </div>
              <div
                class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-526d37f hide-bottom show-bottom"
                data-id="526d37f"
                data-element_type="column"
              >
                <div class="elementor-widget-wrap elementor-element-populated">
                  <div
                    class="elementor-element elementor-element-fd76dc0 elementor-invisible elementor-widget elementor-widget-heading"
                    data-id="fd76dc0"
                    data-element_type="widget"
                    data-settings='{"_animation":"fadeInLeft"}'
                    data-widget_type="heading.default"
                  >
                    <div class="elementor-widget-container">
                      <h2 class="elementor-heading-title elementor-size-default">
                        WE'RE TAX CONSULTANT
                      </h2>{" "}
                    </div>
                  </div>
                  <div
                    class="elementor-element elementor-element-b039903 elementor-invisible elementor-widget elementor-widget-heading"
                    data-id="b039903"
                    data-element_type="widget"
                    data-settings='{"_animation":"fadeInRight","_animation_delay":"200"}'
                    data-widget_type="heading.default"
                  >
                    <div class="elementor-widget-container">
                      <h1 class="elementor-heading-title elementor-size-default">
                        Help You To Manage Your Tax
                      </h1>{" "}
                    </div>
                  </div>
                  <div
                    class="elementor-element elementor-element-27ee765 elementor-invisible elementor-widget elementor-widget-text-editor"
                    data-id="27ee765"
                    data-element_type="widget"
                    data-settings='{"_animation":"fadeInRight","_animation_delay":"300"}'
                    data-widget_type="text-editor.default"
                  >
                    <div class="elementor-widget-container">
                      <p>
                        Let our experts manage your tax and business
                        compliances.{" "}
                      </p>{" "}
                    </div>
                  </div>
                  <section
                    class="elementor-section elementor-inner-section elementor-element elementor-element-e3fb443 elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                    data-id="e3fb443"
                    data-element_type="section"
                  >
                    <div class="elementor-container elementor-column-gap-no cust-btn-left">
                      <div
                        class="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-83a15c8"
                        data-id="83a15c8"
                        data-element_type="column"
                      >
                        <div class="elementor-widget-wrap elementor-element-populated">
                          <div
                            class="elementor-element elementor-element-f88b4a1 elementor-align-left elementor-invisible elementor-widget elementor-widget-button"
                            data-id="f88b4a1"
                            data-element_type="widget"
                            data-settings='{"_animation":"fadeInLeft","_animation_delay":"400"}'
                            data-widget_type="button.default"
                          >
                            <div class="elementor-widget-container">
                              <div class="elementor-button-wrapper">
                                {/* <a
                                  href="/itr"
                                  class="elementor-button-link elementor-button elementor-size-md"
                                  role="button"
                                >
                                  <span class="elementor-button-content-wrapper">
                                    <span class="elementor-button-text">
                                      Get Started
                                    </span>
                                  </span>
                                </a> */}
                                {/* <div class="mc">
                                <a class="learn-more" href="/itr">Learn More</a>
                                </div> */}
                                <NavLink to="/itr" className="mc">
                                <a class="learn-more">Learn More</a>
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div class="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-933895e" data-id="933895e" data-element_type="column">
			<div class="elementor-widget-wrap elementor-element-populated">
								<div class="elementor-element elementor-element-889c44a elementor-invisible elementor-widget elementor-widget-jkit_video_button" data-id="889c44a" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:&quot;500&quot;}" data-widget_type="jkit_video_button.default">
				<div class="elementor-widget-container">
			<div  class="jeg-elementor-kit jkit-video-button jeg_module_6_3_64e45de7152b3"  data-autoplay="0" data-loop="0" data-controls="0" data-type="youtube" data-mute="0" data-start="0" data-end="0"><a href="https://www.youtube.com/watch?v=MLpWrANjFbI"  class="jkit-video-popup-btn"  ><span class="icon-position-before"><i aria-hidden="true" class="jki jki-play-circle-line"></i></span></a></div>		</div>
				</div>
					</div>
		</div> */}
                      {/* <div class="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-862caa4" data-id="862caa4" data-element_type="column">
			<div class="elementor-widget-wrap elementor-element-populated">
								<div class="elementor-element elementor-element-da2c1fa elementor-invisible elementor-widget elementor-widget-heading" data-id="da2c1fa" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInRight&quot;,&quot;_animation_delay&quot;:&quot;600&quot;}" data-widget_type="heading.default">
				<div class="elementor-widget-container">
			<h2 class="elementor-heading-title elementor-size-default"><a href="https://www.youtube.com/watch?v=MLpWrANjFbI">Watch Video</a></h2>		</div>
				</div>
					</div>
		</div> */}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>
          <section
            class="elementor-section elementor-top-section elementor-element elementor-element-27632a6 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
            data-id="27632a6"
            data-element_type="section"
          >
            <div class="elementor-container elementor-column-gap-no">
              <div
                class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-29d5a0f elementor-invisible"
                data-id="29d5a0f"
                data-element_type="column"
                data-settings='{"animation":"fadeInLeft"}'
              >
                <div class="elementor-widget-wrap elementor-element-populated">
                  <div
                    class="elementor-element elementor-element-53c69da elementor-widget elementor-widget-jkit_heading"
                    data-id="53c69da"
                    data-element_type="widget"
                    data-widget_type="jkit_heading.default"
                  >
                    <div class="elementor-widget-container">
                      <div class="jeg-elementor-kit jkit-heading  align-left align-tablet- align-mobile- jeg_module_6_4_64e45de71b42a">
                        <h3 class="heading-section-subtitle  style-color">
                          WELCOME TO FINPORTAL
                        </h3>
                        <div class="heading-section-title  display-inline-block">
                          <h2 class="heading-title">
                            We Will Provide Best Tax Service For Your Business.
                          </h2>
                        </div>
                        <div class="heading-section-separator">
                          <div class="separator-wrapper style-solid"></div>
                        </div>
                        <div class="heading-section-description">
                          <p>
                            Our team is here to assist you and answer any
                            questions you may have. Connect with us and let’s
                            start a conversation!
                          </p>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                  <section
                    class="elementor-section elementor-inner-section elementor-element elementor-element-f19e876 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                    data-id="f19e876"
                    data-element_type="section"
                  >
                    <div class="elementor-container elementor-column-gap-no">
                      <div
                        class="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-4bed5d9"
                        data-id="4bed5d9"
                        data-element_type="column"
                      >
                        <div class="elementor-widget-wrap elementor-element-populated">
                          <div
                            class="elementor-element elementor-element-2679dab elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list"
                            data-id="2679dab"
                            data-element_type="widget"
                            data-widget_type="icon-list.default"
                          >
                            <div class="elementor-widget-container">
                              <ul class="elementor-icon-list-items">
                                <li class="elementor-icon-list-item">
                                  <span class="elementor-icon-list-icon">
                                    <i
                                      aria-hidden="true"
                                      class="fas fa-check"
                                    ></i>{" "}
                                  </span>
                                  <span class="elementor-icon-list-text">
                                    Learn from customer feedback
                                  </span>
                                </li>
                                <li class="elementor-icon-list-item">
                                  <span class="elementor-icon-list-icon">
                                    <i
                                      aria-hidden="true"
                                      class="fas fa-check"
                                    ></i>{" "}
                                  </span>
                                  <span class="elementor-icon-list-text">
                                    Professional Team
                                  </span>
                                </li>
                                <li class="elementor-icon-list-item">
                                  <span class="elementor-icon-list-icon">
                                    <i
                                      aria-hidden="true"
                                      class="fas fa-check"
                                    ></i>{" "}
                                  </span>
                                  <span class="elementor-icon-list-text">
                                    High Savings Potential
                                  </span>
                                </li>
                                <li class="elementor-icon-list-item">
                                  <span class="elementor-icon-list-icon">
                                    <i
                                      aria-hidden="true"
                                      class="fas fa-check"
                                    ></i>{" "}
                                  </span>
                                  <span class="elementor-icon-list-text">
                                    24/7 customer support
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-a88f122"
                        data-id="a88f122"
                        data-element_type="column"
                      >
                        <div class="elementor-widget-wrap elementor-element-populated">
                          <div
                            class="elementor-element elementor-element-df7409e elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list"
                            data-id="df7409e"
                            data-element_type="widget"
                            data-widget_type="icon-list.default"
                          >
                            <div class="elementor-widget-container">
                              <ul class="elementor-icon-list-items">
                                <li class="elementor-icon-list-item">
                                  <span class="elementor-icon-list-icon">
                                    <i
                                      aria-hidden="true"
                                      class="fas fa-check"
                                    ></i>{" "}
                                  </span>
                                  <span class="elementor-icon-list-text">
                                    High Savings Potential
                                  </span>
                                </li>
                                <li class="elementor-icon-list-item">
                                  <span class="elementor-icon-list-icon">
                                    <i
                                      aria-hidden="true"
                                      class="fas fa-check"
                                    ></i>{" "}
                                  </span>
                                  <span class="elementor-icon-list-text">
                                    Professional Team
                                  </span>
                                </li>
                                <li class="elementor-icon-list-item">
                                  <span class="elementor-icon-list-icon">
                                    <i
                                      aria-hidden="true"
                                      class="fas fa-check"
                                    ></i>{" "}
                                  </span>
                                  <span class="elementor-icon-list-text">
                                    24/7 customer support
                                  </span>
                                </li>
                                <li class="elementor-icon-list-item">
                                  <span class="elementor-icon-list-icon">
                                    <i
                                      aria-hidden="true"
                                      class="fas fa-check"
                                    ></i>{" "}
                                  </span>
                                  <span class="elementor-icon-list-text">
                                    Learn from customer feedback
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section
                    class="elementor-section elementor-inner-section elementor-element elementor-element-d7578b9 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                    data-id="d7578b9"
                    data-element_type="section"
                  >
                    <div class="elementor-container elementor-column-gap-no">
                      <div
                        class="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-9d96893"
                        data-id="9d96893"
                        data-element_type="column"
                      >
                        <div class="elementor-widget-wrap elementor-element-populated">
                          <div
                            class="elementor-element elementor-element-2698187 elementor-widget elementor-widget-image"
                            data-id="2698187"
                            data-element_type="widget"
                            data-widget_type="image.default"
                          >
                            <div class="elementor-widget-container">
                              <img
                                width="261"
                                height="49"
                                src="wp-content/uploads/sites/111/2021/06/david-morgan-signature-founder.png"
                                class="attachment-large size-large wp-image-3845"
                                alt=""
                                decoding="async"
                                loading="lazy"
                              />{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-8d0e351"
                        data-id="8d0e351"
                        data-element_type="column"
                      >
                        <div class="elementor-widget-wrap elementor-element-populated">
                          <div
                            class="elementor-element elementor-element-2fea428 elementor-widget elementor-widget-heading"
                            data-id="2fea428"
                            data-element_type="widget"
                            data-widget_type="heading.default"
                          >
                            <div class="elementor-widget-container">
                              <h2 class="elementor-heading-title elementor-size-default">
                                David Morgan
                              </h2>{" "}
                            </div>
                          </div>
                          <div
                            class="elementor-element elementor-element-b5f147a elementor-widget elementor-widget-text-editor"
                            data-id="b5f147a"
                            data-element_type="widget"
                            data-widget_type="text-editor.default"
                          >
                            <div class="elementor-widget-container">
                              <p>Founder Finportal</p>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              <div
                class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-be7d7d6 elementor-invisible"
                data-id="be7d7d6"
                data-element_type="column"
                data-settings='{"background_background":"classic","animation":"fadeInUp"}'
              >
                <div class="elementor-widget-wrap elementor-element-populated test hide-bottom show-bottom">
                  <div class="elementor-background-overlay"></div>
                  <div
                    class="elementor-element elementor-element-caba6e5 elementor-widget elementor-widget-metform"
                    data-id="caba6e5"
                    data-element_type="widget"
                    data-widget_type="metform.default"
                  >
                    <div class="elementor-widget-container">
                      <div
                        id="mf-response-props-id-2520"
                        data-previous-steps-style=""
                        data-editswitchopen=""
                        data-response_type="alert"
                        data-erroricon="fas fa-exclamation-triangle"
                        data-successicon="fas fa-check"
                        data-messageposition="top"
                        class="   mf-scroll-top-no"
                      >
                        <div
                          class="formpicker_warper formpicker_warper_editable"
                          data-metform-formpicker-key="2520"
                        >
                          <div class="elementor-widget-container">
                            <div
                              id="metform-wrap-caba6e5-2520"
                              class="mf-form-wrapper"
                              data-form-id="2520"
                              data-action="wp-json/metform/v1/entries/insert/2520.json"
                              data-wp-nonce="d838c1f283"
                              data-form-nonce="8d9aec3cae"
                              data-quiz-summery="false"
                              data-save-progress="false"
                              data-form-type="contact_form"
                              data-stop-vertical-effect=""
                            >
                              
                              <div className="jeg-elementor-kit jkit-heading  align-left align-tablet- align-mobile- jeg_module_6_5_64e45de72893c">
                                <h3 className="heading-section-subtitle  style-color"
                                >
                                  SEND A MESSAGE
                                </h3>
                                
                                <div className="heading-section-title  display-inline-block">
                                  <h2 className="heading-title">
                                    Request a call back
                                  </h2>
                                </div>
                              </div>

                              <div className="hp-form">
                                <form action="" id="HPform">
                                  <input type="text" placeholder="Your Name" />
                                  <input type="text" placeholder="Your Email" />
                                  <input
                                    type="text"
                                    placeholder="Your Contact"
                                  />
                                  <textarea
                                    name=""
                                    placeholder="Message"
                                    id=""
                                    cols="30"
                                    rows="5"
                                  ></textarea>
                                  {/* <input type="submit" /> */}
                                  <NavLink to="#" className="mc" onClick={HPformSubmit}>
                                    <a class="learn-more">Submit</a>
                                  </NavLink>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            class="elementor-section elementor-top-section elementor-element elementor-element-3c7f415b elementor-section-boxed elementor-section-height-default elementor-section-height-default"
            data-id="3c7f415b"
            data-element_type="section"
          >
            <div
              class="elementor-element elementor-element-833e261 elementor-invisible elementor-widget elementor-widget-jkit_heading cust-sec-mar"
              data-id="833e261"
              data-element_type="widget"
              data-settings='{"_animation":"fadeInUp"}'
              data-widget_type="jkit_heading.default"
            >
              <div class="elementor-widget-container">
                <div class="jeg-elementor-kit jkit-heading  align-center align-tablet- align-mobile- jeg_module_6_7_64e45de7489fd">
                  <div class="heading-section-title  display-inline-block">
                    <h2 class="heading-title">Why You Shoud Trust Us</h2>
                  </div>
                  <div class="heading-section-separator">
                    <div class="separator-wrapper style-solid"></div>
                  </div>
                </div>{" "}
              </div>
            </div>

            <div class="elementor-container elementor-column-gap-default">
              <div
                class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-2ff00d2 elementor-invisible"
                data-id="2ff00d2"
                data-element_type="column"
                data-settings='{"background_background":"classic","animation":"fadeInLeft"}'
              >
                <div class="elementor-widget-wrap elementor-element-populated">
                  <div
                    class="elementor-element elementor-element-7e98250f elementor-position-left elementor-view-default elementor-mobile-position-top elementor-vertical-align-top elementor-widget elementor-widget-icon-box"
                    data-id="7e98250f"
                    data-element_type="widget"
                    data-settings='{"_animation":"none"}'
                    data-widget_type="icon-box.default"
                  >
                    <div class="elementor-widget-container">
                      <div class="elementor-icon-box-wrapper">
                        <div class="elementor-icon-box-icon">
                          <span class="elementor-icon elementor-animation-">
                            <i
                              aria-hidden="true"
                              class="jki jki-users-light"
                            ></i>{" "}
                          </span>
                        </div>
                        <div class="elementor-icon-box-content">
                          <h3 class="elementor-icon-box-title">
                            <span>Experienced Team</span>
                          </h3>
                          <p class="elementor-icon-box-description">
                            We are proud to have assembled a team of highly
                            experienced professionals who are dedicated to
                            helping our clients maximize their tax savings.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-75ede085 elementor-invisible"
                data-id="75ede085"
                data-element_type="column"
                data-settings='{"animation":"fadeInUp"}'
              >
                <div class="elementor-widget-wrap elementor-element-populated">
                  <div
                    class="elementor-element elementor-element-6912e14e elementor-position-left elementor-view-default elementor-mobile-position-top elementor-vertical-align-top elementor-widget elementor-widget-icon-box"
                    data-id="6912e14e"
                    data-element_type="widget"
                    data-widget_type="icon-box.default"
                  >
                    <div class="elementor-widget-container">
                      <div class="elementor-icon-box-wrapper">
                        <div class="elementor-icon-box-icon">
                          <span class="elementor-icon elementor-animation-">
                            <i
                              aria-hidden="true"
                              class="jki jki-consut2-light"
                            ></i>{" "}
                          </span>
                        </div>
                        <div class="elementor-icon-box-content">
                          <h3 class="elementor-icon-box-title">
                            <span>Maximum Tax Saving</span>
                          </h3>
                          <p class="elementor-icon-box-description">
                            we are dedicated to helping our clients achieve
                            maximum tax savings through strategic planning and
                            expert advice.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-d807d7 elementor-invisible"
                data-id="d807d7"
                data-element_type="column"
                data-settings='{"animation":"fadeInRight"}'
              >
                <div class="elementor-widget-wrap elementor-element-populated">
                  <div
                    class="elementor-element elementor-element-44876c29 elementor-position-left elementor-view-default elementor-mobile-position-top elementor-vertical-align-top elementor-widget elementor-widget-icon-box"
                    data-id="44876c29"
                    data-element_type="widget"
                    data-widget_type="icon-box.default"
                  >
                    <div class="elementor-widget-container">
                      <div class="elementor-icon-box-wrapper">
                        <div class="elementor-icon-box-icon">
                          <span class="elementor-icon elementor-animation-">
                            <i
                              aria-hidden="true"
                              class="jki jki-finance-book-light"
                            ></i>{" "}
                          </span>
                        </div>
                        <div class="elementor-icon-box-content">
                          <h3 class="elementor-icon-box-title">
                            <span>Stress Free</span>
                          </h3>
                          <p class="elementor-icon-box-description">
                            we are committed to providing stress-free tax-saving
                            solutions that alleviate the burden and ensure your
                            peace of mind.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            class="elementor-section elementor-top-section elementor-element elementor-element-e1f8ee0 elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default"
            data-id="e1f8ee0"
            data-element_type="section"
            data-settings='{"background_background":"gradient"}'
          >
            <div class="elementor-background-overlay"></div>
            <div class="elementor-container elementor-column-gap-no">
              <div
                class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-79b5111 elementor-invisible"
                data-id="79b5111"
                data-element_type="column"
                data-settings='{"animation":"fadeInLeft"}'
              >
                <div class="elementor-widget-wrap elementor-element-populated">
                  <div
                    class="elementor-element elementor-element-e46dd8f elementor-widget elementor-widget-jkit_animated_text"
                    data-id="e46dd8f"
                    data-element_type="widget"
                    data-widget_type="jkit_animated_text.default"
                  >
                    <div class="elementor-widget-container">
                      <div
                        class="jeg-elementor-kit jkit-animated-text jeg_module_6_6_64e45de741463 mob-cen"
                        data-style="rotating"
                        data-text="General Features,Personal tax,Inheritance Tax,Indirect Tax,Large Corporate,International Tax"
                        data-rotate="typing"
                        data-delay="2500"
                        data-letter-speed="100"
                        data-delay-delete="500"
                      >
                        <p class="animated-text">
                          <span class="normal-text style-color">
                            We Offer Popular Plans for{" "}
                          </span>
                          <span class="dynamic-wrapper style-color">
                            <span class="dynamic-text">
                              <span class="dynamic-text-letter">G</span>
                              <span class="dynamic-text-letter">e</span>
                              <span class="dynamic-text-letter">n</span>
                              <span class="dynamic-text-letter">e</span>
                              <span class="dynamic-text-letter">r</span>
                              <span class="dynamic-text-letter">a</span>
                              <span class="dynamic-text-letter">l</span>
                              <span class="dynamic-text-letter"> </span>
                              <span class="dynamic-text-letter">F</span>
                              <span class="dynamic-text-letter">e</span>
                              <span class="dynamic-text-letter">a</span>
                              <span class="dynamic-text-letter">t</span>
                              <span class="dynamic-text-letter">u</span>
                              <span class="dynamic-text-letter">r</span>
                              <span class="dynamic-text-letter">e</span>
                              <span class="dynamic-text-letter">s</span>
                            </span>
                            <span class="dynamic-text">
                              <span class="dynamic-text-letter">P</span>
                              <span class="dynamic-text-letter">e</span>
                              <span class="dynamic-text-letter">r</span>
                              <span class="dynamic-text-letter">s</span>
                              <span class="dynamic-text-letter">o</span>
                              <span class="dynamic-text-letter">n</span>
                              <span class="dynamic-text-letter">a</span>
                              <span class="dynamic-text-letter">l</span>
                              <span class="dynamic-text-letter"> </span>
                              <span class="dynamic-text-letter">t</span>
                              <span class="dynamic-text-letter">a</span>
                              <span class="dynamic-text-letter">x</span>
                            </span>
                            <span class="dynamic-text">
                              <span class="dynamic-text-letter">I</span>
                              <span class="dynamic-text-letter">n</span>
                              <span class="dynamic-text-letter">h</span>
                              <span class="dynamic-text-letter">e</span>
                              <span class="dynamic-text-letter">r</span>
                              <span class="dynamic-text-letter">i</span>
                              <span class="dynamic-text-letter">t</span>
                              <span class="dynamic-text-letter">a</span>
                              <span class="dynamic-text-letter">n</span>
                              <span class="dynamic-text-letter">c</span>
                              <span class="dynamic-text-letter">e</span>
                              <span class="dynamic-text-letter"> </span>
                              <span class="dynamic-text-letter">T</span>
                              <span class="dynamic-text-letter">a</span>
                              <span class="dynamic-text-letter">x</span>
                            </span>
                            <span class="dynamic-text">
                              <span class="dynamic-text-letter">I</span>
                              <span class="dynamic-text-letter">n</span>
                              <span class="dynamic-text-letter">d</span>
                              <span class="dynamic-text-letter">i</span>
                              <span class="dynamic-text-letter">r</span>
                              <span class="dynamic-text-letter">e</span>
                              <span class="dynamic-text-letter">c</span>
                              <span class="dynamic-text-letter">t</span>
                              <span class="dynamic-text-letter"> </span>
                              <span class="dynamic-text-letter">T</span>
                              <span class="dynamic-text-letter">a</span>
                              <span class="dynamic-text-letter">x</span>
                            </span>
                            <span class="dynamic-text">
                              <span class="dynamic-text-letter">L</span>
                              <span class="dynamic-text-letter">a</span>
                              <span class="dynamic-text-letter">r</span>
                              <span class="dynamic-text-letter">g</span>
                              <span class="dynamic-text-letter">e</span>
                              <span class="dynamic-text-letter"> </span>
                              <span class="dynamic-text-letter">C</span>
                              <span class="dynamic-text-letter">o</span>
                              <span class="dynamic-text-letter">r</span>
                              <span class="dynamic-text-letter">p</span>
                              <span class="dynamic-text-letter">o</span>
                              <span class="dynamic-text-letter">r</span>
                              <span class="dynamic-text-letter">a</span>
                              <span class="dynamic-text-letter">t</span>
                              <span class="dynamic-text-letter">e</span>
                            </span>
                            <span class="dynamic-text">
                              <span class="dynamic-text-letter">I</span>
                              <span class="dynamic-text-letter">n</span>
                              <span class="dynamic-text-letter">t</span>
                              <span class="dynamic-text-letter">e</span>
                              <span class="dynamic-text-letter">r</span>
                              <span class="dynamic-text-letter">n</span>
                              <span class="dynamic-text-letter">a</span>
                              <span class="dynamic-text-letter">t</span>
                              <span class="dynamic-text-letter">i</span>
                              <span class="dynamic-text-letter">o</span>
                              <span class="dynamic-text-letter">n</span>
                              <span class="dynamic-text-letter">a</span>
                              <span class="dynamic-text-letter">l</span>
                              <span class="dynamic-text-letter"> </span>
                              <span class="dynamic-text-letter">T</span>
                              <span class="dynamic-text-letter">a</span>
                              <span class="dynamic-text-letter">x</span>
                            </span>
                          </span>
                          <span class="normal-text style-color"></span>
                        </p>
                      </div>{" "}
                    </div>
                  </div>
                  <div
                    class="elementor-element elementor-element-2d3e2f6 elementor-widget elementor-widget-text-editor mob-cen"
                    data-id="2d3e2f6"
                    data-element_type="widget"
                    data-widget_type="text-editor.default"
                  >
                    <div class="elementor-widget-container">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut elit tellus, luctus nec ullamcorper mattis, pulvinar
                        dapibus leo.
                      </p>{" "}
                    </div>
                  </div>
                  <div
                    class="elementor-element elementor-element-00a81b9 elementor-align-left elementor-widget elementor-widget-button mob-cen"
                    data-id="00a81b9"
                    data-element_type="widget"
                    data-widget_type="button.default"
                  >
                    <div class="elementor-widget-container">
                      <div class="elementor-button-wrapper">
                        <NavLink to="/itr" className="mc">
                                <a class="learn-more">Learn More</a>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-d1c2cff elementor-invisible"
                data-id="d1c2cff"
                data-element_type="column"
                data-settings='{"background_background":"classic","animation":"fadeInRight","animation_delay":"100"}'
              >
                <div class="elementor-widget-wrap elementor-element-populated">
                  <div
                    class="elementor-element elementor-element-a173bae elementor-hidden-phone elementor-invisible elementor-widget elementor-widget-image"
                    data-id="a173bae"
                    data-element_type="widget"
                    data-settings='{"_animation":"fadeInRight","_animation_delay":"200"}'
                    data-widget_type="image.default"
                  >
                    <div class="elementor-widget-container adc-1">
                      <img
                        width="800"
                        height="532"
                        src="wp-content/uploads/sites/111/2021/06/business-people-hands-shake-for-business-partnership-success-shake-hand-concept-1024x681.jpg"
                        class="attachment-large size-large wp-image-1581"
                        alt="business people hands shake for business partnership success, Shake hand concept"
                        decoding="async"
                        loading="lazy"
                        srcset="https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/business-people-hands-shake-for-business-partnership-success-shake-hand-concept-1024x681.jpg 1024w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/business-people-hands-shake-for-business-partnership-success-shake-hand-concept-300x200.jpg 300w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/business-people-hands-shake-for-business-partnership-success-shake-hand-concept-768x511.jpg 768w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/business-people-hands-shake-for-business-partnership-success-shake-hand-concept-1536x1022.jpg 1536w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/business-people-hands-shake-for-business-partnership-success-shake-hand-concept-800x532.jpg 800w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/business-people-hands-shake-for-business-partnership-success-shake-hand-concept-e1626231690663.jpg 1920w"
                        sizes="(max-width: 800px) 100vw, 800px"
                      />{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            class="elementor-section elementor-top-section elementor-element elementor-element-894dac4 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
            data-id="894dac4"
            data-element_type="section"
          >
            <div class="elementor-container elementor-column-gap-no">
              <div
                class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-47809c3"
                data-id="47809c3"
                data-element_type="column"
              >
                <div class="elementor-widget-wrap elementor-element-populated">
                  <div
                    class="elementor-element elementor-element-833e261 elementor-invisible elementor-widget elementor-widget-jkit_heading cust-sec-mar"
                    data-id="833e261"
                    data-element_type="widget"
                    data-settings='{"_animation":"fadeInUp"}'
                    data-widget_type="jkit_heading.default"
                  >
                    <div class="elementor-widget-container">
                      <div class="jeg-elementor-kit jkit-heading  align-center align-tablet- align-mobile- jeg_module_6_7_64e45de7489fd">
                        {/* <h3 class="heading-section-subtitle  style-color">
                          OUR SERVICES
                        </h3> */}
                        <div class="heading-section-title  display-inline-block">
                          <h2 class="heading-title">What We Provide</h2>
                        </div>
                        <div class="heading-section-separator">
                          <div class="separator-wrapper style-solid"></div>
                        </div>
                        <div class="heading-section-description">
                          <p>We've got you covered. You name it, we got it.</p>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                  <section
                    class="elementor-section elementor-inner-section elementor-element elementor-element-27f4fcf elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                    data-id="27f4fcf"
                    data-element_type="section"
                  >
                    <div class="elementor-container elementor-column-gap-default">
                      <div
                        class="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-d57bd56"
                        data-id="d57bd56"
                        data-element_type="column"
                      >
                        <div class="elementor-widget-wrap elementor-element-populated">
                        <div
                            class="elementor-element elementor-element-0e345b9 jkit-equal-height-disable elementor-invisible elementor-widget elementor-widget-jkit_icon_box"
                            data-id="0e345b9"
                            data-element_type="widget"
                            data-settings='{"_animation":"fadeInUp","_animation_delay":"100"}'
                            data-widget_type="jkit_icon_box.default"
                          >
                            <div class="elementor-widget-container">
                              <div class="jeg-elementor-kit jkit-icon-box icon-position- elementor-animation- jeg_module_6_9_64e45de75014d">
                                <div class="jkit-icon-box-wrapper hover-from-bottom hp-wwpb">
                                  <div class="icon-box icon-box-header elementor-animation-">
                                    <div class="icon style-color">
                                      <i
                                        aria-hidden="true"
                                        class="jki jki-money-3-light"
                                      ></i>
                                    </div>
                                  </div>
                                  <div class="icon-box icon-box-body">
                                    <h2 class="title">Self Employed?</h2>
                                    <p class="icon-box-description">
                                      You can file your tax returns manually
                                      without uploading Form-16. You can also
                                      upload Form 26AS
                                    </p>
                                  </div>
                                </div>
                              </div>{" "}
                            </div>
                          </div>
                          <div
                            class="elementor-element elementor-element-0e345b9 jkit-equal-height-disable elementor-invisible elementor-widget elementor-widget-jkit_icon_box"
                            data-id="0e345b9"
                            data-element_type="widget"
                            data-settings='{"_animation":"fadeInUp","_animation_delay":"100"}'
                            data-widget_type="jkit_icon_box.default"
                          >
                            <div class="elementor-widget-container">
                              <div class="jeg-elementor-kit jkit-icon-box icon-position- elementor-animation- jeg_module_6_9_64e45de75014d">
                                <div class="jkit-icon-box-wrapper hover-from-bottom hp-wwpb">
                                  <div class="icon-box icon-box-header elementor-animation-">
                                    <div class="icon style-color">
                                      <i
                                        aria-hidden="true"
                                        class="jki jki-money-3-light"
                                      ></i>
                                    </div>
                                  </div>
                                  <div class="icon-box icon-box-body">
                                    <h2 class="title">Have pension income?</h2>
                                    <p class="icon-box-description">
                                      Add pension details in the Income Sources
                                      Page. Also add any other interest earned,
                                      if applicable
                                    </p>
                                  </div>
                                </div>
                              </div>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-97d2989"
                        data-id="97d2989"
                        data-element_type="column"
                      >
                        <div class="elementor-widget-wrap elementor-element-populated">
                          <div
                            class="elementor-element elementor-element-2354a0a jkit-equal-height-disable elementor-invisible elementor-widget elementor-widget-jkit_icon_box"
                            data-id="2354a0a"
                            data-element_type="widget"
                            data-settings='{"_animation":"fadeInUp","_animation_delay":"200"}'
                            data-widget_type="jkit_icon_box.default"
                          >
                            <div class="elementor-widget-container">
                              <div class="jeg-elementor-kit jkit-icon-box icon-position- elementor-animation- jeg_module_6_10_64e45de7530e0">
                                <div class="jkit-icon-box-wrapper hover-from-bottom hp-wwpb">
                                  <div class="icon-box icon-box-header elementor-animation-">
                                    <div class="icon style-color">
                                      <i
                                        aria-hidden="true"
                                        class="jki jki-paper-plane-light"
                                      ></i>
                                    </div>
                                  </div>
                                  <div class="icon-box icon-box-body">
                                    <h2 class="title">Switched jobs?</h2>
                                    <p class="icon-box-description">
                                      Switched jobs in a financial year? You can
                                      upload multiple Form-16s and file returns
                                    </p>
                                  </div>
                                </div>
                              </div>{" "}
                            </div>
                          </div>
                          <div
                            class="elementor-element elementor-element-2354a0a jkit-equal-height-disable elementor-invisible elementor-widget elementor-widget-jkit_icon_box"
                            data-id="2354a0a"
                            data-element_type="widget"
                            data-settings='{"_animation":"fadeInUp","_animation_delay":"200"}'
                            data-widget_type="jkit_icon_box.default"
                          >
                            <div class="elementor-widget-container">
                              <div class="jeg-elementor-kit jkit-icon-box icon-position- elementor-animation- jeg_module_6_10_64e45de7530e0">
                                <div class="jkit-icon-box-wrapper hover-from-bottom hp-wwpb">
                                  <div class="icon-box icon-box-header elementor-animation-">
                                    <div class="icon style-color">
                                      <i
                                        aria-hidden="true"
                                        class="jki jki-paper-plane-light"
                                      ></i>
                                    </div>
                                  </div>
                                  <div class="icon-box icon-box-body">
                                    <h2 class="title">Invested in Stocks & Mutual Funds</h2>
                                    <p class="icon-box-description">
                                      Simply Upload your P&L Report and we will
                                      auto-fill all your data and help you with
                                      filing returns
                                    </p>
                                  </div>
                                </div>
                              </div>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-6cb3794"
                        data-id="6cb3794"
                        data-element_type="column"
                      >
                        <div class="elementor-widget-wrap elementor-element-populated">
                          <div
                            class="elementor-element elementor-element-455daef jkit-equal-height-disable elementor-invisible elementor-widget elementor-widget-jkit_icon_box"
                            data-id="455daef"
                            data-element_type="widget"
                            data-settings='{"_animation":"fadeInUp","_animation_delay":"300"}'
                            data-widget_type="jkit_icon_box.default"
                          >
                            <div class="elementor-widget-container">
                              <div class="jeg-elementor-kit jkit-icon-box icon-position- elementor-animation- jeg_module_6_12_64e45de75801c">
                                <div class="jkit-icon-box-wrapper hover-from-bottom hp-wwpb">
                                  <div class="icon-box icon-box-header elementor-animation-">
                                    <div class="icon style-color">
                                      <i
                                        aria-hidden="true"
                                        class="jki jki-chart2-light"
                                      ></i>
                                    </div>
                                  </div>
                                  <div class="icon-box icon-box-body">
                                    <h2 class="title">Have business income?</h2>
                                    <p class="icon-box-description">
                                      You can file returns by adding your
                                      trading, speculative and presumptive
                                      income
                                    </p>
                                  </div>
                                </div>
                              </div>{" "}
                            </div>
                          </div>
                          <div
                            class="elementor-element elementor-element-4be19db jkit-equal-height-disable elementor-invisible elementor-widget elementor-widget-jkit_icon_box"
                            data-id="4be19db"
                            data-element_type="widget"
                            data-settings='{"_animation":"fadeInUp","_animation_delay":"300"}'
                            data-widget_type="jkit_icon_box.default"
                          >
                            <div class="elementor-widget-container">
                              <div class="jeg-elementor-kit jkit-icon-box icon-position- elementor-animation- jeg_module_6_13_64e45de75b16a">
                                <div class="jkit-icon-box-wrapper hover-from-bottom hp-wwpb">
                                  <div class="icon-box icon-box-header elementor-animation-">
                                    <div class="icon style-color">
                                      <i
                                        aria-hidden="true"
                                        class="jki jki-Document-Search-light"
                                      ></i>
                                    </div>
                                  </div>
                                  <div class="icon-box icon-box-body">
                                    <h2 class="title">Don't have Form 16?</h2>
                                    <p class="icon-box-description">
                                      We will pre-fill your data from IT
                                      Department and help you with filing
                                      returns
                                    </p>
                                  </div>
                                </div>
                              </div>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>
          <section
            class="elementor-section elementor-top-section elementor-element elementor-element-586435a elementor-section-full_width elementor-section-height-default elementor-section-height-default"
            data-id="586435a"
            data-element_type="section"
            data-settings='{"background_background":"classic"}'
          >
            <div class="elementor-background-overlay"></div>
            <div class="elementor-container elementor-column-gap-no">
              <div
                class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-71acc6c"
                data-id="71acc6c"
                data-element_type="column"
              >
                <div class="elementor-widget-wrap elementor-element-populated">
                  <section
                    class="elementor-section elementor-inner-section elementor-element elementor-element-c8f9774 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                    data-id="c8f9774"
                    data-element_type="section"
                  >
                    <div class="elementor-container elementor-column-gap-no">
                      <div
                        class="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-7121fff"
                        data-id="7121fff"
                        data-element_type="column"
                      >
                        <div class="elementor-widget-wrap elementor-element-populated">
                          <div
                            class="elementor-element elementor-element-87bd289 elementor-invisible elementor-widget elementor-widget-jkit_fun_fact"
                            data-id="87bd289"
                            data-element_type="widget"
                            data-settings='{"_animation":"fadeInUp","_animation_delay":"100"}'
                            data-widget_type="jkit_fun_fact.default"
                          >
                            <div class="elementor-widget-container">
                              <div class="jeg-elementor-kit jkit-fun-fact align-center hover-from-left elementor-animation- jeg_module_6_14_64e45de760881">
                                <div class="fun-fact-inner">
                                  <div class="icon elementor-animation-">
                                    <i
                                      aria-hidden="true"
                                      class="jki jki-users2-light"
                                    ></i>
                                  </div>
                                  <div class="content">
                                    <div class="number-wrapper cus-counter">
                                      <span class="prefix"></span>
                                      {/* <span
                                        class="number"
                                        data-value="1452"
                                        data-animation-duration="3500"
                                      >
                                        1,000
                                      </span> */}
                                           <NumberAnimation initialValue={0} finalValue={1000} />




                                      <span class="suffix"></span>
                                      <sup class="super">+</sup>
                                    </div>
                                    <h2 class="title">Happy Clients</h2>
                                  </div>
                                </div>
                              </div>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-283a292"
                        data-id="283a292"
                        data-element_type="column"
                      >
                        <div class="elementor-widget-wrap elementor-element-populated">
                          <div
                            class="elementor-element elementor-element-1d1ad45 elementor-invisible elementor-widget elementor-widget-jkit_fun_fact"
                            data-id="1d1ad45"
                            data-element_type="widget"
                            data-settings='{"_animation":"fadeInUp","_animation_delay":"200"}'
                            data-widget_type="jkit_fun_fact.default"
                          >
                            <div class="elementor-widget-container">
                              <div class="jeg-elementor-kit jkit-fun-fact align-center hover-from-left elementor-animation- jeg_module_6_15_64e45de762a5f">
                                <div class="fun-fact-inner">
                                  <div class="icon elementor-animation-">
                                    <i
                                      aria-hidden="true"
                                      class="jki jki-Profile-light"
                                    ></i>
                                  </div>
                                  <div class="content">
                                    <div class="number-wrapper cus-counter">
                                      <span class="prefix"></span>
                                      {/* <span
                                        class="number"
                                        data-value="1200"
                                        data-animation-duration="3500"
                                      >
                                        1,00,000
                                      </span> */}
                                      
                                      <NumberAnimation initialValue={0} finalValue={100000} />


                                      <span class="suffix"></span>
                                      <sup class="super">+</sup>
                                    </div>
                                    <h2 class="title">ITR Filed</h2>
                                  </div>
                                </div>
                              </div>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-e60f477"
                        data-id="e60f477"
                        data-element_type="column"
                      >
                        <div class="elementor-widget-wrap elementor-element-populated">
                          <div
                            class="elementor-element elementor-element-46e370c elementor-invisible elementor-widget elementor-widget-jkit_fun_fact"
                            data-id="46e370c"
                            data-element_type="widget"
                            data-settings='{"_animation":"fadeInUp","_animation_delay":"300"}'
                            data-widget_type="jkit_fun_fact.default"
                          >
                            <div class="elementor-widget-container">
                              <div class="jeg-elementor-kit jkit-fun-fact align-center hover-from-left elementor-animation- jeg_module_6_16_64e45de764286">
                                <div class="fun-fact-inner">
                                  <div class="icon elementor-animation-">
                                    <i
                                      aria-hidden="true"
                                      class="jki jki-badge"
                                    ></i>
                                  </div>
                                  <div class="content">
                                    <div class="number-wrapper cus-counter">
                                      <span class="prefix"></span>
                                      {/* <span
                                        class="number"
                                        data-value="10"
                                        data-animation-duration="3500"
                                      >
                                        1,00,00,000
                                      </span> */}

                                      <NumberAnimation initialValue={0} finalValue={10000000} />

                                     


                                      <span class="suffix"></span>
                                      <sup class="super">+</sup>
                                    </div>
                                    <h2 class="title">Tax Saved</h2>
                                  </div>
                                </div>
                              </div>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div class="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-fbda3e6" data-id="fbda3e6" data-element_type="column">
			<div class="elementor-widget-wrap elementor-element-populated">
								<div class="elementor-element elementor-element-2bfe706 elementor-invisible elementor-widget elementor-widget-jkit_fun_fact" data-id="2bfe706" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:&quot;400&quot;}" data-widget_type="jkit_fun_fact.default">
				<div class="elementor-widget-container">
			<div  class="jeg-elementor-kit jkit-fun-fact align-center hover-from-left elementor-animation- jeg_module_6_17_64e45de7659e1" ><div class="fun-fact-inner"><div class="icon elementor-animation-"><i aria-hidden="true" class="jki jki-team-2-line"></i></div>
            <div class="content">
                <div class="number-wrapper"><span class="prefix"></span>
        <span class="number" data-value="50" data-animation-duration="3500">0</span>
        <span class="suffix"></span><sup class="super">+</sup></div>
                <h2 class="title">Team Members</h2>
            </div>
        </div></div>		</div>
				</div>
					</div>
		</div> */}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>

          {/* meet with expert section */}
          {/* <section class="elementor-section elementor-top-section elementor-element elementor-element-668b16f elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="668b16f" data-element_type="section">
						<div class="elementor-container elementor-column-gap-default">
					<div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-ad572bb" data-id="ad572bb" data-element_type="column">
			<div class="elementor-widget-wrap elementor-element-populated">
								<div class="elementor-element elementor-element-1cda8fa elementor-invisible elementor-widget elementor-widget-jkit_heading" data-id="1cda8fa" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;}" data-widget_type="jkit_heading.default">
				<div class="elementor-widget-container">
			<div  class="jeg-elementor-kit jkit-heading  align-center align-tablet- align-mobile- jeg_module_6_18_64e45de768cbc" ><h3 class="heading-section-subtitle  style-color">OUR TEAM</h3><div class="heading-section-title  display-inline-block"><h2 class="heading-title">Meet With Experth</h2></div><div class="heading-section-separator"><div class="separator-wrapper style-solid"></div></div><div class="heading-section-description"><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p></div></div>		</div>
				</div>
				<section class="elementor-section elementor-inner-section elementor-element elementor-element-689701b elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="689701b" data-element_type="section">
						<div class="elementor-container elementor-column-gap-no">
					<div class="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-47c6366 elementor-invisible" data-id="47c6366" data-element_type="column" data-settings="{&quot;animation&quot;:&quot;fadeInUp&quot;,&quot;animation_delay&quot;:&quot;100&quot;}">
			<div class="elementor-widget-wrap elementor-element-populated">
								<div class="elementor-element elementor-element-67e6829 elementor-widget elementor-widget-jkit_team" data-id="67e6829" data-element_type="widget" data-widget_type="jkit_team.default">
				<div class="elementor-widget-container">
			<div  class="jeg-elementor-kit jkit-team style-overlay overlay-bottom jeg_module_6_19_64e45de76eb0f" ><div class="profile-card "><img decoding="async" src="wp-content/uploads/sites/111/2021/06/businessman-sitting-at-his-workplace-at-office-1-812x1024.jpg" />
                <div class="hover-area alignment-center"><div class="profile-body">
                <h2 class="profile-title"></h2>
                <p class="profile-designation"></p>
                
                <ul class="social-list"><li class="social-icon elementor-repeater-item-5ad6f6c"><a href="https://facebook.com/"  ><i aria-hidden="true" class="fab fa-facebook-f"></i></a></li><li class="social-icon elementor-repeater-item-a5f9af9"><a href="https://twitter.com/"  ><i aria-hidden="true" class="fab fa-twitter"></i></a></li><li class="social-icon elementor-repeater-item-182327c"><a href="https://instagram.com/"  ><i aria-hidden="true" class="jki jki-instagram-1-light"></i></a></li></ul>
            </div></div>
            </div></div>		</div>
				</div>
				<div class="elementor-element elementor-element-83dcc72 elementor-widget elementor-widget-jkit_heading" data-id="83dcc72" data-element_type="widget" data-widget_type="jkit_heading.default">
				<div class="elementor-widget-container">
			<div  class="jeg-elementor-kit jkit-heading  align-center align-tablet- align-mobile- jeg_module_6_20_64e45de773aaf" ><div class="heading-section-title  display-inline-block"><h2 class="heading-title">David Morgan</h2></div><h3 class="heading-section-subtitle  style-color">Tax Advisor</h3></div>		</div>
				</div>
					</div>
		</div>
				<div class="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-d1d22be elementor-invisible" data-id="d1d22be" data-element_type="column" data-settings="{&quot;animation&quot;:&quot;fadeInUp&quot;,&quot;animation_delay&quot;:&quot;200&quot;}">
			<div class="elementor-widget-wrap elementor-element-populated">
								<div class="elementor-element elementor-element-463bcde elementor-widget elementor-widget-jkit_team" data-id="463bcde" data-element_type="widget" data-widget_type="jkit_team.default">
				<div class="elementor-widget-container">
			<div  class="jeg-elementor-kit jkit-team style-overlay overlay-bottom jeg_module_6_21_64e45de7771e1" ><div class="profile-card "><img decoding="async" src="wp-content/uploads/sites/111/2021/06/smiling-businessman-in-eyeglasses-sitting-on-table-in-office-3-812x1024.jpg" />
                <div class="hover-area alignment-center"><div class="profile-body">
                <h2 class="profile-title"></h2>
                <p class="profile-designation"></p>
                
                <ul class="social-list"><li class="social-icon elementor-repeater-item-5ad6f6c"><a href="https://facebook.com/"  ><i aria-hidden="true" class="fab fa-facebook-f"></i></a></li><li class="social-icon elementor-repeater-item-a5f9af9"><a href="https://twitter.com/"  ><i aria-hidden="true" class="fab fa-twitter"></i></a></li><li class="social-icon elementor-repeater-item-182327c"><a href="https://instagram.com/"  ><i aria-hidden="true" class="jki jki-instagram-1-light"></i></a></li></ul>
            </div></div>
            </div></div>		</div>
				</div>
				<div class="elementor-element elementor-element-7c6afe7 elementor-widget elementor-widget-jkit_heading" data-id="7c6afe7" data-element_type="widget" data-widget_type="jkit_heading.default">
				<div class="elementor-widget-container">
			<div  class="jeg-elementor-kit jkit-heading  align-center align-tablet- align-mobile- jeg_module_6_22_64e45de77c23e" ><div class="heading-section-title  display-inline-block"><h2 class="heading-title">Eric West</h2></div><h3 class="heading-section-subtitle  style-color">Senior Tax Advisor</h3></div>		</div>
				</div>
					</div>
		</div>
				<div class="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-3e825d5 elementor-invisible" data-id="3e825d5" data-element_type="column" data-settings="{&quot;animation&quot;:&quot;fadeInUp&quot;,&quot;animation_delay&quot;:&quot;300&quot;}">
			<div class="elementor-widget-wrap elementor-element-populated">
								<div class="elementor-element elementor-element-6ed2d02 elementor-widget elementor-widget-jkit_team" data-id="6ed2d02" data-element_type="widget" data-widget_type="jkit_team.default">
				<div class="elementor-widget-container">
			<div  class="jeg-elementor-kit jkit-team style-overlay overlay-bottom jeg_module_6_23_64e45de77f97a" ><div class="profile-card "><img decoding="async" src="wp-content/uploads/sites/111/2021/06/smiling-businesswoman-looking-at-camera-in-office-1-812x1024.jpg" />
                <div class="hover-area alignment-center"><div class="profile-body">
                <h2 class="profile-title"></h2>
                <p class="profile-designation"></p>
                
                <ul class="social-list"><li class="social-icon elementor-repeater-item-5ad6f6c"><a href="https://facebook.com/"  ><i aria-hidden="true" class="fab fa-facebook-f"></i></a></li><li class="social-icon elementor-repeater-item-a5f9af9"><a href="https://twitter.com/"  ><i aria-hidden="true" class="fab fa-twitter"></i></a></li><li class="social-icon elementor-repeater-item-182327c"><a href="https://instagram.com/"  ><i aria-hidden="true" class="jki jki-instagram-1-light"></i></a></li></ul>
            </div></div>
            </div></div>		</div>
				</div>
				<div class="elementor-element elementor-element-33f2e16 elementor-widget elementor-widget-jkit_heading" data-id="33f2e16" data-element_type="widget" data-widget_type="jkit_heading.default">
				<div class="elementor-widget-container">
			<div  class="jeg-elementor-kit jkit-heading  align-center align-tablet- align-mobile- jeg_module_6_24_64e45de784ad0" ><div class="heading-section-title  display-inline-block"><h2 class="heading-title">Elissa Parker</h2></div><h3 class="heading-section-subtitle  style-color">Financial Consultant</h3></div>		</div>
				</div>
					</div>
		</div>
							</div>
		</section>
				<section class="elementor-section elementor-inner-section elementor-element elementor-element-92d33e5 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="92d33e5" data-element_type="section">
						<div class="elementor-container elementor-column-gap-no">
								</div>
		</section>
					</div>
		</div>
							</div>
		</section> */}
          <section
            class="elementor-section elementor-top-section elementor-element elementor-element-fd6d5a1 elementor-reverse-tablet elementor-reverse-mobile elementor-section-boxed elementor-section-height-default elementor-section-height-default"
            data-id="fd6d5a1"
            data-element_type="section"
            data-settings='{"background_background":"gradient"}'
          >
            <div class="elementor-background-overlay"></div>
            <div class="elementor-container elementor-column-gap-no">
              <div
                class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-0a77d07 elementor-invisible"
                data-id="0a77d07"
                data-element_type="column"
                data-settings='{"animation":"fadeInLeft"}'
              >
                <div class="elementor-widget-wrap elementor-element-populated">
                  <div
                    class="elementor-element elementor-element-07ea09e elementor-widget elementor-widget-jkit_testimonials"
                    data-id="07ea09e"
                    data-element_type="widget"
                    data-widget_type="jkit_testimonials.default"
                  >
                    <div class="elementor-widget-container">
                      <div
                        class="jeg-elementor-kit jkit-testimonials arrow-bottom-middle style-2  jeg_module_6_25_64e45de78b978"
                        data-id="jeg_module_6_25_64e45de78b978"
                        data-settings='{"autoplay":true,"autoplay_speed":3500,"autoplay_hover_pause":false,"show_navigation":false,"navigation_left":"&lt;i aria-hidden=\"true\" class=\"fas fa-angle-left\"&gt;&lt;\/i&gt;","navigation_right":"&lt;i aria-hidden=\"true\" class=\"fas fa-angle-right\"&gt;&lt;\/i&gt;","show_dots":false,"arrow_position":"bottom","responsive":{"desktop":{"items":"1","margin":"15","breakpoint":1025},"tablet":{"items":"1","margin":10,"breakpoint":768},"mobile":{"items":1,"margin":10,"breakpoint":0}}}'
                      >
                        <div class="testimonials-list">
                          <div class="testimonials-track">
                            <div class="testimonial-item  elementor-repeater-item-2155b51">
                              <div class="testimonial-box hover-from-left">
                                <div class="comment-header">
                                  <ul class="rating-stars">
                                    <li>
                                      <i
                                        aria-hidden="true"
                                        class="fas fa-star"
                                      ></i>
                                    </li>
                                    <li>
                                      <i
                                        aria-hidden="true"
                                        class="fas fa-star"
                                      ></i>
                                    </li>
                                    <li>
                                      <i
                                        aria-hidden="true"
                                        class="fas fa-star"
                                      ></i>
                                    </li>
                                    <li>
                                      <i
                                        aria-hidden="true"
                                        class="fas fa-star"
                                      ></i>
                                    </li>
                                    <li>
                                      <i
                                        aria-hidden="true"
                                        class="fas fa-star-half"
                                      ></i>
                                    </li>
                                  </ul>
                                </div>
                                <div class="comment-bio">
                                  <div class="bio-details">
                                    <div class="profile-image">
                                      <img
                                        decoding="async"
                                        src="wp-content/uploads/sites/111/2021/06/happy-bearded-man-smiling-while-standing-with-crossed-arms-small-2.jpg"
                                        alt="John Doe"
                                      />
                                    </div>
                                    <span class="profile-info">
                                      <strong class="profile-name">
                                        John Doe
                                      </strong>
                                      <p class="profile-des">
                                        Marketing Manager
                                      </p>
                                    </span>
                                  </div>
                                  <div class="icon-content cus-quote">
                                    <i
                                      aria-hidden="true"
                                      class="fas fa-quote-left"
                                    ></i>
                                  </div>
                                </div>
                                <div class="comment-content">
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="testimonial-item  elementor-repeater-item-caec452">
                              <div class="testimonial-box hover-from-left">
                                <div class="comment-header">
                                  <ul class="rating-stars">
                                    <li>
                                      <i
                                        aria-hidden="true"
                                        class="fas fa-star"
                                      ></i>
                                    </li>
                                    <li>
                                      <i
                                        aria-hidden="true"
                                        class="fas fa-star"
                                      ></i>
                                    </li>
                                    <li>
                                      <i
                                        aria-hidden="true"
                                        class="fas fa-star"
                                      ></i>
                                    </li>
                                    <li>
                                      <i
                                        aria-hidden="true"
                                        class="fas fa-star"
                                      ></i>
                                    </li>
                                    <li>
                                      <i
                                        aria-hidden="true"
                                        class="fas fa-star"
                                      ></i>
                                    </li>
                                  </ul>
                                </div>
                                <div class="comment-bio">
                                  <div class="bio-details">
                                    <div class="profile-image">
                                      <img
                                        decoding="async"
                                        src="wp-content/uploads/sites/111/2021/06/beautiful-woman-smiling-in-a-urban-park-2.jpg"
                                        alt="Catrine Rafaela"
                                      />
                                    </div>
                                    <span class="profile-info">
                                      <strong class="profile-name">
                                        Catrine Rafaela
                                      </strong>
                                      <p class="profile-des">Director</p>
                                    </span>
                                  </div>
                                  <div class="icon-content">
                                    <i
                                      aria-hidden="true"
                                      class="fas fa-quote-left"
                                    ></i>
                                  </div>
                                </div>
                                <div class="comment-content">
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="testimonial-item  elementor-repeater-item-a582597">
                              <div class="testimonial-box hover-from-left">
                                <div class="comment-header">
                                  <ul class="rating-stars">
                                    <li>
                                      <i
                                        aria-hidden="true"
                                        class="fas fa-star"
                                      ></i>
                                    </li>
                                    <li>
                                      <i
                                        aria-hidden="true"
                                        class="fas fa-star"
                                      ></i>
                                    </li>
                                    <li>
                                      <i
                                        aria-hidden="true"
                                        class="fas fa-star"
                                      ></i>
                                    </li>
                                    <li>
                                      <i
                                        aria-hidden="true"
                                        class="fas fa-star"
                                      ></i>
                                    </li>
                                    <li>
                                      <i
                                        aria-hidden="true"
                                        class="fas fa-star"
                                      ></i>
                                    </li>
                                  </ul>
                                </div>
                                <div class="comment-bio">
                                  <div class="bio-details">
                                    <div class="profile-image">
                                      <img
                                        decoding="async"
                                        src="wp-content/uploads/sites/111/2021/06/Philip-West.jpg"
                                        alt="Philip West"
                                      />
                                    </div>
                                    <span class="profile-info">
                                      <strong class="profile-name">
                                        Philip West
                                      </strong>
                                      <p class="profile-des">SEO Analyst</p>
                                    </span>
                                  </div>
                                  <div class="icon-content">
                                    <i
                                      aria-hidden="true"
                                      class="fas fa-quote-left"
                                    ></i>
                                  </div>
                                </div>
                                <div class="comment-content">
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-21472a5 elementor-invisible"
                data-id="21472a5"
                data-element_type="column"
                data-settings='{"animation":"fadeInRight"}'
              >
                <div class="elementor-widget-wrap elementor-element-populated">
                  <div
                    class="elementor-element elementor-element-a6e1a10 elementor-widget elementor-widget-jkit_heading"
                    data-id="a6e1a10"
                    data-element_type="widget"
                    data-widget_type="jkit_heading.default"
                  >
                    <div class="elementor-widget-container">
                      <div class="jeg-elementor-kit jkit-heading  align-right align-tablet- align-mobile- jeg_module_6_26_64e45de790970 mob-cen">
                        <h3 class="heading-section-subtitle  style-color">
                          TESTIMONIALS
                        </h3>
                        <div class="heading-section-title  display-inline-block">
                          <h2 class="heading-title">What Our Clients Says</h2>
                        </div>
                        <div class="heading-section-separator">
                          <div class="separator-wrapper style-solid"></div>
                        </div>
                        <div class="heading-section-description">
                          <p>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing
                            elit. Aenean commodo ligula eget dolor aenean massa.
                          </p>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <section class="elementor-section elementor-top-section elementor-element elementor-element-3d392fc elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="3d392fc" data-element_type="section">
						<div class="elementor-container elementor-column-gap-default">
					<div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-0de7d61" data-id="0de7d61" data-element_type="column">
			<div class="elementor-widget-wrap elementor-element-populated">
								<div class="elementor-element elementor-element-469deb0 elementor-invisible elementor-widget elementor-widget-jkit_heading" data-id="469deb0" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;}" data-widget_type="jkit_heading.default">
				<div class="elementor-widget-container">
			<div  class="jeg-elementor-kit jkit-heading  align-center align-tablet- align-mobile- jeg_module_6_27_64e45de7948fa" ><div class="heading-section-title  display-inline-block"><h2 class="heading-title">Our Partner</h2></div><div class="heading-section-separator"><div class="separator-wrapper style-solid"></div></div></div>		</div>
				</div>
				<div class="elementor-element elementor-element-b3f6d65 elementor-invisible elementor-widget elementor-widget-image-carousel" data-id="b3f6d65" data-element_type="widget" data-settings="{&quot;slides_to_show&quot;:&quot;5&quot;,&quot;navigation&quot;:&quot;none&quot;,&quot;autoplay_speed&quot;:&quot;1000&quot;,&quot;speed&quot;:&quot;100&quot;,&quot;_animation&quot;:&quot;fadeIn&quot;,&quot;slides_to_show_tablet&quot;:&quot;3&quot;,&quot;autoplay&quot;:&quot;yes&quot;,&quot;pause_on_hover&quot;:&quot;yes&quot;,&quot;pause_on_interaction&quot;:&quot;yes&quot;,&quot;infinite&quot;:&quot;yes&quot;}" data-widget_type="image-carousel.default">
				<div class="elementor-widget-container">
					<div class="elementor-image-carousel-wrapper swiper-container" dir="ltr">
			<div class="elementor-image-carousel swiper-wrapper">
								<div class="swiper-slide"><figure class="swiper-slide-inner"><img decoding="async" class="swiper-slide-image" src="wp-content/uploads/sites/111/2021/06/logo-global-group-company.png" alt="logo-global-group-company" /></figure></div><div class="swiper-slide"><figure class="swiper-slide-inner"><img decoding="async" class="swiper-slide-image" src="wp-content/uploads/sites/111/2021/06/logo-square-mediafirst.png" alt="logo-square-mediafirst" /></figure></div><div class="swiper-slide"><figure class="swiper-slide-inner"><img decoding="async" class="swiper-slide-image" src="wp-content/uploads/sites/111/2021/06/logo-black-box.png" alt="logo-black-box" /></figure></div><div class="swiper-slide"><figure class="swiper-slide-inner"><img decoding="async" class="swiper-slide-image" src="wp-content/uploads/sites/111/2021/06/logo-morex.png" alt="logo-morex" /></figure></div><div class="swiper-slide"><figure class="swiper-slide-inner"><img decoding="async" class="swiper-slide-image" src="wp-content/uploads/sites/111/2021/06/logo-monaco.png" alt="logo-monaco" /></figure></div><div class="swiper-slide"><figure class="swiper-slide-inner"><img decoding="async" class="swiper-slide-image" src="wp-content/uploads/sites/111/2021/06/logo-construct.png" alt="logo-construct" /></figure></div><div class="swiper-slide"><figure class="swiper-slide-inner"><img decoding="async" class="swiper-slide-image" src="wp-content/uploads/sites/111/2021/06/logo-growny-designer.png" alt="logo-growny-designer" /></figure></div>			</div>
																</div>
				</div>
				</div>
					</div>
		</div>
							</div>
		</section> */}
          <section
            class="elementor-section elementor-inner-section elementor-element elementor-element-29a0636b elementor-section-boxed elementor-section-height-default elementor-section-height-default"
            data-id="29a0636b"
            data-element_type="section"
          >
            <div class="elementor-container elementor-column-gap-no"></div>
          </section>

          {/* latest project section */}
          {/* <section class="elementor-section elementor-top-section elementor-element elementor-element-b62d432 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="b62d432" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
							<div class="elementor-background-overlay"></div>
							<div class="elementor-container elementor-column-gap-no">
					<div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-46a3e78 elementor-invisible" data-id="46a3e78" data-element_type="column" data-settings="{&quot;animation&quot;:&quot;fadeInLeft&quot;}">
			<div class="elementor-widget-wrap elementor-element-populated">
								<div class="elementor-element elementor-element-4d5a0c3 elementor-invisible elementor-widget elementor-widget-jkit_heading" data-id="4d5a0c3" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;}" data-widget_type="jkit_heading.default">
				<div class="elementor-widget-container">
			<div  class="jeg-elementor-kit jkit-heading  align-center align-tablet- align-mobile- jeg_module_6_28_64e45de79bbe6" ><h3 class="heading-section-subtitle  style-color">CASE STUDIES</h3><div class="heading-section-title  display-inline-block"><h2 class="heading-title">Let’s See Our Latest Project</h2></div><div class="heading-section-separator"><div class="separator-wrapper style-solid"></div></div><div class="heading-section-description"><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p></div></div>		</div>
				</div>
				<section class="elementor-section elementor-inner-section elementor-element elementor-element-f5d6a2e elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="f5d6a2e" data-element_type="section">
						<div class="elementor-container elementor-column-gap-no">
					<div class="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-e861afd elementor-invisible" data-id="e861afd" data-element_type="column" data-settings="{&quot;animation&quot;:&quot;fadeInLeft&quot;,&quot;animation_delay&quot;:&quot;100&quot;}">
			<div class="elementor-widget-wrap elementor-element-populated">
								<div class="elementor-element elementor-element-b2f676f jkit-equal-height-enable elementor-widget elementor-widget-jkit_image_box" data-id="b2f676f" data-element_type="widget" data-widget_type="jkit_image_box.default">
				<div class="elementor-widget-container">
			<div  class="jeg-elementor-kit jkit-image-box style-default elementor-animation- jeg_module_6_29_64e45de7a1c52" ><div class="image-box-header elementor-animation-"><img decoding="async" src="wp-content/uploads/sites/111/2021/07/business-meeting-783x1024.jpg" /></div><div class="image-box-body">
            <div class="body-inner"><h2 class="body-title icon-position-before">Permissive Tax Planning</h2>
                <div class="body-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                <div class="body-button"><div class="button-box icon-position-after"><div class="button-wrapper"><a href="#"  target="_blank"  >READ MORE<i aria-hidden="true" class="jki jki-right-arrow1-light"></i></a></div></div></div>
                
            </div>
        </div></div>		</div>
				</div>
					</div>
		</div>
				<div class="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-caab77a elementor-invisible" data-id="caab77a" data-element_type="column" data-settings="{&quot;animation&quot;:&quot;fadeInUp&quot;,&quot;animation_delay&quot;:&quot;200&quot;}">
			<div class="elementor-widget-wrap elementor-element-populated">
								<div class="elementor-element elementor-element-602dba2 jkit-equal-height-enable elementor-widget elementor-widget-jkit_image_box" data-id="602dba2" data-element_type="widget" data-widget_type="jkit_image_box.default">
				<div class="elementor-widget-container">
			<div  class="jeg-elementor-kit jkit-image-box style-default elementor-animation- jeg_module_6_30_64e45de7a8948" ><div class="image-box-header elementor-animation-"><img decoding="async" src="wp-content/uploads/sites/111/2021/07/business-meeting-in-modern-conference-room-682x1024.jpg" /></div><div class="image-box-body">
            <div class="body-inner"><h2 class="body-title icon-position-before">Purposive Tax Planning</h2>
                <div class="body-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                <div class="body-button"><div class="button-box icon-position-after"><div class="button-wrapper"><a href="#"  target="_blank"  >READ MORE<i aria-hidden="true" class="jki jki-right-arrow1-light"></i></a></div></div></div>
                
            </div>
        </div></div>		</div>
				</div>
					</div>
		</div>
				<div class="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-06b70c4 elementor-invisible" data-id="06b70c4" data-element_type="column" data-settings="{&quot;animation&quot;:&quot;fadeInRight&quot;,&quot;animation_delay&quot;:&quot;100&quot;}">
			<div class="elementor-widget-wrap elementor-element-populated">
								<div class="elementor-element elementor-element-1abc0d4 jkit-equal-height-enable elementor-widget elementor-widget-jkit_image_box" data-id="1abc0d4" data-element_type="widget" data-widget_type="jkit_image_box.default">
				<div class="elementor-widget-container">
			<div  class="jeg-elementor-kit jkit-image-box style-default elementor-animation- jeg_module_6_31_64e45de7b0aa2" ><div class="image-box-header elementor-animation-"><img decoding="async" src="wp-content/uploads/sites/111/2021/07/business-meeting-1-684x1024.jpg" /></div><div class="image-box-body">
            <div class="body-inner"><h2 class="body-title icon-position-before">Short-range Tax Planning</h2>
                <div class="body-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                <div class="body-button"><div class="button-box icon-position-after"><div class="button-wrapper"><a href="#"  target="_blank"  >READ MORE<i aria-hidden="true" class="jki jki-right-arrow1-light"></i></a></div></div></div>
                
            </div>
        </div></div>		</div>
				</div>
					</div>
		</div>
							</div>
		</section>
					</div>
		</div>
							</div>
		</section> */}

          {/* drop down section */}
          {/* <section class="elementor-section elementor-top-section elementor-element elementor-element-32c40f4 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="32c40f4" data-element_type="section">
						<div class="elementor-container elementor-column-gap-no">
					<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-74610e6 elementor-invisible" data-id="74610e6" data-element_type="column" data-settings="{&quot;animation&quot;:&quot;fadeInLeft&quot;}">
			<div class="elementor-widget-wrap elementor-element-populated">
								<div class="elementor-element elementor-element-dcfe4d3 elementor-widget elementor-widget-jkit_heading" data-id="dcfe4d3" data-element_type="widget" data-widget_type="jkit_heading.default">
				<div class="elementor-widget-container">
			<div  class="jeg-elementor-kit jkit-heading  align-left align-tablet- align-mobile- jeg_module_6_32_64e45de7b8cc7" ><h3 class="heading-section-subtitle  style-color">COMPANY&#039;S VISION</h3><div class="heading-section-title  display-inline-block"><h2 class="heading-title">Leading The Best Tax Advisor Team.</h2></div><div class="heading-section-separator"><div class="separator-wrapper style-solid"></div></div><div class="heading-section-description"><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p></div></div>		</div>
				</div>
					</div>
		</div>
				<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-c4ec88e elementor-invisible" data-id="c4ec88e" data-element_type="column" data-settings="{&quot;background_background&quot;:&quot;classic&quot;,&quot;animation&quot;:&quot;fadeInUp&quot;}">
			<div class="elementor-widget-wrap elementor-element-populated">
					<div class="elementor-background-overlay"></div>
								<div class="elementor-element elementor-element-85879e5 elementor-widget elementor-widget-jkit_accordion" data-id="85879e5" data-element_type="widget" data-widget_type="jkit_accordion.default">
				<div class="elementor-widget-container">
			<div  class="jeg-elementor-kit jkit-accordion style-default jeg_module_6_33_64e45de7c31ac" ><div class="card-wrapper expand">
                <div class="card-header">
                    <a href="#expand-4c54035" class="card-header-button" aria-expanded="false" data-target="#expand-4c54035" aria-controls="expand-4c54035">
                        <span class="title">First-Class Tax Solution</span><div class="right-icon-group">
                <div class="normal-icon"><i aria-hidden="true" class="fas fa-chevron-down"></i></div>
                <div class="active-icon"><i aria-hidden="true" class="fas fa-chevron-up"></i></div>
            </div>
                    </a>
                </div>
                <div class="card-expand" id="expand-4c54035"><div class="card-body"><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p></div></div>
            </div><div class="card-wrapper ">
                <div class="card-header">
                    <a href="#expand-a10b044" class="card-header-button" aria-expanded="false" data-target="#expand-a10b044" aria-controls="expand-a10b044">
                        <span class="title">Tax Consultation for Business</span><div class="right-icon-group">
                <div class="normal-icon"><i aria-hidden="true" class="fas fa-chevron-down"></i></div>
                <div class="active-icon"><i aria-hidden="true" class="fas fa-chevron-up"></i></div>
            </div>
                    </a>
                </div>
               
            </div><div class="card-wrapper ">
                <div class="card-header">
                    <a href="#expand-3b675fa" class="card-header-button" aria-expanded="false" data-target="#expand-3b675fa" aria-controls="expand-3b675fa">
                        <span class="title">Best Tax &amp; Financial Planning</span><div class="right-icon-group">
                <div class="normal-icon"><i aria-hidden="true" class="fas fa-chevron-down"></i></div>
                <div class="active-icon"><i aria-hidden="true" class="fas fa-chevron-up"></i></div>
            </div>
                    </a>
                </div>
                
            </div></div>		</div>
				</div>
					</div>
		</div>
							</div>
		</section> */}

          <section
            class="elementor-section elementor-top-section elementor-element elementor-element-eb6f18a elementor-section-boxed elementor-section-height-default elementor-section-height-default"
            data-id="eb6f18a"
            data-element_type="section"
            data-settings='{"background_background":"classic"}'
          >
            <div class="elementor-background-overlay"></div>
            <div class="elementor-container elementor-column-gap-default">
              <div
                class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-881408f"
                data-id="881408f"
                data-element_type="column"
              >
                <div class="elementor-widget-wrap elementor-element-populated">
                  <div
                    class="elementor-element elementor-element-d29aa56 elementor-invisible elementor-widget elementor-widget-jkit_heading"
                    data-id="d29aa56"
                    data-element_type="widget"
                    data-settings='{"_animation":"fadeIn"}'
                    data-widget_type="jkit_heading.default"
                  >
                    <div class="elementor-widget-container">
                      <div class="jeg-elementor-kit jkit-heading  align-center align-tablet- align-mobile- jeg_module_6_34_64e45de7ce281">
                        <div class="heading-section-title  display-inline-block">
                          <h2 class="heading-title">
                            Still Confused About Our Features?{" "}
                            <span class="style-color">
                              <span>Get A Consultation</span>
                            </span>
                          </h2>
                        </div>
                        <div class="heading-section-description">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s.
                          </p>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                  <div
                    class="elementor-element elementor-element-d585718 elementor-align-center elementor-widget elementor-widget-button"
                    data-id="d585718"
                    data-element_type="widget"
                    data-widget_type="button.default"
                  >
                    <div class="elementor-widget-container">
                      <div class="elementor-button-wrapper">
                        {/* <NavLink to="/contact">
                        <a
                          href="#"
                          class="elementor-button-link elementor-button elementor-size-md"
                          role="button"
                        >
                          <span class="elementor-button-content-wrapper">
                            <span class="elementor-button-text">
                              Contact Us
                            </span>
                          </span>
                        </a>
                        </NavLink> */}
                        <NavLink to="/contact" className="mc">
                          <a class="learn-more">Contact Us</a>
                          </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            class="elementor-section elementor-top-section elementor-element elementor-element-3d392fc elementor-section-boxed elementor-section-height-default elementor-section-height-default"
            data-id="3d392fc"
            data-element_type="section"
          >
            <div class="elementor-container elementor-column-gap-default">
              <div
                class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-0de7d61"
                data-id="0de7d61"
                data-element_type="column"
              >
                <div class="elementor-widget-wrap elementor-element-populated">
                  <div
                    class="elementor-element elementor-element-469deb0 elementor-invisible elementor-widget elementor-widget-jkit_heading"
                    data-id="469deb0"
                    data-element_type="widget"
                    data-settings='{"_animation":"fadeInUp"}'
                    data-widget_type="jkit_heading.default"
                  >
                    <div class="elementor-widget-container">
                      <div class="jeg-elementor-kit jkit-heading  align-center align-tablet- align-mobile- jeg_module_6_27_64e45de7948fa">
                        <div class="heading-section-title  display-inline-block cust-partner-mar">
                          <h2 class="heading-title">Our Partner</h2>
                        </div>
                        <div class="heading-section-separator">
                          <div class="separator-wrapper style-solid"></div>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                  <div
                    class="elementor-element elementor-element-b3f6d65 elementor-invisible elementor-widget elementor-widget-image-carousel"
                    data-id="b3f6d65"
                    data-element_type="widget"
                    data-settings='{"slides_to_show":"5","navigation":"none","autoplay_speed":"1000","speed":"100","_animation":"fadeIn","slides_to_show_tablet":"3","autoplay":"yes","pause_on_hover":"yes","pause_on_interaction":"yes","infinite":"yes"}'
                    data-widget_type="image-carousel.default"
                  >
                    <div class="elementor-widget-container">
                      <div
                        class="elementor-image-carousel-wrapper swiper-container"
                        dir="ltr"
                      >
                        <div class="elementor-image-carousel swiper-wrapper">
                          <div class="swiper-slide">
                            <figure class="swiper-slide-inner">
                              <img
                                decoding="async"
                                class="swiper-slide-image"
                                src="wp-content/uploads/sites/111/2021/06/logo-global-group-company.png"
                                alt="logo-global-group-company"
                              />
                            </figure>
                          </div>
                          <div class="swiper-slide">
                            <figure class="swiper-slide-inner">
                              <img
                                decoding="async"
                                class="swiper-slide-image"
                                src="wp-content/uploads/sites/111/2021/06/logo-square-mediafirst.png"
                                alt="logo-square-mediafirst"
                              />
                            </figure>
                          </div>
                          <div class="swiper-slide">
                            <figure class="swiper-slide-inner">
                              <img
                                decoding="async"
                                class="swiper-slide-image"
                                src="wp-content/uploads/sites/111/2021/06/logo-black-box.png"
                                alt="logo-black-box"
                              />
                            </figure>
                          </div>
                          <div class="swiper-slide">
                            <figure class="swiper-slide-inner">
                              <img
                                decoding="async"
                                class="swiper-slide-image"
                                src="wp-content/uploads/sites/111/2021/06/logo-morex.png"
                                alt="logo-morex"
                              />
                            </figure>
                          </div>
                          <div class="swiper-slide">
                            <figure class="swiper-slide-inner">
                              <img
                                decoding="async"
                                class="swiper-slide-image"
                                src="wp-content/uploads/sites/111/2021/06/logo-monaco.png"
                                alt="logo-monaco"
                              />
                            </figure>
                          </div>
                          <div class="swiper-slide">
                            <figure class="swiper-slide-inner">
                              <img
                                decoding="async"
                                class="swiper-slide-image"
                                src="wp-content/uploads/sites/111/2021/06/logo-construct.png"
                                alt="logo-construct"
                              />
                            </figure>
                          </div>
                          <div class="swiper-slide">
                            <figure class="swiper-slide-inner">
                              <img
                                decoding="async"
                                class="swiper-slide-image"
                                src="wp-content/uploads/sites/111/2021/06/logo-growny-designer.png"
                                alt="logo-growny-designer"
                              />
                            </figure>
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* blog section */}
          {/* <section class="elementor-section elementor-top-section elementor-element elementor-element-27f5eda elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="27f5eda" data-element_type="section">
						<div class="elementor-container elementor-column-gap-no">
					<div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-37a5271" data-id="37a5271" data-element_type="column">
			<div class="elementor-widget-wrap elementor-element-populated">
								<section class="elementor-section elementor-inner-section elementor-element elementor-element-57ca7e0 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="57ca7e0" data-element_type="section">
						<div class="elementor-container elementor-column-gap-no">
					<div class="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-1642d03" data-id="1642d03" data-element_type="column" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
			<div class="elementor-widget-wrap elementor-element-populated">
								<div class="elementor-element elementor-element-05e1391 elementor-invisible elementor-widget elementor-widget-jkit_heading" data-id="05e1391" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;}" data-widget_type="jkit_heading.default">
				<div class="elementor-widget-container">
			<div  class="jeg-elementor-kit jkit-heading  align-center align-tablet- align-mobile- jeg_module_6_35_64e45de7d65f9" ><h3 class="heading-section-subtitle  style-color">OUR BLOG</h3><div class="heading-section-title  display-inline-block"><h2 class="heading-title">Latest Blog &amp; Articles</h2></div><div class="heading-section-separator"><div class="separator-wrapper style-solid"></div></div><div class="heading-section-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#039;s standard dummy text ever since the 1500s.</div></div>		</div>
				</div>
				<div class="elementor-element elementor-element-e6b5eca elementor-invisible elementor-widget elementor-widget-jkit_post_block" data-id="e6b5eca" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;}" data-widget_type="jkit_post_block.default">
				<div class="elementor-widget-container">
			<div  class="jeg-elementor-kit jkit-postblock postblock-type-2 jkit-pagination-disable post-element jeg_module_6_36_64e45de7f23b2"  data-id="jeg_module_6_36_64e45de7f23b2" data-settings="{&quot;post_type&quot;:&quot;post&quot;,&quot;number_post&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:3,&quot;sizes&quot;:[]},&quot;post_offset&quot;:0,&quot;unique_content&quot;:&quot;disable&quot;,&quot;include_post&quot;:&quot;&quot;,&quot;exclude_post&quot;:&quot;&quot;,&quot;include_category&quot;:&quot;&quot;,&quot;exclude_category&quot;:&quot;&quot;,&quot;include_author&quot;:&quot;&quot;,&quot;include_tag&quot;:&quot;&quot;,&quot;exclude_tag&quot;:&quot;&quot;,&quot;sort_by&quot;:&quot;latest&quot;,&quot;pagination_mode&quot;:&quot;disable&quot;,&quot;pagination_loadmore_text&quot;:&quot;Load More&quot;,&quot;pagination_loading_text&quot;:&quot;Loading...&quot;,&quot;pagination_number_post&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:3,&quot;sizes&quot;:[]},&quot;pagination_scroll_limit&quot;:0,&quot;pagination_icon&quot;:{&quot;value&quot;:&quot;&quot;,&quot;library&quot;:&quot;&quot;},&quot;pagination_icon_position&quot;:&quot;before&quot;,&quot;st_category_position&quot;:&quot;center&quot;,&quot;sg_content_postblock_type&quot;:&quot;type-2&quot;,&quot;sg_content_title_html_tag&quot;:&quot;h3&quot;,&quot;sg_content_category_enable&quot;:&quot;yes&quot;,&quot;sg_content_excerpt_enable&quot;:&quot;yes&quot;,&quot;sg_content_excerpt_length&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:20,&quot;sizes&quot;:[]},&quot;sg_content_excerpt_more&quot;:&quot;...&quot;,&quot;sg_content_readmore_enable&quot;:&quot;yes&quot;,&quot;sg_content_readmore_icon&quot;:{&quot;value&quot;:&quot;jki jki-long-arrow-alt-right-solid&quot;,&quot;library&quot;:&quot;jkiticon&quot;},&quot;sg_content_readmore_icon_position&quot;:&quot;after&quot;,&quot;sg_content_readmore_text&quot;:&quot;READ MORE&quot;,&quot;sg_content_comment_heading&quot;:&quot;&quot;,&quot;sg_content_comment_enable&quot;:&quot;&quot;,&quot;sg_content_comment_icon&quot;:{&quot;value&quot;:&quot;fas fa-comment&quot;,&quot;library&quot;:&quot;fa-solid&quot;},&quot;sg_content_comment_icon_position&quot;:&quot;before&quot;,&quot;sg_content_meta_enable&quot;:&quot;&quot;,&quot;sg_content_meta_author_enable&quot;:&quot;yes&quot;,&quot;sg_content_meta_author_by_text&quot;:&quot;by&quot;,&quot;sg_content_meta_author_icon&quot;:{&quot;value&quot;:&quot;fas fa-user&quot;,&quot;library&quot;:&quot;fa-solid&quot;},&quot;sg_content_meta_author_icon_position&quot;:&quot;before&quot;,&quot;sg_content_meta_date_enable&quot;:&quot;yes&quot;,&quot;sg_content_meta_date_type&quot;:&quot;published&quot;,&quot;sg_content_meta_date_format&quot;:&quot;default&quot;,&quot;sg_content_meta_date_format_custom&quot;:&quot;F j, Y&quot;,&quot;sg_content_meta_date_icon&quot;:{&quot;value&quot;:&quot;fas fa-clock&quot;,&quot;library&quot;:&quot;fa-solid&quot;},&quot;sg_content_meta_date_icon_position&quot;:&quot;before&quot;,&quot;sg_content_image_size_imagesize_size&quot;:&quot;large&quot;,&quot;paged&quot;:1,&quot;class&quot;:&quot;jkit_post_block&quot;}"><div class="jkit-block-container"><div class="jkit-posts jkit-ajax-flag">
            <article class="jkit-post post-2344 post type-post status-publish format-standard has-post-thumbnail hentry category-taxation">
                    <div class="jkit-thumb"><a href="2021/06/23/filing-payroll-taxes-electronically-makes-good-business-sense/index.html"><div class="thumbnail-container ">
            <img loading="lazy" width="800" height="553" src="wp-content/uploads/sites/111/2021/06/young-business-woman-uses-remote-deposit-capture-1024x708.jpg" class="attachment-large size-large wp-post-image" alt="Young business woman uses remote deposit capture" decoding="async" srcset="https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/young-business-woman-uses-remote-deposit-capture-1024x708.jpg 1024w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/young-business-woman-uses-remote-deposit-capture-300x207.jpg 300w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/young-business-woman-uses-remote-deposit-capture-768x531.jpg 768w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/young-business-woman-uses-remote-deposit-capture-1536x1061.jpg 1536w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/young-business-woman-uses-remote-deposit-capture-800x553.jpg 800w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/young-business-woman-uses-remote-deposit-capture-e1626234098326.jpg 1920w" sizes="(max-width: 800px) 100vw, 800px" />
        </div></a></div>
                    <div class="jkit-postblock-content"><div class="jkit-post-category "><span><a href="category/taxation/index.html" class="category-taxation">Taxation</a></span></div><h3 class="jkit-post-title">
							<a href="2021/06/23/filing-payroll-taxes-electronically-makes-good-business-sense/index.html">Filing payroll taxes electronically makes good business sense</a>
						</h3><div class="jkit-post-excerpt"><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et...</p></div><div class="jkit-post-meta-bottom">
							<div class="jkit-meta-readmore icon-position-after">
                <a href="2021/06/23/filing-payroll-taxes-electronically-makes-good-business-sense/index.html" class="jkit-readmore">READ MORE<i aria-hidden="true" class="jki jki-long-arrow-alt-right-solid"></i></a>
            </div>
						</div></div>
                </article><article class="jkit-post post-2340 post type-post status-publish format-standard has-post-thumbnail hentry category-insight">
                    <div class="jkit-thumb"><a href="2021/06/23/the-first-step-of-good-tax-planning-is-good-recordkeeping/index.html"><div class="thumbnail-container ">
            <img width="800" height="533" src="wp-content/uploads/sites/111/2021/06/couple-filling-tax-return-form-1024x682.jpg" class="attachment-large size-large wp-post-image" alt="Couple filling tax return form" decoding="async" loading="lazy" srcset="https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/couple-filling-tax-return-form-1024x682.jpg 1024w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/couple-filling-tax-return-form-300x200.jpg 300w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/couple-filling-tax-return-form-768x512.jpg 768w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/couple-filling-tax-return-form-1536x1024.jpg 1536w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/couple-filling-tax-return-form-800x533.jpg 800w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/couple-filling-tax-return-form.jpg 2000w" sizes="(max-width: 800px) 100vw, 800px" />
        </div></a></div>
                    <div class="jkit-postblock-content"><div class="jkit-post-category "><span><a href="category/insight/index.html" class="category-insight">Insight</a></span></div><h3 class="jkit-post-title">
							<a href="2021/06/23/the-first-step-of-good-tax-planning-is-good-recordkeeping/index.html">The first step of good tax planning is good recordkeeping</a>
						</h3><div class="jkit-post-excerpt"><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et...</p></div><div class="jkit-post-meta-bottom">
							<div class="jkit-meta-readmore icon-position-after">
                <a href="2021/06/23/the-first-step-of-good-tax-planning-is-good-recordkeeping/index.html" class="jkit-readmore">READ MORE<i aria-hidden="true" class="jki jki-long-arrow-alt-right-solid"></i></a>
            </div>
						</div></div>
                </article><article class="jkit-post post-1659 post type-post status-publish format-standard has-post-thumbnail hentry category-finance">
                    <div class="jkit-thumb"><a href="2021/06/22/we-can-give-you-both-gaphic-technical-quality/index.html"><div class="thumbnail-container ">
            <img width="800" height="533" src="wp-content/uploads/sites/111/2021/06/businesswoman-at-business-training-1024x682.jpg" class="attachment-large size-large wp-post-image" alt="Businesswoman at business training" decoding="async" loading="lazy" srcset="https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/businesswoman-at-business-training-1024x682.jpg 1024w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/businesswoman-at-business-training-300x200.jpg 300w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/businesswoman-at-business-training-768x512.jpg 768w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/businesswoman-at-business-training-1536x1024.jpg 1536w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/businesswoman-at-business-training-800x533.jpg 800w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/businesswoman-at-business-training.jpg 2000w" sizes="(max-width: 800px) 100vw, 800px" />
        </div></a></div>
                    <div class="jkit-postblock-content"><div class="jkit-post-category "><span><a href="category/finance/index.html" class="category-finance">Finance</a></span></div><h3 class="jkit-post-title">
							<a href="2021/06/22/we-can-give-you-both-gaphic-technical-quality/index.html">Here’s how taxpayers can pay the right amount of tax throughout the year</a>
						</h3><div class="jkit-post-excerpt"><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et...</p></div><div class="jkit-post-meta-bottom">
							<div class="jkit-meta-readmore icon-position-after">
                <a href="2021/06/22/we-can-give-you-both-gaphic-technical-quality/index.html" class="jkit-readmore">READ MORE<i aria-hidden="true" class="jki jki-long-arrow-alt-right-solid"></i></a>
            </div>
						</div></div>
                </article>
        </div></div></div>		</div>
				</div>
					</div>
		</div>
							</div>
		</section>
					</div>
		</div>
							</div>
		</section> */}
        </div>
      </body>
    </>
  );
};

export default Homepage;
