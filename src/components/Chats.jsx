import List from '@mui/material/List';
import { Chat } from './index';

const Chats = (props) => {

  return (
    <List sx={{height: 400, padding: '0', overflow: 'auto'}}>
      {props.chats.map((chat, index) => {
        return <Chat text={chat.text} type={chat.type} key={index.toString()} />
      })}
    </List>
   )
}

export default Chats
