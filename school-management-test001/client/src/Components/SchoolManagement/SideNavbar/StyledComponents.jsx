import styled from "styled-components";

export const NavContainer = styled.div`
  width: ${(props) => (props.isActive ? "15vw" : "6vw")};
  height: 92vh;
  background-color: #f2f7fd;
  color: black;
  /* overflow: ${(props) => (props.isActive ? "auto" : "")}; */
  transform: translateX(${(props) => (props.isActive ? "0" : "-20%")});
  transition: transform 0.4s ease;
  box-shadow: ${({ isActive }) =>
    isActive
      ? "2px 0 20px rgba(0, 0, 0, 0.3)"
      : "2px 0 10px rgba(0, 0, 0, 0.5)"};
  border-top-right-radius: 30px;
  position: relative;

  &::-webkit-scrollbar {
    width: 4px;
  }
`;
export const Logo = styled.h1`
  font-size: 25px;
  color: black;
  font-weight: 600;
  padding: 1rem;
`;
export const NavHeadContainer = styled.div`
  display: flex;
  height: 92vh;
  flex-direction: column;
  background-color: white;
  border: 0;
  border-top-right-radius: 30px;
  position: relative;
`;
export const HelloContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-left: 0.7rem;
`;
export const NavHead = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0;
  padding-top: 1rem;
  margin: 0;
  margin-right: auto;
`;
export const Button = styled.button`
  transform: rotate(${(props) => (props.isActive ? "0deg" : "180deg")});
  background-color: #dadbdc;
  border: 2px solid black;
  padding: 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.7rem;
  width: 1.7rem;
  border-radius: 50%;
  z-index: 100;
  position: absolute;
  right: -0.5rem;
  font-size: 1.3rem;
  margin-top: 1rem;
  &:hover {
   outline: none;
   border:1px solid green;
  }
`;
export const IconsContainer = styled.div`
height: fit-content;
  display: flex;
  flex-direction: column;
  align-self: center;
  padding-top:${(props) => (props.isActive ? "0.2rem" : "1.2rem")};
  margin-top: ${(props) => (props.isActive ? "0.8rem" : "2.5rem")};
  overflow-y: auto;
  width: 100%;
`;

export const OptionContainer = styled.div`
height: fit-content;
/* width: fit-content; */
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.isActive ? " flex-start" : "center")};
  align-items: center;
  margin-bottom: ${(props) => (props.isActive ? "0.2rem" : "0.62rem")};
  padding-left: 1.2rem;
  padding-top: ${(props) => (props.isActive ? "" : "0.2rem")};
  cursor: pointer;
  width: ${(props) => (props.active ? "" : "100%")};
  background-color: ${(props) =>props.active && props.isActive ? "#d9fea3" : ""};
  /* border:1px solid red; */
`;
export const Option = styled.div`
height: fit-content;
width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) =>props.active && props.isActive ? "#d9fea3" : ""};
  /* box-shadow: ${(props) =>props.active ? "4px 4px 10px rgba(0, 0, 0, 0.5)" : ""}; */
  /* border-radius: 50%; */

  /* border:1px solid red; */
`;
export const Icon = styled.span`
height: fit-content;
width:fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.active ? "#026902" : "#747474")};
  background-color: ${(props) => (props.active ? "transparent" : "")};
  transition-property: box-shadow;
  /* box-shadow: ${(props) =>props.active ? "4px 4px 10px rgba(0, 0, 0, 0.5)" : ""}; */
  border-radius:50%;

  &:hover {
    color:darkgreen;
    background: #d9fea3;
    box-shadow: 
      0 0 5px #d9fea3,
      0 0 25px #d9fea3,
      0 0 50px #d9fea3,
      0 0 100px #d9fea3; 
  }

`;
export const IconName = styled.p`
  font-size: 1rem;
  padding: 0.4rem 0.5rem;
  margin: 0;
  color: ${(props) => (props.active ? "#026902" : "#747474")};
`;
