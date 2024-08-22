import React from "react";

const DeleteProfile = () => {
  return (
    <div class="col-xl-8 col-lg-8 col-md-12">
      <div class="card mb-4">
        <div class="card-header">
          <h4>
            <i class="fa-solid fa-trash-can me-2"></i>Delete Your Account
          </h4>
        </div>
        <div class="card-body">
          <div class="eportledd mb-4">
            <h6>
              Save Your Data<span class="text-danger">*</span>
            </h6>
            <div class="form-check ps-0">
              Take a backup of your data{" "}
              <a href="#" class="text-primary">
                Here
              </a>
            </div>
          </div>
          <form class="mb-3">
            <h6>Enter Your Password</h6>
            <input
              type="password"
              class="form-control mb-2"
              placeholder="*********"
            />
            <button class="btn btn-md btn-success fw-medium">Confirm</button>
          </form>
          <div class="d-sm-flex justify-content-start">
            <button
              type="button"
              class="btn btn-md btn-primary fw-medium me-2 mb-0"
            >
              Keep My Account
            </button>
            <a href="#" class="btn btn-md btn-light-primary fw-medium mb-0">
              Delete Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProfile;
