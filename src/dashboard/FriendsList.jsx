import React from 'react';
import Box from 'grommet/components/Box';

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
export default FriendsList;