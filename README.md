# Schade React APP 
The application was developed using React. Additional tools are Firebase, which provides the backend, and nanoid, which provides the generation of unique id. The application consists of 4 sub pages, they are:
- Current weather
- New notification
- All known submissions so far
- Profile

The application contains the functionality of creating accounts/logging in.

The *Current Weather* page was integrated with the API provided by https://openweathermap.org/. You can independently select the city for which the current weather is to be displayed or use the GPS module.

The *New report* page allows you to add a new damage or incident on the road.

The *All known reports* page displays the reports saved for the currently logged in user. Also visible is the status of the report, which can be assigned by the administrator in the Firebase console.


The *Profile* page contains basic information about the user such as the number of reports created by him, the number of reports of all drivers. It also allows to change the name and surname.

For the application to work properly you need access to Firebase and OpenWeather. The API Key for Firebase is generated during application development at https://firebase.google.com/. The Firebase configuration is included in the firebase.js file, the data needed to connect the application to Firebase is stored in the .env file. Variables contained in the .env file must be prefixed with REACT_APP_, otherwise they will be ignored. The API Key for OpenWeather is assigned when you create an account at https://openweathermap.org/. It must be included in the URL in order to receive a valid response from the server.


# Installation

To install the packages necessary for the application to run, use command **npm install 

