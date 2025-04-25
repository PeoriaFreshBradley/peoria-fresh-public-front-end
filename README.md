# PeoriaFresh! Frontend

Website: peoriafresh.org

If you are reading this, then you're trying to adapt our code and use it for your own city! The codebase is fairly large and complicated, so some general information has been provided below to help you get used to how everything works. Additionally, some of the information below information may be a bit outdated. If you want help getting started, please look at the "Peoria Fresh - Open Sourcing Tutorial" file in the "Open-Source-Help" Folder in the frontend. If you want help to get started on gardening, you can check the Getting Started Page on the website. We were recommended this Youtube channel at our Capstone Presentation: https://www.youtube.com/user/Praxxus55712 

## Getting Started

After getting docker set up and opening the frontend in vscode, you will need to run `npm install` in the vscode terminal to install  all required packages. This command finds the packages described in `package.json` and installs them to the `node_modules` folder. `node_modules` has been specified in `.gitignore` as a directory that will not be pushed to github (this was done because of its large file size). This means that any time someone changes the list of packages in `package.json`, everyone working on the project should run `npm install` to update their local `node_modules` folder.

If your `node_modules` is up to date, then you can run `npm start` in the vscode terminal to start the application. **Note:** You may need to forward to port `3000` under the `ports` tab if it is not done automatically. The frontend should run on port `3000` and the backend on `8000`. If the application is not showing up in your browser after running `npm start` this is most likely the problem.

You need to open the frontend and the backend seperately and run `npm start` on both of them to get the full functionality of the application.

## Application Structure

* `index.tsx` is the entry point of the application
  * `app.tsx` describes all url paths of the application and what pages to show at these urls
    * every page is wrapped with `components/layout/default-scaffold.tsx`; this component specifies the layout of the navBar and footer as well as any other options that are shared across pages (there used to be other scaffolds but they were all very similar, so they were easily combined into one)
*  `index.css` specifies styles to be applied to css elements
*  `styles.ts` also specifies styles (I'm still not sure why we need this one)
*  `components/layout/theme.tsx` specifies default styling options for MUI components
*  `axios-instance.ts` is what the frontend uses to send requests to the backend
*  `localStorage.js` provides methods for updating localStorage on the user's browser

## Folders

* `components/` is for components that are shared across pages
  * `designs/` is for components used within a page
  * `layout/` is for components that wrap around or provide abstract structure for a page
* `functions/` is for functions that are shared across pages
* `images/` is for images
  * `icons/` is where we put all of our fancy icons that appear on buttons and whatnot
* `models/` provides object types for some common types of data that will be passed around on the frontend; many of these have been made to mirror the structure of backend objects so that backend data can be interpreted easily
* `state/` has information about the [redux](https://react-redux.js.org) store; redux is a library that stores state information so that an application can keep track of variables as a user navigates between different pages; the redux store is an integral part of the application
  * `slices/` describes the interface of state variables and the functions that can be used to change the state
    * `maps/` is for state objects that are used for the google maps integration
  * `store.ts` configures the state
* `views/` is where the individual pages of the application are described
  * `foodbank/` is where to put pages that only a food bank admin should have access to
  * `gardener/` is where to put pages that only a gardener should have access to
  * `patron/` is where to put pages that someone who does not have an account, but is using the website to request food would use
  * folders such as `gardener/gardener-helpers/` are used for components that are only used for pages in that category (these components could safely be moved to `components/designs/`, but it is helpful to keep them close to the pages that use them)
  * folders such as `foodbank/obsolete/` are for pages and components that are not currently used in the website, but that might be useful to keep around a little longer

 ## The Libraries

Here is a list of the main libraries that PeoriaFresh uses on the frontend.

 1. TypeScript
 2. React
 3. Material UI
 4. React Redux
 5. Axios
 6. Firebase
