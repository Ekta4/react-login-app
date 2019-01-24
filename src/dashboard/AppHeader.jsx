import React from 'react';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import LogoutIcon from 'grommet/components/icons/base/Logout';
import { FormattedMessage } from 'react-intl';
import CheckBox from 'grommet/components/CheckBox';

const AppHeader = ({ logOutUser, toggleLocale }) => (
  <Header separator="all" align="center" justify="between" colorIndex='light-1' splash={false}>
    <Title>
      <FormattedMessage id="labels.header" />
    </Title>
    <Box direction="row" margin={{ right: "small" }} align="center" justify="end" responsive={false}>
      <CheckBox label={<FormattedMessage id="labels.language" />} toggle={true} onChange={toggleLocale} />
      <Anchor icon={<LogoutIcon />} href='#' onClick={logOutUser}>
        <FormattedMessage id="labels.logout" />
      </Anchor>
    </Box>
  </Header>
);
export default AppHeader;