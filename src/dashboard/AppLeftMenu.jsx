import React from 'react';
import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import { FormattedMessage } from 'react-intl';

const AppLeftMenu = ({ userdata }) => (
  <Sidebar className="side-menu" colorIndex='grey-2'>
    <Header pad='medium' justify='between'>
      <Title>
        <FormattedMessage id="labels.title" />
      </Title>
    </Header>
    <Box justify='start'>
      <Menu primary={true}>
        <Anchor href='/dashboard' className='active'>
          <FormattedMessage id="labels.home" />
        </Anchor>
        {
          userdata.isAdmin &&
          <Anchor href='/dashboard/friends'>
            <FormattedMessage id="labels.friendsList" />
          </Anchor>
        }
      </Menu>
    </Box>
  </Sidebar>
);
export default AppLeftMenu;