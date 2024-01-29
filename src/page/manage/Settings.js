import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdEditSquare } from "react-icons/md";
import authimg from "../../assets/authimg.png";
import { IoIosSettings } from "react-icons/io";

const Settings = () => {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleEditAvatar = () => {
    console.log("Edit avatar clicked");
  };

  const handleEditPassword = () => {
    setIsEditingPassword(true);
  };

  const handleSavePassword = () => {
    if (newPassword === confirmNewPassword) {
      console.log("Password changed to:", newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setIsEditingPassword(false);
    } else {
      console.error("Passwords do not match!");
    }
  };

  const handleCancelEditPassword = () => {
    setIsEditingPassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };
  return (
    <div className="p-4 bg-white">
      <div className="grid grid-cols-12 p-6">
        <div className="col-span-6 ">
          <div className="col-span-6 w-full flex justify-center items-center">
            <img src={authimg} className="w-[600px]" alt="authimg" />
          </div>
        </div>

        <div className="col-span-6 flex flex-col gap-4">
          <h1 className=" flex items-center gap-2  text-2xl pt-20 text-gray">
            Settings <IoIosSettings />
          </h1>
          <div className="bg-white p-6 rounded-xl border border-gray-200 max-w-2xl w-full">
            <div className="divide-y divide-gray-200">
              <div className="py-4 flex justify-between items-center">
                <span className="text-gray-700">Avatar</span>
                <div className="relative">
                  <img
                    src="https://github.com/shadcn.png"
                    alt="User Avatar"
                    className="h-16 w-16 rounded-full"
                  />
                  <button
                    onClick={handleEditAvatar}
                    className="absolute bottom-0 right-0 rounded-full bg-white p-0 h-7 w-7"
                  >
                    <MdEditSquare className="h-4 w-4 ml-1.5" />
                  </button>
                </div>
              </div>

              <div className="py-4 flex justify-between items-center">
                <span className="text-gray-700">Email</span>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-900 text-sm">pp@pp.com</span>
                </div>
              </div>

              <div className="py-4 flex justify-between items-center">
                <span className="text-gray-700">Change Password</span>
                {isEditingPassword ? (
                  <div className="flex flex-col items-end gap-2">
                    <input
                      type="password"
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="text-gray-900 text-sm border border-gray-300 rounded-md p-2"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="text-gray-900 text-sm border border-gray-300 rounded-md p-2"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="text-gray-900 text-sm border border-gray-300 rounded-md p-2"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSavePassword}
                        className="px-3 py-1  text-sm bg-amber-500 border shadow rounded-lg"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEditPassword}
                        className="px-3 text-sm py-1 bg-red-500 text-white border shadow rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={handleEditPassword}>
                    <FiEdit />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
