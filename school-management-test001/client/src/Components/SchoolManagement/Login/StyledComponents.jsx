import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 100vh;
  width: 100vw;
`;
export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 50vw;
`;
export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 50vw;
`;
export const Image = styled.img`
  height: 96vh;
  width: 48vw;
  border: 0;
  border-radius: 25px;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
`;
export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const Title = styled.h1`
  font-family: "Roboto";
  font-size: 28px;
  font-weight: 600;
  color: black;
  padding: 5px;
  padding-right: 5px;
`;
export const Icon = styled.p`
  padding: 5px;
`;
export const InputContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 10px;
`;
export const Input = styled.input`
  padding: 5px;
  padding-left: 1rem;
  border: 2px solid black;
  border-radius: 1rem;
`;
export const Label = styled.label`
  font-family: Roboto;
  font-size: 22px;
  font-weight: 500;
  color: black;
`;
export const Para = styled.p`
  font-family: Roboto;
  font-size: 20px;
  font-weight: 500;
  color: #7d8589;
`;
export const Warning = styled.span`
  color: red;
  font-size: 0.8rem;
  /* padding: 4px; */
  /* align-self:flex-end; */
  position: absolute;
  bottom:-1rem;
  right: 0;
`;
export const Forget = styled.p`
  color: #0451a8;
  font-size: 20px;
  font-family: Roboto;
  padding: 4px;
  align-self: flex-end;
`;

export const Button = styled.button`
  background-color: #2f3a60;
  color: white;
  border: 0;
  border-radius: 12px;
  font-family: Roboto;
  font-size: 20px;
  padding: 4px;
  margin-top: 15px;
  width: 96%;
  align-self: center;
`;
