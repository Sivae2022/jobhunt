
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom"; 
import Jobcard from "@/components/Jobcard";
import Footer from "@/components/Footer";

const FindJobs = () => {
  const [filter, setFilter] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const jobs = useSelector((state) => state.Jobs.jobs);


  useEffect(() => {
    setFilter(jobs);
  }, [jobs]);

 

  // ✅ Handle location filter
  const handleFilterLocation = (e) => {
    const value = e.target.value;
    let filterLocation = [...selectedLocation];

    if (filterLocation.includes(value)) {
      filterLocation = filterLocation.filter((loc) => loc !== value);
    } else {
      filterLocation.push(value);
    }

    setSelectedLocation(filterLocation);
  };

  //  Handle role filter
  const handleFilterRole = (e) => {
    const value = e.target.value;
    let filterRoles = [...selectedRoles];

    if (filterRoles.includes(value)) {
      filterRoles = filterRoles.filter((role) => role !== value);
    } else {
      filterRoles.push(value);
    }

    setSelectedRoles(filterRoles);
  };

   //  Function to handle filtering
   const applyFilters = () => {
    let filteredJobs = [...jobs];

    if (selectedLocation.length > 0) {
      filteredJobs = filteredJobs.filter((job) =>
        selectedLocation.includes(job.location)
      );
    }

    if (selectedRoles.length > 0) {
      filteredJobs = filteredJobs.filter((job) =>
        selectedRoles.includes(job.title)
      );
    }

    setFilter(filteredJobs);
  };

  //  filtering when selectedLocation or selectedRoles changes
  useEffect(() => {
    applyFilters();
  }, [selectedLocation, selectedRoles]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col mt-12 sm:flex-row gap-1 min-h-screen sm:gap-10 p-2 ">
        {/* Left Side (Filters) */}
        <div className="leftside filters  min-w-60 p-5 ">
          <p className="font-bold text-lg">Filter jobs</p>
          <hr className="mt-2" />

          {/* Location Filter */}
          <div className="border-2 rounded-md border-gray-300 pl-5 py-3 mt-6 text-black">
            <p className="mb-3 text-sm font-bold">Location</p>
            <div className="flex flex-col gap-2 text-sm font-bold text-gray-700">
              {["delhi", "mohali", "mumbai", "Chandigarh"].map((location) => (
                <p key={location} className="flex gap-2">
                  <input type="checkbox" value={location} onChange={handleFilterLocation} />
                  <span>{location}</span>
                </p>
              ))}
            </div>
          </div>

          {/* Role Filter */}
          <div className="border-2 border-gray-300 rounded-md pl-5 py-3 mt-6 text-black">
            <p className="mb-3 text-sm font-bold">Role</p>
            <div className="flex flex-col gap-2 text-sm font-bold text-gray-700">
              {["React js developer", "node js developer", "Digital marketing", "fullstack development"].map((role) => (
                <p key={role} className="flex gap-2">
                  <input type="checkbox" value={role} onChange={handleFilterRole} />
                  <span>{role}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side (Jobs List) */}
        <div className="right jobs flex-1">
          <div className="px-6 py-6 ">
            {filter.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                {filter.map((job) => (
                  <NavLink key={job._id} to={`/job/${job._id}`}>
                    <Jobcard
                      title={job.title}
                      description={job.description}
                      salary={job.salary}
                      location={job.location}
                      company={job.company}
                    />
                  </NavLink>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-700 mt-10">No Jobs found</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FindJobs;
