import React, { useState } from 'react';
import { PageData } from '../../../models/PageData';
import "./PageItem.css";
import { PageIconPicker } from './PageIconPicker';
import { IEmojiData, SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

const defaultIcon:IEmojiData = {
    emoji: "📝",
    names: ["spiral_note_pad"],
    originalUnified: "1f5d2-fe0f",
    unified: "1f5d2-fe0f",
    activeSkinTone: SKIN_TONE_MEDIUM_DARK
}

export const PageItem: React.FC<{ page: PageData }> = ({ page }) => {

    const [pickerEnabled, setPickerEnabled] = useState(false);
    const [chosenEmoji, setChosenEmoji] = useState(defaultIcon);

    const onEmojiClick = (event: React.MouseEvent, emojiObject: any) => {
        setChosenEmoji(emojiObject);
        setPickerEnabled(false);
        console.log(emojiObject);
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