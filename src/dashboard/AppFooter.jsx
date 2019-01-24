import React from 'react';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Footer from 'grommet/components/Footer';
import { FormattedMessage } from 'react-intl';

const AppFooter = () => (
  <Footer separator="all" align="center" justify="between" colorIndex='light-1'>
    <Title>
      <s />
      <FormattedMessage id="labels.footer" />
    </Title>
    <Box direction='row'
      align='center'
      pad={{ "between": "medium" }}>
      <Menu direction='row' inline size='small' dropAlign={{ "right": "right" }}>
        <Anchor href='#'>
          <FormattedMessage id="labels.support" />
        </Anchor>
        <Anchor href='#'>
          <FormattedMessage id="labels.contact" />
        </Anchor>
        <Anchor href='#'>
          <FormattedMessage id="labels.about" />
        </Anchor>
      </Menu>
    </Box>
  </Footer>
);

export default AppFooter;