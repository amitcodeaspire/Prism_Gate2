import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import Logo from "../../components/Logo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const RentPay = () => {
  // Define state variables for each input field
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = () => {
    // Handle payment logic here
    // Perform the necessary validations and payment processing
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Logo sty={{ marginTop: 10,alignSelf:"center" }} />
        <Text
          style={{
            fontSize: 15,
            fontFamily: "Poppins-SemiBold",
            marginTop: 20,
          }}
        >
          Pay Your Bills Using Prsim Gate Without delay
        </Text>
        <View style={styles.cardContainer}>
          <Image
            source={require("../../assets/razor.png")}
            style={{
              width: 200,
              height: 100,
              resizeMode: "contain",
              alignSelf: "center",
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Card Holder Name"
            value={cardHolderName}
            onChangeText={setCardHolderName}
          />
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Expiry Date"
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="CVV"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: "80%",
            // alignItems: "center",
            backgroundColor: "black",
            paddingVertical: 8,
            paddingHorizontal: 11,
            borderRadius: 10,
            marginTop: 25,
            // justifyContent:"center",
            alignSelf:"center",
            alignItems:"center"
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 24,
              color: "white",
            }}
          >
            Pay
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default RentPay;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "white",
  },
  cardContainer: {
    backgroundColor: "#f2faff",
    // borderRadius: 8,
    padding: 10,
    width: "100%",
    marginTop: 10,
    borderWidth: 0.1,
    elevation: 5,
  },
  input: {
    height: 48,
    marginBottom: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "45%",
  },
});
