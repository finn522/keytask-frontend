function validateForm(data, setErrors) {
  let errors = {};
  let formIsValid = true;
  let regNum = new RegExp("^[0-9]+$");

  //Title
  if (!data.title) {
    formIsValid = false;
    errors.title = "*Titel is verplicht.";
  }
  if (data.title.length > 50) {
    formIsValid = false;
    errors.title = "*Titel is max. 50 karakters.";
  }

  //Customer
  if (!data.customer) {
    formIsValid = false;
    errors.customer = "*Klant is verplicht.";
  }
  if (data.customer.length > 50) {
    formIsValid = false;
    errors.customer = "*Klant is max. 50 karakters.";
  }

  //Location
  if (!data.location) {
    formIsValid = false;
    errors.location = "*Locatie is verplicht.";
  }
  if (data.location.length > 200) {
    formIsValid = false;
    errors.location = "*Locatie is max. 200 karakters.";
  }
  if (
    (!data.location.includes(".nl") && !data.location.includes(".com")) ||
    !data.location.includes("www.")
  ) {
    formIsValid = false;
    errors.location = "*www. en/of .nl/.com ontbreken.";
  }
  //Description
  if (data.description.length > 1000) {
    formIsValid = false;
    errors.description = "*Opmerkingen is max. 1000 karakters.";
  }
  //Reward
  if (!data.reward) {
    formIsValid = false;
    errors.reward = "*Beloning is verplicht.";
  }
  if (!regNum.test(data.reward)) {
    formIsValid = false;
    errors.reward = "*Beloning moet nummer zijn.";
  }
  if (data.reward > 1500) {
    formIsValid = false;
    errors.reward = "*Beloning is max 1500.";
  }

  //Creator
  if (!data.creator) {
    formIsValid = false;
    errors.creator = "*Naam is verplicht.";
  }
  if (data.creator.length > 50) {
    formIsValid = false;
    errors.creator = "*Naam is max. 50 karakters.";
  }

  return { formIsValid, errors };
}

export { validateForm };
