import React from 'react';
import Box from 'grommet/components/Box';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import grommetMessages from 'grommet/messages/en-US';
import { LOCALE_MESSAGE } from '../common/constants';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import AppLeftMenu from './AppLeftMenu';
import DashboardContent from './DashboardContent';
import FriendsList from './FriendsList';
import './styles.css';

addLocaleData([
  ...en,
  ...zh
]);


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
    const loginRedirect = (<Redirect to='/login' />);
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
                  <Route path='/dashboard' exact={true}>
                    <DashboardContent userdata={userdata} />
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
