import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

export const PageIconPicker: React.FC<{ onEmojiClick: any }> = ({ onEmojiClick }) => {
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