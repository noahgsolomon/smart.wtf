"use client";

import AvatarUpload from "./avatarupload";
import { Toaster } from "react-hot-toast";
import SettingsInput from "./settingsinput";
import SettingsActionButtons from "./settingsactionbuttons";

const Settings = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <AvatarUpload />
      <SettingsInput />
      <SettingsActionButtons />
      <Toaster />
    </div>
  );
};

export default Settings;
