import React from 'react'
import './ContactUs.css';

function ContactUs() {


    return (
        <div className="contact">
            <h2>Contact Us</h2>
            <p>If you have any questions or inquiries, feel free to reach out to us. We're here to help!</p>
            <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" required></textarea>

                <button type="submit">Send Message</button>
            </form>
            <div className="contact-info">
                <h3>Our Office</h3>
                <p>123 Cinema Lane, Film City, MovieLand, 12345</p>
                <h3>Email</h3>
                <p>support@cineconnect.com</p>
                <h3>Phone</h3>
                <p>+1 (234) 567-890</p>
            </div>
        </div>
    )
}

export default ContactUs