import "../_mockLocation";
import React, { useContext, useCallback } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { withNavigationFocus } from "react-navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "../components/Map";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";
import { FontAwesome } from "react-native-vector-icons";

const TrackCreateScreen = ({ isFocused }) => {
	const {
		state: { recording },
		addLocation
	} = useContext(LocationContext);
	const callback = useCallback(
		(location) => {
			addLocation(location, recording);
		},
		[recording]
	);
	const [err] = useLocation(isFocused || recording, callback);

	return (
		<SafeAreaView forceInset={{ top: "always" }}>
			<Text h2>Create a new Track</Text>
			<Map />
			{err ? <Text>please enable location services</Text> : null}
			<TrackForm />
		</SafeAreaView>
	);
};

TrackCreateScreen.navigationOptions = {
	title: "Add Track",
	tabBarIcon: <FontAwesome name={"plus"} size={20} />
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
