import { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:4000/api/auth/signup", formData);
      localStorage.setItem('email', formData.email);
      navigate('/adminportal');
    } catch (error) {
      console.error("Registration error:", error);
      // Add user-friendly error handling here
    }
  };

  return (
    <Container>
      <FormContainer>
        <FormSection>
          <Header>
            <h1>Welcome!</h1>
            <p>To the Farmers Web Portal</p>
          </Header>

          <Form onSubmit={handleSubmit}>
            <InputField>
              <label>Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                placeholder="Name" 
                required
              />
            </InputField>

            <InputField>
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="Email" 
                required
              />
            </InputField>

            <InputField>
              <label>Password</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password}
                onChange={handleChange}
                placeholder="Password" 
                required
              />
            </InputField>

            <InputField>
              <label>Confirm Password</label>
              <input 
                type="password" 
                name="confirm_password" 
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm Password" 
                required
              />
            </InputField>

            <SubmitButton type="submit">Register</SubmitButton>

            <SocialIcons>
              <IconLink><i className="fab fa-facebook-f"/></IconLink>
              <IconLink><i className="fab fa-twitter"/></IconLink>
              <IconLink><i className="fab fa-instagram"/></IconLink>
              <IconLink><i className="fab fa-linkedin-in"/></IconLink>
            </SocialIcons>
          </Form>

          <LoginPrompt>
            Already have an account? <Link to="/login">Sign In</Link>
          </LoginPrompt>
        </FormSection>

        <ImageSection>
          <img 
            src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80" 
            alt="Farm scenery" 
          />
        </ImageSection>
      </FormContainer>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #efedee;
 
`;

const FormContainer = styled.div`
  display: flex;
  max-width: 900px;
  max-height:100vh;
  margin-top:4rem;
  width: 90%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: #fff;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormSection = styled.div`
  flex: 1;
  padding: 2rem 2rem;
`;

const Header = styled.div`
  
  
  h1 {
    margin: 0;
    font-size: 2.5rem;
    color: #55311c;
    font-weight: 400;
  }

  p {
    margin: 0.5rem 0 0;
    font-size: 1.25rem;
    color: #666;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #8c7569;
    text-transform: uppercase;
  }

  input {
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border 0.3s;

    &:focus {
      outline: none;
      border-color: #8c7569;
    }
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background: #8c7569;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 1rem;

  &:hover {
    background: #55311c;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  
 

  i {
    font-size: 1.5rem;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.1);
    }
  }

  .fa-facebook-f, .fa-linkedin-in {
    color: #5393fa;
  }

  .fa-twitter {
    color: rgba(29, 161, 242, 1);
  }

  .fa-instagram {
    color: rgb(189, 63, 84);
  }
`;

const IconLink = styled(Link)`
  display: inline-block;
  padding: 0.5rem;
`;

const LoginPrompt = styled.p`
  text-align: center;
  color: #666;

  a {
    color: #8c7569;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ImageSection = styled.div`
  flex: 1;
  display: block;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export default SignupPage;