import React from "react";
import "../style.css";


export const Note = ({note}) => {
    return (
        <div className="block-note">
            <ul className="wrap-note">
                <div className="note-details">
                    <li className="note">
                        <b>{note.name}</b>
                    </li>
                    <li className="note">
                        <b>{note.date}</b>
                    </li>
                </div>
                <li className="note">
                    <p>{note.note}</p>
                </li>
            </ul>
        </div>
    )
}
