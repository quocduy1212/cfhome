import { INDICATORS_SETTINGS_CHANGE } from 'app-actions-types';

export const indicatorsSettingChange = indicators => ({
  type: INDICATORS_SETTINGS_CHANGE,
  indicators,
});
