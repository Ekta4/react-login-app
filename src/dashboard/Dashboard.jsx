import React from 'react';
import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Footer from 'grommet/components/Footer';
import Image from 'grommet/components/Image';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { IntlProvider, addLocaleData, FormattedMessage } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import CheckBox from 'grommet/components/CheckBox';
import grommetMessages from 'grommet/messages/en-US';
import { LOCALE_MESSAGE } from '../common/constants';
import './styles.css';

import { Redirect } from "react-router-dom";

addLocaleData([
  ...en,
  ...zh
]);
const AppHeader = ({ logOutUser, toggleLocale }) => (
  <Header align="center" justify="between" colorIndex='unknown' splash={false}>
    <Title>
      <FormattedMessage id="labels.header" />
    </Title>
    <Box
      justify='end'
      direction='row'
      responsive={false}>
      <CheckBox label={<FormattedMessage id="labels.language" />} toggle={true} onChange={toggleLocale} />
      <Anchor href='#' onClick={logOutUser}>
        Log out
      </Anchor>
    </Box>
  </Header>
);
const AppLeftMenu = ({ userdata }) => (
  <Sidebar className="side-menu" colorIndex='neutral-1'>
    <Header pad='medium' justify='between'>
      <Title>
        Title
      </Title>
    </Header>
    <Box justify='start'>
      <Menu primary={true}>
        <Anchor href='/dashboard' className='active'>
          Home
        </Anchor>
        {
          userdata.isAdmin && <Anchor href='/dashboard/friends'>
            Friends List
        </Anchor>
        }
      </Menu>
    </Box>
  </Sidebar>
);
const AppFooter = () => (
  <Footer justify='between'>
    <Title>
      <s />
      Footer
  </Title>
    <Box direction='row'
      align='center'
      pad={{ "between": "medium" }}>
      <Menu direction='row' inline size='small' dropAlign={{ "right": "right" }}>
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

const DashboardContent = ({ userdata }) => {
  return (Object.keys(userdata).length ? (
    <Box>
      welcome {userdata["first name"]}
      <Image src={userdata["profile picture"]} />
    </Box>) : null);
}
class FriendsList extends React.Component {
  state = {
    userid: localStorage.getItem('loginId'),
    friendsList: []
  }
  componentDidMount() {
    const { userid } = this.state;
    let url = 'http://localhost:3001/friends';
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ friendsList: data[userid] });
      });
  }
  render() {
    const { friendsList } = this.state;
    console.log("friends list...:", friendsList);
    return (
      <Box>
        friends
        {friendsList.map((friend) => (
          <Box>
            {friend}
          </Box>
        ))}
      </Box>
    );
  }
}

const userLocale = { 'en-US': 'zh-CN', 'zh-CN': 'en-US' };
class Dashboard extends React.Component {
  state = {
    userid: localStorage.getItem('loginId'),
    userdata: {},
    languageCode: 'en-US'
  }
  componentDidMount() {
    const { userid } = this.state;
    let url = 'http://localhost:3001/users';
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ userdata: data[userid] });
      });
  }
  logOutUser = () => {
    localStorage.removeItem('loginId');
    this.setState({ userid: '', userdata: {} });
  }
  toggleLocale = () => {
    this.setState((state) => {
      return { languageCode: userLocale[state.languageCode] }
    });
  }
  render() {
    const { userid, userdata, languageCode } = this.state;
    const loginRedirect = (<Redirect to='login' />);
    const dashboard = (
      <Router>
        <IntlProvider
          textComponent={React.Fragment}
          locale={languageCode}
          messages={{
            ...grommetMessages,
            ...LOCALE_MESSAGE[languageCode]
          }}
        >
          <Box direction="row">
            <AppLeftMenu userdata={userdata} />
            <Box full="horizontal">
              <AppHeader logOutUser={this.logOutUser} toggleLocale={this.toggleLocale} />
              <Box flex="grow">
                <Switch>
                  <Route path='/dashboard/friends' exact={true} >
                    <FriendsList />
                  </Route>
                  <Route path='/dashboard' >
                    <DashboardContent userdata={userdata} exact={true} />
                  </Route>
                </Switch>
              </Box>
              <AppFooter />
            </Box>
          </Box>
        </IntlProvider >
      </Router>
    );
    return (userid ? dashboard : loginRedirect);
  }
}

export default Dashboard;
