import React, {useState} from 'react'
import * as Components from './loginSignup';
///
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
 
 const LoginSignup = () => {
    const [signIn, toggle] = useState(true);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault();
    
        // Créer un objet avec les données du formulaire
        const formData = {
          first_name,
          last_name,
          email,
          password,
        };
    
        try {
          const response = await axios.post('http://localhost:5000/v1/customers', formData);
    
          console.log(response.data);
        } catch (error) {
          // Gérer les erreurs
          console.error("Erreur lors de l'inscription", error);
        }
      };


      const handleSignIn = async (e) => {
        e.preventDefault();
    
        // Créer un objet avec les données du formulaire
        const formData = {
          email,
          password,
        };
    
        try {
          const response = await axios.post('http://localhost:5000/v1/customers/login', formData);
    
          console.log(response.data);
    
          navigate("/products")
        } catch (error) {
          console.error('Erreur lors de la connexion', error);
        }
      };
    

    return(
        <Components.Container>
            <Components.SignUpContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type='text' placeholder='First Name'  value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                    <Components.Input type='text' placeholder='Last Name' value={last_name} onChange={(e) => setLastName(e.target.value)} />
                    <Components.Input type='email' placeholder='Email'  value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Components.Input type='password' placeholder='Password'  value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Components.Button onClick={handleSignUp}>Sign Up</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>

            <Components.SignInContainer signinIn={signIn}>
                 <Components.Form>
                     <Components.Title>Sign in</Components.Title>
                     <Components.Input type='email' placeholder='Email'  value={email} onChange={(e) => setEmail(e.target.value)}/>
                     <Components.Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                     <Components.Button onClick={handleSignIn}>Sigin In</Components.Button>
                 </Components.Form>
            </Components.SignInContainer>

            <Components.OverlayContainer signinIn={signIn}>
                <Components.Overlay signinIn={signIn}>

                <Components.LeftOverlayPanel signinIn={signIn}>
                    <Components.Title>Print it your way! Rejoin Us</Components.Title>
                    <Components.Paragraph>
                         Please login with your personal info
                    </Components.Paragraph>
                    <Components.GhostButton onClick={() => toggle(true)}>
                        Sign In
                    </Components.GhostButton>
                    </Components.LeftOverlayPanel>

                    <Components.RightOverlayPanel signinIn={signIn}>
                      <Components.Title>Print it your way! Join Us</Components.Title>
                      <Components.Paragraph>
                          Enter Your personal details
                      </Components.Paragraph>
                          <Components.GhostButton onClick={() => toggle(false)}>
                              Sign Up 
                          </Components.GhostButton> 
                    </Components.RightOverlayPanel>

                </Components.Overlay>
            </Components.OverlayContainer>

        </Components.Container>
    )
 }
 

 
 export default LoginSignup