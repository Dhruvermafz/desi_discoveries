import React from "react";
import PersonalInfo from "./PersonalInfo";
import MobileNav from "./MobileNav";
import UserNav from "./UserNav";
import ProfileCard from "./ProfileCard";
const Profile = () => {
  return (
    <section class="pt-5 gray-simple position-relative">
      <div class="container">
        <UserNav />
        <div class="row align-items-start justify-content-between gx-xl-4">
          <ProfileCard />

          <PersonalInfo />
        </div>
      </div>
    </section>
  );
};

export default Profile;
