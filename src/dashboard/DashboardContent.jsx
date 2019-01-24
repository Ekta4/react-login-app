import React from 'react';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Headline from 'grommet/components/Headline';
import { FormattedMessage } from 'react-intl';

const DashboardContent = ({ userdata }) => {
  return (Object.keys(userdata).length ? (
    <Box align="center">
      <Headline strong={true} size='small'>
        <FormattedMessage id="messages.welcome" values={{ user: userdata["first name"] }} />
      </Headline>
      <Image src={userdata["profile picture"]} />
    </Box>) : null);
}
export default DashboardContent;