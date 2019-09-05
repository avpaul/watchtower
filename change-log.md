# V 3.0.2

## Features
- allow staffing specialists to login
- add amplitude analytics capture
- show error message when an engaged engineer attempts to apply for another cadre role

## Bug Fixes
- fix redirect error on authentication failure

# V 3.0.2
- team manager dashboard for managing applications, and acceptance and rolling off
- slack notifications for new roles, successful applications and new vacancies

# V 3.0.1

## Features
- add days left, number of slots and role start date to project and certfication vacancy
- create team member card
- enable login for cadre team managers
- display validation errors on roles/certification application forms
- add a loader on the certification and role application pages
- update project details after editing
- populate existing links when editing projects
- display number of applicants

## Bug Fixes
- stop deduction of slots after application approval
- fix application title
- fix vacancies and active engineers count
- fix search icon error

# V 3.0.0

## Features

- cadre account creation
- cadre accounts list
- cadre account activation
- cadre engineer profile
- manage cadre accounts
- cadre project creation
- cadre project management
- cadre role creation
- cadre role management
- cadre certification creation
- cadre certification management
- cadre vacancies creation
- cadre engineer applications
- cadre engineer application review
- cadre email notifications


# V 2.0.0

## Features

- consume V2 API endpoints that return data from the WatchTower database instead of querying the Andela APIs in real-time
- PIP activation

## Bug Fixes

- fix inconsistent fellow numbers on users' dashboards
- improve data retrieval and data loading speed
- fix styling, indentation and pagination of dashboards.


# V1.0.5

## Features

- add sliders across cascading filter cards

## Bug Fixes

- fix disparity on developers dashboard filters
- display accurate DevPulse average for fellows' current D-level
- fix the naming of the LF name environment variable

# V 1.0.4

## Bug Fixes

- align LMS table on the Ops dashboard
- fix dashboard buttons
- fix downloading of empty pdf data on initial login
- fix fellows pagination
- enable clearing pip feedback duration on the EM/SL dashboard
- fix table alignment
- enable pre-pip and pip filters on the EM/SL dashboard
- fix wrong computation of weeks on the fellow progress bar
- fix edge cases on the filter-by-duration functionality
- fix wrong active bar on the main menu
- make login page responsive on large screens
- correct fellow status information on fellow-summary cards

# V 1.0.3

## Features

- display a loader when project summary details are loading
- enable feedback filter cards for TTLs/LFs/OPs
- modify display per-page values
- display filtered data for LF/TTL PIP feedback
- display filtered data for TTL/LF/OPs PIP feedback
- set PIP feedback duration
- clear PIP feedback duration
- paginate TTL/LF PIP feedback table
- clear filtered PIP list of fellows on the feedback dashboard
- display pre-PIP/PIP filters on EM/SL feedback dashboard

## Bug Fixes

- refactor and fix console-log errors
- fix fellow summary count discrepancy on TTL/LF dashboard
- fix missing Google Analytics variable
- fix feedback dashboard CSS style
- fix feedback dashboard file
- fix visuals for fellows notification
- fix PIP activation button
- fix landing page responsiveness
- fix cards scrollbar

# V 1.0.2

## Features

- view LMS data breakdown when a fellow's card is clicked
- add the fellow's TTL/LF card to the fellow's history page
- load the PipActivation form when the Pip Activation button is clicked and populate the PIP with areas of concern based on developer’s negative ratings on DevPulse

## Bug Fixes

- fix failing snapshot tests on CircleCI due to mismatched dates
- fix missing fellow profile pictures
- fix self-updating snapshot


# V 1.0.1

## Features

- filter developers by project


# V 1.0.0

## Features

- responsive UI
- data validation
- user authentication
- header/navigation functions
- fellow - overview summary
- ops - overview summary
- lf/ttl - overview summary
- em - overview summary
- pulse integration
- ais integration
- canvas integration
- email notifications
- in-app notifications
