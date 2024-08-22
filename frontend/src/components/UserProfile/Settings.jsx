import React from "react";

const Settings = () => {
  return (
    <div class="col-xl-8 col-lg-8 col-md-12">
      <div class="card mb-4">
        <div class="card-header">
          <h4>
            <i class="fa-regular fa-bell me-2"></i>Notification Settings
          </h4>
        </div>
        <div class="card-body">
          <div class="eportledd mb-4">
            <h6>
              Newsletter<span class="text-danger">*</span>
            </h6>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="Productivity"
              />
              <label class="form-check-label" for="Productivity">
                Daily Productivity Updates
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="Event"
                checked
              />
              <label class="form-check-label" for="Event">
                New Event Created
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="week"
                checked
              />
              <label class="form-check-label" for="week">
                Twice a week
              </label>
            </div>
          </div>

          <div class="pushNotify d-flex align-items-start justify-content-between mb-3">
            <div class="pushNotify-flex">
              <p class="lh-2 fw-semibold text-dark mb-0">
                Mobile Push Notification
              </p>
              <span class="text-md text-muted-2">
                Receive push notification whenever your organization requires
                your attention
              </span>
            </div>
            <div class="pushNotify-endflex">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="mobilepush"
                  checked
                />
                <label class="form-check-label" for="mobilepush"></label>
              </div>
            </div>
          </div>

          <div class="pushNotify d-flex align-items-start justify-content-between mb-3">
            <div class="pushNotify-flex">
              <p class="lh-2 fw-semibold text-dark mb-0">
                Desktop Notification
              </p>
              <span class="text-md text-muted-2">
                Receive Desktop notification whenever your organization requires
                your attention
              </span>
            </div>
            <div class="pushNotify-endflex">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="desktoppush"
                  checked
                />
                <label class="form-check-label" for="desktoppush"></label>
              </div>
            </div>
          </div>

          <div class="pushNotify d-flex align-items-start justify-content-between mb-3">
            <div class="pushNotify-flex">
              <p class="lh-2 fw-semibold text-dark mb-0">Email notification</p>
              <span class="text-md text-muted-2">
                Receive email push notification whenever your organization
                requires your attention
              </span>
            </div>
            <div class="pushNotify-endflex">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="emailpush"
                />
                <label class="form-check-label" for="emailpush"></label>
              </div>
            </div>
          </div>

          <div class="pushNotify d-flex align-items-start justify-content-between mb-3">
            <div class="pushNotify-flex">
              <p class="lh-2 fw-semibold text-dark mb-0">
                Show your profile publicly
              </p>
              <span class="text-md text-muted-2">
                Receive email push notification whenever your organization
                requires your attention
              </span>
            </div>
            <div class="pushNotify-endflex">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="publicaly"
                  checked
                />
                <label class="form-check-label" for="publicaly"></label>
              </div>
            </div>
          </div>

          <div class="pushNotify d-flex align-items-start justify-content-between mb-3">
            <div class="pushNotify-flex">
              <p class="lh-2 fw-semibold text-dark mb-0">
                Check which device(s) access your account
              </p>
              <span class="text-md text-muted-2">
                Receive email push notification whenever your organization
                requires your attention
              </span>
            </div>
            <div class="pushNotify-endflex">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="eddred"
                />
                <label class="form-check-label" for="eddred"></label>
              </div>
            </div>
          </div>
          <div class="d-sm-flex justify-content-start">
            <button
              type="button"
              class="btn btn-md btn-primary fw-medium me-2 mb-0"
            >
              Save changes
            </button>
            <a href="#" class="btn btn-md btn-dark fw-medium mb-0">
              Cancel
            </a>
          </div>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-header">
          <h4>
            <i class="fa-solid fa-gear me-2"></i>Security settings
          </h4>
        </div>
        <div class="card-body">
          <form class="mb-0">
            <h6>Two-factor authentication</h6>
            <label class="form-label">
              Add a phone number to set up two-factor authentication
            </label>
            <input
              type="text"
              class="form-control mb-2"
              placeholder="enter your mobile number"
            />
            <button class="btn btn-md btn-primary fw-medium">Send Code</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
