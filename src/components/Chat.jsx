import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import NoProfile from '../assets/img/no-profile.png';
import Hamabe from '../assets/img/hamabe.jpeg';

const Chat = (props) => {
  const isQuestion = (props.type === 'question');
  const classes = isQuestion ? 'p-chat__row' : 'p-chat__reverse';

  return (
    <ListItem>
      <ListItemAvatar>
        {isQuestion ? (
          <Avatar alt="icon" src={ Hamabe } />
        ) : (
            <Avatar alt="icon" src={ NoProfile } />
        )}
      </ListItemAvatar>
      <div className="p-chat__bubble">{ props.text }</div>
    </ListItem>
  )
}

export default Chat
