import { SafeAreaView, StyleSheet, Text, View, Switch, Touchable, TouchableOpacity, TextInput, useColorScheme } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik'
import BouncyCheckbox from "react-native-bouncy-checkbox";


const PassWordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 character')
    .max(16, 'Should be max of 16 character')
    .required('Length is required')
});

const App = () => {
  const systemTheme = useColorScheme()

  // Move all hooks inside the component
  const [password, setPassword] = useState("");
  const [isPassGenerated, setIsPasGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);

  const generatePasswordString = (passwordLen: number) => {
    let characterList = "";
    const upperCases = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCases = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-';

    if (upperCase) characterList += upperCases;
    if (lowerCase) characterList += lowerCases;
    if (symbol) characterList += symbols;
    if (number) characterList += numbers;

    const passwordResult = createPassword(characterList, passwordLen);
    setPassword(passwordResult);
    setIsPasGenerated(true);
  };

  const createPassword = (characters: string, passwordLen: number) => {
    let result = '';
    for (let i = 0; i < passwordLen; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setIsPasGenerated(false);
    setLowerCase(false);
    setUpperCase(false);
    setNumber(false);
    setSymbol(false);
  };

  const bgColor = systemTheme === 'dark' ? "#212327" : "#c6d9f1";
  const txtColor = systemTheme === 'dark' ? "#CCDCF5" : "#212327";
  const boxBg = systemTheme === 'dark' ? "#7498BF" : "#090905";

  return (
    <SafeAreaView style={[styles.mainContainer, { backgroundColor: bgColor }]}>
      <ScrollView>
        <View style={[styles.HeadTextContainer,]}>
          <View style={[styles.HeadTextBox, { backgroundColor: boxBg }]}>
            <Text style={[styles.HeadText]}>Password Generator</Text>
          </View>

        </View>

        <Formik
          initialValues={{ passwordLength: '' }}
          validationSchema={PassWordSchema}
          onSubmit={values => {
            console.log(values)
            generatePasswordString(+values.passwordLength)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
            isValid,
            handleReset,
            /* and other goodies */
          }) => (
            < >
              <View style={[styles.lengthBox]}>
                <Text style={[styles.lengthBoxTxt]}>Enter the length</Text>
                <TextInput value={values.passwordLength}
                  onChangeText={handleChange('passwordLength')}
                  placeholder='Ex. 8'
                  keyboardType='numeric'
                  style={[styles.lengthBoxInp, { color: txtColor }]}
                >
                </TextInput>
              </View>
              {
                touched && errors.passwordLength && (
                  <Text style={[styles.errorTxt, { color: 'red' }]}>
                    **{errors.passwordLength}
                  </Text>
                )
              }

              <View style={[styles.checkBoxContainer]}>
                <View style={[styles.checkboxBox]}>
                  <Text style={[styles.textCheckBox, { color: txtColor }]}>Include Numbers</Text>
                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={number}
                    fillColor='#00db90'
                    onPress={() => setNumber(!number)}
                  />
                </View>
                <View style={[styles.checkboxBox]}>
                  <Text style={[styles.textCheckBox, { color: txtColor }]}>Include Lowercase letters</Text>
                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={lowerCase}
                    fillColor='#00db90'
                    onPress={() => setLowerCase(!lowerCase)}
                  />
                </View>
                <View style={[styles.checkboxBox]}>
                  <Text style={[styles.textCheckBox, { color: txtColor }]}>Include upperCase Letters</Text>
                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={upperCase}
                    fillColor='#00db90'
                    onPress={() => setUpperCase(!upperCase)}
                  />
                </View>
                <View style={[styles.checkboxBox]}>
                  <Text style={[styles.textCheckBox, { color: txtColor }]}>Include symbols</Text>
                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={symbol}
                    fillColor='#00db90'
                    onPress={() => setSymbol(!symbol)}
                  />
                </View>
              </View>
              <View style={styles.btn}>
                <TouchableOpacity
                  disabled={!isValid}
                  style={styles.GenerateBtn}
                  onPress={() => handleSubmit()}
                >

                  <Text>Generate</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.resetBtn}
                  onPress={() => {
                    handleReset();
                    resetPassword();
                  }}
                >
                  <Text>Reset</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
        {isPassGenerated && (<View style={[styles.passwordBox,]}>
          <Text style={[styles.passwordMsgTxt,]}>*Long press to cpy*</Text>
          <Text selectable={true} style={[styles.passwordTxt,]}>
            {password}
          </Text>

        </View>)}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  HeadText: {
    color: "#D5EFF7",
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 10,

  },
  HeadTextContainer: {
    width: '100%',
    alignItems: 'center',
  },
  HeadTextBox: {
    marginTop: 30,
    marginBottom: 50,
    width: '80%',
    shadowColor: "#a8d1fd",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 5.62,
    elevation: 8,
    borderWidth:2,
    borderRadius:4,
    borderColor:'#E1F8FF'
  },
  mainContainer: {
    paddingHorizontal: 40,
    width: '100%',
    height: '100%',
  },
  lengthBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  lengthBoxTxt: {
    color: "#3fff",
    fontSize: 20
  },
  lengthBoxInp: {
    width: 80,
    borderColor: '#fff',
    borderBottomWidth: 2
  },
  GenerateBtn: {
    backgroundColor: "#00db90",
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,

  },
  resetBtn: {
    backgroundColor: "#e6eef7",
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
    borderRadius: 10
  },
  btn: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  checkboxBox: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  checkBoxContainer: {
    gap: 20,
    marginVertical: 40,
  },
  textCheckBox: {
    fontSize: 20
  },
  passwordTxt: {
    marginVertical: 10,
    fontSize: 30,
    color: '#1A2414'
  },
  errorTxt: {
    marginVertical: 5,
  },
  passwordBox: {
    backgroundColor: '#B0C6E7',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10
  },
  passwordMsgTxt: {
    color: '#1A2414',
    fontSize: 15,
  }
});

export default App;