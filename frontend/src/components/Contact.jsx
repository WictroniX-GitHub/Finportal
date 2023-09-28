import React from 'react'
import { NavLink } from 'react-router-dom';
import '../styles/homepage.css'
const Contact = () => {

	// form submit
	function HPformSubmit() {
        document.getElementById("HPform").submit();
      }
  return (
    <>
      <div data-elementor-type="wp-page" data-elementor-id="5992" class="elementor elementor-5992">
									<section class="elementor-section elementor-top-section elementor-element elementor-element-0ee7083 elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="0ee7083" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
							<div class="elementor-background-overlay"></div>
							<div class="elementor-container elementor-column-gap-no">
					<div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-36a1e43" data-id="36a1e43" data-element_type="column">
			<div class="elementor-widget-wrap elementor-element-populated">
								<div class="elementor-element elementor-element-58bb8ec elementor-widget elementor-widget-heading" data-id="58bb8ec" data-element_type="widget" data-widget_type="heading.default">
				<div class="elementor-widget-container">
			<h2 class="elementor-heading-title elementor-size-default cont-heading">Contact Us</h2>		</div>
				</div>
				<div class="elementor-element elementor-element-fb01d52 elementor-icon-list--layout-inline elementor-align-center elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-id="fb01d52" data-element_type="widget" data-widget_type="icon-list.default">
				<div class="elementor-widget-container">
					<ul class="elementor-icon-list-items elementor-inline-items">
							<li class="elementor-icon-list-item elementor-inline-item">
										<span class="elementor-icon-list-text">Home</span>
									</li>
								<li class="elementor-icon-list-item elementor-inline-item">
											<span class="elementor-icon-list-icon">
							<i aria-hidden="true" class="fas fa-chevron-right"></i>						</span>
										<span class="elementor-icon-list-text">Contact</span>
									</li>
						</ul>
				</div>
				</div>
					</div>
		</div>
							</div>
		</section>
				<section class="elementor-section elementor-top-section elementor-element elementor-element-f4d0fdf elementor-reverse-tablet elementor-reverse-mobile elementor-section-boxed elementor-section-height-default elementor-section-height-default cont-sec" data-id="f4d0fdf" data-element_type="section">
						<div class="elementor-container elementor-column-gap-no">
					<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-d773434 elementor-invisible" data-id="d773434" data-element_type="column" data-settings="{&quot;background_background&quot;:&quot;classic&quot;,&quot;animation&quot;:&quot;fadeInUp&quot;}">
			<div class="elementor-widget-wrap elementor-element-populated">
					<div class="elementor-background-overlay">
						{/* form start */}

					<div class="cont-form">
					<div  className="cont-form-heading" >
						<h3 className="heading-section-subtitle  style-color">SEND A MESSAGE</h3>
        				<div className="heading-section-title  display-inline-block">
							<h2 className="heading-title">Request a call back</h2>
						</div>
					</div>
					<div className="hp-form">
						<form action="">
						<input type="text" placeholder='Your Name'/>
						<input type="text" placeholder='Your Email'/>
						<input type="text" placeholder='Your Contact'/>
						<textarea name="" placeholder='Message' id="" cols="30" rows="5"></textarea>
						{/* <input type="submit" /> */}
						<NavLink to="#" className="mc" onClick={HPformSubmit}>
							<a class="learn-more">Submit</a>
						</NavLink>
						</form>
						
					</div>
					</div>

					{/* form end */}
					</div>	
						
				</div>
		</div>
				<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-664626b elementor-invisible" data-id="664626b" data-element_type="column" data-settings="{&quot;animation&quot;:&quot;fadeInLeft&quot;}">
			<div class="elementor-widget-wrap elementor-element-populated">
								<div class="elementor-element elementor-element-1c09a43 elementor-invisible elementor-widget elementor-widget-jkit_heading" data-id="1c09a43" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;}" data-widget_type="jkit_heading.default">
				<div class="elementor-widget-container">
			<div  class="jeg-elementor-kit jkit-heading  align-left align-tablet- align-mobile- jeg_module_5992_4_64e45dfe262d6" ><h3 class="heading-section-subtitle  style-color ">CONTACT US</h3><div class="heading-section-title  display-inline-block"><h2 class="heading-title">We'd Love to Hear From You.</h2></div><div class="heading-section-separator"><div class="separator-wrapper style-solid"></div></div><div class="heading-section-description"><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p></div></div>		</div>
				</div>
				<section class="elementor-section elementor-inner-section elementor-element elementor-element-aef7b32 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="aef7b32" data-element_type="section">
						<div class="elementor-container elementor-column-gap-no">
					<div class="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-41446c7" data-id="41446c7" data-element_type="column">
			<div class="elementor-widget-wrap elementor-element-populated">
								<div class="elementor-element elementor-element-51b2e56 jkit-equal-height-disable elementor-invisible elementor-widget elementor-widget-jkit_icon_box" data-id="51b2e56" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:&quot;100&quot;}" data-widget_type="jkit_icon_box.default">
				<div class="elementor-widget-container">
			<div  class="jeg-elementor-kit jkit-icon-box icon-position-left elementor-animation- jeg_module_5992_5_64e45dfe2984e" ><div class="jkit-icon-box-wrapper hover-from-bottom"><div class="icon-box icon-box-header elementor-animation-"><div class="icon style-color"><i aria-hidden="true" class="jki jki-apartment1-light"></i></div></div><div class="icon-box icon-box-body">
                <h2 class="title">Surat</h2><p class="icon-box-description">Bhatar, Surat, Gujarat, India</p>
            </div>
            
            </div></div>		</div>
				</div>
				<div class="elementor-element elementor-element-37d61ec jkit-equal-height-disable elementor-invisible elementor-widget elementor-widget-jkit_icon_box" data-id="37d61ec" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:&quot;100&quot;}" data-widget_type="jkit_icon_box.default">
				<div class="elementor-widget-container">
			<div  class="jeg-elementor-kit jkit-icon-box icon-position-left elementor-animation- jeg_module_5992_6_64e45dfe2b9bf" ><div class="jkit-icon-box-wrapper hover-from-bottom"><div class="icon-box icon-box-header elementor-animation-"><div class="icon style-color"><i aria-hidden="true" class="jki jki-phone-call-line"></i></div></div><div class="icon-box icon-box-body">
                <h2 class="title">Call Us</h2><p class="icon-box-description">+91-9824685556</p>
            </div>
            
            </div></div>		</div>
				</div>
					</div>
		</div>
				<div class="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-7fa0972" data-id="7fa0972" data-element_type="column">
			<div class="elementor-widget-wrap elementor-element-populated">
								{/* <div class="elementor-element elementor-element-6de5895 jkit-equal-height-disable elementor-invisible elementor-widget elementor-widget-jkit_icon_box" data-id="6de5895" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:&quot;100&quot;}" data-widget_type="jkit_icon_box.default">
				<div class="elementor-widget-container">
			<div  class="jeg-elementor-kit jkit-icon-box icon-position-left elementor-animation- jeg_module_5992_7_64e45dfe2dd6d" ><div class="jkit-icon-box-wrapper hover-from-bottom"><div class="icon-box icon-box-header elementor-animation-"><div class="icon style-color"><i aria-hidden="true" class="jki jki-apartment-light"></i></div></div><div class="icon-box icon-box-body">
                <h2 class="title">Kuta</h2><p class="icon-box-description">Jl. Sunset Road No. 185, Bali</p>
            </div>
            
            </div></div>		</div>
				</div> */}
				<div class="elementor-element elementor-element-93849c9 jkit-equal-height-disable elementor-invisible elementor-widget elementor-widget-jkit_icon_box" data-id="93849c9" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:&quot;100&quot;}" data-widget_type="jkit_icon_box.default">
				<div class="elementor-widget-container">
			<div  class="jeg-elementor-kit jkit-icon-box icon-position-left elementor-animation- jeg_module_5992_8_64e45dfe2fe43" ><div class="jkit-icon-box-wrapper hover-from-bottom"><div class="icon-box icon-box-header elementor-animation-"><div class="icon style-color"><i aria-hidden="true" class="jki jki-envelope1-light"></i></div></div><div class="icon-box icon-box-body">
                <h2 class="title">Email Address</h2><p class="icon-box-description">info@finportalin.com</p>
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
		</section>
		<section class="elementor-section elementor-top-section elementor-element elementor-element-66cb842 elementor-section-full_width elementor-section-height-default elementor-section-height-default" data-id="66cb842" data-element_type="section">
			<div class="elementor-container elementor-column-gap-no">
				<div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-10c15fa" data-id="10c15fa" data-element_type="column">
					<div class="elementor-widget-wrap elementor-element-populated">
						<div class="elementor-element elementor-element-4094486 elementor-widget elementor-widget-google_maps" data-id="4094486" data-element_type="widget" data-widget_type="google_maps.default">
							<div class="elementor-widget-container">
								<div class="elementor-custom-embed">
									<iframe loading="lazy"
											src="https://maps.google.com/maps?q=217-218%20RAJHANS%20OLYMPIA,%20NEAR%20RUPALI%20NAHER,%20Gujarat%20395007&amp;t=m&amp;z=18&amp;output=embed&amp;iwloc=near"
											title="217-218 RAJHANS OLYMPIA, NEAR RUPALI NAHER, Gujarat 395007"
											aria-label="217-218 RAJHANS OLYMPIA, NEAR RUPALI NAHER, Gujarat 395007"
									></iframe>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

							</div>
    </>
  )
}

export default Contact