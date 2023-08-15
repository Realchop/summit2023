# Summit 2023 app

## Prerequisites
Git &nbsp; https://git-scm.com/downloads  
Node &nbsp; https://nodejs.org/en    
Angular CLI &nbsp; `npm i -g @angular/cli`   
Ionic CLI &nbsp; `npm i -g @ionic/cli`      
Firebase CLI &nbsp; `npm i -g firebase-tools`  
Android studio and SDK (optional, for building android)     
Building for iOS is possible but not covered in this README   


## Installation
`git clone https://github.com/Realchop/summit2023.git`   
`cd summit2023`  
`npm i`

## Running
### Web
`ionic serve`
### PWA
App is intended to be used as PWA.   
Installing on chrome and newer versions of safari is seemsless.  
Firefox and others seem to require additional setup.  
### Android/iOS 
`npx cap run android/ios`  
  
To build, replace `run`/`serve` with `build` in previous commands.

## VSCode
Official extensions for angular and ionic are a must imo.  
GitLens (has a free tier) would also come in handy.

## Firebase
Due to certain usage limitations as well as organizational difficulties,  
it is best to develop using firebase emulators instead of accessing the   
live instance. Keep in mind that `firebase-messaging-sw.js` will most   
likely not work on local, which is fine. To save yourself some time,   
always run emulators with `firebase emulators:start --import DIR --export-on-exit`.  

## Contributing
Always pull and merge master locally before pushing your branch.   
`git pull REMOTE_NAME master && git merge master`   
Always make a feature branch when you make changes.  
`git checkout -b NEW_BRANCH_NAME`   
NO pushing to master for whatever reason; always make a pull request.   
Read active pull requests, comment suggestions and leave a 👍 when done.   

## Features you can work on right now
- General layout, design and theming.  
This includes setting up another ionic theme,   
adding favicon, pwa icons, creating a figma design etc.
- Creating the agenda page. It should be a Read/Update ONLY   
structure (read everyone, update suma only). No creating  
as it will be done once by hand and obviously no deleting.  
- Creating events. Events should have full CRUD (R all, CUD suma).   
- Company analytics page. TODO: Requirements   
- Interview simulation page. Delegates should be able to apply with a cv,  
companies should be able to see and approve/reject applications, suma   
members should be able to see who got in to where. Finally, once the  
deadline for applications is up, a timetable should be generated.  
- Integrate google maps. The map must contain hotel location and surrounding   
area. Suma members must be able to pin new relevant locations.   

## Features you shouldn't touch YET
- Implementing offline mode
- Login/logout
- QR codes
- News/notifications
- Admin panel
- Anything on live firebase
- Anything to do with firebase admin sdk

## Features I would advise against 
- Building standalone iOS app
- Building standalone android app


