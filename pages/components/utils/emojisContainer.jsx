import * as React from 'react';
import Picker from 'emoji-picker-react';

export default function EmojiPicker() {
const [chosenEmoji, setChosenEmoji] = React.useState(null);

const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
};

//   return (
//     <div>
//       {chosenEmoji ? (
//         <span>You chose: {chosenEmoji.emoji}</span>
//       ) : (
//         <span>No emoji Chosen</span>
//       )}
//       <Picker onEmojiClick={onEmojiClick} />
//     </div>
//   );
return (
    <div>leo</div>
    // <>
    // <h1 style={{textAlign: 'center'}}>Demo emoji picker</h1>
    //   <div style={{textAlign: 'center',marginLeft:'810px'}}>
    //       <Picker  onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK}/>
    //       { chosenEmoji && <EmojiData chosenEmoji={chosenEmoji}/>}
    //   </div>
    //   </>
  );
};

const EmojiData = ({chosenEmoji}) => (
    <div style={{textAlign: 'center',marginRight: '810px'}}>
      <br></br>
      <br></br>
      <hr></hr>
      <strong>Names:</strong> {chosenEmoji.names.join(', ')}<br/>
      <strong>Symbol:</strong> {chosenEmoji.emoji}<br/>
    </div>
  );