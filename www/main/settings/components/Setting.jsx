import React from 'react';
import PropTypes from 'prop-types';
import { useStoreState, useStoreActions } from 'easy-peasy';

import Switch from '../../common/sttm-ui/switch';

const { remote } = require('electron');

const { i18n } = remote.require('./app');

const Setting = ({ settingObj, defaultType, stateVar, stateFunction, settingKey }) => {
  const { title } = settingObj;
  const type = settingObj.type || defaultType;
  const userSettings = useStoreState(state => state.userSettings);
  const userSettingsActions = useStoreActions(state => state.userSettings);

  const handleInputChange = event => {
    const value = event.target ? event.target.value : event;
    userSettingsActions[stateFunction](value);
  };

  let settingDOM;

  switch (type) {
    case 'range':
      settingDOM = (
        <input
          type="range"
          data-value={userSettings[stateVar]}
          value={userSettings[stateVar]}
          min={settingObj.min}
          max={settingObj.max}
          step={settingObj.step}
          onChange={handleInputChange}
        ></input>
      );
      break;
    case 'dropdown':
      settingDOM = (
        <select value={userSettings[stateVar]} onChange={handleInputChange}>
          {Object.keys(settingObj.options).map((op, opIndex) => (
            <option key={`control-dropdown-options-${opIndex}`} value={op}>
              {i18n.t(`SETTINGS.${settingObj.options[op]}`)}
            </option>
          ))}
        </select>
      );
      break;
    case 'switch':
      settingDOM = (
        <Switch
          controlId={`${title}-switch`}
          className={`control-item-switch-${title}`}
          value={userSettings[stateVar]}
          onToggle={handleInputChange}
        />
      );
      break;
    default:
      settingDOM = <p>No support yet</p>;
  }

  return settingDOM;
};

Setting.propTypes = {
  settingObj: PropTypes.object,
  defaultType: PropTypes.string,
};

export default Setting;
