import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';
import particlesConfig from './ParticleConfig';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


function WelcomePage() {

    const particlesInit = async (main) => {
        console.log(main);
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main);
      };
    
    return (
        <div className="App"
            style={{ position: "relative",
            "overflow": "hidden", "backgroundColor":"#000000",
            "height":"100vh"}}>
            <div style={{position:"absolute"}}>
                <Particles height="100vh" width='100vw'
                id="tsparticles"
                init={particlesInit}
                params={particlesConfig}/>
            </div>
            <div className="welcome_container">
                <div className="welcome_text">Welcome To MedDb</div>
                <div className='welcome_centered'>
                    <Link to="/auth">
                        <button className="btn btn-primary"
                        >Login
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;
  
