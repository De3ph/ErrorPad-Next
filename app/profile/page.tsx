import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import fetchUserData from "../methods/fetchuserdata";

const MyProfile = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const session = await supabase.auth.getSession();
  if (session.data.session === null) {
    return <div>Unauthorized</div>;
  }
  const userData = await fetchUserData(user?.id);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-semibold text-center mb-4">My Profile</h2>

      <div className="bg-white p-8 border border-gray-300 rounded-md shadow-md max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email:</label>
          <p className="text-gray-800">{userData.email}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            First Name:
          </label>
          <p className="text-gray-800">{userData.first_name}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Last Name:
          </label>
          <p className="text-gray-800">{userData.last_name}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Company:</label>
          <p className="text-gray-800">{userData.company}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Job:</label>
          <p className="text-gray-800">{userData.job}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Role:</label>
          <p className="text-gray-800">{userData.role}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Python Review:
          </label>
          <p className="text-gray-800">{userData.python_review}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            TypeScript Review:
          </label>
          <p className="text-gray-800">{userData.typescript_review}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
