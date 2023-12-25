"use client";

import AvatarUpload from "./avatarupload";
import SettingsInput from "./settingsinput";
import SettingsActionButtons from "./settingsactionbuttons";
import { Toaster } from "@/components/ui/sonner";

const Settings = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <AvatarUpload />
      <SettingsInput />
      <SettingsActionButtons />
      <Toaster richColors position="top-center" />
    </div>
  );
};

export default Settings;
