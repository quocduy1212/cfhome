import { GLOBAL_SETTINGS_CHANGE, INDICATORS_SETTINGS_CHANGE } from 'app-actions-types';

export const indicatorsSettingChange = indicators => ({
  type: INDICATORS_SETTINGS_CHANGE,
  indicators,
});

export const globalSettingsChange = settings => ({
  type: GLOBAL_SETTINGS_CHANGE,
  settings,
});
