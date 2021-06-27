import React, { useEffect, useState } from 'react';
import { PageData } from '../../../models/PageData';
import "./PageItem.css";
import { PageIconPicker } from './PageIconPicker';
import { EmojiData, SKIN_TONE_MEDIUM_DARK } from '../../../models/Icon';

export const PageItem: React.FC<{ page: PageData, icons: EmojiData[], updatePageIcons:any }> = ({ page, icons, updatePageIcons }) => {
    const [pickerEnabled, setPickerEnabled] = useState(false);
    const [chosenEmoji, setChosenEmoji] = useState(defaultIcon);

    useEffect(() => {
        const icon = icons.find(icon => icon.unified === page.icon_id);
        icon && setChosenEmoji(icon);
    })

    const onEmojiClick = (event: React.MouseEvent, emojiObject: EmojiData) => {
        setPickerEnabled(false);
        updatePageIcons(page._id, emojiObject)
        setChosenEmoji(emojiObject);
    };

    const EnablePicker = () => {
        setPickerEnabled(true);
    }

    return (
        <a key={page._id} className="page-item" href="#">
            <div className="page-item__content content">
                <div onClick={EnablePicker}>
                    { chosenEmoji && <div className="content__icon">{chosenEmoji.emoji}</div>}
                </div>
                {pickerEnabled && <PageIconPicker onEmojiClick={onEmojiClick} />}
                <span className="content__title">
                    {page.title}
                </span>
            </div>
        </a>
    )
}

const defaultIcon:EmojiData = {
    emoji: "📝",
    names: ["spiral_note_pad"],
    originalUnified: "1f5d2-fe0f",
    unified: "1f5d2-fe0f",
    activeSkinTone: SKIN_TONE_MEDIUM_DARK
}