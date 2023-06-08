export const characterDescription = (characterBaseData) =>
  `Act as if you are creating new character for the game. 
  Generate appearance description for character who is ${characterBaseData}. 
  Describe how character looks, include such details as height, hair color, eye color, face characteristics, age. Generate up to 3 sentences.`;

export const characterInformationPrompt = (
  characterBaseData,
  characterDescription
) => `Act as if you are creating new character for the game.

Generate all the information below using this description as a start point - ${characterBaseData} ${characterDescription}. Put response in html <h1>, <h2>,<p> and <li> elements. Put name and physical characteristics in one <div>, and everything else in another <div>. In total would be two <div> elements.

Show result as

Name: [Generated name and Surname]

Physical Characteristics:
	Age: [Generate age]
	Height: [Generate height]
	Hair: [Generate hair color and length]
	Eyes: [Generate eye color]
	Physique: [Generate body type]

Appearance Description: [Describe how character looks, include such details as height, hair color, eye color, face characteristics. Generate up to 3 sentences.]

Personality: [Generate three personality traits]

Talent: [List five talents and skills]

Occupation: [Generated Occupation]

Background: [Generated background]

Origin:
	Birthplace: [Generated birthplace name]
	Family lifestyle: [Generated family lifestyle]
	Siblings: [Generated siblings if exists]
	Relationship: [Generate relationship status with family] 

Story: [Generate story of this character using all previously generated data. Generate up to 5 sentences.]

Quote: [Generate character quote]
`;

export const picturePrompt = (characterDescription) =>
  `Create an illustration in digital painting style, imagine if you are creating new character for a game. Generate fantasy portrait for ${characterDescription}.`;
