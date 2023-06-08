import { useState } from "react";
import Form from "./components/form/form.component";
import { Route, Routes } from "react-router-dom";

import "./App.scss";
import Picture from "./components/picture/picture.component";
import { generateImage, generateText } from "./utils/openAiPost.js";
import preview from "./assets/preview.png";
import * as prompts from "./constant/openAi-prompts.jsx";
import PacmanLoader from "react-spinners/PacmanLoader";

const defaultFormFields = {
  sex: "Male",
  age: "Child",
  race: "Human",
  photo: preview,
};

function App() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [infoField, setInfoField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);

  const onSelectChange = (event) => {
    const { name, value } = event.target;
    // update appropriate field
    setFormFields({ ...formFields, [name]: value });
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // set loading
      setLoading(true);
      // disable submit button
      setButtonDisable(true);

      const prompt = `${formFields.sex} ${formFields.race} ${formFields.age}.`;
      // generate description
      const imgDescription = await generateText(
        prompts.characterDescription(prompt)
      );
      console.log(imgDescription);
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

      setLoading(false);
      setButtonDisable(false);
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
            <div>
              <h2 className="app-title">Character Generator</h2>
              <p className="intro-text">
                Need an idea for your next character? Use this simple character
                generator!
              </p>
              <Form
                onChange={onSelectChange}
                onSubmit={onFormSubmit}
                isBtnDisabled={buttonDisable}
              />
              <div>
                {loading ? (
                  <PacmanLoader
                    color="#581845"
                    loading={loading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    cssOverride={{ textAlign: "center" }}
                  />
                ) : (
                  <div className="result">
                    <Picture src={formFields.photo} />
                    <div
                      className="content"
                      dangerouslySetInnerHTML={{
                        __html: infoField ? infoField : "",
                      }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        }
      ></Route>
    </Routes>
  );
}

export default App;
