import { useTheme, Text } from "react-native-paper";
import * as Network from "expo-network";
import React from "react";

import DefaultButton from "@/components/button/Default";
import CancelButton from "@/components/button/Cancel";
import Paragraph from "@/components/text/Paragraph";
import Modal from "@/components/Modal";

interface NetworkContextType {
  isConnected: boolean;
}

const NetworkContext = React.createContext<NetworkContextType>(
  {} as NetworkContextType
);

export const NetworkProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isConnected, setIsConnected] = React.useState(true);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [snackbarDismissed, setSnackbarDismissed] = React.useState(false);

  const { colors } = useTheme();

  React.useEffect(() => {
    const checkConnection = async () => {
      const networkState = await Network.getNetworkStateAsync();
      setIsConnected(networkState.isConnected ?? false);

      if (!networkState.isConnected && !snackbarDismissed) {
        setModalVisible(true);
      }
    };

    checkConnection();

    const interval = setInterval(checkConnection, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [snackbarDismissed, modalVisible]);

  const handleClose = () => {
    setModalVisible(false);
    setSnackbarDismissed(true);
  };

  return (
    <React.Fragment>
      <NetworkContext.Provider value={{ isConnected }}>
        {children}
      </NetworkContext.Provider>
      <Modal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        header={<Text variant="titleLarge">No Internet Connection</Text>}
        content={
          <Paragraph>
            You don't seem to be connected to the internet. Please check your
            connection and try again or exit and try again later.
          </Paragraph>
        }
        actions={
          <React.Fragment>
            {/* <CancelButton
              onPress={handleClose}
              textColor={colors.onSurface}
              close
            /> */}
            {/* TODO: later, add a way to check for connection again */}
            <DefaultButton textColor={colors.onSurface} onPress={handleClose}>
              Ok
            </DefaultButton>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
};

export const useNetwork = () => {
  const context = React.useContext(NetworkContext);

  if (!context) {
    throw new Error("useNetwork must be used within a NetworkProvider");
  }

  return context;
};
