import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { FontAwesome } from "react-native-vector-icons";

import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";

import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";
import { setNavigator } from "./src/navigationRef";

const trackListFlow = createStackNavigator({
	TrackList: TrackListScreen,
	TrackDetail: TrackDetailScreen
});

trackListFlow.navigationOptions = {
	title: "Tracks",
	tabBarIcon: <FontAwesome name="th-list" size={20} />
};

const switchNavigator = createSwitchNavigator({
	ResolveAuth: ResolveAuthScreen,
	loginFlow: createStackNavigator({
		SignUp: SignupScreen,
		Signin: SigninScreen
	}),
	mainFlow: createBottomTabNavigator({
		trackListFlow,
		TrackCreate: TrackCreateScreen,
		Account: AccountScreen
	})
});

const App = createAppContainer(switchNavigator);

export default () => {
	return (
		<TrackProvider>
			<LocationProvider>
				<AuthProvider>
					<App ref={(navigator) => setNavigator(navigator)} />
				</AuthProvider>
			</LocationProvider>
		</TrackProvider>
	);
};
