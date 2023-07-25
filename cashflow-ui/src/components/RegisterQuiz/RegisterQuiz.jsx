import * as React from "react";
import { Fragment } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  HStack,
  Stack,
  RadioGroup,
  useColorModeValue,
  Radio,
  FormHelperText,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,

  //   Formik,
  Button,
  //   Field,
  //   Form,
  //   FormErrorMessage
} from "@chakra-ui/react";
// import {Form} from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { color } from "framer-motion";

// function FormikExample() {
//     function validateName(value) {
//       let error
//       if (!value) {
//         error = 'Name is required'
//       } else if (value.toLowerCase() !== 'naruto') {
//         error = "Jeez! You're not a fan 😱"
//       }
//       return error
//     }}

export default function RegisterQuiz() {
  return (
    <Fragment>
      <Stack>
        <Heading as="h3" size="lg" marginLeft={"700px"} >
          Let’s Start With Examining Your Financial Goals...{" "}
        </Heading>
      </Stack>
      <Box
        maxWidth={"900px"}
        maxHeight={"100vh"}
        marginTop={"900px"}
        height={"100vh"}
        color={"white"}
        margin={"0 auto"}
        //   mb={"200px"}
        //   marginTop={"50px"}
        bg={useColorModeValue("var(--midnight)", "var(--lightblue)")}
        borderRadius={"40px"}
        //   color={"black"} //
      >
        <Image
          textAlign={"center"}
          width={"400px"}
          height={"400px"}
          position={"absolute"}
          top={"-30px"}
          marginLeft={"-70px"}
          // backgroundColor={"red"}
          // marginRight={"20px"}
          //   margin={"0 auto"}
          //   marginBottom={"90px"}
          src="/registerguy.png"
        ></Image>
        <FormControl>
          <FormLabel
            fontWeight={"bold"}
            color={"black"}
            marginLeft={"20px"}
            marginTop={"10%"}
            // marginTop={"100px"}
          >
            {" "}
            1. On a scale of 1-10, how would you rate your current financial
            stability?
          </FormLabel>
          <NumberInput max={10} min={1} color={"black"}>
            <NumberInputField color={"black"} />
            <NumberInputStepper color={"black"}>
              <NumberIncrementStepper color={"black"} />
              <NumberDecrementStepper color={"black"} />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl as="fieldset" marginTop={"10%"}>
          <FormLabel
            as="legend"
            fontWeight={"bold"}
            color={"black"}
            marginLeft={"20px"}
          >
            {" "}
            2. How would you rate your current level of debt?
          </FormLabel>
          <RadioGroup defaultValue="Itachi">
            <Stack
              spacing="24px"
              direction={"column"}
              color={"black"}
              marginLeft={"20px"}
            >
              <Radio value="Sasuke"> No debt </Radio>
              <Radio value="Nagato">
                {" "}
                Minimal debt (e.g., student loans, small credit card balance){" "}
              </Radio>
              <Radio value="Itachi">
                {" "}
                Moderate debt (e.g., mortgage, car loan, significant credit card
                balance){" "}
              </Radio>
              <Radio value="Sage of the six Paths">
                {" "}
                High debt (e.g., multiple loans, large credit card balances){" "}
              </Radio>
            </Stack>
          </RadioGroup>
          {/* <FormHelperText>Select only if you're a fan.</FormHelperText> */}
        </FormControl>
        <FormControl as="fieldset" marginTop={"10%"}>
          <FormLabel
            as="legend"
            fontWeight={"bold"}
            color={"black"}
            marginLeft={"20px"}
          >
            {" "}
            3. What is your primary financial goal/objective?
          </FormLabel>
          {/* <FormHelperText
            color={"black"}
            marginBottom={"3%"}
            marginLeft={"30px"}
          >
            (Please select all that apply.)
          </FormHelperText> */}
          <RadioGroup defaultValue="Itachi">
            <Stack
              spacing="24px"
              direction={"column"}
              color={"black"}
              marginLeft={"20px"}
            >
              <Radio value="Saving for a specific purchase or expense">
                {" "}
                Saving for a specific purchase or expense{" "}
              </Radio>
              <Radio value="Building an emergency fund"> Building an emergency fund </Radio>
              <Radio value="Paying off debt (e.g., credit cards, loans)">
                {" "}
                Paying off debt (e.g., credit cards, loans){" "}
              </Radio>
              <Radio value=" Investing for retirement">
                {" "}
                Investing for retirement{" "}
              </Radio>
              <Radio value="Saving for education (e.g., college fund)">
                {" "}
                Saving for education (e.g., college fund){" "}
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        {/* <FormControl marginTop={"10%"} color={"black"} marginLeft={"20px"}>
        <FormLabel fontWeight={"bold"}> Lastly, would you like to upload a profile photo? </FormLabel>
        <Input type="text" /> */}
        {/* <FormHelperText color={"black"}>We'll never share your emai.</FormHelperText> */}
        {/* </FormControl> */}

        <FormControl marginTop={"10%"}>
          <Formik
            initialValues={{ name: "Sasuke" }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(props) => (
              <Form>
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl>
                      <FormLabel
                        fontWeight={"bold"}
                        color={"black"}
                        marginLeft={"20px"}
                      >
                        Lastly, would you like to upload a profile photo?
                      </FormLabel>
                      <Input placeholder="name" />
                      {/* <FormErrorMessage></FormErrorMessage> */}
                    </FormControl>
                  )}
                </Field>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Upload Image
                </Button>
              </Form>
            )}
          </Formik>
        </FormControl>
      </Box>
    </Fragment>
  );
}
