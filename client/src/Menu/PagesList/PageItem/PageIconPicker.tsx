import React, { useState } from "react";
import { render } from "react-dom";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

export const PageIconPicker: React.FC<{ onEmojiClick: any }> = ({ onEmojiClick }) => {
    const [chosenEmoji, setChosenEmoji] = useState(null);

    return (
        <div>
            <Picker
                onEmojiClick={onEmojiClick}
                disableAutoFocus={true}
                skinTone={SKIN_TONE_MEDIUM_DARK}
                groupNames={{ smileys_people: "PEOPLE" }}
                native
            />
        </div>
    );
}