"use client";

import AvatarUpload from "./avatarupload";
import SettingsInput from "./settingsinput";
import SettingsActionButtons from "./settingsactionbuttons";

const Settings = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <AvatarUpload />
      <SettingsInput />
      <SettingsActionButtons />
    </div>
  );
};

export default Settings;
