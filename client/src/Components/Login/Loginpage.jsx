import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Loginpage = ({ onUserLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('email')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', formData);
      console.log(response.data,"res");
      
      if (response.data.userType === 'seller') {
        localStorage.setItem('email', formData.email);
        onUserLogin(formData.email);
        window.location.href = "/adminportal";
      } 
      else if (response.data.userType === 'user') {
        localStorage.setItem('email', formData.email);
        onUserLogin(formData.email);
        window.location.href = '/dashboard';
      } 
      else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <div className="login-container">
        <div className="loginform">
          <div className="loginform-container">
            <div className="loginform-left">
              <h1 className="loginform-title">Welcome!</h1>
              <p className="loginform-desc">To the Farmers Web Portal!!!</p>
              
              <form onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}
                
                <div className="input-block">
                  <label htmlFor="email" className="input-label">Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="Email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-block">
                  <label htmlFor="password" className="input-label">Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Password" 
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="loginform-buttons">
                  <button 
                    className="input-button" 
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </button>
                </div>

                <SocialLinks>
                  <Link to="#"><i className="fab fa-facebook-f"></i></Link>
                  <Link to="#"><i className="fab fa-twitter"></i></Link>
                  <Link to="#"><i className="fab fa-instagram"></i></Link>
                  <Link to="#"><i className="fab fa-linkedin-in"></i></Link>
                </SocialLinks>
              </form>

              <p className="sign-up">
                Don't have an account? <Link to="/signup">Sign Up now</Link>
              </p>
            </div>
            
            <div className="loginform-right">
              <img 
                src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80" 
                alt="Farm landscape" 
              />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

// Styled Components
const Wrapper = styled.section`
  .login-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #efedee;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loginform {
    width: 100%;
    background: rgba(51, 51, 51, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.4s;
  }

  .loginform-container {
    display: flex;
    max-width: 60vw;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;
    transition-duration: 0.3s;
    background: #fff;
  }

  .loginform-left {
    padding: 60px 30px 20px;
    background: #fff;
    flex: 1.5;
    transition-duration: 0.5s;
    opacity: 1;
  }

  .loginform-right {
    flex: 2;
    font-size: 0;
    transition: 0.3s;
    overflow: hidden;
  }

  .loginform-right img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition-duration: 1.2s;
  }

  .loginform-title {
    margin: 0;
    font-weight: 400;
    font-size: 40px;
    color: #55311c;
  }

  .loginform-desc {
    margin: 6px 0 30px 0;
    font-size: 20px;
  }

  .error-message {
    color: #b22b27;
    margin-bottom: 20px;
    text-align: center;
  }

  .input-button {
    display: inline-block;
    padding: 1.2rem 3.2rem;
    outline: none;
    text-transform: uppercase;
    border: 0;
    color: #fff;
    border-radius: 4px;
    background: #8c7569;
    transition: 0.3s;
    cursor: pointer;
    font-family: "Nunito", sans-serif;
    width: 100%;

    &:hover {
      background: #55311c;
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }

  .input-label {
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.7px;
    color: #8c7569;
    transition: 0.3s;
  }

  .input-block {
    display: flex;
    flex-direction: column;
    padding: 10px 10px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 20px;
    transition: 0.3s;

    input {
      outline: 0;
      border: 0;
      padding: 4px 0 0;
      font-size: 14px;
    }

    &:focus-within {
      border-color: #8c7569;
    }
  }

  .sign-up {
    margin: 60px 0 0;
    font-size: 14px;
    text-align: center;

    a {
      color: #8c7569;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 750px) {
    .loginform-container {
      max-width: 90vw;
    }

    .loginform-right {
      display: none;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;

  a {
    margin: 0 15px;
    color: inherit;
    font-size: 1.5rem;
    transition: color 0.3s;

    &:nth-child(1), &:nth-child(4) {
      color: #5393fa;
    }

    &:nth-child(2) {
      color: rgba(29, 161, 242, 1.00);
    }

    &:nth-child(3) {
      color: rgb(189, 63, 84);
    }

    &:hover {
      transform: scale(1.1);
    }
  }
`;

export default Loginpage;