import { useState } from "react";
import Form from "./components/form/form.component";
import { Route, Routes } from "react-router-dom";

import "./App.scss";
import Picture from "./components/picture/picture.component";
import { generateImage, generateText } from "./utils/openAiPost.js";
import preview from "./assets/preview.png";
import * as prompts from "./constant/openAi-prompts.jsx";

const defaultFormFields = {
  sex: "Male",
  age: "Child",
  race: "Human",
  photo: preview,
};

function App() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [infoField, setInfoField] = useState(null);

  const onSelectChange = (event) => {
    const { name, value } = event.target;
    // update appropriate field
    setFormFields({ ...formFields, [name]: value });
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Submit");
      const prompt = `${formFields.sex} ${formFields.race} ${formFields.age}.`;
      console.log(prompt);
      // generate description
      const imgDescription = await generateText(
        prompts.characterDescription(prompt)
      );
      // generate image based on description
      const img = await generateImage(prompts.picturePrompt(imgDescription));
      // generate all information about character
      const characterData = await generateText(
        prompts.characterInformationPrompt(prompt, imgDescription)
      );

      setInfoField(characterData);

      console.log(characterData);

      setFormFields({
        ...formFields,
        photo: `data:image/jpeg;base64,${img.photo}`,
      });

      console.log("Here!");
    } catch (err) {
      alert(err);
      console.log(err);
    } finally {
      // Generate an empty image
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="App">
            <h2 className="app-title">Character Generator</h2>
            <p className="intro-text">
              Need an idea for your next character? Use this simple character
              generator!
            </p>
            <Form onChange={onSelectChange} onSubmit={onFormSubmit} />
            <div className="result">
              <Picture src={formFields.photo} />
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: infoField ? infoField : "" }}
              ></div>
            </div>
          </div>
        }
      ></Route>
    </Routes>
  );
}

export default App;
