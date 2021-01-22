import React from 'react'
import classes from './LandingPage.module.scss';
import Button from './buttons/Button';
import buttonClasses from './buttons/Button.module.scss';

function LandingPage({children}) {
    return (
        <div>
            <img className={classes.backgroundImage} src='/landing.jpeg' />
            <div className={classes.textContainer}>
                <h1>
                    Demo Patient Tracker Application
                </h1>
                <p>
                    This app was built as a way to get more familiar with some popular development frameworks and libraries.
                </p>
                <p>
                    This app allows a user to view, add, edit, and delete patients stored in the PostgreSQL database through a web gui. 
                    The app has a simple UI. It is not visually spectacular. 
                    The purpose is to demonstrate the knowledge of the tools listed below, not to demonstrate graphic design skills.
                </p>
                <p>
                    Read more about the tools used to build this app by clicking the GitHub link below.
                </p>
                {children}
                <a href="https://github.com/JayMartMedia/patient-js">
                    <Button 
                        className={buttonClasses.button}
                        text='View on GitHub'
                        onClick={() => {}}
                    />
                </a>
            </div>
        </div>
    )
}

export default LandingPage
