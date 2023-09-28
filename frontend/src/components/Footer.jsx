import React from 'react'
import '../styles/footer.css'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    {/* <!-- footer --> */}
    <footer>
        <div class="f1">
            <div class="f11">
                {/* <a class="navbar-brand" href="#">
                <img width="800" height="206" src="wp-content/uploads/sites/111/2021/06/pajax-logo-6-1024x264.png" class="attachment-large size-large wp-image-3989" alt="" decoding="async" loading="lazy" srcset="https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/pajax-logo-6-1024x264.png 1024w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/pajax-logo-6-300x77.png 300w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/pajax-logo-6-768x198.png 768w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/pajax-logo-6-1536x395.png 1536w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/pajax-logo-6-2048x527.png 2048w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/pajax-logo-6-800x206.png 800w, https://templatekit.jegtheme.com/pajax/wp-content/uploads/sites/111/2021/06/pajax-logo-6-e1626234217274.png 1920w" sizes="(max-width: 800px) 100vw, 800px" /></a> */}
                <div className='alt-logo'><h1>FINPORTAL</h1></div>
                </div>
            <div class="f12"><a href="#"><i class="fa-solid fa-location-dot"></i> 217-218 Rajhans Olympia, Nr Rupali Naher, Bhatar, Surat, Gujarat, India</a></div>
            <div class="f12"><a href="#"><i class="fa-solid fa-phone"></i>+91-9824685556</a></div>
            <div class="f12"><a href="#"><i class="fa-solid fa-envelope"></i>info@finportalin.com</a></div>
            <div class="f13">
                <a href="https://www.facebook.com/finsightventure/" class="f13-font"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="https://instagram.com/finportal_in" class="f13-font"><i class="fa-brands fa-instagram"></i></a>
                <a href="https://twitter.com/finportal_in" class="f13-font"><i class="fa-brands fa-square-twitter"></i></a>
                <a href="https://www.linkedin.com/company/finportalin/" class="f13-font"><i class="fa-brands fa-linkedin"></i></a>
            </div>
        </div>
        <div class="f1 f1-cen">
            <div class="f21"><h3>Information</h3></div>
            <div class="f22"><a href="#">About Us</a></div>
            <div class="f22"><NavLink to="/contact">Contact Us</NavLink></div>
            <div class="f22"><NavLink to="/itr">Plans</NavLink></div>
        </div>
        <div class="f1 f1-cen">
            <div class="f21"><h3>My Account</h3></div>
            {/* <div class="f22"><a href="#">My Account</a></div> */}
            <div class="f22"><NavLink to="/signin">Signin</NavLink></div>
            <div class="f22"><NavLink to="/signup">Signup</NavLink></div>
        </div>
        <div class="f1">
            <div class="f21"><h3>Join our Newsletter Now</h3></div>
            <div class="f12">Get E-mail updates about our latest shop and special offers</div>
            <div class="f43">
                <input type="email" placeholder="Enter your Email"/>
                <button class="newsletter">Subscribe</button>
            </div>
        </div>
    </footer>
    {/* <div class="fade_rule"></div>   */}
    <div class="foo-bel">
        <p>Copyright &copy; 2023 - <a href="https://wictronix.com/"><b>WictroniX</b></a>. All rights reserved</p>
      </div>
    </>
    )
}

export default Footer