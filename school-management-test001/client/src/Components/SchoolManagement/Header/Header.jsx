import { MainContainer, HeaderContainer, FirstContainer, Title, DateTimeContainer, ProfileImage } from "./StyledComponents"

const Header = () => {
    const currentDate = new Date()

    // Format the date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);

    // Get the day of the week
    const dayOptions = { weekday: 'long' };
    const dayOfWeek = currentDate.toLocaleDateString(undefined, dayOptions);

    return (
        <MainContainer>
            <HeaderContainer>
                <Title>School Name</Title>
                <FirstContainer>
                    <DateTimeContainer>
                        {`Today is ${dayOfWeek}, ${formattedDate} ,`}
                        {` It's your day. You shape it`}
                    </DateTimeContainer>
                    <ProfileImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo3Xqrl4hFcEH_l8PCwaTk_AhAgql808_x_w&s" alt="profile" />

                </FirstContainer>


            </HeaderContainer>

        </MainContainer>
    )
}

export default Header