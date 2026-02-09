import logo from '../assets/logo.png';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-section brand-info">
                    <div className="logo-group">
                        <img src={logo} alt="zenofy-logo" className="footer-logo" />
                        <h1 className="footer-brand">ZENOFY</h1>
                    </div>
                    <p className="footer-desc">
                        Zenofy offers high-quality projectors, projector screens, and accessories to enhance your home theater and presentation experiences.
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-item"><i className="ri-whatsapp-fill"></i></a>
                        <a href="#" className="social-item"><i className="ri-facebook-circle-fill"></i></a>
                        <a href="#" className="social-item"><i className="ri-messenger-fill"></i></a>
                        <a href="#" className="social-item"><i className="ri-twitter-x-fill"></i></a>
                    </div>
                </div>

                <div className="footer-section services-links">
                    <h2 className="section-title">SERVICES</h2>
                    <ul className="links-list">
                        <li><i className="ri-projector-line"></i> <a href="#">Projectors</a></li>
                        <li><i className="ri-tv-2-line"></i> <a href="#">Smart Screens</a></li>
                        <li><i className="ri-settings-4-line"></i> <a href="#">Projector Accessories</a></li>
                        <li><i className="ri-plug-line"></i> <a href="#">HDMI & Accessories</a></li>
                    </ul>
                </div>

                <div className="footer-section find-us">
                    <h2 className="section-title">FIND US</h2>
                    <div className="map-wrapper">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.721588116579!2d80.213391375935!3d6.0328945939526575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae173bb5148e45f%3A0x96162d4d5240a33b!2sGalle%20Central%20Bus%20Stand%2C%20Gamini%20Mawatha%2C%20Galle%2080000!5e0!3m2!1sen!2slk!4v1732958020992!5m2!1sen!2slk"
                            width="100%"
                            height="150"
                            style={{ border: 0, borderRadius: '8px' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <hr className="footer-divider" />
                <p className="copyright">© 2024 Zenofy. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
