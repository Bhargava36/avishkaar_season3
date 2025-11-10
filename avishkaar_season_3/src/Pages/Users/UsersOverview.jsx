import React from "react";

const UsersOverview = () => {
  return (
    <div className="p-6  rounded-lg shadow-lg text-white min-h-[400px]">
      <h2 className="text-2xl orbitron font-bold mb-4">Welcome to the Team Overview</h2>
      <p className="text-gray-300">
        This is your dashboard overview. Here you can see your stats, recent
        activity, and important information at a glance.
      </p>

      {/* Example overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="p-4 bg-gradient-to-br from-cyan-500/30 via-black/40 to-purple-600/30 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Jobs</h3>
          <p className="text-white text-xl mt-2">24</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-purple-500/30 via-black/40 to-cyan-600/30 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Pending Services</h3>
          <p className="text-white text-xl mt-2">8</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-cyan-500/30 via-black/40 to-purple-600/30 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Contacts</h3>
          <p className="text-white text-xl mt-2">15</p>
        </div>
      </div>
    </div>
  );
};

export default UsersOverview;
