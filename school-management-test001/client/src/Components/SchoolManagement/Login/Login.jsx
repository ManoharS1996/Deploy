import {
    MainContainer,
    LeftContainer,
    RightContainer,
    Image,
    Form,
    TitleContainer,
    Title,
    Icon,
    Para,
    InputContainer,
    Input,
    Label,
    Forget,
    Button,
    Warning,
} from "./StyledComponents";
import { useState } from "react";
import { FaHand } from "react-icons/fa6";

const LoginPage = () => {
    const [login, setLogin] = useState({ loginIdMail: "", password: "" });
    const [isValid, setIsValid] = useState(true);
    
    const validateEmail = (email) => {
        if (email === "") {
            setIsValid(true);
        } else {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailPattern.test(email);
        }
    };

    

    const onChangeInputs = (value, key) => {
        setLogin((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const submitForm = (e) => {
        e.preventDefault();
        setIsValid(validateEmail(login.loginIdMail));
        
    };

    return (
        <MainContainer>
            <LeftContainer>
                <Form onSubmit={submitForm}>
                    <TitleContainer>
                        <Title>Welcome Back</Title>
                        <Icon>
                            <FaHand style={{ color: "f7e615" }} size={25} />
                        </Icon>
                    </TitleContainer>
                    <Para>
                        The future belongs to those who believe in the beauty of their
                        dreams
                    </Para>
                    <InputContainer>
                        <Label>Login Id</Label>
                        <Input
                            type="text"
                            value={login.loginIdMail}
                            required
                            placeholder="Enter your Email Id "
                            onChange={(e) => onChangeInputs(e.target.value, "loginIdMail")}
                        ></Input>
                        {!isValid && <Warning>*Invalid email address. </Warning>}
                    </InputContainer>
                    <InputContainer>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={login.password}
                            required
                            placeholder="at least 8 characters"
                            onChange={(e) => onChangeInputs(e.target.value, "password")}
                        />
                    </InputContainer>
                    
                    <Forget>Forgot Password ?</Forget>
                    <Button>Sign in</Button>
                </Form>
            </LeftContainer>
            <RightContainer>
                <Image
                    src="https://res.cloudinary.com/dtb4vozhy/image/upload/v1729141789/Screenshot_2024-10-05_103048-transformed_ohcxqi.png"
                    alt="image"
                />
            </RightContainer>
        </MainContainer>
    );
};

export default LoginPage;
