import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"


function HomePage() {
    const navigate = useNavigate();


    function handleGetStarted() {
        navigate("/signup")
    }


    return (
        <div>
            <Navbar />
                
            <div className="hero-section">
                <h1 className="hero-headline">ratatouille</h1>
                <h2 className="hero-subline">Your AI powered dish generator!</h2>
                <button className="hero-section-button" type="button" onClick={handleGetStarted}>Try out now</button>
            </div>

            <section className="section-one">
                <h2 className="section-one-headline">How it works</h2>

                <div className="section-one-container">
                    <h2 className="section-one-subline">Generate delicious dishes 🍔</h2>
                    <p>You don't know what you want to make for dinner today? No problem let ratatouille decide for you.
                    Just a few clicks and you'll get a dish suggested along with a recipe and shopping list.</p>
                </div>

                <div className="section-one-container">
                    <h2 className="section-one-subline">Save your favorite dishes 💚</h2>
                    <p>Save your favorite dishes directly in the app and always have access to their recipes and ingredients.</p>
                </div>

                <div className="section-one-container">
                    <h2 className="section-one-subline">Create shopping lists 🛒</h2>
                    <p>With just one click, you can add any of the required ingredients for a dish to your shopping list.
                    Of course, you can also add your own items to your shopping list.</p>
                </div>
            </section>

            <section className="about-section">
                <div className="about-section-align">
                    <h2 className="section-one-headline">About</h2>
                    <p className="about-section-text">This is the final project of my Ironhack experience and was created for educational purposes only. Want to hire me?</p>
                    <div className="contact-information">
                        <h2>Contact information:</h2>
                        <p>E-mail: woltersh@outlook.de</p>
                        <p><a className="my-link" href="https://www.linkedin.com/in/shawn-wolter-93a263195/">linkedIn</a></p>
                        <p><a className="my-link" href="https://github.com/Cyber-SW">GitHub</a></p>
                    </div>  
                </div>
            </section> 
        </div>
    )
}

export default HomePage