import { remote } from 'electron';
import React, { useRef } from 'react';

function InsertPane() {
  const { i18n } = remote.require('./app');
  const insert_slide = require('../../../common/constants/slidedb');
  const inputRef = useRef(null);
  const gurus = insert_slide.dropdownStrings;
  const addAnnouncement = () => {
    console.log(inputRef.current.value);
  };
  return (
    <ul className="list-of-items">
      <li>
        <a>
          <i className="fa fa-eye-slash list-icon" />
          {i18n.t('INSERT.ADD_EMPTY_SLIDE')}
        </a>
      </li>
      <li>
        <a>
          <i className="fa fa-circle list-icon" />
          {i18n.t('INSERT.ADD_WAHEGURU_SLIDE')}
        </a>
      </li>
      <li>
        <a>
          <i className="fa fa-circle-o list-icon" />
          <label>{i18n.t('INSERT.ADD_DHAN_GURU')} </label>
          <select>
            <option value=" ">{i18n.t('INSERT.SELECT')}</option>
            {gurus.gurus.map((value, index) => (
              <option value={insert_slide.slideStrings.dhanguruStrings[index]} key={index}>
                {i18n.t(`INSERT.DHAN_GURU.${value}`)}
              </option>
            ))}
          </select>
        </a>
      </li>
      <li className="announcement-box">
        <header>
          <i className="fa fa-bullhorn list-icon" />
          {i18n.t('INSERT.ADD_ANNOUNCEMENT_SLIDE')}
        </header>
        <div className="announcement-switch">
          <span>{i18n.t('INSERT.ANNOUNCEMENT_IN_GURMUKHI')}</span>
          <div className="switch">
            <input
              id="announcement-language"
              name="announcement-language"
              type="checkbox"
              value="gurmukhi"
            />
            <label htmlFor="announcement-language" />
          </div>
        </div>
        <textarea
          className="announcement-text"
          placeholder={i18n.t('INSERT.ADD_ANNOUNCEMENT_TEXT')}
          ref={inputRef}
        />
        <button className="announcement-slide-btn" onClick={addAnnouncement}>
          {i18n.t('INSERT.ADD_ANNOUNCEMENT')}
        </button>
      </li>
    </ul>
  );
}

export default InsertPane;