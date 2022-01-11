# Sequencer-template

This is a toy Web Audio sequencer project which showcases my architectural approach to React applications.

It consists just of a single button which controls play/stop of a sequencer with a fixed bar consisting of kick, snare and hihat. The behaviour of the button already reflects a bidirectional communication between React and the core business logic, all other interactions would be extensions of the same pattern.

The fact to be a sequencer is not important (I just decided to create a sequencer purely for personal interest), the focus of the project was the structure of the application.

Of course, the audio samples included are also created by me ;)

## Application design

### Overview

I like to create a very strong boundary between React and the core business logic of the application, in such a way that makes the business logic fully agnostic of React, or any other "inherited" framework. That's because I like the business logic itself to dictate its best interfaces. The goal is to protect the core of the application as much as possible from its environment (the environment should adapt to the core, and not the other way around), which in turns makes it easier to understand, test, and reuse.

I am aware that this deviates from what seems to be common approaches to architect React applications, in the sense that I rarely use state management frameworks like `redux` anymore (and associates, like `redux-thunk` or `redux-saga`, etc.). The reason for that is that I have worked in projects in the past using such "standard" ecosystems, but those projects failed to scale, in my opinion, because the important architectural boundaries were not explicitly defined, and `redux` just became a huge global shared state across the whole application, extremely difficult to debug and test. And, although it is certainly possible to properly architect an application using those tools, I most often find that when architecting the application from scratch, those tools just are not necessary, because all business logic (including state management) has already been moved entirely outside of React. In that way React naturally becomes, as its actual purpose, a pure view framework.

### Project structure

The directory structure of the project reflects this design decision:

* `app/`: Contains framework- and platform- agnostic business logic.
* `react/`: Contains the React layer.
* `factories/`: Factories to instantiate business logic injecting dependencies according to the environment.
* `system/audio/`: Audio subsystem.
* `system/network/`: Network subsystem.
* `lib/`: Generic cross-domain utilities.

The unique connection point between React and the core business logic is done in the instantiation by `react/providers/Services`. A global instance of `app/sequencer` is created and exposed to the React tree via `React.Context`. The `useSequencer` hook is provided, so that components can call its actions and consume its data. The reactive parts of the interface (sequencer value updates which should be immediately propagated to all interested clients) are implemented through the `lib/listeners` interface. `useSequencer` takes care of turning the `Listeners` interface into React state.

Since this project has only illustrative purposes, the implementation is very minimal and soon would cause code duplication as the interface of `Sequencer` grows. That's intentional to keep the code as its minimum. The same core ideas can be implemented with higher abstractions, which would absorb redundancies (at the tradeoff of more complex infrastructural code).

A very visible consequence of this design is that the whole application can be run in completely different environments just with a switch of an `environment` flag:

* `react/index.tsx`: Entry point of the React web application, the environment is set to `Environment.Browser`.
* `react/App.test.tsx`: Entry point of the Jest application, the environment is set to `Environment.Test`.

To support yet another environment (like NodeJS, React-Native, etc.), it would only be needed to provide the platform-specific `Audio` (`system/audio/types.ts`) and `Network` (`system/network/types.ts`) interfaces, which due to their minimal size are relatively easy to satisfy (leaving only the complexity inherent to each platform, eg., a NodeJS interface would need to bridge into the OS audio, etc.). Moreover, there can be alternative implementations of the `system/` interfaces, for example, a native Kotlin or Swift `Audio` subsystem if the performance of the `Audio` layer is observed to be deficient when living in the Javascript world. Those alternatives would be trivial to switch and measure (possibly even at runtime).

In my opinion, code which is able to seamlessly run across different environments (including unit tests) is a sign of its robustness, and this architecture is designed to encourage that kind of reusability precisely on the most valuable part of the project, which is its core business logic.

### Disclaimers

* Tests are implemented just enough to showcase how the different parts of the application can be tested, the coverage is far from ideal due to time constraints (this is a project made in one day, just as part of the application process). Also, some tests contain hardcoded data to make them simpler (assuming fixed arrangement, etc.).
* Of course, user interaction is limited :) That's also intentional and part of reducing the time overhead to implement more UI interaction, which should just follow the same pattern of the existing play/stop button (which already shows how a UI element can cause changes in the core business logic, and core logic state can affect the UI).
* The architecture of the `sequencer` was not in the main focus of the project. Even though I think that's a reasonable first sketch, of course a proper sequencer would be way more complex and the current structure might not be fully scalable as is.
* The arrangement is hardcoded between `app/sequencer/arrangement` (tracks and events) and `app/sequencer/timeline` (bpm). No surprises from a musical standpoint.
* No need to say, no attention at all has been put into the UI design of the project 🙈.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
