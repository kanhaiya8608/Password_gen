import React, { useState } from "react";
import { VscFiles } from "react-icons/vsc";
const PasswordGenerator = () => {
  const [password, setPassword] = useState("abc123!");
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const generatePassword = () => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()";

    let generatedPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
    calculatePasswordStrength(generatedPassword);
  };

  const handleCopy = () => {
    const textField = document.createElement("textarea");
    textField.innerText = password;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  const handlePasswordLengthChange = (event) => {
    setPasswordLength(Number(event.target.value));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    switch (name) {
      case "includeUppercase":
        setIncludeUppercase(checked);
        break;
      case "includeLowercase":
        setIncludeLowercase(checked);
        break;
      case "includeNumbers":
        setIncludeNumbers(checked);
        break;
      case "includeSymbols":
        setIncludeSymbols(checked);
        break;
      default:
        break;
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;

    // Length-based strength calculation
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (password.length >= 16) strength += 1;

    // Complexity-based strength calculation

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()]/.test(password);

    const complexity = hasUppercase + hasLowercase + hasNumber + hasSymbol;
    strength += complexity;

    setPasswordStrength(strength);
  };

  return (
    <div className="container_1">
      <div className="card">
        <div className="box_end pb_32">
          <div className="hed">{password}</div>
          <button className="btn btn-link copy-button">
            <VscFiles onClick={handleCopy} />
          </button>
        </div>
        <div className="pb_24">
          <div className="form-group">
            <label htmlFor="password-length">Character Length</label>
            <span>{passwordLength}</span>
          </div>
          <input
            type="range"
            className="form-range"
            id="password-length"
            min={4}
            max={20}
            value={passwordLength}
            onChange={handlePasswordLengthChange}
          />
        </div>
        <div className="form-check">
          <div className="form-tick">
            <input
              type="checkbox"
              className="form-check-input checkmark pb_12"
              id="include-uppercase"
              name="includeUppercase"
              checked={includeUppercase}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="include-uppercase">
              Include Uppercase Letters
            </label>
          </div>
        </div>
        <div className="">
          <div className="form-tick">
            <input
              type="checkbox"
              className="form-check-input checkmark p-4"
              id="include-lowercase"
              name="includeLowercase"
              checked={includeLowercase}
              onChange={handleCheckboxChange}
            />

            <label className="form-check-label" htmlFor="include-lowercase">
              Include Lowercase Letters
            </label>
          </div>
        </div>
        <div className="form-check">
          <div className="form-tick">
            <input
              type="checkbox"
              className="form-check-input checkmark"
              id="include-numbers"
              name="includeNumbers"
              checked={includeNumbers}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="include-numbers">
              Include Numbers
            </label>
          </div>
        </div>
        <div className="form-check">
          <div className="form-tick">
            <input
              type="checkbox"
              className="form-check-input"
              id="include-symbols"
              name="includeSymbols"
              checked={includeSymbols}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="include-symbols">
              Include Symbols
            </label>
          </div>
        </div>
        <div>
          <div className="cd_body mt_12">
            <h5 className="ttle">STRENGTH</h5>
            <div className="strength-meter">
              <div
                className={`ray ${passwordStrength >= 1 ? "active" : "poor"}`}
              />
              <div className={`ray ${passwordStrength >= 2 ? "active" : ""}`} />
              <div className={`ray ${passwordStrength >= 3 ? "active" : ""}`} />
              <div className={`ray ${passwordStrength >= 4 ? "active" : ""}`} />
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            className="btn btn-primary hed bt-gen"
            onClick={generatePassword}
          >
            GENERATE
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
