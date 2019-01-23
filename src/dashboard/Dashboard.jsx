import React from 'react';
import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import Paragraph from 'grommet/components/Paragraph';
import User from 'grommet/components/icons/base/User';
import Image from 'grommet/components/Image';

// import Footer from 'grommet/components/Footer';
// import App from 'grommet/components/App';
import { Redirect } from "react-router-dom";

const AppHeader = ({ logOutUser }) => (
  <Header splash={false}>
    <Title>
      Sample Title
  </Title>
    <Box flex={true}
      justify='end'
      direction='row'
      responsive={false}>
      <Anchor href='#'
        className='active'>
        Language
      </Anchor>
      <Anchor href='#' onClick={logOutUser}>
        Log out
      </Anchor>
    </Box>
  </Header>
);
const AppLeftMenu = () => (
  <Sidebar colorIndex='unknown'>
    <Header pad='medium' justify='between'>
      <Title>
        Title
      </Title>
    </Header>
    <Box flex='grow'
      justify='start'>
      <Menu primary={true}>
        <Anchor href='#' className='active' onClick={this}>
          Home
        </Anchor>
        <Anchor href={`${window.location}/friends`}>
          Friends List
        </Anchor>
      </Menu>
    </Box>
    <Footer pad='medium'>
      <Button icon={<User />} />
    </Footer>
  </Sidebar>
);
const AppFooter = () => (
  <Footer justify='between'>
    <Title>
      <s />
      Title
  </Title>
    <Box direction='row'
      align='center'
      pad={{ "between": "medium" }}>
      <Paragraph margin='none'>
        © 2016 Grommet Labs
    </Paragraph>
      <Menu direction='row' inline size='small' dropAlign={{ "right": "right" }} direction='row'>
        <Anchor href='#'>
          Support
      </Anchor>
        <Anchor href='#'>
          Contact
      </Anchor>
        <Anchor href='#'>
          About
      </Anchor>
      </Menu>
    </Box>
  </Footer>
);

const DashboardContent = ({userdata}) => (
  <Box>
    welcome {userdata["first name"]}
    {/* <Image src={userdata["profile picture"]} /> */}
  </Box>
);

class Dashboard extends React.Component {
  state = {
    userid: localStorage.getItem('loginId'),
    userdata: {}
  }
  componentDidMount() {
    const { userid } = this.state;
    let url = 'http://localhost:3001/users';
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.setState({userdata: data[userid]});
      });
  }
  logOutUser = () => {
    localStorage.removeItem('loginId');
    this.setState({userid: '', userdata:{}});
  }
  render() {
    const { userid, userdata } = this.state;
    const loginRedirect = (<Redirect to='login' />);
    const dashboard = (
      <Box direction="row">
        <AppLeftMenu />
        <Box>
          <AppHeader logOutUser={this.logOutUser} />
          <DashboardContent userdata={userdata} />
          <AppFooter />
        </Box>
      </Box>
    );
    return (userid ? dashboard : loginRedirect);
  }
}

export default Dashboard;
